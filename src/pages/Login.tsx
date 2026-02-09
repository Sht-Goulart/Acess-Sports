import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as firebaseService from '../firebase/services';

export default function Login() {
  // Credenciais padrão solicitadas pelo usuário
  const [email, setEmail] = useState('assports@gmail.com');
  const [password, setPassword] = useState('Lucas13528');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await firebaseService.login(email, password);
      // Auth change will be handled by AppContext
      navigate('/');
    } catch (error: any) {
      alert("Erro ao fazer login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInitMaster = async () => {
    setLoading(true);
    try {
      const msg = await firebaseService.initializeMasterCoach();
      alert(msg);
    } catch (error: any) {
      alert("Erro ao inicializar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="material-symbols-outlined text-primary text-6xl">sports_coach</span>
          <h1 className="text-3xl font-bold text-gray-800">Bem-vindo</h1>
          <p className="text-gray-500 text-sm">Entre na sua conta para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">E-mail</label>
            <input
              type="email"
              required
              className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary transition-all"
              placeholder="exemplo@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Senha</label>
            <input
              type="password"
              required
              className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Não tem uma conta?{' '}
            <Link to="/signup" className="text-primary font-bold hover:underline">Cadastre-se</Link>
          </p>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
          <button
            type="button"
            onClick={handleInitMaster}
            className="w-full py-3 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-xl uppercase tracking-widest hover:bg-primary/5 hover:text-primary transition-all"
          >
            Configuração Rápida: Inicializar Professor
          </button>
          <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest leading-relaxed">
            Área Restrita - AS Sports
          </p>
        </div>
      </div>
    </div>
  );
}
