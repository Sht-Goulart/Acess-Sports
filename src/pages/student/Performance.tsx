import Layout from '../../components/Layout';
import Header from '../../components/Header';
import StatCard from '../../components/StatCard';
import { studentNavItems } from '../../constants/navigation';

export default function Performance() {
  return (
    <Layout navItems={studentNavItems}>
      <Header
        title="Meu Desempenho"
        showProfile
        profileImg="https://lh3.googleusercontent.com/aida-public/AB6AXuCVvQQ_rUF9eBQ1bR6r_fnbzaABz2Gkl6-IyiFvYgf4rwSpanTC9M31ZMGyCMXphu7R2p4CaKPTXW77m9rDikMK7OcvUkG_d_I-lbGJtmdPjOmr7ouFwb_70Ggu2AvZFTdj0uJfPd9960lcjrda0CIoJ5bRxXuzfL6M0yvYLQkaXVkfP_A7moj7Pxt4UVg2rItfg6GxnROx_-bDvTc8J8E7YoSqsOgPgVoLMRt6rwRTl1Aj5OrPbn2gGqdDUGXxlMN8Tu3UEbR2_SdT"
        rightAction={
          <button className="flex items-center justify-center rounded-full h-10 w-10 bg-slate-100 text-slate-700">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        }
      />

      <div className="flex p-6">
        <div className="flex w-full flex-col gap-2 items-center">
          <p className="text-slate-900 text-3xl font-extrabold leading-tight text-center">Olá, Alex!</p>
          <p className="text-slate-500 text-base font-normal text-center">Futebol Masculino • Categoria Sub-15</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full shadow-md">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <p className="text-sm font-bold uppercase tracking-wide">Nível Intermediário</p>
          </div>
          <div className="mt-4 px-4 py-3 bg-blue-50 rounded-xl border-l-4 border-primary text-center">
            <p className="text-primary text-sm font-medium italic">"O sucesso é a soma de pequenos esforços repetidos dia após dia. Continue focado!"</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 px-4">
        <StatCard label="Técnica" value="8.5" subValue="/10" trend="+0.2" trendIcon="trending_up" />
        <StatCard label="Tática" value="7.8" subValue="/10" trend="+0.5" trendIcon="trending_up" />
        <StatCard label="Físico" value="9.2" subValue="/10" trend="0.0" trendIcon="remove" trendColor="text-slate-400" />
      </div>

      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-slate-900 text-lg font-bold">Evolução Geral</h3>
              <p className="text-slate-500 text-xs font-medium">Últimos 6 meses</p>
            </div>
            <div className="bg-slate-100 px-3 py-1 rounded-lg">
              <span className="text-xs font-bold text-slate-700">Mensal</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-primary tracking-tight text-[36px] font-black leading-tight">82%</p>
            <div className="flex gap-1 items-center mb-4">
              <p className="text-slate-500 text-sm font-normal">Melhora desde Janeiro</p>
              <p className="text-emerald-500 text-sm font-bold">+15.2%</p>
            </div>
            <div className="h-32 w-full bg-slate-50 rounded-lg flex items-end justify-between px-4 pb-2">
              {/* Mock chart bars */}
              {[40, 60, 45, 70, 82, 75].map((h, i) => (
                <div key={i} className="w-6 bg-primary/20 rounded-t-sm relative" style={{ height: `${h}%` }}>
                  <div className="absolute bottom-0 w-full bg-primary rounded-t-sm" style={{ height: '40%' }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between px-2 mt-2">
              {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'].map(m => (
                <p key={m} className="text-slate-400 text-[10px] font-bold uppercase">{m}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2">
        <h2 className="text-slate-900 text-xl font-bold mb-3">Feedback do Professor</h2>
        <div className="bg-slate-900 rounded-2xl p-5 shadow-lg relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">format_quote</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-700 rounded-full size-12 border-2 border-primary"></div>
            <div>
              <p className="font-bold text-base">Prof. Marcus</p>
              <p className="text-slate-400 text-xs">Atualizado há 2 horas</p>
            </div>
          </div>
          <p className="text-white/90 text-sm italic leading-relaxed mb-4 relative z-10">
            "Alex, seu desempenho nos treinos de finalização melhorou muito. Vamos focar mais na recomposição defensiva nesta semana. Mantenha essa intensidade!"
          </p>
          <div className="flex gap-2">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Finalização</span>
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Defesa</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
