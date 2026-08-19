import React, { useEffect } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  AlertTriangle, 
  AlertCircle, 
  TrendingDown, 
  Lightbulb, 
  Wallet,
  Compass
} from 'lucide-react';
import { useApp } from '../store/store';

const AIInsights = () => {
  const { aiData, aiLoading, aiError, fetchAIAnalysis } = useApp();

  const handleRefresh = (e) => {
    e.preventDefault();
    fetchAIAnalysis();
  };

  // Technical debug log for development
  useEffect(() => {
    if (aiError) {
      console.error('[Gemini AI Technical Error Debug Log]:', aiError);
    }
  }, [aiError]);

  return (
    <div className="rounded-3xl border border-brand-border bg-brand-cream/20 p-5 sm:p-6 shadow-sm ring-1 ring-brand-forest/5">
      {/* Header Panel */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-forest text-brand-gold shadow-sm shadow-brand-forest/10">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-brand-forest uppercase tracking-wider flex items-center gap-1">
              ✦ AI Financial Insights
            </h3>
            <p className="text-[10px] text-brand-secondary font-semibold mt-0.5">Personalized recommendations based on your spending</p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={aiLoading}
          className="inline-flex min-h-[34px] items-center gap-1.5 rounded-xl border border-brand-border bg-white px-3.5 py-1.5 text-[10px] font-bold text-brand-forest hover:bg-brand-cream/40 transition disabled:opacity-50 active:scale-98"
        >
          <RefreshCw className={`h-3 w-3 ${aiLoading ? 'animate-spin' : ''}`} />
          {aiLoading ? 'Analyzing...' : 'Refresh'}
        </button>
      </div>

      <div className="mt-5">
        {/* Loading state skeleton wave */}
        {aiLoading && (
          <div className="space-y-4 py-2 animate-pulse">
            <div className="h-14 bg-white rounded-2xl border border-brand-border p-4 space-y-2">
              <div className="h-2.5 bg-brand-cream rounded w-5/6"></div>
              <div className="h-2.5 bg-brand-cream rounded w-2/3"></div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-20 bg-white rounded-2xl border border-brand-border p-4 space-y-2">
                <div className="h-2.5 bg-brand-cream rounded w-1/2"></div>
                <div className="h-2 bg-brand-cream/60 rounded w-3/4"></div>
              </div>
              <div className="h-20 bg-white rounded-2xl border border-brand-border p-4 space-y-2">
                <div className="h-2.5 bg-brand-cream rounded w-2/3"></div>
                <div className="h-2 bg-brand-cream/60 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        )}

        {/* Error handling card - masked from user */}
        {aiError && !aiLoading && (
          <div className="rounded-2xl border border-brand-danger/25 bg-white p-5 text-center">
            <AlertCircle className="mx-auto h-7 w-7 text-brand-danger" />
            <h4 className="mt-2.5 text-xs font-bold text-brand-forest">Analysis Unavailable</h4>
            <p className="mt-1 text-[10px] text-brand-secondary font-medium">AI insights are temporarily unavailable.</p>
            <button
              onClick={handleRefresh}
              className="mt-3.5 rounded-xl bg-brand-forest px-4.5 py-2 text-[10px] font-bold text-white shadow-md hover:bg-brand-forest/90 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty status placeholder */}
        {!aiData && !aiLoading && !aiError && (
          <div className="rounded-2xl border border-dashed border-brand-border bg-white p-6 text-center">
            <Sparkles className="mx-auto h-7 w-7 text-brand-gold" />
            <h4 className="mt-2.5 text-xs font-bold text-brand-forest">Ready for Analysis</h4>
            <p className="mt-1 text-[10px] text-brand-secondary max-w-xs mx-auto leading-normal">
              Click Refresh to trigger Gemini AI advice on your monthly income and expenses.
            </p>
          </div>
        )}

        {/* Active Insights layout */}
        {aiData && !aiLoading && !aiError && (
          <div className="space-y-4">
            {/* AI Summary Statement */}
            <div className="rounded-2xl bg-white p-4 border border-brand-border border-l-4 border-l-brand-gold text-xs font-semibold italic text-brand-forest leading-relaxed flex items-start gap-2.5">
              <Compass className="h-4.5 w-4.5 text-brand-gold flex-shrink-0 mt-0.5" />
              <span>"{aiData.summary}"</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Left Side: Warnings / Alerts */}
              <div className="space-y-4">
                {/* Overspending Alert */}
                {aiData.overspendingCategories && aiData.overspendingCategories.length > 0 && (
                  <div className="rounded-2xl border border-brand-border bg-white p-4">
                    <div className="flex items-center gap-2 font-bold text-brand-forest text-xs">
                      <TrendingDown className="h-4 w-4 text-brand-danger" />
                      Overspending Detected
                    </div>
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {aiData.overspendingCategories.map((cat, idx) => (
                        <span key={idx} className="rounded-lg bg-brand-danger/10 border border-brand-danger/25 px-2.5 py-0.5 text-[9px] font-bold text-brand-danger">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Critical Warnings */}
                {aiData.warnings && aiData.warnings.length > 0 && (
                  <div className="rounded-2xl border border-brand-border bg-white p-4">
                    <div className="flex items-center gap-2 font-bold text-brand-forest text-xs">
                      <AlertTriangle className="h-4 w-4 text-brand-danger" />
                      Warnings
                    </div>
                    <ul className="mt-2.5 space-y-1.5 text-[10px] font-semibold text-brand-secondary list-disc list-inside">
                      {aiData.warnings.map((warn, idx) => (
                        <li key={idx} className="leading-normal">{warn}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Side: Budgets / Tips */}
              <div className="space-y-4">
                {/* Budget Recommendations */}
                {aiData.budgetRecommendation && Object.keys(aiData.budgetRecommendation).length > 0 && (
                  <div className="rounded-2xl border border-brand-border bg-white p-4">
                    <div className="flex items-center gap-2 font-bold text-brand-forest text-xs">
                      <Wallet className="h-4 w-4 text-brand-gold" />
                      Budget Recommendations
                    </div>
                    <div className="mt-2.5 grid grid-cols-2 gap-2">
                      {Object.entries(aiData.budgetRecommendation).map(([category, amount], idx) => (
                        <div key={idx} className="flex justify-between items-center rounded-xl bg-brand-cream/35 border border-brand-border px-2.5 py-1.5">
                          <span className="text-[10px] font-bold text-brand-forest">{category}</span>
                          <span className="text-[10px] font-extrabold text-brand-forest">₹{amount.toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Saving Tips */}
                {aiData.savingTips && aiData.savingTips.length > 0 && (
                  <div className="rounded-2xl border border-brand-border bg-white p-4">
                    <div className="flex items-center gap-2 font-bold text-brand-forest text-xs">
                      <Lightbulb className="h-4 w-4 text-brand-gold" />
                      Smart Savings Tips
                    </div>
                    <ul className="mt-2.5 space-y-1.5 text-[10px] font-semibold text-brand-secondary list-disc list-inside">
                      {aiData.savingTips.map((tip, idx) => (
                        <li key={idx} className="leading-normal">{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <p className="text-[9px] text-center text-brand-muted font-bold italic mt-2">
              Advisory Disclaimer: Recommendations are AI-generated suggestions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
