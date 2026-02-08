import type { NavItem } from '../components/BottomNavigation';

export const coachNavItems: NavItem[] = [
  { label: 'Calendário', icon: 'calendar_month', path: '/coach/calendar' },
  { label: 'Desempenho', icon: 'analytics', path: '/coach/performance' },
  { label: 'Avisos', icon: 'campaign', path: '/coach/create-notice' },
  { label: 'Chamada', icon: 'fact_check', path: '/coach/attendance' },
  { label: 'Pagamentos', icon: 'payments', path: '/coach/payments' },
];

export const studentNavItems: NavItem[] = [
  { label: 'Agenda', icon: 'calendar_month', path: '/student/agenda' },
  { label: 'Desempenho', icon: 'monitoring', path: '/student/performance' },
  { label: 'Avisos', icon: 'notifications', path: '/student/notices' },
  { label: 'Frequência', icon: 'fact_check', path: '/student/frequency' },
  { label: 'Pagamentos', icon: 'payments', path: '/student/payments' },
];
