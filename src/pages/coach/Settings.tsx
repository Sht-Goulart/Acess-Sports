import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';

export default function Settings() {
  const { settings, updateSettings } = useAppContext();
  const [localSettings, setLocalSettings] = useState({ pixKey: '', whatsappNumber: '' });

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(localSettings);
    alert("Configurações salvas com sucesso!");
  };

  return (
    <Layout navItems={coachNavItems}>
      <Header title="Configurações" icon="settings" showProfile />

      <main className="p-4 space-y-6">
        <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold">Informações de Pagamento</h3>
            <p className="text-xs text-gray-500">Defina os dados que os alunos usarão para pagar.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Chave PIX</label>
              <input
                placeholder="E-mail, CPF ou Chave Aleatória"
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary transition-all"
                value={localSettings.pixKey}
                onChange={e => setLocalSettings({...localSettings, pixKey: e.target.value})}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">WhatsApp para Comprovantes</label>
              <input
                placeholder="Ex: 5511999999999"
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary transition-all"
                value={localSettings.whatsappNumber}
                onChange={e => setLocalSettings({...localSettings, whatsappNumber: e.target.value})}
              />
              <p className="text-[10px] text-gray-400 ml-1 italic">Inclua o código do país e DDD (somente números).</p>
            </div>

            <button
              type="submit"
              className="w-full h-14 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all mt-4"
            >
              Salvar Configurações
            </button>
          </form>
        </section>
      </main>
    </Layout>
  );
}
