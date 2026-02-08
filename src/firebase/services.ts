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
} from "firebase/firestore";
import { db } from "./config";
import type { Student, Notice, Payment, Event } from "../context/AppContext";

// Coleções
const STUDENTS_COL = "students";
const NOTICES_COL = "notices";
const PAYMENTS_COL = "payments";
const EVENTS_COL = "events";

// --- Alunos (Students) ---
export const subscribeToStudents = (callback: (students: Student[]) => void) => {
  const q = query(collection(db, STUDENTS_COL));
  return onSnapshot(q, (snapshot) => {
    const students = snapshot.docs.map(doc => ({ id: isNaN(Number(doc.id)) ? doc.id : Number(doc.id), ...doc.data() } as unknown as Student));
    callback(students);
  });
};

export const updateStudentAttendance = async (studentId: string | number, present: boolean) => {
  const studentDoc = doc(db, STUDENTS_COL, studentId.toString());
  await updateDoc(studentDoc, { present });
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
    const payments = snapshot.docs.map(doc => ({ id: isNaN(Number(doc.id)) ? doc.id : Number(doc.id), ...doc.data() } as unknown as Payment));
    callback(payments);
  });
};

export const confirmPayment = async (paymentId: string | number) => {
  const paymentDoc = doc(db, PAYMENTS_COL, paymentId.toString());
  await updateDoc(paymentDoc, {
    status: 'Pago',
    paymentDate: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
  });
};

// --- Eventos (Events) ---
export const subscribeToEvents = (callback: (events: Event[]) => void) => {
  const q = query(collection(db, EVENTS_COL));
  return onSnapshot(q, (snapshot) => {
    const events = snapshot.docs.map(doc => ({ id: isNaN(Number(doc.id)) ? doc.id : Number(doc.id), ...doc.data() } as unknown as Event));
    callback(events);
  });
};

// Função para inicializar dados (Seed) caso o banco esteja vazio
export const seedDatabase = async (initialData: any) => {
  const { students, notices, payments, events } = initialData;

  for (const s of students) {
    await setDoc(doc(db, STUDENTS_COL, s.id.toString()), s);
  }
  for (const n of notices) {
    await addDoc(collection(db, NOTICES_COL), { ...n, createdAt: serverTimestamp() });
  }
  for (const p of payments) {
    await setDoc(doc(db, PAYMENTS_COL, p.id.toString()), p);
  }
  for (const e of events) {
    await setDoc(doc(db, EVENTS_COL, e.id.toString()), e);
  }
};
