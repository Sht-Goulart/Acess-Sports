import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';

export default function Payments() {
  const { payments, students, markPaymentAsPaid } = useAppContext();

  const totalReceived = payments.filter(p => p.status === 'Pago').reduce((acc, p) => acc + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'Pendente').reduce((acc, p) => acc + p.amount, 0);

  return (
    <Layout navItems={coachNavItems}>
      <Header
        title="Gestão de Pagamentos"
        leftAction={<span className="material-symbols-outlined text-2xl">account_circle</span>}
        rightAction={<span className="material-symbols-outlined text-2xl">more_vert</span>}
      />

      <main className="p-4 space-y-6">
        <section className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2 rounded-2xl p-5 bg-white shadow-sm border border-black/5">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Recebido</p>
            <div className="flex items-baseline gap-1">
              <p className="text-2xl font-bold leading-tight">R$ {totalReceived}</p>
            </div>
            <div className="w-full h-1.5 bg-primary/10 rounded-full overflow-hidden mt-2">
              <div className="bg-primary h-full w-[75%]"></div>
            </div>
            <p className="text-[10px] text-success font-medium mt-1">+15% este mês</p>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl p-5 bg-white shadow-sm border border-black/5">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Pendente</p>
            <p className="text-2xl font-bold leading-tight text-secondary">R$ {totalPending}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-sm text-warning font-variation-fill-1">info</span>
              <span className="text-[10px] text-gray-500">{payments.filter(p => p.status === 'Pendente').length} mensalidades</span>
            </div>
          </div>
        </section>

        <nav className="flex p-1 bg-gray-200/50 rounded-xl">
          {['Todos', 'Pagos', 'Em aberto'].map((tab, idx) => (
            <label key={tab} className="flex-1">
              <input type="radio" name="status-filter" className="hidden peer" defaultChecked={idx === 0} />
              <span className="flex items-center justify-center h-9 rounded-lg text-sm font-semibold transition-all cursor-pointer peer-checked:bg-white peer-checked:shadow-sm">
                {tab}
              </span>
            </label>
          ))}
        </nav>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold">Status dos Alunos</h3>
            <button className="text-xs font-semibold text-primary">Ver histórico</button>
          </div>

          <div className="space-y-3">
            {payments.filter(p => p.month === 'Outubro 2023').map((payment) => {
              const student = students.find(s => s.id === payment.studentId);
              if (!student) return null;
              const isPaid = payment.status === 'Pago';

              return (
                <div key={payment.id} className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-sm border border-black/5">
                  <div className="relative">
                    <div className="size-12 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                      {student.img ? <img src={student.img} alt={student.name} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined text-slate-400">person</span>}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 size-5 ${isPaid ? 'bg-success' : 'bg-warning'} rounded-full border-2 border-white flex items-center justify-center`}>
                      <span className="material-symbols-outlined text-[10px] text-white font-bold">
                        {isPaid ? 'check' : 'priority_high'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold">{student.name}</h4>
                    <p className="text-[11px] text-gray-500">{student.category} • R$ {payment.amount}</p>
                  </div>
                  <div className="text-right px-2">
                    {isPaid ? (
                      <>
                        <span className="text-[10px] font-bold uppercase text-success">Pago</span>
                        <p className="text-[10px] font-medium text-gray-400">{payment.paymentDate}</p>
                      </>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => markPaymentAsPaid(payment.id)}
                          className="px-3 py-1 bg-success text-white text-[10px] font-bold rounded-lg shadow-sm active:scale-95 transition-all"
                        >
                          Confirmar
                        </button>
                        <button className="px-3 h-7 bg-primary text-white text-[10px] font-bold rounded-lg shadow-sm hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">notifications</span>
                          Cobrar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <section className="mt-8 space-y-4">
          <button className="w-full bg-secondary text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all">
            <span className="material-symbols-outlined">send</span>
            Enviar Todos os Lembretes
          </button>
          <p className="text-center text-[11px] text-gray-500 px-8">
            Os lembretes serão enviados via SMS e notificações push para os responsáveis com pendências.
          </p>
        </section>
      </main>

      <div className="fixed bottom-24 right-6">
        <button className="size-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all">
          <span className="material-symbols-outlined text-3xl font-bold">add</span>
        </button>
      </div>
    </Layout>
  );
}
