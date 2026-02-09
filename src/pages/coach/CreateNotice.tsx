import { useState, useRef } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function CreateNotice() {
  const { addNotice, categories } = useAppContext();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter(c => c !== cat));
    } else {
      setSelectedCategories([...selectedCategories, cat]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handlePublish = () => {
    if (!title || !description) return alert('Por favor, preencha o título e a descrição.');
    if (selectedCategories.length === 0) return alert('Selecione pelo menos uma categoria.');

    addNotice({
      title,
      description,
      category: selectedCategories.join(', '),
      type: 'Comunicado',
      urgent: title.toLowerCase().includes('urgente')
    });

    alert('Aviso publicado com sucesso!' + (selectedFile ? ` (Arquivo ${selectedFile.name} anexado - Simulação)` : ''));
    navigate('/student/notices');
  };

  return (
    <Layout navItems={coachNavItems}>
      <Header
        title="Criar Novo Aviso"
        leftAction={
          <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-black">arrow_back_ios_new</span>
          </button>
        }
      />

      <main className="p-5 space-y-6">
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <div className="size-12 rounded-full overflow-hidden border-2 border-primary">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtbUJlOchbIv1gTFmnjfG6sNiMKnqRljS1mzVk9iRMNhh9Hkr-MCGDI-dBjgLoo2tJj1Opcllhh8OnZJzfXa72Gbry6Lf0DiLOHWOEurZ3iL7NCYXv19RBDOuYI6v0cLzj_fCxYFA340Uwlu7P9vntIjCgegcBC4zEqiiZAdNu4wMQ2kdn8dq0PWkbLw40LvYN11n8KVDErO-eRXvd6VFDXoLea0RhcL7rYmMDvy63FQVDuXR7Bp5BpeKensLyySZQ-AtdT9l1g1Xb" alt="Coach" />
          </div>
          <div>
            <p className="text-sm font-bold text-black">Treinador Alexander</p>
            <p className="text-xs text-gray-500">Treinador Principal • Equipe Elite</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-bold text-black px-1">Título</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border-gray-200 bg-white p-4 text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400"
              placeholder="Ex: Atualização do Treino de Sábado"
              type="text"
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center px-1">
              <span className="text-sm font-bold text-black">Descrição</span>
              <span className="text-[10px] font-medium text-gray-400">{description.length} / 500</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              className="w-full min-h-[160px] rounded-xl border-gray-200 bg-white p-4 text-base focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder:text-gray-400 resize-none"
              placeholder="Escreva os detalhes do aviso aqui..."
            ></textarea>
          </label>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <span className="text-sm font-bold text-black">Categorias de Alunos</span>
            <button className="text-xs font-bold text-primary uppercase tracking-wider" onClick={() => setSelectedCategories(categories.map(c => c.name))}>Selecionar Todas</button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(cat => {
              const isSelected = selectedCategories.includes(cat.name);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggleCategory(cat.name)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                    isSelected ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-black hover:border-primary/50'
                  }`}
                >
                  <span>{cat.name}</span>
                  {isSelected && <span className="material-symbols-outlined text-sm">check_circle</span>}
                </button>
              );
            })}
          </div>
        </div>

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/png, application/pdf"
          onChange={handleFileChange}
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className={`p-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
            selectedFile ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-primary/5'
          }`}
        >
          <span className={`material-symbols-outlined text-3xl ${selectedFile ? 'text-primary' : 'text-gray-400'}`}>
            {selectedFile ? 'task' : 'attach_file'}
          </span>
          <p className={`text-sm font-medium ${selectedFile ? 'text-primary' : 'text-gray-500'}`}>
            {selectedFile ? `Arquivo selecionado: ${selectedFile.name}` : 'Adicionar anexo (PDF, PNG)'}
          </p>
        </div>
      </main>

      <div className="px-6 pb-6 mt-4">
        <button
          onClick={handlePublish}
          className="w-full h-14 bg-primary text-white font-bold text-lg rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] transition-all"
        >
          <span>Publicar Aviso</span>
          <span className="material-symbols-outlined">send</span>
        </button>
      </div>
    </Layout>
  );
}
