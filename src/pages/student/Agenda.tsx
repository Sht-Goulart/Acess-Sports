import { useState } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import CalendarWidget from '../../components/CalendarWidget';
import { studentNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';

export default function Agenda() {
  const { events, categories, profile } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState('Tudo');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filter events by selected category OR type AND selected date
  const filteredEvents = events.filter(event => {
    const eventDate = event.date || new Date().toISOString().split('T')[0];
    const targetDate = selectedDate.toISOString().split('T')[0];
    const dateMatch = eventDate === targetDate;

    const categoryMatch = selectedFilter === 'Tudo' || event.category === selectedFilter || event.type === selectedFilter;
    return dateMatch && categoryMatch;
  });

  return (
    <Layout navItems={studentNavItems}>
      <Header
        title="Agenda"
        showProfile
        profileImg={profile?.role === 'Student' ? '' : undefined} // Mocking profile img logic
      />

      <CalendarWidget selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <div className="flex gap-3 p-4 overflow-x-auto hide-scrollbar bg-white">
        <div
          onClick={() => setSelectedFilter('Tudo')}
          className={`flex h-8 shrink-0 items-center justify-center rounded-full px-5 cursor-pointer transition-all ${selectedFilter === 'Tudo' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          <p className="text-xs font-semibold">Tudo</p>
        </div>
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => setSelectedFilter(cat.name)}
            className={`flex h-8 shrink-0 items-center justify-center rounded-full px-5 cursor-pointer transition-all ${selectedFilter === cat.name ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 border border-gray-200'}`}
          >
            <p className="text-xs font-medium">{cat.name}</p>
          </div>
        ))}
      </div>

      <main className="px-4 space-y-6 pb-10">
        <h3 className="text-secondary text-xl font-bold tracking-tight">Eventos de {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</h3>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">Nenhum evento encontrado.</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div key={event.id} className="relative pl-14">
              <div className="absolute left-0 top-0 h-full flex flex-col items-center">
                <span className="text-xs font-bold text-secondary">{event.time}</span>
                <div className="w-px flex-1 bg-gray-200 my-2"></div>
              </div>
              <div className={`rounded-2xl p-4 flex flex-col gap-3 shadow-sm border ${event.type === 'Competição' ? 'bg-secondary text-white' : 'bg-white border-gray-100'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`inline-block px-2 py-0.5 rounded uppercase tracking-wider mb-1 text-[10px] font-bold ${event.type === 'Competição' ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                      {event.type}
                    </span>
                    <h4 className="font-bold text-base">{event.title}</h4>
                  </div>
                  <span className={`material-symbols-outlined text-xl ${event.type === 'Competição' ? 'text-primary' : 'text-primary'}`}>
                    {event.type === 'Competição' ? 'trophy' : 'sports_soccer'}
                  </span>
                </div>
                <div className={`space-y-1 text-xs font-medium ${event.type === 'Competição' ? 'text-gray-300' : 'text-gray-500'}`}>
                  <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> {event.location}</div>
                  <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">person</span> Prof. Ricardo Silva</div>
                </div>
                {event.type === 'Competição' && (
                  <div className="mt-2 pt-3 border-t border-white/10">
                    <p className="text-[10px] text-primary font-bold uppercase">Apresentação: 13:30</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </Layout>
  );
}
