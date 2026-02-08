import Layout from '../../components/Layout';

import { studentNavItems } from '../../constants/navigation';

export default function Agenda() {
  return (
    <Layout navItems={studentNavItems}>
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md px-4 pt-6 pb-2 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex size-10 shrink-0 items-center overflow-hidden rounded-full border-2 border-primary">
            <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTIbFWSSAEfCi3d9pKdvU7aWTyx3B-jjI5B-qw5lvNfEhbdy1o1bxy_ri7uM1ocNud8mUcKMQg4RZUroZ1p1xim6LaxleQRBNBX2F8hNCaUms-bFRiLtaVIvhHqtxlpZBpGRzJWtUtlKrQzTspyKjYKBQIa8kvIhKmR-dhM31_Wgojh5xtall99kD_SBEvZvE1NspVEGUMdJJ_vYdkNj3PC3qDPYigfRI6NynLS_w5MJrcC_tGN2RRtKFt-sQxLHL0pxtF6BZE_FBl" alt="Profile" />
          </div>
          <h2 className="text-secondary text-lg font-bold leading-tight flex-1 text-center">Agenda do Aluno</h2>
          <div className="flex w-10 items-center justify-end">
            <button className="text-secondary"><span className="material-symbols-outlined">tune</span></button>
          </div>
        </div>
        <div className="flex gap-2 py-4 overflow-x-auto hide-scrollbar">
          {['SEG 23', 'TER 24', 'QUA 25', 'QUI 26', 'SEX 27', 'SÁB 28', 'DOM 29'].map((day, idx) => (
            <div key={day} className={`flex flex-col items-center min-w-[50px] py-2 px-1 rounded-xl ${idx === 1 ? 'bg-primary shadow-lg shadow-primary/20' : ''}`}>
              <span className={`text-[10px] font-bold ${idx === 1 ? 'text-white' : 'text-gray-400'}`}>{day.split(' ')[0]}</span>
              <span className={`text-base font-bold ${idx === 1 ? 'text-white' : ''}`}>{day.split(' ')[1]}</span>
            </div>
          ))}
        </div>
      </header>

      <div className="flex gap-3 p-4 overflow-x-auto hide-scrollbar bg-white">
        <div className="flex h-8 shrink-0 items-center justify-center rounded-full bg-primary px-5">
          <p className="text-white text-xs font-semibold">Tudo</p>
        </div>
        {['Treinos', 'Jogos'].map(f => (
          <div key={f} className="flex h-8 shrink-0 items-center justify-center rounded-full bg-gray-100 border border-gray-200 px-5">
            <p className="text-secondary text-xs font-medium">{f}</p>
          </div>
        ))}
      </div>

      <main className="px-4 space-y-6">
        <h3 className="text-secondary text-xl font-bold tracking-tight">Próximos Treinos</h3>

        <div className="relative pl-14">
          <div className="absolute left-0 top-0 h-full flex flex-col items-center">
            <span className="text-xs font-bold text-secondary">08:00</span>
            <div className="w-px flex-1 bg-gray-200 my-2"></div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col gap-3 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase tracking-wider mb-1">Treino Coletivo</span>
                <h4 className="text-secondary font-bold text-base">Fundamentos e Tática</h4>
              </div>
              <span className="material-symbols-outlined text-primary text-xl">sports_soccer</span>
            </div>
            <div className="space-y-1 text-gray-500 text-xs font-medium">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">location_on</span> Quadra 02 • Sede Principal</div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">person</span> Prof. Ricardo Silva</div>
            </div>
          </div>
        </div>

        <div className="relative pl-14">
          <div className="absolute left-0 top-0 h-full flex flex-col items-center">
            <span className="text-xs font-bold text-secondary">14:30</span>
            <div className="w-px flex-1 bg-gray-200 my-2"></div>
          </div>
          <div className="bg-secondary rounded-2xl p-4 flex flex-col gap-3 shadow-lg text-white">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded uppercase tracking-wider mb-1">Amistoso</span>
                <h4 className="font-bold text-base">vs. Academia Real</h4>
              </div>
              <span className="material-symbols-outlined text-primary text-xl">trophy</span>
            </div>
            <div className="space-y-1 text-gray-300 text-xs font-medium">
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">stadium</span> Arena Central (Casa)</div>
              <div className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">group</span> Categoria Sub-15</div>
            </div>
            <div className="mt-2 pt-3 border-t border-white/10">
              <p className="text-[10px] text-primary font-bold uppercase">Apresentação: 13:30</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
