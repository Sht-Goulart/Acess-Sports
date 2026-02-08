import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { studentNavItems } from '../../constants/navigation';

export default function Payments() {
  return (
    <Layout navItems={studentNavItems}>
      <Header
        title="Pagamentos"
        leftAction={<span className="material-symbols-outlined text-[22px] text-primary">arrow_back_ios</span>}
      />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="p-4">
          <div className="flex flex-col overflow-hidden rounded-2xl shadow-sm bg-white border border-gray-100">
            <div className="p-6 flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Mensalidade Atual</p>
                  <h3 className="text-xl font-bold mt-1">Outubro 2023</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700">
                  Pendente
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-black">R$ 150,00</span>
              </div>
              <div className="space-y-3 pt-2 border-t border-gray-50">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Data de Vencimento</span>
                  <span className="font-bold text-red-500">10 Out, 2023</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 italic">Treinamentos</span>
                  <span className="font-medium text-gray-700">R$ 120,00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 italic">Taxa de Competição</span>
                  <span className="font-medium text-gray-700">R$ 30,00</span>
                </div>
              </div>
              <button className="w-full mt-2 bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">payments</span>
                Pagar Agora
              </button>
            </div>
          </div>
        </div>

        <section className="px-4 py-2">
          <h3 className="text-black text-sm font-bold uppercase tracking-wider mb-4 ml-1">Formas de Pagamento</h3>
          <div className="flex flex-col gap-3">
            {[
              { id: 'pix', label: 'PIX', desc: 'Aprovação instantânea 24/7', icon: 'bolt', checked: true },
              { id: 'card', label: 'Cartão de Crédito', desc: 'Até 12x no cartão', icon: 'credit_card' },
              { id: 'boleto', label: 'Boleto Bancário', desc: 'Compensação em até 2 dias úteis', icon: 'receipt_long' }
            ].map(method => (
              <label key={method.id} className={`relative flex items-center justify-between rounded-xl border-2 ${method.checked ? 'border-primary bg-blue-50/50' : 'border-gray-200 bg-white'} p-4 cursor-pointer transition-all`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${method.checked ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                    <span className="material-symbols-outlined">{method.icon}</span>
                  </div>
                  <div>
                    <p className="text-black font-bold">{method.label}</p>
                    <p className="text-gray-500 text-xs leading-tight">{method.desc}</p>
                  </div>
                </div>
                <input type="radio" name="payment_method" className="w-5 h-5 text-primary border-gray-300 focus:ring-primary" defaultChecked={method.checked} />
              </label>
            ))}
          </div>
        </section>

        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-black text-sm font-bold uppercase tracking-wider">Histórico de Faturas</h3>
            <button className="text-primary text-xs font-bold hover:underline">Ver tudo</button>
          </div>
          <div className="space-y-3">
            {['Setembro 2023', 'Agosto 2023', 'Julho 2023'].map((month, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-black">{month}</p>
                    <p className="text-gray-400 text-[11px]">Pago em 0{8-idx}/0{9-idx}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">R$ {idx === 1 ? '185,00' : '150,00'}</p>
                  <button className="flex items-center gap-1 text-primary text-[10px] font-bold uppercase tracking-wider mt-1 ml-auto">
                    <span className="material-symbols-outlined text-sm">download</span> Recibo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
