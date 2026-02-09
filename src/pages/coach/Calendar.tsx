import { useState } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import CalendarWidget from '../../components/CalendarWidget';
import { coachNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
  const { events, categories, addCategory, removeCategory, addEvent } = useAppContext();
  const navigate = useNavigate();
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // New Event State
  const [newEvent, setNewEvent] = useState({
    title: '',
    location: '',
    time: '',
    date: new Date().toISOString().split('T')[0],
    duration: '',
    type: 'Treino',
    category: ''
  });

  // New Category State
  const [newCatName, setNewCatName] = useState('');

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.category) return alert('Preencha os campos obrigatórios');
    addEvent(newEvent);
    setShowEventModal(false);
    setNewEvent({
      title: '',
      location: '',
      time: '',
      date: new Date().toISOString().split('T')[0],
      duration: '',
      type: 'Treino',
      category: ''
    });
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    addCategory(newCatName, 'sports');
    setNewCatName('');
    setShowCategoryModal(false);
  };

  const filteredEvents = events.filter(e => {
    const eventDate = e.date || new Date().toISOString().split('T')[0];
    const targetDate = selectedDate.toISOString().split('T')[0];
    const dateMatch = eventDate === targetDate;
    const categoryMatch = selectedFilter === 'Todos' || e.category === selectedFilter;
    return dateMatch && categoryMatch;
  });

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

      <CalendarWidget selectedDate={selectedDate} onDateChange={setSelectedDate} />

      <div className="flex gap-3 px-4 py-4 overflow-x-auto hide-scrollbar bg-bg-soft items-center">
        <div
          onClick={() => setSelectedFilter('Todos')}
          className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 shadow-sm cursor-pointer transition-all ${selectedFilter === 'Todos' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
        >
          <span className="material-symbols-outlined text-lg">apps</span>
          <p className="text-sm font-semibold">Todos</p>
        </div>

        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => setSelectedFilter(cat.name)}
            className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-4 shadow-sm border cursor-pointer transition-all hover:bg-gray-50 ${selectedFilter === cat.name ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600'}`}
          >
            <span className="material-symbols-outlined text-lg">{cat.icon}</span>
            <p className="text-sm font-medium">{cat.name}</p>
            <span onClick={(e) => { e.stopPropagation(); removeCategory(cat.id); }} className="material-symbols-outlined text-xs hover:text-red-500 ml-1">close</span>
          </div>
        ))}

        <button
          onClick={() => setShowCategoryModal(true)}
          className="flex h-10 shrink-0 items-center justify-center w-10 rounded-full bg-white border border-dashed border-primary text-primary hover:bg-primary/5 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">
        <h3 className="text-lg font-bold flex items-center justify-between">
          Eventos de {selectedDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
          <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">{filteredEvents.length} No total</span>
        </h3>

        {filteredEvents.length === 0 && (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-sm">Nenhum evento para esta categoria</p>
          </div>
        )}

        {filteredEvents.map((event) => (
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
                    {event.type === 'Competição' ? 'emoji_events' : 'sports'}
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
                <button
                  onClick={() => navigate('/coach/attendance', { state: { category: event.category } })}
                  className={`${event.type === 'Competição' ? 'bg-primary shadow-lg shadow-primary/40' : 'bg-accent'} text-white px-4 py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-transform`}
                >
                  {event.type === 'Competição' ? 'Ver Detalhes' : 'Realizar Chamada'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setShowEventModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white active:scale-95 transition-all z-10"
      >
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-4">Nova Categoria</h3>
            <form onSubmit={handleAddCategory} className="space-y-4">
              <input
                autoFocus
                placeholder="Nome da Categoria (Ex: Futebol)"
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm"
                value={newCatName}
                onChange={e => setNewCatName(e.target.value)}
              />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowCategoryModal(false)} className="flex-1 h-12 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancelar</button>
                <button type="submit" className="flex-1 h-12 bg-primary text-white rounded-xl font-bold active:scale-95 transition-all">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-4">Novo Evento</h3>
            <form onSubmit={handleAddEvent} className="space-y-4">
              <input
                placeholder="Título do Evento"
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm"
                value={newEvent.title}
                onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                required
              />
              <input
                placeholder="Local"
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm"
                value={newEvent.location}
                onChange={e => setNewEvent({...newEvent, location: e.target.value})}
              />
              <input
                type="date"
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm"
                value={newEvent.date}
                onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                required
              />
              <div className="flex gap-2">
                <input
                  placeholder="Horário (Ex: 09:00)"
                  className="w-1/2 bg-gray-100 border-none rounded-xl p-4 text-sm"
                  value={newEvent.time}
                  onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                />
                <input
                  placeholder="Duração (Ex: 60 min)"
                  className="w-1/2 bg-gray-100 border-none rounded-xl p-4 text-sm"
                  value={newEvent.duration}
                  onChange={e => setNewEvent({...newEvent, duration: e.target.value})}
                />
              </div>
              <select
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm"
                value={newEvent.category}
                onChange={e => setNewEvent({...newEvent, category: e.target.value})}
                required
              >
                <option value="">Selecione a Categoria</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <select
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm"
                value={newEvent.type}
                onChange={e => setNewEvent({...newEvent, type: e.target.value})}
              >
                <option value="Treino">Treino</option>
                <option value="Competição">Competição</option>
                <option value="Evento">Evento</option>
              </select>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowEventModal(false)} className="flex-1 h-12 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all">Cancelar</button>
                <button type="submit" className="flex-1 h-12 bg-primary text-white rounded-xl font-bold active:scale-95 transition-all">Criar Evento</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
