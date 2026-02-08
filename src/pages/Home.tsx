import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-soft flex flex-col items-center justify-center p-6 gap-6">
      <div className="text-center">
        <span className="material-symbols-outlined text-primary text-6xl mb-2">sports</span>
        <h1 className="text-3xl font-bold">Portal Esportivo</h1>
        <p className="text-gray-500">Escolha seu perfil para continuar</p>
      </div>

      <div className="grid w-full max-w-sm gap-4">
        <Link
          to="/coach/calendar"
          className="flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-transparent hover:border-primary transition-all shadow-sm group"
        >
          <span className="material-symbols-outlined text-4xl text-primary mb-2 group-hover:scale-110 transition-transform">sports_coach</span>
          <span className="font-bold text-lg">Área do Treinador</span>
        </Link>

        <Link
          to="/student/agenda"
          className="flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-transparent hover:border-primary transition-all shadow-sm group"
        >
          <span className="material-symbols-outlined text-4xl text-primary mb-2 group-hover:scale-110 transition-transform">school</span>
          <span className="font-bold text-lg">Área do Aluno</span>
        </Link>
      </div>
    </div>
  );
}
