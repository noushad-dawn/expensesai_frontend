import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit } from 'lucide-react';
import { useApp } from '../store/store';

const MobileHeader = () => {
  const { user } = useApp();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-brand-border bg-white/95 px-4 backdrop-blur-md sm:hidden">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-forest text-brand-gold shadow-md shadow-brand-forest/10">
          <BrainCircuit className="h-4.5 w-4.5" />
        </div>
        <span className="font-extrabold text-brand-forest text-sm tracking-tight">ExpenseAI</span>
      </Link>

      {user && (
        <Link to="/profile" className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-forest text-white font-extrabold text-[10px] ring-2 ring-brand-gold/20">
          {user.name.charAt(0).toUpperCase()}
        </Link>
      )}
    </header>
  );
};

export default MobileHeader;
