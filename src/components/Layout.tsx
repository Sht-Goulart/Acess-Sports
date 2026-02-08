import React from 'react';
import BottomNavigation from './BottomNavigation';
import type { NavItem } from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

export default function Layout({ children, navItems }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="relative flex h-auto min-h-screen w-full max-w-lg flex-col bg-bg-main overflow-x-hidden shadow-2xl border-x border-gray-100">
        <main className="flex-1 pb-28">
          {children}
        </main>
        <div className="w-full max-w-lg">
          <BottomNavigation items={navItems} />
        </div>
      </div>
    </div>
  );
}
