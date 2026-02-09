import { useState } from 'react';

interface CalendarWidgetProps {
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
}

export default function CalendarWidget({ selectedDate, onDateChange }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);
  const today = new Date();

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <div className="px-4 pb-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">{monthNames[month]} {year}</p>
          <span className="material-symbols-outlined text-sm cursor-pointer">expand_more</span>
        </div>
        <div className="flex gap-3">
          <button onClick={prevMonth} className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-base">chevron_left</span>
          </button>
          <button onClick={nextMonth} className="p-1 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-base">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weekDays.map(day => (
          <span key={day} className="text-[10px] font-bold text-gray-400 uppercase">{day}</span>
        ))}

        {Array.from({ length: startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="h-12"></div>
        ))}

        {Array.from({ length: totalDays }).map((_, i) => {
          const day = i + 1;
          const d = new Date(year, month, day);
          const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
          const isSelected = selectedDate && selectedDate.getFullYear() === year && selectedDate.getMonth() === month && selectedDate.getDate() === day;

          return (
            <button
              key={day}
              onClick={() => onDateChange && onDateChange(d)}
              className={`h-12 flex flex-col items-center justify-center rounded-xl text-sm transition-all ${
                isSelected ? 'bg-primary text-white font-bold shadow-lg shadow-primary/20' :
                isToday ? 'bg-primary/20 text-primary font-bold' : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span>{day}</span>
              {isToday && !isSelected && <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>}
              {isSelected && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
