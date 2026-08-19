import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { getCategoryMeta } from './RecentTransactions';

const ExpenseTable = ({ expenses, onEdit, onDelete }) => {
  if (!expenses || expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-border bg-white py-12 px-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-cream/50 text-brand-forest">
          <Trash2 className="h-6 w-6" />
        </div>
        <p className="text-brand-forest font-bold text-sm mt-4">No expenses logged yet</p>
        <p className="text-xs text-brand-secondary mt-1 max-w-xs leading-normal font-semibold">
          Add your monthly transactions to begin tracking and analyzing your spending patterns.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Mobile Card List View (< 640px) */}
      <div className="space-y-3 sm:hidden">
        {expenses.map((expense) => {
          const meta = getCategoryMeta(expense.category);
          const Icon = meta.icon;

          return (
            <div key={expense._id} className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-brand-border bg-brand-cream/55 text-brand-forest">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-brand-forest truncate max-w-[120px] leading-snug">
                      {expense.description || 'Log Entry'}
                    </span>
                    <span className="text-[9px] text-brand-secondary font-bold uppercase tracking-wider bg-brand-cream/60 px-1.5 py-0.5 rounded-md border border-brand-border/40">
                      {expense.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-brand-muted font-bold mt-1">
                    {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs font-extrabold text-brand-forest">
                  ₹{expense.amount.toLocaleString('en-IN')}
                </span>
                
                <div className="flex items-center gap-1 border-l border-brand-border pl-2">
                  <button
                    onClick={() => onEdit(expense)}
                    className="rounded-lg p-2 text-brand-muted hover:bg-brand-cream/40 hover:text-brand-forest transition active:scale-95"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this expense log?')) {
                        onDelete(expense._id);
                      }
                    }}
                    className="rounded-lg p-2 text-brand-muted hover:bg-rose-50 hover:text-brand-danger transition active:scale-95"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View (>= 640px) */}
      <div className="hidden sm:block overflow-x-auto rounded-3xl border border-brand-border bg-white shadow-sm">
        <table className="w-full min-w-[600px] border-collapse text-left text-xs text-brand-secondary">
          <thead className="bg-brand-cream/35 text-[9px] font-bold uppercase tracking-wider text-brand-forest border-b border-brand-border">
            <tr>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-right">Amount</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {expenses.map((expense) => {
              const meta = getCategoryMeta(expense.category);
              return (
                <tr key={expense._id} className="transition hover:bg-brand-cream/15">
                  <td className="whitespace-nowrap px-6 py-3.5 font-bold text-brand-forest">
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5">
                    <span className="inline-flex items-center rounded-lg border border-brand-border bg-brand-cream/50 px-2.5 py-0.5 text-[9px] font-bold uppercase text-brand-forest">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-bold text-brand-forest truncate max-w-[200px]">
                    {expense.description || <span className="text-brand-muted font-normal italic">No description</span>}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5 text-right font-extrabold text-brand-forest">
                    ₹{expense.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onEdit(expense)}
                        className="rounded-lg p-1.5 text-brand-secondary hover:bg-brand-cream/40 hover:text-brand-forest transition"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this expense log?')) {
                            onDelete(expense._id);
                          }
                        }}
                        className="rounded-lg p-1.5 text-brand-secondary hover:bg-rose-50 hover:text-brand-danger transition"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
