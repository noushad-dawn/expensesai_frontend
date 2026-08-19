import React from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid
} from 'recharts';

// Muted, premium category colors aligning with forest & cream visual language
const COLORS = {
  Food: '#C8A96B',         // Accent/Gold
  Transport: '#8FA190',    // Muted Sage Green
  Shopping: '#AA8888',     // Muted Slate Red
  Bills: '#B85C5C',        // Danger Coral
  Entertainment: '#6F8A77',// Muted Forest Accent
  Health: '#A89E8C',       // Muted Khaki
  Education: '#7F8FA6',    // Muted Steel
  Other: '#8A918B'         // Muted Gray
};

const ExpenseChart = ({ categoryData, trendData }) => {
  const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-brand-border bg-white p-3 shadow-md">
          <p className="text-[10px] font-bold text-brand-muted uppercase">{payload[0].name || payload[0].dataKey}</p>
          <p className="text-xs font-extrabold text-brand-forest mt-0.5">
            ₹{payload[0].value.toLocaleString('en-IN')}
          </p>
          {payload[0].payload.percentage !== undefined && (
            <p className="text-[10px] font-bold text-brand-gold mt-0.5">
              {payload[0].payload.percentage}% of total
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const hasCategoryData = categoryData && categoryData.length > 0;
  const hasTrendData = trendData && trendData.length > 0;

  // Calculate total spent for center of donut
  const totalSpent = categoryData ? categoryData.reduce((sum, item) => sum + item.amount, 0) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Category breakdown (Donut Chart) */}
      <div className="rounded-3xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm">
        <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider">Category breakdown</h3>
        <p className="text-xs text-brand-secondary mt-1">Relative distribution of monthly expenses by category.</p>

        <div className="relative mt-6 flex h-72 items-center justify-center">
          {hasCategoryData ? (
            <>
              {/* Donut Chart */}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={88}
                    paddingAngle={3}
                    dataKey="amount"
                    nameKey="category"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[entry.category] || COLORS.Other} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle"
                    iconSize={6}
                    wrapperStyle={{ fontSize: '10px', fontWeight: 650, color: '#667067', paddingTop: '10px' }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Centered text overlay */}
              <div className="absolute flex flex-col items-center justify-center text-center pointer-events-none pb-8">
                <span className="text-[9px] font-bold uppercase tracking-wider text-brand-muted">Total Spent</span>
                <span className="text-sm font-extrabold text-brand-forest mt-0.5">
                  ₹{totalSpent.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-brand-secondary text-xs font-semibold">No monthly category metrics</p>
              <p className="text-[10px] text-brand-muted mt-1">Add expenses to generate breakdown charts</p>
            </div>
          )}
        </div>
      </div>

      {/* Salary vs Expenses Trend (Bar Chart) */}
      <div className="rounded-3xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm">
        <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider">Income vs Expenses</h3>
        <p className="text-xs text-brand-secondary mt-1">Comparison of net monthly incomes against total outgoings.</p>

        <div className="mt-6 h-72">
          {hasTrendData ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trendData}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D7" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#8A918B', fontSize: 9, fontWeight: 600 }}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={formatCurrency}
                  tick={{ fill: '#8A918B', fontSize: 9, fontWeight: 600 }}
                />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`]}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E0D7', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }}
                  labelStyle={{ fontWeight: 700, color: '#17221B', fontSize: '11px' }}
                />
                <Legend 
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{ fontSize: '10px', fontWeight: 650, paddingTop: '10px' }}
                />
                <Bar dataKey="salary" name="Salary" fill="#17221B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#B85C5C" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full">
              <p className="text-brand-secondary text-xs font-semibold">No trend history available</p>
              <p className="text-[10px] text-brand-muted mt-1">Logs over months populate historical trends</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
