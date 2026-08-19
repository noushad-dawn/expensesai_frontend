import React, { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { useApp } from '../store/store';
import { Link } from 'react-router-dom';
import FinancialSummary from '../components/FinancialSummary';
import QuickActions from '../components/QuickActions';
import ExpenseChart from '../components/ExpenseChart';
import AIInsights from '../components/AIInsights';
import RecentTransactions from '../components/RecentTransactions';
import MonthlyBudgetPanel from '../components/MonthlyBudgetPanel';

const Dashboard = () => {
  const { dashboardData, fetchDashboardData, fetchAIAnalysis, aiData, user } = useApp();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Fetch AI insights automatically if we don't have them yet and dashboard has loaded data
  useEffect(() => {
    if (dashboardData && !aiData) {
      // Don't auto-trigger AI if salary and expenses are both 0 to conserve token limits
      if (dashboardData.summary.currentSalary > 0 || dashboardData.summary.totalExpenses > 0) {
        fetchAIAnalysis();
      }
    }
  }, [dashboardData]);

  if (!dashboardData) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-brand-forest border-t-transparent"></div>
      </div>
    );
  }

  const { summary, categoryData, monthlyTrendData, recentExpenses } = dashboardData;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Greetings block */}
      <div className="flex flex-col gap-2">
        <div>
          <h2 className="text-2xl font-extrabold text-brand-forest tracking-tight">
            {getGreeting()}, {user?.name || 'Noushad'}
          </h2>
          <p className="text-xs text-brand-secondary font-semibold mt-0.5">Here's your financial overview.</p>
        </div>

        {summary.currentSalary === 0 && (
          <div className="flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/40 p-4 text-xs font-bold text-amber-850 leading-normal">
            <AlertCircle className="h-4.5 w-4.5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              You haven't logged your salary for the current month! Go to{' '}
              <Link to="/salary" className="text-brand-gold underline hover:text-brand-gold/80">
                Salary Logs
              </Link>{' '}
              to establish your income and trace your savings.
            </div>
          </div>
        )}
      </div>

      {/* Main layout grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Hero Card, Actions, and Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Financial card */}
          <FinancialSummary
            remainingBalance={summary.remainingBalance}
            currentSalary={summary.currentSalary}
            totalExpenses={summary.totalExpenses}
            savingsPercentage={summary.savingsPercentage}
          />

          {/* Quick Actions (Add Expense / Salary) */}
          <QuickActions />

          {/* Responsive Charts */}
          <ExpenseChart categoryData={categoryData} trendData={monthlyTrendData} />
        </div>

        {/* Right Column: AI Insights, Transactions list, Budget panel */}
        <div className="space-y-6">
          {/* Premium AI insights */}
          <AIInsights />

          {/* Dynamic Budget Progress Bars */}
          <MonthlyBudgetPanel categoryData={categoryData} />

          {/* Transaction feeds */}
          <RecentTransactions recentExpenses={recentExpenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
