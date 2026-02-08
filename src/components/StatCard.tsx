

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  trend?: string;
  trendIcon?: string;
  trendColor?: string;
  icon?: string;
  iconBgColor?: string;
  iconColor?: string;
  progress?: number;
}

export default function StatCard({
  label,
  value,
  subValue,
  trend,
  trendIcon,
  trendColor = "text-emerald-500",
  icon,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary",
  progress
}: StatCardProps) {
  return (
    <div className="flex min-w-[100px] flex-1 flex-col gap-1 rounded-2xl p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
      <div className="flex justify-between items-start">
        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
        {icon && (
          <div className={`${iconBgColor} ${iconColor} p-1 rounded-lg`}>
            <span className="material-symbols-outlined text-sm">{icon}</span>
          </div>
        )}
      </div>
      <div className="flex items-end gap-1">
        <p className="text-slate-900 dark:text-white text-2xl font-black">{value}</p>
        {subValue && <p className="text-slate-400 text-xs mb-1">{subValue}</p>}
      </div>
      {trend && (
        <p className={`${trendColor} text-xs font-bold flex items-center`}>
          {trendIcon && <span className="material-symbols-outlined text-sm">{trendIcon}</span>} {trend}
        </p>
      )}
      {progress !== undefined && (
        <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mt-2">
          <div className="bg-primary h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}
