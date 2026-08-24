import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getErrorMessage } from '../services/api';

const categories = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Entertainment',
  'Health',
  'Education',
  'Other'
];

const ExpenseForm = ({ onSubmit, onClose, expense = null }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setCategory(expense.category);
      setDescription(expense.description || '');
      setDate(new Date(expense.date).toISOString().split('T')[0]);
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid expense amount');
      return;
    }
    if (!date) {
      setError('Please specify a date');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await onSubmit({
        amount: parseFloat(amount),
        category,
        description,
        date
      });
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to submit expense'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-forest/30 p-4 backdrop-blur-xs">
      {/* Background overlay click-off */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card Content */}
      <div className="relative w-full max-w-md rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-brand-border transition-all duration-200">
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider">
            {expense ? 'Edit Expense Log' : 'Log New Expense'}
          </h3>
          <button 
            onClick={onClose} 
            className="rounded-xl p-1.5 text-brand-secondary hover:bg-brand-cream/50 hover:text-brand-forest transition"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="rounded-xl bg-brand-danger/10 p-3 text-xs font-semibold text-brand-danger border border-brand-danger/20">
              {error}
            </div>
          )}

          {/* Amount Input */}
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 750"
              className="mt-1.5 w-full rounded-2xl border border-brand-border px-4 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
              required
              min="0"
              step="0.01"
            />
          </div>

          {/* Grid Category & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-brand-border px-3.5 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-brand-border px-3.5 py-2.5 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                required
              />
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Lunch with client"
              rows="2.5"
              className="mt-1.5 w-full rounded-2xl border border-brand-border px-4 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20 resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-brand-border mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl px-5 py-2.5 text-xs font-bold text-brand-secondary hover:bg-brand-cream/40 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-2xl bg-brand-forest px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-forest/90 transition disabled:opacity-50 min-h-[40px]"
            >
              {submitting ? 'Saving...' : 'Save Log'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;
