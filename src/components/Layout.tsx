import React from 'react';
import BottomNavigation from './BottomNavigation';
import type { NavItem } from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
}

export default function Layout({ children, navItems }: LayoutProps) {
  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col bg-bg-main overflow-x-hidden shadow-2xl">
      <main className="flex-1 pb-28">
        {children}
      </main>
      <BottomNavigation items={navItems} />
    </div>
  );
}
