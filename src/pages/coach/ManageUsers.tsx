import { useState } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';
import { useAppContext } from '../../context/AppContext';
import * as firebaseService from '../../firebase/services';

export default function ManageUsers() {
  const { pendingStudents, approveStudent } = useAppContext();
  const [showCoachModal, setShowCoachModal] = useState(false);
  const [newCoach, setNewCoach] = useState({ name: '', email: '', password: '' });

  const handleApprove = (uid: string) => {
    const val = prompt("Defina o valor da mensalidade para este aluno:", "150");
    if (val) {
      approveStudent(uid, Number(val));
      alert("Aluno aprovado e mensalidade gerada!");
    }
  };

  const handleAddCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await firebaseService.registerCoach(newCoach);
      alert("Professor cadastrado com sucesso!");
      setShowCoachModal(false);
      setNewCoach({ name: '', email: '', password: '' });
    } catch (error: any) {
      alert("Erro ao cadastrar professor: " + error.message);
    }
  };

  return (
    <Layout navItems={coachNavItems}>
      <Header title="Gestão de Acessos" icon="manage_accounts" showProfile />

      <main className="p-4 space-y-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold">Solicitações Pendentes</h3>
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">
              {pendingStudents.length} Novos
            </span>
          </div>

          {pendingStudents.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-400 text-sm">Nenhuma solicitação no momento.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingStudents.map(student => (
                <div key={student.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-400">person</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{student.name}</h4>
                      <p className="text-[11px] text-gray-500">Idade: {student.age} • Categorias: {student.categories?.join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(student.id)}
                      className="flex-1 h-10 bg-primary text-white text-xs font-bold rounded-xl active:scale-95 transition-all"
                    >
                      Aprovar Aluno
                    </button>
                    <button className="flex-1 h-10 bg-gray-100 text-gray-500 text-xs font-bold rounded-xl active:scale-95 transition-all">
                      Recusar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="pt-4 border-t border-gray-100">
          <button
            onClick={() => setShowCoachModal(true)}
            className="w-full h-14 bg-accent text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined">person_add</span>
            Cadastrar Novo Professor
          </button>
        </section>
      </main>

      {showCoachModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 space-y-4">
            <h3 className="text-xl font-bold">Novo Professor</h3>
            <form onSubmit={handleAddCoach} className="space-y-4">
              <input
                placeholder="Nome do Professor"
                required
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm"
                value={newCoach.name}
                onChange={e => setNewCoach({...newCoach, name: e.target.value})}
              />
              <input
                type="email"
                placeholder="E-mail"
                required
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm"
                value={newCoach.email}
                onChange={e => setNewCoach({...newCoach, email: e.target.value})}
              />
              <input
                type="password"
                placeholder="Senha"
                required
                className="w-full bg-gray-100 border-none rounded-xl p-4 text-sm"
                value={newCoach.password}
                onChange={e => setNewCoach({...newCoach, password: e.target.value})}
              />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowCoachModal(false)} className="flex-1 h-12 text-gray-500 font-bold">Cancelar</button>
                <button type="submit" className="flex-1 h-12 bg-primary text-white rounded-xl font-bold">Cadastrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
