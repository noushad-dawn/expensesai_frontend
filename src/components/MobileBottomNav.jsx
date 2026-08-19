import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Receipt, Coins, User } from 'lucide-react';

const MobileBottomNav = () => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/expenses', label: 'Expenses', icon: Receipt },
    { to: '/salary', label: 'Salary', icon: Coins },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-brand-border bg-white px-4 py-2 shadow-lg shadow-slate-900/5 pb-[calc(8px+env(safe-area-inset-bottom))] sm:hidden">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                flex flex-col items-center gap-1 py-1 px-3 text-xs font-bold transition-all duration-200
                ${isActive ? 'text-brand-forest' : 'text-brand-muted hover:text-brand-secondary'}
              `}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[9px] tracking-wide">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
