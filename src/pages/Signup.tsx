import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as firebaseService from '../firebase/services';
import { useAppContext } from '../context/AppContext';

export default function Signup() {
  const { categories } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("As senhas não coincidem");
    if (selectedCats.length === 0) return alert("Selecione pelo menos uma categoria");

    setLoading(true);
    try {
      await firebaseService.registerStudent({
        ...formData,
        categories: selectedCats
      });
      alert("Cadastro realizado! Aguarde a aprovação do professor.");
      navigate('/login');
    } catch (error: any) {
      alert("Erro ao cadastrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-12">
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">Criar Conta</h1>
          <p className="text-gray-500 text-sm">Preencha os dados para se matricular</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Nome Completo</label>
            <input
              required
              className="w-full bg-gray-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Idade</label>
            <input
              type="number"
              required
              className="w-full bg-gray-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary"
              value={formData.age}
              onChange={e => setFormData({...formData, age: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Categorias (Esportes)</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => {
                const isSelected = selectedCats.includes(cat.name);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.name)}
                    className={`px-3 py-2 rounded-full text-xs font-bold transition-all border ${
                      isSelected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
              {categories.length === 0 && <p className="text-gray-400 text-[10px] italic">Nenhuma categoria disponível no momento.</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">E-mail</label>
            <input
              type="email"
              required
              className="w-full bg-gray-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Senha</label>
              <input
                type="password"
                required
                className="w-full bg-gray-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Confirmar</label>
              <input
                type="password"
                required
                className="w-full bg-gray-100 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-primary"
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
          >
            {loading ? "Cadastrando..." : "Solicitar Matrícula"}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary font-bold hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
