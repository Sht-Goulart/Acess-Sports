import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { studentNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';

export default function NoticeBoard() {
  const navigate = useNavigate();
  const { notices, categories } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState('Todos');

  const filteredNotices = notices.filter(notice => {
    if (selectedFilter === 'Todos') return true;
    return notice.category.includes(selectedFilter) || notice.type === selectedFilter;
  });

  return (
    <Layout navItems={studentNavItems}>
      <Header
        title="Mural de Avisos"
        leftAction={<span onClick={() => navigate(-1)} className="material-symbols-outlined text-[24px] text-primary cursor-pointer">arrow_back_ios</span>}
        rightAction={
          <button className="flex items-center justify-center rounded-full size-10 text-primary">
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
        }
      />

      <div className="flex gap-3 px-4 py-4 overflow-x-auto hide-scrollbar bg-white sticky top-[68px] z-10 border-b border-gray-50">
        <div
          onClick={() => setSelectedFilter('Todos')}
          className={`flex h-8 shrink-0 items-center justify-center rounded-full px-5 cursor-pointer transition-all ${selectedFilter === 'Todos' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          <p className="text-xs font-bold">Todos</p>
        </div>
        {['Urgente', ...categories.map(c => c.name)].map(f => (
          <div
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`flex h-8 shrink-0 items-center justify-center rounded-full px-5 cursor-pointer transition-all border ${selectedFilter === f ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-gray-600 border-transparent'}`}
          >
            <p className="text-xs font-medium">{f}</p>
          </div>
        ))}
      </div>

      <main className="flex flex-col gap-4 p-4 pb-20">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
             <p className="text-gray-400">Nenhum aviso encontrado.</p>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div key={notice.id} className={`flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all active:scale-[0.98] ${notice.urgent ? 'border-l-4 border-l-primary' : ''}`}>
              {!notice.urgent && (
                <div className="relative w-full aspect-video bg-slate-200 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-slate-400">image</span>
                  <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">{notice.type}</div>
                </div>
              )}
              <div className="flex flex-col gap-2 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">calendar_today</span> {notice.date}
                  </span>
                  {notice.urgent && <span className="bg-blue-50 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Urgente</span>}
                </div>
                <h3 className="text-black text-lg font-bold leading-tight">{notice.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {notice.description}
                </p>
                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-end">
                  <button className="flex items-center gap-1 text-primary font-bold text-sm hover:underline">
                    Ler mais <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </main>
    </Layout>
  );
}
