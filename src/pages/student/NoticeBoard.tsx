import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { studentNavItems } from '../../constants/navigation';

export default function NoticeBoard() {
  return (
    <Layout navItems={studentNavItems}>
      <Header
        title="Mural de Avisos"
        leftAction={<span className="material-symbols-outlined text-[24px] text-primary">arrow_back_ios</span>}
        rightAction={
          <button className="flex items-center justify-center rounded-full size-10 text-primary">
            <span className="material-symbols-outlined text-[24px]">search</span>
          </button>
        }
      />

      <div className="flex gap-3 px-4 py-4 overflow-x-auto hide-scrollbar">
        <div className="flex h-8 shrink-0 items-center justify-center rounded-full bg-primary px-5">
          <p className="text-white text-xs font-bold">Todos</p>
        </div>
        {['Treinos', 'Eventos', 'Urgente'].map(f => (
          <div key={f} className="flex h-8 shrink-0 items-center justify-center rounded-full bg-gray-100 px-5">
            <p className="text-gray-600 text-xs font-medium">{f}</p>
          </div>
        ))}
      </div>

      <main className="flex flex-col gap-4 p-4">
        {/* Notice 1 */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 transition-all active:scale-[0.98]">
          <div className="relative w-full aspect-video bg-slate-200 flex items-center justify-center">
            <span className="material-symbols-outlined text-4xl text-slate-400">image</span>
            <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">Treino</div>
          </div>
          <div className="flex flex-col gap-2 p-4">
            <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span> 24 de Outubro, 2023
            </span>
            <h3 className="text-black text-lg font-bold leading-tight">Novo cronograma de treinos para as finais</h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              O cronograma atualizado para a semana de finais já está disponível. Verifique seus horários e locais atribuídos para as sessões da manhã.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-end">
              <button className="flex items-center gap-1 text-primary font-bold text-sm">
                Ler mais <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notice 2 (Urgent) */}
        <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border-l-4 border-l-primary border-t border-r border-b border-gray-100 transition-all active:scale-[0.98]">
          <div className="flex flex-col gap-2 p-5">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[11px] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">calendar_today</span> 22 de Outubro, 2023
              </span>
              <span className="bg-blue-50 text-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Urgente</span>
            </div>
            <h3 className="text-black text-lg font-bold leading-tight">Transporte para o Torneio Regional</h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
              O ônibus sairá do portão principal pontualmente às 06h00. Por favor, chegue às 05h45 para conferência de equipamentos.
            </p>
            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-end">
              <button className="flex items-center gap-1 text-primary font-bold text-sm">
                Ler mais <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
