import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';

export default function Attendance() {
  const navigate = useNavigate();
  const location = useLocation();
  const { students, toggleAttendance, markAllPresent, categories, saveDailyAttendance } = useAppContext();

  // Get category from navigation state if coming from an event
  const initialFilter = (location.state as any)?.category || 'Todos';
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  const filteredStudents = selectedFilter === 'Todos'
    ? students
    : students.filter(s => {
        if (Array.isArray(s.categories)) return s.categories.includes(selectedFilter);
        if (typeof s.category === 'string') return s.category.includes(selectedFilter);
        return false;
      });

  const handleSave = () => {
    const date = new Date().toISOString().split('T')[0];
    saveDailyAttendance(date);
  };

  return (
    <Layout navItems={coachNavItems}>
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <Header
          title="Chamada de Presença"
          leftAction={<span onClick={() => navigate(-1)} className="material-symbols-outlined text-2xl cursor-pointer">arrow_back_ios</span>}
          rightAction={
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/coach/manage-users')}
                className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined">group_add</span>
              </button>
              <button className="flex size-10 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                <span className="material-symbols-outlined text-primary">calendar_month</span>
              </button>
            </div>
          }
        />
        <div className="px-4 py-4 bg-primary text-white">
          <h3 className="tracking-tight text-2xl font-bold leading-tight">Hoje, {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</h3>
          <div className="flex items-center gap-2 mt-1 opacity-90">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <p className="text-sm font-medium leading-normal">
              {initialFilter !== 'Todos' ? `Treino: ${initialFilter}` : 'Treino Geral'}
            </p>
          </div>
        </div>

        <div className="flex gap-3 p-4 overflow-x-auto hide-scrollbar bg-white items-center">
          <div
            onClick={() => setSelectedFilter('Todos')}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 shadow-sm cursor-pointer transition-all ${selectedFilter === 'Todos' ? 'bg-primary text-white' : 'bg-slate-100 border border-slate-200 text-slate-600'}`}
          >
            <span className="material-symbols-outlined text-[20px]">group</span>
            <p className="text-sm font-semibold leading-normal">Todos</p>
          </div>

          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => setSelectedFilter(cat.name)}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4 border shadow-sm cursor-pointer transition-all hover:bg-slate-50 ${selectedFilter === cat.name ? 'bg-primary text-white border-primary' : 'bg-slate-100 border border-slate-200 text-slate-600'}`}
            >
              <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
              <p className="text-sm font-medium leading-normal">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-40">
        <div className="flex items-center justify-between mb-4 mt-4">
          <h3 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Alunos ({filteredStudents.length})</h3>
          <button className="text-primary text-sm font-bold hover:underline" onClick={markAllPresent}>Marcar todos</button>
        </div>

        <div className="space-y-3">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
               <p className="text-gray-400 text-sm">Nenhum aluno nesta categoria</p>
            </div>
          ) : (
            filteredStudents.map(student => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {student.img ? (
                      <img alt={student.name} className="size-12 rounded-full object-cover" src={student.img} />
                    ) : (
                      <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400 text-2xl">person</span>
                      </div>
                    )}
                    {student.present && <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-white"></div>}
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-base">{student.name}</p>
                    <p className="text-slate-500 text-xs font-medium">
                      {Array.isArray(student.categories) ? student.categories.join(', ') : student.category}
                    </p>
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
            ))
          )}
        </div>
      </div>

      {/* Summary Floating Bar */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-lg bg-white rounded-3xl shadow-2xl p-4 border border-gray-100 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Resumo da Chamada</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-900 font-bold">{filteredStudents.filter(s => s.present).length} Presentes</span>
              <span className="text-slate-400">/ {filteredStudents.length} Total</span>
            </div>
          </div>
          <div className="flex items-center -space-x-3">
             {filteredStudents.filter(s => s.present).slice(0, 3).map(s => (
               <div key={s.id} className="size-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden flex items-center justify-center">
                 {s.img ? <img src={s.img} alt={s.name} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-xs">person</span>}
               </div>
             ))}
            {filteredStudents.filter(s => s.present).length > 3 && (
              <div className="size-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                +{filteredStudents.filter(s => s.present).length - 3}
              </div>
            )}
          </div>
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <span className="material-symbols-outlined font-bold">save</span>
          Salvar Chamada do Dia
        </button>
      </div>
    </Layout>
  );
}
