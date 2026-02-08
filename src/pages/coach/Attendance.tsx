import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';

export default function Attendance() {
  const navigate = useNavigate();
  const { students, toggleAttendance, markAllPresent } = useAppContext();

  // Filter for specific team if needed, but let's show all for simplicity
  const sub16Students = students.filter(s => s.team.includes('Sub-16'));

  return (
    <Layout navItems={coachNavItems}>
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <Header
          title="Chamada de Presença"
          leftAction={<span onClick={() => navigate(-1)} className="material-symbols-outlined text-2xl cursor-pointer">arrow_back_ios</span>}
          rightAction={
            <button className="flex size-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
            </button>
          }
        />
        <div className="px-4 py-4 bg-primary text-white">
          <h3 className="tracking-tight text-2xl font-bold leading-tight">Hoje, {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</h3>
          <div className="flex items-center gap-2 mt-1 opacity-90">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <p className="text-sm font-medium leading-normal">Treino Elite: 16:00 - 17:30</p>
          </div>
        </div>
        <div className="flex gap-3 p-4 overflow-x-auto hide-scrollbar">
          <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary px-4 shadow-sm cursor-pointer">
            <span className="material-symbols-outlined text-white text-[20px]">sports_soccer</span>
            <p className="text-white text-sm font-semibold leading-normal">Futebol</p>
          </div>
          {['Vôlei', 'Basquete', 'Tênis'].map(sport => (
            <div key={sport} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-slate-100 border border-slate-200 px-4 cursor-pointer hover:bg-slate-200 transition-colors">
              <span className="material-symbols-outlined text-slate-600 text-[20px]">
                {sport === 'Vôlei' ? 'sports_volleyball' : sport === 'Basquete' ? 'sports_basketball' : 'sports_tennis'}
              </span>
              <p className="text-slate-600 text-sm font-medium leading-normal">{sport}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex items-center justify-between mb-4 mt-4">
          <h3 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Alunos ({sub16Students.length})</h3>
          <button className="text-primary text-sm font-bold hover:underline" onClick={markAllPresent}>Marcar todos</button>
        </div>

        <div className="space-y-3">
          {sub16Students.map(student => (
            <div key={student.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {student.img ? (
                    <img alt={student.name} className="size-12 rounded-full object-cover" src={student.img} />
                  ) : (
                    <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-400">person</span>
                    </div>
                  )}
                  {student.present && <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-white"></div>}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-base">{student.name}</p>
                  <p className="text-slate-500 text-xs font-medium">{student.team}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${student.present ? 'text-primary' : 'text-slate-400'}`}>
                  {student.present ? 'Presente' : 'Ausente'}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={student.present}
                    onChange={() => toggleAttendance(student.id)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary transition-colors"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white/95 backdrop-blur-xl border-t border-slate-100 mt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Resumo da Chamada</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-900 font-bold">{sub16Students.filter(s => s.present).length} Presentes</span>
              <span className="text-slate-400">/ {sub16Students.length} Total</span>
            </div>
          </div>
          <div className="flex items-center -space-x-3">
             {sub16Students.filter(s => s.present).slice(0, 2).map(s => (
               <div key={s.id} className="size-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                 {s.img && <img src={s.img} alt={s.name} className="w-full h-full object-cover" />}
               </div>
             ))}
            <div className="size-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-bold text-white">
              +{Math.max(0, sub16Students.filter(s => s.present).length - 2)}
            </div>
          </div>
        </div>
        <button className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95">
          <span className="material-symbols-outlined font-bold">check_circle</span>
          Finalizar Chamada
        </button>
      </div>
    </Layout>
  );
}
