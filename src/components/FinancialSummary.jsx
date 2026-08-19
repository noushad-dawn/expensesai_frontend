import React from 'react';

const FinancialSummary = ({ remainingBalance, currentSalary, totalExpenses, savingsPercentage }) => {
  const formatCurrency = (val) => {
    return `₹${val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="rounded-3xl bg-brand-forest p-6 text-white border border-brand-forest/30 shadow-md">
      {/* Balance Segment */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Available Balance</span>
        <h3 className="text-3xl font-extrabold text-white mt-1 tracking-tight">
          {formatCurrency(remainingBalance)}
        </h3>
      </div>

      {/* Metrics Split Grid */}
      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
        {/* Income */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Monthly Income</span>
          <span className="text-sm font-extrabold text-white mt-1 truncate">
            {formatCurrency(currentSalary)}
          </span>
        </div>

        {/* Spent */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Expenses</span>
          <span className="text-sm font-extrabold text-white mt-1 truncate">
            {formatCurrency(totalExpenses)}
          </span>
        </div>

        {/* Savings */}
        <div className="flex flex-col">
          <span className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Savings</span>
          <span className="text-sm font-extrabold text-brand-gold mt-1">
            {savingsPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
