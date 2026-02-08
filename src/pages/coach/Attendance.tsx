import { useState } from 'react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import { coachNavItems } from '../../constants/navigation';

export default function Attendance() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Marcus Johnson', team: 'Equipe Elite Sub-16', present: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWbyHm3y7Q0iXBqIE6swI1CGODbSP0GMPOxqH30QCKHgwNyEio0KFQKXg6W6VscDPTiBppJWDTOePf0r_PFT45W-QqbrpOVjm_hE8joBuWJj0t5BmkPyyZrHFgZH5wdfqUW5AfXfmvLKWdOd_3_PiDLmO0-pJmR8czhv_cs56DrInZHiTbSeTlednDSnAJGvjP0U3fp24t66oKpxL8FCmxdaHWuDqacGkRbICwI8v9C7SnGUiM2pp4rEaQGKHhSGa6rD6n9BLLgGNQ' },
    { id: 2, name: 'Sarah Williams', team: 'Equipe Elite Sub-16', present: false, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTfv33Q03M5b7ySIbf1Yqv9T9iTrIKRQGRv4d6KYaZcv-CT_DtVcHm-NZiAGt-POZXuoMNA6NqGVB6oSc50UKK2Z4VMbKvPWkfVyMCJPGSFCIcWuhyRajH6VnXs8NZgmuEm8t75fz-2gFWKoFJX2ZnKCsoQlQAvfXc4i7KtFEueAs72gMZ3HmPrV8_VSeap1yy3mQa7bnvf3sQiGoRriJGeCURRYlirx_bMOTZIS11HtXUhBh6hqTNiwRDghhEH7jc5YakREUy9WPx' },
    { id: 3, name: 'David Chen', team: 'Equipe Elite Sub-16', present: true, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR4NvxjOhNBQIxnCaGCIPMDGLHtTQVzK0LGgk7tWYHzuaP_w2BHPD5PwQy4FimWFIRdrPhu_wR3lz-HW6gePgpGZ5p8zxwV5C3KIK4_Fikzk8HDCNsoM7vNa46XjTDQcF1srvnOOmqQTpXWXaxyRTtr-eDOQ2YAuWpmo0GnR8O-Tw0YbvvSRqD-vVC5zWAiC1X0ApXyzDh8pJoyooF17vt-AKYwdKbNCzK6Mx-rjnYYisP86Yb1y_lNGweAtW4qWPizA-RedbH4var' },
  ]);

  const toggleAttendance = (id: number) => {
    setStudents(students.map(s => s.id === id ? { ...s, present: !s.present } : s));
  };

  return (
    <Layout navItems={coachNavItems}>
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <Header
          title="Chamada de Presença"
          leftAction={<span className="material-symbols-outlined text-2xl">arrow_back_ios</span>}
          rightAction={
            <button className="flex size-10 items-center justify-center rounded-full bg-slate-100">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
            </button>
          }
        />
        <div className="px-4 py-4 bg-primary text-white">
          <h3 className="tracking-tight text-2xl font-bold leading-tight">Terça, 24 Out</h3>
          <div className="flex items-center gap-2 mt-1 opacity-90">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <p className="text-sm font-medium leading-normal">Treino Elite: 16:00 - 17:30</p>
          </div>
        </div>
        <div className="flex gap-3 p-4 overflow-x-auto hide-scrollbar">
          <div className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-primary px-4 shadow-sm">
            <span className="material-symbols-outlined text-white text-[20px]">sports_soccer</span>
            <p className="text-white text-sm font-semibold leading-normal">Futebol</p>
          </div>
          {['Vôlei', 'Basquete', 'Tênis'].map(sport => (
            <div key={sport} className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-slate-100 border border-slate-200 px-4">
              <span className="material-symbols-outlined text-slate-600 text-[20px]">
                {sport === 'Vôlei' ? 'sports_volleyball' : sport === 'Basquete' ? 'sports_basketball' : 'sports_tennis'}
              </span>
              <p className="text-slate-600 text-sm font-medium leading-normal">{sport}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex items-center justify-between mb-4 mt-4">
          <h3 className="text-slate-900 text-lg font-bold leading-tight tracking-tight">Alunos ({students.length})</h3>
          <button className="text-primary text-sm font-bold" onClick={() => setStudents(students.map(s => ({...s, present: true})))}>Marcar todos</button>
        </div>

        <div className="space-y-3">
          {students.map(student => (
            <div key={student.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img alt={student.name} className="size-12 rounded-full object-cover" src={student.img} />
                  {student.present && <div className="absolute -bottom-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-white"></div>}
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-base">{student.name}</p>
                  <p className="text-slate-500 text-xs font-medium">{student.team}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${student.present ? 'text-primary' : 'text-slate-400'}`}>
                  {student.present ? 'Presente' : 'Ausente'}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={student.present}
                    onChange={() => toggleAttendance(student.id)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-white/95 backdrop-blur-xl border-t border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Resumo da Chamada</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-900 font-bold">{students.filter(s => s.present).length} Presentes</span>
              <span className="text-slate-400">/ {students.length} Total</span>
            </div>
          </div>
          <div className="flex items-center -space-x-3">
            <div className="size-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden"></div>
            <div className="size-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden"></div>
            <div className="size-8 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] font-bold text-white">
              +{Math.max(0, students.filter(s => s.present).length - 2)}
            </div>
          </div>
        </div>
        <button className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined font-bold">check_circle</span>
          Finalizar Chamada
        </button>
      </div>
    </Layout>
  );
}
