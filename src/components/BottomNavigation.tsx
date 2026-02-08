import { NavLink } from 'react-router-dom';

export interface NavItem {
  label: string;
  icon: string;
  path: string;
  fill?: boolean;
}

interface BottomNavigationProps {
  items: NavItem[];
}

export default function BottomNavigation({ items }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg bg-white/95 backdrop-blur-xl border-t border-gray-100 flex items-center justify-around h-20 px-4 pb-6 z-50">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 transition-colors ${
              isActive ? 'text-primary' : 'text-gray-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`material-symbols-outlined ${isActive || item.fill ? 'font-bold' : ''}`}
                style={{ fontVariationSettings: isActive || item.fill ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
