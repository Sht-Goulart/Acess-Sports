import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { studentNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Frequency() {
  const { students } = useAppContext();
  const navigate = useNavigate();
  const alex = students.find(s => s.name === 'Alex Johnson') || students[0];

  const history = alex.attendanceHistory || [];
  const presences = history.filter(h => h.present).length;
  const total = history.length > 0 ? history.length : 20;
  const absences = history.filter(h => !h.present).length;
  const percentage = Math.round((presences / total) * 100) || 85;

  return (
    <Layout navItems={studentNavItems}>
      <Header
        title="Minha Frequência"
        leftAction={<span onClick={() => navigate(-1)} className="material-symbols-outlined text-slate-900 cursor-pointer">arrow_back_ios_new</span>}
        showProfile
      />

      <main className="flex-1 overflow-y-auto">
        <section className="p-4">
          <div className="bg-black rounded-3xl p-6 text-white ios-shadow relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Outubro 2023</p>
                <h2 className="text-5xl font-bold mt-1">{percentage}<span className="text-primary text-2xl">%</span></h2>
                <p className="text-xs text-slate-300 mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary text-sm font-bold">trending_up</span>
                  +5% em relação ao mês anterior
                </p>
              </div>
              <div className="w-24 h-24 relative flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle className="text-slate-800" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeWidth="8"></circle>
                  <circle className="text-primary" cx="48" cy="48" fill="transparent" r="42" stroke="currentColor" strokeDasharray="263.8" strokeDashoffset={263.8 - (263.8 * percentage / 100)} strokeLinecap="round" strokeWidth="8"></circle>
                </svg>
                <span className="absolute text-xs font-bold">{presences}/{total}</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-800">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Aulas</p>
                <p className="text-xl font-bold">{total}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold text-blue-400">Presenças</p>
                <p className="text-xl font-bold text-blue-400">{presences}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold text-red-500">Faltas</p>
                <p className="text-xl font-bold text-red-500">{absences}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-2">
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <button className="material-symbols-outlined text-slate-900">chevron_left</button>
              <h3 className="font-bold text-slate-900">Outubro 2023</h3>
              <button className="material-symbols-outlined text-slate-900">chevron_right</button>
            </div>
            <div className="grid grid-cols-7 text-center mb-2 text-[10px] font-bold text-slate-400 uppercase">
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-y-2">
              <div className="h-10"></div><div className="h-10"></div><div className="h-10"></div><div className="h-10"></div><div className="h-10"></div><div className="h-10"></div>
              <button className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-slate-400">1</button>
              <button className={`h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-bold ${alex.present ? 'bg-primary text-white' : 'bg-red-500 text-white'}`}>2</button>
              {[3, 4, 6, 9, 10, 12, 13].map(n => (
                <button key={n} className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium bg-blue-100 text-primary">{n}</button>
              ))}
              {[5, 11].map(n => (
                <button key={n} className="h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium bg-red-100 text-red-600">{n}</button>
              ))}
            </div>
            <div className="mt-6 flex gap-4 text-[10px] font-bold text-slate-500 justify-center">
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary"></span> PRESENÇA</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> FALTA</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300"></span> SEM AULA</div>
            </div>
          </div>
        </section>

        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Histórico Recente</h3>
            <button className="text-xs font-bold text-primary">Ver Tudo</button>
          </div>
          <div className="space-y-3">
            {history.map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 ios-shadow transition-all">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">sports_soccer</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm">Treino de Futebol</h4>
                  <p className="text-xs text-slate-500">{item.date}</p>
                </div>
                <div className={`px-3 py-1 rounded-full ${item.present ? 'bg-blue-100 text-primary' : 'bg-red-50 text-red-600'} border border-gray-100`}>
                  <span className={`text-[10px] font-bold`}>{item.present ? 'PRESENTE' : 'FALTA'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <div className="relative -top-16 flex justify-center z-50">
        <button className="w-14 h-14 bg-black rounded-full ios-shadow flex items-center justify-center text-white border-4 border-white active:scale-95 transition-transform">
          <span className="material-symbols-outlined scale-125">qr_code_scanner</span>
        </button>
      </div>
    </Layout>
  );
}
