import React, { createContext, useContext, useState, useEffect } from 'react';
import * as firebaseService from '../firebase/services';
import type { User } from 'firebase/auth';

export interface Student {
  id: string;
  name: string;
  team?: string;
  category: string | string[];
  categories?: string[];
  present: boolean;
  img?: string;
  attendanceHistory?: { date: string; present: boolean }[];
  age?: number;
  status?: string;
}

export interface Notice {
  id: number | string;
  title: string;
  description: string;
  category: string;
  date: string;
  type: string;
  urgent: boolean;
}

export interface Payment {
  id: string;
  studentId: string;
  month: string;
  amount: number;
  status: 'Pago' | 'Pendente';
  dueDate: string;
  paymentDate?: string;
}

export interface Event {
  id: string;
  title: string;
  location: string;
  time: string;
  date: string; // ISO string YYYY-MM-DD
  duration: string;
  type: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'Coach' | 'Student';
  status: 'Pending' | 'Approved';
  categories?: string[];
}

interface AppState {
  currentUser: User | null;
  profile: UserProfile | null;
  students: Student[];
  notices: Notice[];
  payments: Payment[];
  events: Event[];
  categories: Category[];
  pendingStudents: any[];
  settings: { pixKey: string; whatsappNumber: string };
  loading: boolean;
}

interface AppContextType extends AppState {
  toggleAttendance: (studentId: string) => void;
  markAllPresent: () => void;
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  markPaymentAsPaid: (paymentId: string) => void;
  setEvents: (events: Event[]) => void;
  addEvent: (event: Omit<Event, 'id'>) => void;
  addCategory: (name: string, icon?: string) => void;
  removeCategory: (id: string) => void;
  approveStudent: (uid: string, value: number) => void;
  saveDailyAttendance: (date: string) => void;
  updateSettings: (settings: { pixKey: string; whatsappNumber: string }) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pendingStudents, setPendingStudents] = useState<any[]>([]);
  const [settings, setSettings] = useState({ pixKey: '', whatsappNumber: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = firebaseService.subscribeToAuth(async (user) => {
      setCurrentUser(user);
      if (user) {
        const userProfile = await firebaseService.getProfile(user.uid);
        setProfile(userProfile as UserProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    const unsubStudents = firebaseService.subscribeToStudents(setStudents as any);
    const unsubNotices = firebaseService.subscribeToNotices(setNotices);
    const unsubPayments = firebaseService.subscribeToPayments(setPayments as any);
    const unsubEvents = firebaseService.subscribeToEvents(setEvents as any);
    const unsubCategories = firebaseService.subscribeToCategories(setCategories);
    const unsubPending = firebaseService.subscribeToPendingStudents(setPendingStudents);
    const unsubSettings = firebaseService.subscribeToSettings(setSettings);

    return () => {
      unsubAuth();
      unsubStudents();
      unsubNotices();
      unsubPayments();
      unsubEvents();
      unsubCategories();
      unsubPending();
      unsubSettings();
    };
  }, []);

  const toggleAttendance = (studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, present: !s.present } : s));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, present: true })));
  };

  const saveDailyAttendance = (date: string) => {
    firebaseService.saveAttendance(date, students.map(s => ({ id: s.id, name: s.name, present: s.present })));
    alert("Chamada salva com sucesso!");
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'date'>) => {
    firebaseService.createNotice(notice);
  };

  const markPaymentAsPaid = (paymentId: string) => {
    firebaseService.confirmPayment(paymentId);
  };

  const addEvent = (event: Omit<Event, 'id'>) => {
    firebaseService.createEvent(event);
  };

  const addCategory = (name: string, icon: string = "sports") => {
    firebaseService.createCategory(name, icon);
  };

  const removeCategory = (id: string) => {
    firebaseService.deleteCategory(id);
  };

  const approveStudent = (uid: string, value: number) => {
    firebaseService.approveStudent(uid, value);
  };

  const updateSettings = (newSettings: { pixKey: string; whatsappNumber: string }) => {
    firebaseService.updateSettings(newSettings);
  };

  return (
    <AppContext.Provider value={{
      currentUser, profile, students, notices, payments, events, categories, pendingStudents, settings, loading,
      toggleAttendance, markAllPresent, addNotice, markPaymentAsPaid, setEvents,
      addEvent, addCategory, removeCategory, approveStudent, saveDailyAttendance, updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
