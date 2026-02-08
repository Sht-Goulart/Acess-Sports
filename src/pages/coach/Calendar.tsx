import Layout from '../../components/Layout';
import Header from '../../components/Header';
import CalendarWidget from '../../components/CalendarWidget';
import { coachNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';

export default function Calendar() {
  const { events } = useAppContext();

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

      <CalendarWidget />

      <div className="flex gap-3 px-4 py-4 overflow-x-auto hide-scrollbar bg-bg-soft">
        <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-4 shadow-sm text-white cursor-pointer">
          <span className="material-symbols-outlined text-lg">apps</span>
          <p className="text-sm font-semibold">Todos</p>
        </div>
        {[
          { icon: 'sports_soccer', label: 'Futebol', color: 'text-primary' },
          { icon: 'sports_basketball', label: 'Basquete', color: 'text-orange-500' },
          { icon: 'sports_volleyball', label: 'Vôlei', color: 'text-blue-400' }
        ].map(cat => (
          <div key={cat.label} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white px-4 shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors">
            <span className={`material-symbols-outlined text-lg ${cat.color}`}>{cat.icon}</span>
            <p className="text-sm font-medium">{cat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">
        <h3 className="text-lg font-bold flex items-center justify-between">
          Eventos de Hoje
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">{events.length} No total</span>
        </h3>

        {events.map((event) => (
          <div key={event.id} className={`bg-white rounded-2xl p-4 border border-gray-100 shadow-sm relative overflow-hidden ${event.type === 'Competição' ? 'bg-accent text-white' : ''}`}>
            {event.type !== 'Competição' && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>}
            {event.type === 'Competição' && (
              <div className="absolute right-0 top-0 opacity-10">
                <span className="material-symbols-outlined text-8xl -mr-4 -mt-4">emoji_events</span>
              </div>
            )}

            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`${event.type === 'Competição' ? 'bg-primary' : 'bg-primary/10'} p-2 rounded-xl`}>
                  <span className={`material-symbols-outlined ${event.type === 'Competição' ? 'text-white' : 'text-primary'}`}>
                    {event.category === 'Futebol' ? 'sports_soccer' : event.category === 'Basquete' ? 'sports_basketball' : 'emoji_events'}
                  </span>
                </div>
                <div>
                  <h4 className={`font-bold text-base ${event.type === 'Competição' ? 'uppercase tracking-wider italic' : ''}`}>{event.title}</h4>
                  <p className={`text-xs ${event.type === 'Competição' ? 'text-gray-400' : 'text-gray-500 italic'}`}>{event.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${event.type === 'Competição' ? 'text-primary' : ''}`}>{event.time}</p>
                <p className={`text-[10px] ${event.type === 'Competição' ? 'text-gray-400' : 'text-gray-400'}`}>{event.duration}</p>
              </div>
            </div>

            <div className={`flex items-center justify-between pt-3 border-t ${event.type === 'Competição' ? 'border-white/10' : 'border-gray-50'}`}>
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-200"></div>
                <div className="w-7 h-7 rounded-full border-2 border-white bg-gray-300"></div>
                <div className={`w-7 h-7 rounded-full border-2 border-white ${event.type === 'Competição' ? 'bg-gray-800' : 'bg-gray-100'} flex items-center justify-center text-[10px] font-bold text-gray-500`}>+12</div>
              </div>
              <div className="flex items-center gap-3">
                <button className={`${event.type === 'Competição' ? 'bg-primary shadow-lg shadow-primary/40' : 'bg-accent'} text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-transform`}>
                  {event.type === 'Competição' ? 'Ver Detalhes' : 'Chamada'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white active:scale-95 transition-all">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </Layout>
  );
}
