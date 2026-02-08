import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';

export default function Calendar() {
  return (
    <Layout navItems={coachNavItems}>
      <Header
        title="Calendário"
        icon="calendar_month"
        showProfile
        rightAction={
          <button className="p-2 hover:bg-primary/5 rounded-full transition-colors text-accent">
            <span className="material-symbols-outlined">search</span>
          </button>
        }
      />

      <div className="px-4 pb-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold">Outubro 2023</p>
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </div>
          <div className="flex gap-3">
            <button className="p-1 rounded-lg border border-gray-200"><span className="material-symbols-outlined text-base">chevron_left</span></button>
            <button className="p-1 rounded-lg border border-gray-200"><span className="material-symbols-outlined text-base">chevron_right</span></button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
            <span key={day} className="text-[10px] font-bold text-gray-400 uppercase">{day}</span>
          ))}
          <button className="h-12 flex flex-col items-center justify-center rounded-xl text-sm text-gray-300"><span>2</span></button>
          <button className="h-12 flex flex-col items-center justify-center rounded-xl text-sm"><span>3</span></button>
          <button className="h-12 flex flex-col items-center justify-center rounded-xl text-sm"><span>4</span></button>
          <button className="h-12 flex flex-col items-center justify-center rounded-xl text-sm bg-primary text-white font-bold shadow-lg shadow-primary/20">
            <span>5</span>
            <div className="w-1 h-1 bg-white rounded-full mt-1"></div>
          </button>
          <button className="h-12 flex flex-col items-center justify-center rounded-xl text-sm">
            <span>6</span>
            <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
          </button>
          <button className="h-12 flex flex-col items-center justify-center rounded-xl text-sm"><span>7</span></button>
          <button className="h-12 flex flex-col items-center justify-center rounded-xl text-sm"><span>8</span></button>
        </div>
      </div>

      <div className="flex gap-3 px-4 py-4 overflow-x-auto hide-scrollbar bg-bg-soft">
        <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-4 shadow-sm text-white">
          <span className="material-symbols-outlined text-lg">apps</span>
          <p className="text-sm font-semibold">Todos</p>
        </div>
        {[
          { icon: 'sports_soccer', label: 'Futebol', color: 'text-primary' },
          { icon: 'sports_basketball', label: 'Basquete', color: 'text-orange-500' },
          { icon: 'sports_volleyball', label: 'Vôlei', color: 'text-blue-400' }
        ].map(cat => (
          <div key={cat.label} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white px-4 shadow-sm border border-gray-200">
            <span className={`material-symbols-outlined text-lg ${cat.color}`}>{cat.icon}</span>
            <p className="text-sm font-medium">{cat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">
        <h3 className="text-lg font-bold flex items-center justify-between">
          Eventos de Hoje
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">3 No total</span>
        </h3>

        {/* Event 1 */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-xl">
                <span className="material-symbols-outlined text-primary">sports_soccer</span>
              </div>
              <div>
                <h4 className="font-bold text-base">Treino Sub-14 Elite</h4>
                <p className="text-xs text-gray-500 italic">Campo A • Academia Juvenil</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold">09:00</p>
              <p className="text-[10px] text-gray-400">60 min</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <div className="flex -space-x-2">
              <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200"></div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-300"></div>
              <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">+12</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
                <span className="material-symbols-outlined text-sm">groups</span> 14/20
              </div>
              <button className="bg-accent text-white px-4 py-1.5 rounded-lg text-xs font-bold">Chamada</button>
            </div>
          </div>
        </div>

        {/* Event 2 (Featured) */}
        <div className="bg-accent text-white rounded-2xl p-4 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10">
            <span className="material-symbols-outlined text-8xl -mr-4 -mt-4">emoji_events</span>
          </div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl">
                <span className="material-symbols-outlined text-white">emoji_events</span>
              </div>
              <div>
                <h4 className="font-bold text-base text-white uppercase tracking-wider italic">Copa Regional 2023</h4>
                <p className="text-xs text-gray-400">Quartas de Final • Ginásio 2</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-primary">14:30</p>
              <p className="text-[10px] text-gray-400">Jogo Completo</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium">Time Alpha vs Time Bravo</span>
            </div>
            <button className="bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-lg shadow-primary/40">Ver Detalhes</button>
          </div>
        </div>
      </div>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white active:scale-95 transition-all">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </Layout>
  );
}
