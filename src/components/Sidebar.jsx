import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Coins, 
  LogOut,
  Settings,
  BrainCircuit
} from 'lucide-react';
import { useApp } from '../store/store';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logout, user } = useApp();

  const links = [
    { to: '/', name: 'Dashboard', icon: LayoutDashboard },
    { to: '/expenses', name: 'Expenses', icon: Receipt },
    { to: '/salary', name: 'Salary', icon: Coins },
  ];

  return (
    <>
      {/* Mobile/Tablet Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-brand-forest/40 backdrop-blur-xs lg:hidden sm:block hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed bottom-0 top-0 left-0 z-50 sm:flex hidden w-60 flex-col bg-brand-forest px-4.5 py-6 transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : 'sm:-translate-x-full lg:translate-x-0'}
      `}>
        {/* Brand Logo and Header */}
        <div className="mb-8 flex items-center gap-2.5 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold text-brand-forest shadow-md shadow-brand-gold/15">
            <BrainCircuit className="h-4.5 w-4.5" />
          </div>
          <div>
            <h1 className="font-extrabold text-white text-sm leading-none tracking-tight">ExpenseAI</h1>
            <span className="text-[8px] font-bold uppercase tracking-wider text-brand-gold mt-1 block">Smart Finance</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={({ isActive }) => `
                  flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold tracking-wide transition-all duration-200
                  ${isActive 
                    ? 'bg-brand-cream text-brand-forest border-l-2 border-brand-gold pl-2.5' 
                    : 'text-brand-muted hover:bg-white/5 hover:text-white'}
                `}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom controls */}
        <div className="mt-auto pt-6 border-t border-white/10 space-y-1">
          {/* Settings Mock Link */}
          <NavLink
            to="/profile"
            className={({ isActive }) => `
              flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold tracking-wide transition-all duration-200
              ${isActive 
                ? 'bg-brand-cream text-brand-forest border-l-2 border-brand-gold pl-2.5' 
                : 'text-brand-muted hover:bg-white/5 hover:text-white'}
            `}
          >
            <Settings className="h-4 w-4" />
            Settings
          </NavLink>

          {/* Logout Trigger */}
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold tracking-wide text-brand-danger hover:bg-rose-500/10 transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

          {/* Compact User Section */}
          {user && (
            <div className="mt-4 flex items-center gap-2.5 rounded-xl bg-white/5 p-2.5 border border-white/5">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-brand-gold text-brand-forest font-bold text-xs">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-[10px] font-bold text-white leading-tight">{user.name}</p>
                <p className="truncate text-[8px] text-brand-muted mt-0.5">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
