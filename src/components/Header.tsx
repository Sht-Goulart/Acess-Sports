import { useNavigate } from 'react-router-dom';
import * as firebaseService from '../firebase/services';

interface HeaderProps {
  title: string;
  icon?: string;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
  showProfile?: boolean;
  profileImg?: string;
  showHome?: boolean;
}

export default function Header({
  title,
  icon,
  leftAction,
  rightAction,
  showProfile,
  profileImg,
  showHome = true
}: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Deseja sair do aplicativo?")) {
      await firebaseService.logout();
      navigate('/login');
    }
  };

  return (
    <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center px-4 py-3 justify-between">
        <div className="flex items-center gap-2">
          {leftAction ? (
            <div className="flex items-center">{leftAction}</div>
          ) : (
            showHome ? (
              <span onClick={() => navigate('/')} className="material-symbols-outlined text-primary text-3xl font-bold cursor-pointer hover:scale-110 transition-transform">home</span>
            ) : (
              icon && <span className="material-symbols-outlined text-primary text-3xl font-bold">{icon}</span>
            )
          )}
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
        </div>
        <div className="flex items-center gap-1">
          {rightAction}
          {showProfile && (
            <div
              onClick={handleLogout}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary ml-2 cursor-pointer hover:opacity-80 transition-opacity"
              title="Sair"
            >
              <img
                alt="Perfil"
                src={profileImg || "https://lh3.googleusercontent.com/aida-public/AB6AXuBBchmXjoFLeFnXAHoUqISW4Gp3TYSvQ7SVvDnSyrw3Dvuu-Ggt4kSnBrCJurtOgTsMrbMtQEJv9MAV685T84p2r-WJNUPKduSjxGik4uU8-mpuPTjK37bl16RcwaQQCAkNKHMaKlx6yaQeYsfCu-SNPsoZ4tboa-xEVi_wSCIy7g7a7wnzkTnig3V3CveSb0kC5BfLoExP7By9zKVImS0ZJ4QCTWq5awnTZrxoetKHGmThqYENKKHDBNSB0xt2BDHdBRqnunFCRCQI"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
