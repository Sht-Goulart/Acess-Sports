import { useNavigate } from 'react-router-dom';
import * as firebaseService from '../firebase/services';

export default function PendingApproval() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebaseService.logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-bg-soft flex items-center justify-center p-6 text-center">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-10 space-y-6">
        <div className="relative inline-block">
          <div className="size-24 bg-warning/10 rounded-full flex items-center justify-center animate-pulse mx-auto">
            <span className="material-symbols-outlined text-5xl text-warning">pending_actions</span>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-800">Cadastro em Análise</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Seu pedido de matrícula foi enviado com sucesso! <br/>
            Aguarde enquanto o professor Lucas Mendes analisa e aprova seu acesso.
          </p>
        </div>
        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full h-12 bg-primary text-white font-bold rounded-xl active:scale-95 transition-all"
          >
            Verificar Status
          </button>
          <button
            onClick={handleLogout}
            className="w-full h-12 bg-gray-100 text-gray-600 font-bold rounded-xl active:scale-95 transition-all"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
