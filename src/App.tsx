import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PendingApproval from './pages/PendingApproval';

import CoachCalendar from './pages/coach/Calendar';
import CoachPerformance from './pages/coach/Performance';
import CoachCreateNotice from './pages/coach/CreateNotice';
import CoachAttendance from './pages/coach/Attendance';
import CoachPayments from './pages/coach/Payments';
import ManageUsers from './pages/coach/ManageUsers';
import CoachSettings from './pages/coach/Settings';

import StudentAgenda from './pages/student/Agenda';
import StudentPerformance from './pages/student/Performance';
import StudentNoticeBoard from './pages/student/NoticeBoard';
import StudentFrequency from './pages/student/Frequency';
import StudentPayments from './pages/student/Payments';

function AppRoutes() {
  const { currentUser, profile, loading } = useAppContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Not approved students
  if (profile?.role === 'Student' && profile?.status === 'Pending') {
    return (
      <Routes>
        <Route path="/pending" element={<PendingApproval />} />
        <Route path="*" element={<Navigate to="/pending" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Coach Routes */}
      {profile?.role === 'Coach' && (
        <>
          <Route path="/coach/calendar" element={<CoachCalendar />} />
          <Route path="/coach/performance" element={<CoachPerformance />} />
          <Route path="/coach/create-notice" element={<CoachCreateNotice />} />
          <Route path="/coach/attendance" element={<CoachAttendance />} />
          <Route path="/coach/payments" element={<CoachPayments />} />
          <Route path="/coach/manage-users" element={<ManageUsers />} />
          <Route path="/coach/settings" element={<CoachSettings />} />
        </>
      )}

      {/* Student Routes */}
      {profile?.role === 'Student' && (
        <>
          <Route path="/student/agenda" element={<StudentAgenda />} />
          <Route path="/student/performance" element={<StudentPerformance />} />
          <Route path="/student/notices" element={<StudentNoticeBoard />} />
          <Route path="/student/frequency" element={<StudentFrequency />} />
          <Route path="/student/payments" element={<StudentPayments />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
