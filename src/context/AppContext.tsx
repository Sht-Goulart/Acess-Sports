import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Student {
  id: number;
  name: string;
  team: string;
  category: string;
  present: boolean;
  img: string;
  attendanceHistory: { date: string; present: boolean }[];
}

export interface Notice {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  type: string;
  urgent: boolean;
}

export interface Payment {
  id: number;
  studentId: number;
  month: string;
  amount: number;
  status: 'Pago' | 'Pendente';
  dueDate: string;
  paymentDate?: string;
}

export interface Event {
  id: number;
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
  toggleAttendance: (studentId: number) => void;
  markAllPresent: () => void;
  addNotice: (notice: Omit<Notice, 'id' | 'date'>) => void;
  markPaymentAsPaid: (paymentId: number) => void;
  setEvents: (events: Event[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialStudents: Student[] = [
  {
    id: 1, name: 'Marcus Johnson', team: 'Equipe Elite Sub-16', category: 'Sub-16', present: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWbyHm3y7Q0iXBqIE6swI1CGODbSP0GMPOxqH30QCKHgwNyEio0KFQKXg6W6VscDPTiBppJWDTOePf0r_PFT45W-QqbrpOVjm_hE8joBuWJj0t5BmkPyyZrHFgZH5wdfqUW5AfXfmvLKWdOd_3_PiDLmO0-pJmR8czhv_cs56DrInZHiTbSeTlednDSnAJGvjP0U3fp24t66oKpxL8FCmxdaHWuDqacGkRbICwI8v9C7SnGUiM2pp4rEaQGKHhSGa6rD6n9BLLgGNQ',
    attendanceHistory: [
      { date: '2023-10-24', present: true },
      { date: '2023-10-22', present: false },
      { date: '2023-10-20', present: true },
    ]
  },
  {
    id: 2, name: 'Sarah Williams', team: 'Equipe Elite Sub-16', category: 'Sub-16', present: false,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTfv33Q03M5b7ySIbf1Yqv9T9iTrIKRQGRv4d6KYaZcv-CT_DtVcHm-NZiAGt-POZXuoMNA6NqGVB6oSc50UKK2Z4VMbKvPWkfVyMCJPGSFCIcWuhyRajH6VnXs8NZgmuEm8t75fz-2gFWKoFJX2ZnKCsoQlQAvfXc4i7KtFEueAs72gMZ3HmPrV8_VSeap1yy3mQa7bnvf3sQiGoRriJGeCURRYlirx_bMOTZIS11HtXUhBh6hqTNiwRDghhEH7jc5YakREUy9WPx',
    attendanceHistory: []
  },
  {
    id: 3, name: 'David Chen', team: 'Equipe Elite Sub-16', category: 'Sub-16', present: true,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR4NvxjOhNBQIxnCaGCIPMDGLHtTQVzK0LGgk7tWYHzuaP_w2BHPD5PwQy4FimWFIRdrPhu_wR3lz-HW6gePgpGZ5p8zxwV5C3KIK4_Fikzk8HDCNsoM7vNa46XjTDQcF1srvnOOmqQTpXWXaxyRTtr-eDOQ2YAuWpmo0GnR8O-Tw0YbvvSRqD-vVC5zWAiC1X0ApXyzDh8pJoyooF17vt-AKYwdKbNCzK6Mx-rjnYYisP86Yb1y_lNGweAtW4qWPizA-RedbH4var',
    attendanceHistory: []
  },
  { id: 4, name: 'Alex Johnson', team: 'Sub-12', category: 'Sub-12', present: true, img: '', attendanceHistory: [] },
  { id: 5, name: 'Mia Wong', team: 'Iniciante', category: 'Iniciante', present: false, img: '', attendanceHistory: [] },
];

const initialNotices: Notice[] = [
  { id: 1, title: 'Novo cronograma de treinos para as finais', description: 'O cronograma atualizado para a semana de finais já está disponível. Verifique seus horários e locais atribuídos para as sessões da manhã.', category: 'Todos', date: '24 de Outubro, 2023', type: 'Treino', urgent: false },
  { id: 2, title: 'Transporte para o Torneio Regional', description: 'O ônibus sairá do portão principal pontualmente às 06h00. Por favor, chegue às 05h45 para conferência de equipamentos.', category: 'Todos', date: '22 de Outubro, 2023', type: 'Urgente', urgent: true },
];

const initialPayments: Payment[] = [
  { id: 1, studentId: 4, month: 'Outubro 2023', amount: 150, status: 'Pendente', dueDate: '10 Out, 2023' },
  { id: 2, studentId: 5, month: 'Outubro 2023', amount: 150, status: 'Pendente', dueDate: '10 Out, 2023' },
  { id: 3, studentId: 4, month: 'Setembro 2023', amount: 150, status: 'Pago', dueDate: '10 Set, 2023', paymentDate: '08/09' },
  { id: 4, studentId: 1, month: 'Outubro 2023', amount: 150, status: 'Pago', dueDate: '10 Out, 2023', paymentDate: '12/10' },
];

const initialEvents: Event[] = [
  { id: 1, title: 'Treino Sub-14 Elite', location: 'Campo A • Academia Juvenil', time: '09:00', duration: '60 min', type: 'Treino', category: 'Futebol' },
  { id: 2, title: 'Copa Regional 2023', location: 'Quartas de Final • Ginásio 2', time: '14:30', duration: 'Jogo Completo', type: 'Competição', category: 'Futebol' },
  { id: 3, title: 'Treino Individual', location: 'Quadra 4 • Especialização', time: '17:00', duration: '45 min', type: 'Treino', category: 'Basquete' },
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : initialStudents;
  });
  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });
  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });
  const [events, setEvents] = useState<Event[]>(() => {
    const saved = localStorage.getItem('events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  useEffect(() => localStorage.setItem('students', JSON.stringify(students)), [students]);
  useEffect(() => localStorage.setItem('notices', JSON.stringify(notices)), [notices]);
  useEffect(() => localStorage.setItem('payments', JSON.stringify(payments)), [payments]);
  useEffect(() => localStorage.setItem('events', JSON.stringify(events)), [events]);

  const toggleAttendance = (studentId: number) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, present: !s.present } : s));
  };

  const markAllPresent = () => {
    setStudents(prev => prev.map(s => ({ ...s, present: true })));
  };

  const addNotice = (notice: Omit<Notice, 'id' | 'date'>) => {
    const newNotice: Notice = {
      ...notice,
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  const markPaymentAsPaid = (paymentId: number) => {
    setPayments(prev => prev.map(p => p.id === paymentId ? {
      ...p,
      status: 'Pago',
      paymentDate: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
    } : p));
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
