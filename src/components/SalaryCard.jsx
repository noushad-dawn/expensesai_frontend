import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Wallet, Calendar } from 'lucide-react';
import { getErrorMessage } from '../services/api';

const months = [
  { value: 1, label: 'January' },
  { value: 2, label: 'February' },
  { value: 3, label: 'March' },
  { value: 4, label: 'April' },
  { value: 5, label: 'May' },
  { value: 6, label: 'June' },
  { value: 7, label: 'July' },
  { value: 8, label: 'August' },
  { value: 9, label: 'September' },
  { value: 10, label: 'October' },
  { value: 11, label: 'November' },
  { value: 12, label: 'December' }
];

const SalaryCard = ({ salaries, onAdd, onUpdate, onDelete }) => {
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // Calculate current month's salary entry
  const currentMonthNum = new Date().getMonth() + 1;
  const currentYearNum = new Date().getFullYear();
  const currentMonthSalary = salaries.find(s => s.month === currentMonthNum && s.year === currentYearNum)?.amount || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid salary amount');
      return;
    }

    try {
      await onAdd({
        amount: parseFloat(amount),
        month: parseInt(month),
        year: parseInt(year)
      });
      setAmount('');
      setSuccess('Salary logged successfully!');
      setTimeout(() => setSuccess(''), 3000);
      setIsModalOpen(false);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to add salary'));
    }
  };

  const handleEditInit = (salary) => {
    setEditingId(salary._id);
    setEditAmount(salary.amount);
  };

  const handleEditSave = async (id, originalSalary) => {
    if (!editAmount || parseFloat(editAmount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      await onUpdate(id, {
        amount: parseFloat(editAmount),
        month: originalSalary.month,
        year: originalSalary.year
      });
      setEditingId(null);
    } catch (err) {
      alert(getErrorMessage(err, 'Failed to update salary'));
    }
  };

  const getMonthName = (monthNum) => {
    return months.find(m => m.value === monthNum)?.label || '';
  };

  const formatCurrency = (val) => {
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  // High-Fidelity Empty State Component
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-brand-border bg-white py-12 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-border bg-brand-cream/50 text-brand-forest">
        <Wallet className="h-5 w-5" />
      </div>
      <p className="text-brand-forest font-bold text-sm mt-4">No salary recorded yet</p>
      <p className="text-xs text-brand-secondary mt-1.5 max-w-sm leading-relaxed font-semibold">
        Add your monthly income to unlock accurate budgeting and AI recommendations.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-6 flex min-h-[40px] items-center gap-1.5 rounded-2xl bg-brand-forest px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-forest/90 transition"
      >
        <Plus className="h-4 w-4 text-brand-gold" />
        Add Monthly Salary
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* 1. Mobile-only Salary Overview & Action */}
      <div className="sm:hidden space-y-4">
        {/* Overview card */}
        <div className="rounded-3xl border border-brand-border bg-white p-5 shadow-sm text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Current Monthly Income</span>
          <h3 className="text-2xl font-extrabold text-brand-forest mt-1 tracking-tight">
            {formatCurrency(currentMonthSalary)}
          </h3>
          <p className="text-[10px] text-brand-secondary font-semibold mt-1">
            Period: {getMonthName(currentMonthNum)} {currentYearNum}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-brand-forest text-xs font-bold text-white shadow-md hover:bg-brand-forest/90 transition"
          >
            <Plus className="h-4.5 w-4.5 text-brand-gold" />
            Add Salary
          </button>
        </div>

        {/* Mobile Salary History Cards list */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-brand-forest tracking-wide uppercase px-1">Salary History</h4>
          {!salaries || salaries.length === 0 ? (
            <EmptyState />
          ) : (
            salaries.map((salary) => (
              <div key={salary._id} className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-xs font-bold text-brand-forest leading-snug">
                    {getMonthName(salary.month)} {salary.year}
                  </span>
                  <p className="text-[10px] text-brand-muted font-bold mt-1 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-brand-muted" />
                    Added {new Date(salary.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  {editingId === salary._id ? (
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-20 rounded-xl border border-brand-border px-2 py-1 text-right text-xs text-brand-forest outline-none focus:border-brand-forest"
                      min="0"
                      required
                    />
                  ) : (
                    <span className="text-xs font-bold text-brand-forest">
                      {formatCurrency(salary.amount)}
                    </span>
                  )}

                  <div className="flex items-center gap-1 border-l border-brand-border pl-2">
                    {editingId === salary._id ? (
                      <>
                        <button
                          onClick={() => handleEditSave(salary._id, salary)}
                          className="rounded-lg p-2 text-brand-success hover:bg-slate-50 transition active:scale-95"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="rounded-lg p-2 text-brand-muted hover:bg-slate-50 transition active:scale-95"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditInit(salary)}
                          className="rounded-lg p-2 text-brand-muted hover:bg-brand-cream/40 hover:text-brand-forest transition active:scale-95"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Delete this salary record?')) {
                              onDelete(salary._id);
                            }
                          }}
                          className="rounded-lg p-2 text-brand-muted hover:bg-rose-50 hover:text-brand-danger transition active:scale-95"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2. Desktop side-by-side Layout (>= 640px) */}
      <div className="hidden sm:grid gap-6 md:grid-cols-5">
        
        {/* Left Side: Submit Form Container */}
        <div className="md:col-span-2 rounded-3xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm h-fit">
          <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider">Log Monthly Income</h3>
          <p className="text-xs text-brand-secondary mt-1 font-semibold">Specify your net take-home salary for budget calculations.</p>
          
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {error && (
              <div className="rounded-xl bg-brand-danger/10 p-3 text-xs font-semibold text-brand-danger border border-brand-danger/20">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-xl bg-brand-success/10 p-3 text-xs font-semibold text-brand-success border border-brand-success/20">
                {success}
              </div>
            )}

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Salary Amount (₹)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 50000"
                className="mt-1.5 w-full rounded-2xl border border-brand-border px-4 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                required
                min="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Month</label>
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-brand-border px-3.5 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                >
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="mt-1.5 w-full rounded-2xl border border-brand-border px-3.5 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full min-h-[40px] items-center justify-center gap-1.5 rounded-2xl bg-brand-forest py-3 text-xs font-bold text-white shadow-md hover:bg-brand-forest/90 transition active:scale-98"
            >
              <Plus className="h-4 w-4 text-brand-gold" />
              Add Income
            </button>
          </form>
        </div>

        {/* Right Side: Log History Ledger Table */}
        <div className="md:col-span-3 rounded-3xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm">
          <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider">Salary History</h3>
          <p className="text-xs text-brand-secondary mt-1 font-semibold">Review and manage your historical salary inputs.</p>

          <div className="mt-5">
            {!salaries || salaries.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-brand-secondary">
                  <thead className="bg-brand-cream/35 text-[9px] font-bold uppercase tracking-wider text-brand-forest border-b border-brand-border">
                    <tr>
                      <th className="px-4 py-3.5">Period</th>
                      <th className="px-4 py-3.5 text-right">Amount</th>
                      <th className="px-4 py-3.5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border">
                    {salaries.map((salary) => (
                      <tr key={salary._id} className="transition hover:bg-brand-cream/15">
                        <td className="whitespace-nowrap px-4 py-3.5 font-bold text-brand-forest">
                          {getMonthName(salary.month)} {salary.year}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-right font-bold text-brand-forest">
                          {editingId === salary._id ? (
                            <input
                              type="number"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              className="w-24 rounded-lg border border-brand-border px-2 py-1 text-right text-xs text-brand-forest outline-none focus:border-brand-forest bg-brand-cream/20 font-bold"
                              min="0"
                              required
                            />
                          ) : (
                            <span className="font-extrabold text-brand-forest">
                              {formatCurrency(salary.amount)}
                            </span>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-4 py-3.5 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {editingId === salary._id ? (
                              <>
                                <button
                                  onClick={() => handleEditSave(salary._id, salary)}
                                  className="rounded-lg p-1.5 text-brand-success hover:bg-brand-cream/40 transition"
                                >
                                  <Check className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="rounded-lg p-1.5 text-brand-muted hover:bg-brand-cream/40 transition"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEditInit(salary)}
                                  className="rounded-lg p-1.5 text-brand-secondary hover:bg-brand-cream/40 hover:text-brand-forest transition"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (window.confirm('Delete this salary record?')) {
                                      onDelete(salary._id);
                                    }
                                  }}
                                  className="rounded-lg p-1.5 text-brand-secondary hover:bg-rose-50 hover:text-brand-danger transition"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. Mobile Add Salary Modal (acts as bottom sheet or comfortable modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-forest/25 p-4 backdrop-blur-xs sm:hidden">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-sm rounded-3xl bg-white p-5 border border-brand-border shadow-2xl">
            <div className="flex items-center justify-between border-b border-brand-border pb-4">
              <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider">Log Monthly Income</h3>
              <button onClick={() => setIsModalOpen(false)} className="rounded-xl p-1.5 text-brand-secondary hover:bg-brand-cream/55">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {error && (
                <div className="rounded-xl bg-brand-danger/10 p-3 text-xs font-semibold text-brand-danger border border-brand-danger/20">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 50000"
                  className="mt-1.5 w-full rounded-2xl border border-brand-border px-4 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                  required
                  min="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Month</label>
                  <select
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-brand-border px-3.5 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                  >
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="mt-1.5 w-full rounded-2xl border border-brand-border px-3.5 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/20"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-brand-border">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-2xl px-4 py-2.5 text-xs font-bold text-brand-secondary hover:bg-brand-cream/40"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-brand-forest px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-forest/90 transition"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryCard;
