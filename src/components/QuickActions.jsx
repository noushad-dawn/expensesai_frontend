import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Coins } from 'lucide-react';

const QuickActions = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Primary: Solid Forest Button */}
      <Link
        to="/expenses"
        state={{ openAdd: true }}
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-brand-forest px-4 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-brand-forest/90 active:scale-[0.98]"
      >
        <PlusCircle className="h-4.5 w-4.5 text-brand-gold" />
        Add Expense
      </Link>
      
      {/* Secondary: Outlined/Cream Button */}
      <Link
        to="/salary"
        className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-brand-forest bg-white px-4 py-3 text-xs font-bold text-brand-forest transition hover:bg-brand-cream/40 active:scale-[0.98]"
      >
        <Coins className="h-4.5 w-4.5 text-brand-gold" />
        Add Salary
      </Link>
    </div>
  );
};

export default QuickActions;
