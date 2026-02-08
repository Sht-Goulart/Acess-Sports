import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';
import { useNavigate } from 'react-router-dom';

export default function Performance() {
  const navigate = useNavigate();

  return (
    <Layout navItems={coachNavItems}>
      <Header
        title="Desempenho"
        leftAction={
          <div onClick={() => navigate(-1)} className="flex items-center text-accent-blue cursor-pointer">
            <span className="material-symbols-outlined !text-[24px]">chevron_left</span>
            <span className="text-[17px]">Voltar</span>
          </div>
        }
      />

      <div className="px-4 py-2 bg-white/80 backdrop-blur-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            className="w-full h-10 bg-gray-100 border-none rounded-xl pl-10 pr-4 text-[17px] placeholder-gray-500 focus:ring-2 focus:ring-accent-blue transition-all"
            placeholder="Buscar aluno..."
            type="text"
          />
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl p-5 ios-shadow border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-16 w-16 ring-2 ring-gray-100"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLiUAZmBg3_XVrKtYcbs1bkr1-gViVZHcG_kC5BxFnGfbEOz0T608ehPIfA-uaiGMOPAG__bJJTsJ42taIjR3KjEKWoit4GiKp-B51GFAQxXtA89oBr-nIGLNF8lFJNDMNGr2yzZY8b_ADWnVm_jMtj91C4UQUs0YUIvWfB9E8W7_eRvi_1SE3HnSlIAJGKmulxv9psrK075zw1c6_RjHmTD_4YYsrgAeJ6T9BPGJI-KT_io4CqDjiETJh_h282w8fWcjQTckPM9bA")' }}
              ></div>
            </div>
            <div>
              <h2 className="text-xl font-bold">Maya Rodriguez</h2>
              <p className="text-gray-500 text-sm">Categoria Sub-17 • Basquete</p>
            </div>
          </div>

          <div className="flex justify-center my-4">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full transform -rotate-18" viewBox="0 0 100 100">
                <polygon className="radar-grid" points="50,10 88,38 73,82 27,82 12,38"></polygon>
                <polygon className="radar-grid" points="50,25 74,43 64,71 36,71 26,43"></polygon>
                <polygon className="radar-grid" points="50,40 60,48 56,59 44,59 40,48"></polygon>
                <polygon className="radar-area" points="50,15 84,40 68,76 35,76 22,40"></polygon>
              </svg>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[10px] font-bold text-gray-400 uppercase">Velocidade</div>
              <div className="absolute top-1/4 -right-4 text-[10px] font-bold text-gray-400 uppercase">Técnica</div>
              <div className="absolute bottom-4 -right-2 text-[10px] font-bold text-gray-400 uppercase">Físico</div>
              <div className="absolute bottom-4 -left-2 text-[10px] font-bold text-gray-400 uppercase">Tática</div>
              <div className="absolute top-1/4 -left-8 text-[10px] font-bold text-gray-400 uppercase">Trabalho Equipe</div>
            </div>
          </div>

          <div className="space-y-5 mt-8">
            {[
              { label: 'Velocidade', value: 92 },
              { label: 'Técnica', value: 84 },
              { label: 'Trabalho em Equipe', value: 88 }
            ].map(attr => (
              <div key={attr.label} className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-[15px] font-semibold">{attr.label}</span>
                  <span className="text-[15px] font-bold text-accent-blue">{attr.value}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${attr.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-8 bg-black text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[20px]">edit</span>
            Editar Desempenho
          </button>
        </div>
      </div>

      <div className="px-4 pb-24">
        <h3 className="text-xl font-bold mb-4">Notas do Treinador</h3>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-bold text-accent-blue">Última Atualização</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Hoje</span>
            </div>
            <p className="text-[14px] leading-relaxed text-gray-600">
              Demonstrou grande evolução no controle de bola sob pressão. Focar em passes de longa distância na próxima semana.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
