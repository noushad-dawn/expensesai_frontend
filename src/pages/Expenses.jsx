import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PlusCircle, Filter, RotateCcw } from 'lucide-react';
import { useApp } from '../store/store';
import ExpenseTable from '../components/ExpenseTable';
import ExpenseForm from '../components/ExpenseForm';
import FilterSheet from '../components/FilterSheet';

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

const Expenses = () => {
  const { expenses, fetchExpenses, addExpense, updateExpense, deleteExpense } = useApp();
  const location = useLocation();
  
  // Local form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  
  // Filter settings
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Mobile Filter Sheet toggle
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  // Auto-open modal if navigated from Quick Action "+ Add Expense"
  useEffect(() => {
    if (location.state?.openAdd) {
      setIsFormOpen(true);
      // Clear location state to prevent reopening on reload
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Fetch lists with filters applied
  useEffect(() => {
    fetchExpenses({ category, startDate, endDate });
  }, [category, startDate, endDate]);

  const handleAddSubmit = async (data) => {
    await addExpense(data);
  };

  const handleEditSubmit = async (data) => {
    if (editingExpense) {
      await updateExpense(editingExpense._id, data);
      setEditingExpense(null);
    }
  };

  const handleResetFilters = () => {
    setCategory('');
    setStartDate('');
    setEndDate('');
  };

  const openEditModal = (expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const closeFormModal = () => {
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  return (
    <div className="space-y-6">
      {/* Page header controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-md font-bold text-brand-forest tracking-tight uppercase">Expenses Ledger</h3>
          <p className="text-xs text-brand-secondary mt-0.5 font-semibold">Review, log, edit, and filter your historical outgoings.</p>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-brand-forest px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-forest/90 transition active:scale-98"
        >
          <PlusCircle className="h-4.5 w-4.5 text-brand-gold" />
          Log New Expense
        </button>
      </div>

      {/* Mobile Filter Button (< 640px) */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsFilterSheetOpen(true)}
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-brand-forest bg-white px-4 py-3 text-xs font-bold text-brand-forest w-full active:bg-brand-cream/30 transition"
        >
          <Filter className="h-4 w-4 text-brand-gold" />
          Filter Entries
        </button>

        {/* Slide up mobile bottom drawer */}
        <FilterSheet
          isOpen={isFilterSheetOpen}
          onClose={() => setIsFilterSheetOpen(false)}
          category={category}
          setCategory={setCategory}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          onReset={handleResetFilters}
          categories={categories}
        />
      </div>

      {/* Desktop Filter Panel (>= 640px) */}
      <div className="hidden sm:block rounded-3xl border border-brand-border bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-brand-forest font-bold text-xs">
          <Filter className="h-4 w-4 text-brand-gold" />
          Filter Criteria
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-brand-border px-3 py-2 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/15"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-brand-border px-3 py-2 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/15"
            />
          </div>

          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-brand-border px-3 py-2 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/15"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-brand-border px-4 py-2 text-xs font-bold text-brand-secondary hover:bg-brand-cream/40 hover:text-brand-forest transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Transaction List Cards/Table */}
      <ExpenseTable 
        expenses={expenses} 
        onEdit={openEditModal} 
        onDelete={deleteExpense} 
      />

      {/* Expense Log Form */}
      {isFormOpen && (
        <ExpenseForm
          onSubmit={editingExpense ? handleEditSubmit : handleAddSubmit}
          onClose={closeFormModal}
          expense={editingExpense}
        />
      )}
    </div>
  );
};

export default Expenses;
