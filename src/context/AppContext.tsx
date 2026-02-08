import React, { createContext, useContext, useState, useEffect } from 'react';
import * as firebaseService from '../firebase/services';

export interface Student {
  id: number | string;
  name: string;
  team: string;
  category: string;
  present: boolean;
  img: string;
  attendanceHistory: { date: string; present: boolean }[];
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
  id: number | string;
  studentId: number | string;
  month: string;
  amount: number;
  status: 'Pago' | 'Pendente';
  dueDate: string;
  paymentDate?: string;
}

export interface Event {
  id: number | string;
  title: string;
  location: string;
  time: string;
  duration: string;
  type: string;
  category: string;
}

interface AppState {
  students: Student[];
  notices: Notice[];
  payments: Payment[];
  events: Event[];
}

interface AppContextType extends AppState {
  toggleAttendance: (studentId: number | string) => void;
  markAllPresent: () => void;
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  markPaymentAsPaid: (paymentId: number | string) => void;
  setEvents: (events: Event[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Sincronização em tempo real com Firebase
    const unsubStudents = firebaseService.subscribeToStudents(setStudents);
    const unsubNotices = firebaseService.subscribeToNotices(setNotices);
    const unsubPayments = firebaseService.subscribeToPayments(setPayments);
    const unsubEvents = firebaseService.subscribeToEvents(setEvents);

    return () => {
      unsubStudents();
      unsubNotices();
      unsubPayments();
      unsubEvents();
    };
  }, []);

  const toggleAttendance = (studentId: number | string) => {
    const student = students.find(s => s.id === studentId);
    if (student) {
      firebaseService.updateStudentAttendance(studentId, !student.present);
    }
  };

  const markAllPresent = () => {
    students.forEach(s => {
      if (!s.present) firebaseService.updateStudentAttendance(s.id, true);
    });
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'date'>) => {
    firebaseService.createNotice(notice);
  };

  const markPaymentAsPaid = (paymentId: number | string) => {
    firebaseService.confirmPayment(paymentId);
  };

  return (
    <AppContext.Provider value={{
      students, notices, payments, events,
      toggleAttendance, markAllPresent, addNotice, markPaymentAsPaid, setEvents
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
