import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { studentNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';

export default function Payments() {
  const navigate = useNavigate();
  const { payments, students } = useAppContext();
  const alex = students.find(s => s.name === 'Alex Johnson') || students[0];
  const alexPayments = payments.filter(p => p.studentId === alex.id);

  const currentPayment = alexPayments.find(p => p.month === 'Outubro 2023') || alexPayments[0];
  const isPaid = currentPayment?.status === 'Pago';

  return (
    <Layout navItems={studentNavItems}>
      <Header
        title="Pagamentos"
        leftAction={<span onClick={() => navigate(-1)} className="material-symbols-outlined text-[22px] text-primary cursor-pointer">arrow_back_ios</span>}
      />

      <main className="flex-1 overflow-y-auto pb-24">
        <div className="p-4">
          <div className="flex flex-col overflow-hidden rounded-2xl shadow-sm bg-white border border-gray-100">
            <div className="p-6 flex flex-col gap-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Mensalidade Atual</p>
                  <h3 className="text-xl font-bold mt-1">{currentPayment?.month || 'Outubro 2023'}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                  {currentPayment?.status || 'Pendente'}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-black">R$ {currentPayment?.amount || 150},00</span>
              </div>

              {!isPaid && (
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-primary text-sm font-medium">
                    O pagamento deve ser feito manualmente com o professor. Assim que efetuado, o status será atualizado aqui.
                  </p>
                </div>
              )}

              <div className="space-y-3 pt-2 border-t border-gray-50">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Data de Vencimento</span>
                  <span className={`font-bold ${isPaid ? 'text-gray-700' : 'text-red-500'}`}>{currentPayment?.dueDate}</span>
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

              <button className="w-full mt-2 bg-slate-100 text-slate-600 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">receipt_long</span>
                Visualizar Boleto / Recibo
              </button>
            </div>
          </div>
        </div>

        <section className="px-4 py-2">
          <h3 className="text-black text-sm font-bold uppercase tracking-wider mb-4 ml-1">Instruções</h3>
          <div className="bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-gray-600 text-sm leading-relaxed">
              Para efetuar o pagamento, procure o professor Ricardo ao final do treino. Aceitamos PIX, Cartão e Dinheiro.
            </p>
          </div>
        </section>

        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-black text-sm font-bold uppercase tracking-wider">Histórico de Faturas</h3>
            <button className="text-primary text-xs font-bold hover:underline">Ver tudo</button>
          </div>
          <div className="space-y-3">
            {alexPayments.filter(p => p.status === 'Pago').map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-black">{payment.month}</p>
                    <p className="text-gray-400 text-[11px]">Pago em {payment.paymentDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">R$ {payment.amount},00</p>
                  <button className="flex items-center gap-1 text-primary text-[10px] font-bold uppercase tracking-wider mt-1 ml-auto hover:underline">
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
