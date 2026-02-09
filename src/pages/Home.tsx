import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const { profile } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      if (profile.role === 'Coach') {
        navigate('/coach/calendar');
      } else if (profile.role === 'Student') {
        navigate('/student/agenda');
      }
    }
  }, [profile, navigate]);

  return (
    <div className="min-h-screen bg-bg-soft flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
