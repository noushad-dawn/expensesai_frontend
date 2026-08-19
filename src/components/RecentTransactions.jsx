import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Utensils, 
  Car, 
  ShoppingBag, 
  FileText, 
  Tv, 
  HeartPulse, 
  GraduationCap, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

const CATEGORY_MAP = {
  Food: { icon: Utensils },
  Transport: { icon: Car },
  Shopping: { icon: ShoppingBag },
  Bills: { icon: FileText },
  Entertainment: { icon: Tv },
  Health: { icon: HeartPulse },
  Education: { icon: GraduationCap },
  Other: { icon: HelpCircle }
};

export const getCategoryMeta = (category) => {
  return CATEGORY_MAP[category] || CATEGORY_MAP.Other;
};

const RecentTransactions = ({ recentExpenses }) => {
  const formatCurrency = (val) => {
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="rounded-3xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm">
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-brand-border pb-4">
        <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider">Recent Transactions</h3>
        <Link to="/expenses" className="flex items-center gap-1 text-[10px] font-bold text-brand-gold uppercase tracking-wide hover:underline">
          View All
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Transactions List */}
      <div className="mt-4 divide-y divide-brand-border">
        {recentExpenses.length === 0 ? (
          <div className="py-8 text-center text-xs text-brand-muted font-semibold">
            No transactions recorded yet.
          </div>
        ) : (
          recentExpenses.map((exp) => {
            const meta = getCategoryMeta(exp.category);
            const Icon = meta.icon;

            return (
              <div key={exp._id} className="flex items-center justify-between gap-3 py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Category icon inside warm cream box */}
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-cream/50 text-brand-forest">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-brand-forest leading-snug">
                      {exp.description || 'Log Entry'}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-semibold text-brand-secondary">
                      <span>{exp.category}</span>
                      <span className="text-brand-muted">•</span>
                      <span>
                        {new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-brand-forest whitespace-nowrap">
                  {formatCurrency(exp.amount)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
