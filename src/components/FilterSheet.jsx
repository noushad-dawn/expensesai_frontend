import React from 'react';
import { X, RotateCcw } from 'lucide-react';

const FilterSheet = ({ 
  isOpen, 
  onClose, 
  category, 
  setCategory, 
  startDate, 
  setStartDate, 
  endDate, 
  setEndDate, 
  onReset,
  categories 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-brand-forest/25 backdrop-blur-xs sm:hidden">
      {/* Dismiss overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide up sheet */}
      <div className="relative w-full rounded-t-3xl bg-white p-6 shadow-2xl transition-transform duration-300 ease-out max-h-[85vh] overflow-y-auto pb-[calc(24px+env(safe-area-inset-bottom))] border-t border-brand-border">
        
        {/* Drag handle */}
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-brand-border" onClick={onClose} />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-border pb-4">
          <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider">Filter Criteria</h3>
          <button 
            onClick={onReset} 
            className="flex items-center gap-1 text-[9px] font-bold text-brand-danger uppercase tracking-wide hover:underline"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>

        {/* Filter form */}
        <div className="mt-5 space-y-4">
          {/* Category */}
          <div>
            <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-2xl border border-brand-border px-4 py-3 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/25"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Date range inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-brand-border px-3.5 py-2.5 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/25"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-brand-forest">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1.5 w-full rounded-2xl border border-brand-border px-3.5 py-2.5 text-xs text-brand-forest outline-none transition focus:border-brand-forest focus:ring-1 focus:ring-brand-forest bg-brand-cream/25"
              />
            </div>
          </div>

          {/* Apply button */}
          <button
            onClick={onClose}
            className="mt-6 flex w-full min-h-[44px] items-center justify-center rounded-2xl bg-brand-forest text-xs font-bold text-white shadow-md hover:bg-brand-forest/90 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSheet;
