import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';

export default function CreateNotice() {
  return (
    <Layout navItems={coachNavItems}>
      <Header
        title="Criar Novo Aviso"
        leftAction={
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-brand-black">arrow_back_ios_new</span>
          </button>
        }
      />

      <main className="p-5 space-y-6">
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <div className="size-12 rounded-full overflow-hidden border-2 border-primary">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtbUJlOchbIv1gTFmnjfG6sNiMKnqRljS1mzVk9iRMNhh9Hkr-MCGDI-dBjgLoo2tJj1Opcllhh8OnZJzfXa72Gbry6Lf0DiLOHWOEurZ3iL7NCYXv19RBDOuYI6v0cLzj_fCxYFA340Uwlu7P9vntIjCgegcBC4zEqiiZAdNu4wMQ2kdn8dq0PWkbLw40LvYN11n8KVDErO-eRXvd6VFDXoLea0RhcL7rYmMDvy63FQVDuXR7Bp5BpeKensLyySZQ-AtdT9l1g1Xb" alt="Coach" />
          </div>
          <div>
            <p className="text-sm font-bold text-brand-black">Treinador Alexander</p>
            <p className="text-xs text-gray-500">Treinador Principal • Equipe Elite</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-brand-black px-1">Título</span>
            <input
              className="w-full rounded-xl border-gray-200 bg-white p-4 text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
              placeholder="Ex: Atualização do Treino de Sábado"
              type="text"
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-bold text-brand-black">Descrição</span>
              <span className="text-[10px] font-medium text-gray-400">0 / 500</span>
            </div>
            <textarea
              className="w-full min-h-[160px] rounded-xl border-gray-200 bg-white p-4 text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400 resize-none"
              placeholder="Escreva os detalhes do aviso aqui..."
            ></textarea>
          </label>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-sm font-bold text-brand-black">Categorias de Alunos</span>
            <button className="text-xs font-bold text-primary uppercase tracking-wider">Selecionar Todas</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Sub-12', 'Adulto'].map(cat => (
              <button key={cat} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold transition-all">
                <span>{cat}</span>
                <span className="material-symbols-outlined text-sm">check_circle</span>
              </button>
            ))}
            {['Sub-15', 'Iniciantes', 'Competição'].map(cat => (
              <button key={cat} className="px-4 py-2 bg-white border border-gray-200 text-brand-black rounded-full text-sm font-medium hover:border-primary/50 transition-all">
                {cat}
              </button>
            ))}
            <button className="flex items-center justify-center size-9 bg-gray-100 rounded-full text-brand-black">
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-primary/5 transition-all">
          <span className="material-symbols-outlined text-3xl text-gray-400">attach_file</span>
          <p className="text-sm font-medium text-gray-500">Adicionar anexo (PDF, Imagem)</p>
        </div>
      </main>

      <div className="px-6 pb-6 mt-4">
        <button className="w-full h-14 bg-primary text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all">
          <span>Publicar Aviso</span>
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </Layout>
  );
}
