import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { studentNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';

export default function Payments() {
  const navigate = useNavigate();
  const { payments, currentUser, settings } = useAppContext();

  const myPayments = payments.filter(p => p.studentId === currentUser?.uid);

  const currentPayment = myPayments.find(p => p.status === 'Pendente') || myPayments[0];
  const isPaid = currentPayment?.status === 'Pago';

  return (
    <Layout navItems={studentNavItems}>
      <Header
        title="Pagamentos"
        leftAction={<span onClick={() => navigate(-1)} className="material-symbols-outlined text-[22px] text-primary cursor-pointer">arrow_back_ios</span>}
      />

      <main className="flex-1 overflow-y-auto pb-24">
        {currentPayment ? (
          <div className="p-4">
            <div className="flex flex-col overflow-hidden rounded-2xl shadow-sm bg-white border border-gray-100">
              <div className="p-6 flex flex-col gap-5">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">Mensalidade Atual</p>
                    <h3 className="text-xl font-bold mt-1">{currentPayment.month}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isPaid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {currentPayment.status}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-black">R$ {currentPayment.amount},00</span>
                </div>

                {!isPaid && (
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                    <p className="text-primary text-sm font-medium">
                      O pagamento deve ser feito via PIX diretamente ao professor.
                    </p>
                  </div>
                )}

                <div className="space-y-3 pt-2 border-t border-gray-50">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Data de Vencimento</span>
                    <span className={`font-bold ${isPaid ? 'text-gray-700' : 'text-red-500'}`}>{currentPayment.dueDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 italic">Total do Mês</span>
                    <span className="font-medium text-gray-700">R$ {currentPayment.amount},00</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-2">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(settings.pixKey);
                      alert("Chave PIX copiada!");
                    }}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-primary/20"
                  >
                    <span className="material-symbols-outlined">content_copy</span>
                    Copiar Chave PIX
                  </button>
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`Olá, estou enviando o comprovante de pagamento da mensalidade de ${currentPayment.month}.`);
                      window.open(`https://wa.me/${settings.whatsappNumber}?text=${msg}`, '_blank');
                    }}
                    className="w-full bg-success text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-success/20"
                  >
                    <span className="material-symbols-outlined">send</span>
                    Enviar Comprovante (WhatsApp)
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center text-gray-400">
            Nenhuma mensalidade registrada.
          </div>
        )}

        <section className="px-4 py-2">
          <h3 className="text-black text-sm font-bold uppercase tracking-wider mb-4 ml-1">Forma de Pagamento Aceita</h3>
          <div className="flex flex-col gap-3">
            <div className="relative flex items-center justify-between rounded-xl border-2 border-primary bg-blue-50/50 p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary text-white">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <div>
                  <p className="text-black font-bold">PIX</p>
                  <p className="text-gray-500 text-xs leading-tight">Aprovação manual pelo professor</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary">check_circle</span>
            </div>
          </div>
        </section>

        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-black text-sm font-bold uppercase tracking-wider">Histórico de Faturas</h3>
            <button className="text-primary text-xs font-bold hover:underline">Ver tudo</button>
          </div>
          <div className="space-y-3">
            {myPayments.filter(p => p.status === 'Pago').map((payment) => (
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
