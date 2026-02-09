import {
  collection,
  addDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  setDoc,
  serverTimestamp,
  deleteDoc,
  where,
  getDoc
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getAuth
} from "firebase/auth";
import type { User } from "firebase/auth";
import { db, auth } from "./config";
import type { Notice, Payment, Event, Category } from "../context/AppContext";

// Coleções
const NOTICES_COL = "notices";
const PAYMENTS_COL = "payments";
const EVENTS_COL = "events";
const CATEGORIES_COL = "categories";
const USERS_COL = "users";
const SETTINGS_COL = "settings";

// Instância secundária para registrar usuários sem deslogar o atual
const secondaryApp = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}, "Secondary");
const secondaryAuth = getAuth(secondaryApp);

// --- Auth & Profile ---
export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const login = (email: string, pass: string) => {
  return signInWithEmailAndPassword(auth, email, pass);
};

export const logout = () => signOut(auth);

export const getProfile = async (uid: string) => {
  const userDoc = await getDoc(doc(db, USERS_COL, uid));
  return userDoc.exists() ? userDoc.data() : null;
};

export const registerStudent = async (data: any) => {
  const { email, password, name, age, categories } = data;
  // Alunos podem se registrar normalmente (eles não estão logados)
  // Mas para garantir que não haja conflitos se um professor estiver testando:
  const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
  const uid = userCredential.user.uid;
  await signOut(secondaryAuth); // Desloga da instância secundária

  await setDoc(doc(db, USERS_COL, uid), {
    uid,
    name,
    age,
    email,
    categories,
    role: 'Student',
    status: 'Pending',
    createdAt: serverTimestamp()
  });

  return uid;
};

export const registerCoach = async (data: any) => {
  const { email, password, name } = data;
  const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
  const uid = userCredential.user.uid;
  await signOut(secondaryAuth);

  await setDoc(doc(db, USERS_COL, uid), {
    uid,
    name,
    email,
    role: 'Coach',
    status: 'Approved',
    createdAt: serverTimestamp()
  });

  return uid;
};

export const initializeMasterCoach = async () => {
  const email = "assports@gmail.com";
  const pass = "Lucas13528";

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, USERS_COL, uid), {
      uid,
      name: "Lucas Mendes",
      email,
      role: 'Coach',
      status: 'Approved',
      createdAt: serverTimestamp()
    });
    return "Sucesso: Professor criado!";
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      return "O professor já está cadastrado no sistema.";
    }
    throw error;
  }
};

// --- Alunos Pendentes (Student Requests) ---
export const subscribeToPendingStudents = (callback: (students: any[]) => void) => {
  const q = query(collection(db, USERS_COL), where("role", "==", "Student"), where("status", "==", "Pending"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
};

export const approveStudent = async (studentUid: string, paymentValue: number) => {
  await updateDoc(doc(db, USERS_COL, studentUid), { status: 'Approved' });

  // Create first payment record
  const month = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  await addDoc(collection(db, PAYMENTS_COL), {
    studentId: studentUid,
    month: month.charAt(0).toUpperCase() + month.slice(1),
    amount: paymentValue,
    status: 'Pendente',
    dueDate: `10 ${month.split(' ')[0].substring(0,3)}, ${month.split(' ')[1]}`,
    createdAt: serverTimestamp()
  });
};

// --- Configurações (Settings) ---
export const subscribeToSettings = (callback: (settings: any) => void) => {
  return onSnapshot(doc(db, SETTINGS_COL, "global"), (snapshot) => {
    callback(snapshot.exists() ? snapshot.data() : { pixKey: "", whatsappNumber: "" });
  });
};

export const updateSettings = async (settings: { pixKey: string; whatsappNumber: string }) => {
  await setDoc(doc(db, SETTINGS_COL, "global"), settings);
};

// --- Categorias (Categories) ---
export const subscribeToCategories = (callback: (categories: Category[]) => void) => {
  const q = query(collection(db, CATEGORIES_COL), orderBy("name", "asc"));
  return onSnapshot(q, (snapshot) => {
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
    callback(categories);
  });
};

export const createCategory = async (name: string, icon: string = "sports") => {
  await addDoc(collection(db, CATEGORIES_COL), {
    name,
    icon,
    createdAt: serverTimestamp()
  });
};

export const deleteCategory = async (categoryId: string) => {
  await deleteDoc(doc(db, CATEGORIES_COL, categoryId));
};

// --- Alunos Aprovados (Students) ---
export const subscribeToStudents = (callback: (students: any[]) => void) => {
  const q = query(collection(db, USERS_COL), where("role", "==", "Student"), where("status", "==", "Approved"));
  return onSnapshot(q, (snapshot) => {
    const students = snapshot.docs.map(doc => ({
      id: doc.id,
      present: false, // Default for today's session
      ...doc.data()
    }));
    callback(students);
  });
};

export const saveAttendance = async (date: string, attendanceList: any[]) => {
  const attendanceDoc = doc(db, "daily_attendance", date);
  await setDoc(attendanceDoc, {
    date,
    attendance: attendanceList,
    updatedAt: serverTimestamp()
  });

  // Atualizar o histórico individual de cada aluno para sincronizar com o portal do aluno
  for (const item of attendanceList) {
    const userRef = doc(db, USERS_COL, item.id);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      const history = userData.attendanceHistory || [];
      // Evitar duplicatas para a mesma data
      const filteredHistory = history.filter((h: any) => h.date !== date);
      filteredHistory.push({ date, present: item.present });
      await updateDoc(userRef, { attendanceHistory: filteredHistory });
    }
  }
};

// --- Avisos (Notices) ---
export const subscribeToNotices = (callback: (notices: Notice[]) => void) => {
  const q = query(collection(db, NOTICES_COL), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const notices = snapshot.docs.map(doc => ({ id: isNaN(Number(doc.id)) ? doc.id : Number(doc.id), ...doc.data() } as unknown as Notice));
    callback(notices);
  });
};

export const createNotice = async (notice: Omit<Notice, "id" | "date">) => {
  await addDoc(collection(db, NOTICES_COL), {
    ...notice,
    date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }),
    createdAt: serverTimestamp()
  });
};

// --- Pagamentos (Payments) ---
export const subscribeToPayments = (callback: (payments: Payment[]) => void) => {
  const q = query(collection(db, PAYMENTS_COL));
  return onSnapshot(q, (snapshot) => {
    const payments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Payment));
    callback(payments);
  });
};

export const confirmPayment = async (paymentId: string) => {
  const paymentDoc = doc(db, PAYMENTS_COL, paymentId);
  await updateDoc(paymentDoc, {
    status: 'Pago',
    paymentDate: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  });
};

// --- Eventos (Events) ---
export const subscribeToEvents = (callback: (events: Event[]) => void) => {
  const q = query(collection(db, EVENTS_COL), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as Event));
    callback(events);
  });
};

export const createEvent = async (event: Omit<Event, "id">) => {
  await addDoc(collection(db, EVENTS_COL), {
    ...event,
    createdAt: serverTimestamp()
  });
};
