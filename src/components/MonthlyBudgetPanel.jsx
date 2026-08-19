import React from 'react';

const BUDGET_LIMITS = {
  Food: 10000,
  Transport: 5000,
  Shopping: 12000,
  Bills: 15000,
  Entertainment: 8000,
  Health: 10000,
  Education: 20000,
  Other: 6000
};

const MonthlyBudgetPanel = ({ categoryData }) => {
  const getProgressColor = (percentage) => {
    if (percentage > 85) return 'bg-brand-danger';
    if (percentage > 60) return 'bg-brand-gold';
    return 'bg-brand-success';
  };

  const activeBudgets = categoryData && categoryData.length > 0 
    ? categoryData.map(item => {
        const limit = BUDGET_LIMITS[item.category] || 6000;
        const percentage = Math.min(100, Math.round((item.amount / limit) * 100));
        return {
          category: item.category,
          amount: item.amount,
          limit,
          percentage
        };
      }).slice(0, 4)
    : [
        { category: 'Food', amount: 0, limit: 10000, percentage: 0 },
        { category: 'Transport', amount: 0, limit: 5000, percentage: 0 },
        { category: 'Shopping', amount: 0, limit: 12000, percentage: 0 },
      ];

  return (
    <div className="rounded-3xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm">
      <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider border-b border-brand-border pb-4">
        Monthly Budgets
      </h3>
      
      <div className="mt-4 space-y-4">
        {activeBudgets.map((budget, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-brand-forest">{budget.category}</span>
              <span className="font-semibold text-brand-secondary">
                {budget.percentage}% <span className="text-[10px] text-brand-muted">({budget.amount} / {budget.limit})</span>
              </span>
            </div>
            
            {/* Progress bar container */}
            <div className="h-1.5 w-full rounded-full bg-brand-cream/60 overflow-hidden border border-brand-border/30">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(budget.percentage)}`}
                style={{ width: `${budget.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlyBudgetPanel;
