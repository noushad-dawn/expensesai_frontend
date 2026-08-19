import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useApp } from '../store/store';

const Navbar = ({ toggleSidebar }) => {
  const { user } = useApp();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/expenses':
        return 'Expenses';
      case '/salary':
        return 'Salary';
      case '/profile':
        return 'Profile';
      default:
        return 'ExpenseAI';
    }
  };

  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 sm:flex hidden h-16 w-full items-center justify-between border-b border-brand-border bg-brand-cream/80 px-6 backdrop-blur-md">
      {/* Left: Breadcrumbs / Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="rounded-xl p-1.5 text-brand-forest hover:bg-slate-100 lg:hidden transition"
        >
          <Menu className="h-4.5 w-4.5" />
        </button>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-muted">
          <span>Portal</span>
          <span>/</span>
          <span className="text-brand-forest font-bold">{getPageTitle()}</span>
        </div>
      </div>

      {/* Right: Date and User profile */}
      <div className="flex items-center gap-5">
        {/* Date */}
        <span className="text-xs font-bold text-brand-secondary">{formattedDate}</span>
        
        {/* User avatar and name */}
        {user && (
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-bold text-brand-forest">
              {user.name}
            </span>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-forest text-white font-extrabold text-[10px] ring-2 ring-brand-gold/20">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
