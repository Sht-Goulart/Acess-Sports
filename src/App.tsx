import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CoachCalendar from './pages/coach/Calendar';
import CoachPerformance from './pages/coach/Performance';
import CoachCreateNotice from './pages/coach/CreateNotice';
import CoachAttendance from './pages/coach/Attendance';
import CoachPayments from './pages/coach/Payments';

import StudentAgenda from './pages/student/Agenda';
import StudentPerformance from './pages/student/Performance';
import StudentNoticeBoard from './pages/student/NoticeBoard';
import StudentFrequency from './pages/student/Frequency';
import StudentPayments from './pages/student/Payments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Coach Routes */}
        <Route path="/coach/calendar" element={<CoachCalendar />} />
        <Route path="/coach/performance" element={<CoachPerformance />} />
        <Route path="/coach/create-notice" element={<CoachCreateNotice />} />
        <Route path="/coach/attendance" element={<CoachAttendance />} />
        <Route path="/coach/payments" element={<CoachPayments />} />

        {/* Student Routes */}
        <Route path="/student/agenda" element={<StudentAgenda />} />
        <Route path="/student/performance" element={<StudentPerformance />} />
        <Route path="/student/notices" element={<StudentNoticeBoard />} />
        <Route path="/student/frequency" element={<StudentFrequency />} />
        <Route path="/student/payments" element={<StudentPayments />} />
      </Routes>
    </Router>
  );
}

export default App;
