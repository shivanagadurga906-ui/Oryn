import React from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Download, 
  Sliders, 
  TrendingUp, 
  AlertCircle, 
  ShieldCheck,
  Building,
  HelpCircle,
  Clock
} from 'lucide-react';

export default function AIInsightsView() {
  const { 
    metrics, 
    appliedRecommendations, 
    applyRecommendation, 
    openModal, 
    setCurrentView,
    addToast 
  } = useFinancial();

  const handleExportBrief = () => {
    const report = {
      title: "Rao & Co. - Oryn Executive Board Intelligence Brief",
      generatedAt: new Date().toISOString(),
      executiveSummary: {
        liquidityIndex: metrics.liquidityIndex,
        operatingCashFlow: metrics.cashFlow,
        workingCapital: metrics.workingCapital,
        netOperatingMargin: `${metrics.netMargin}%`,
        cashRunway: `${metrics.runwayMonths} months`
      },
      interventionsStatus: {
        workingCapitalStrategy: appliedRecommendations['rec-working-capital'] ? 'Applied (+$42,000)' : 'Pending Evaluation',
        pricingElasticityStrategy: appliedRecommendations['rec-pricing-strategy'] ? 'Applied (+4.2% Margin)' : 'Pending Evaluation',
        obsoleteInventoryMitigation: appliedRecommendations['rec-inventory-cost'] ? 'Applied (+$18,500)' : 'Pending Evaluation'
      },
      modelConfidenceScore: "97.4% historical precision"
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Oryn_Executive_Brief_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Board Brief Exported', 'Executive financial summary downloaded successfully.', 'success');
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto" data-purpose="ai-insights-page">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full w-fit mb-1 border border-teal-200/60">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Autonomous Intelligence Layer</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            AI Strategic Recommendations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Algorithmic optimizations formulated from real-time general ledger, bank balances, and customer elasticity.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => openModal('scenario')}
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-lg shadow-xs flex items-center space-x-2 transition-colors"
          >
            <Sliders className="w-4 h-4 text-slate-500" />
            <span>Simulate Scenario</span>
          </button>
          <button
            onClick={handleExportBrief}
            className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Board Deck</span>
          </button>
        </div>
      </div>

      {/* Accuracy & Impact Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Cumulative Liquidity Release</span>
            <Sparkles className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tabular-nums">
            +$96,900
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Sum of all 3 high-confidence AI interventions if fully deployed into Q3/Q4.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Model Backtested Precision</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2 tabular-nums">
            97.4%
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Variance accuracy measured against audited financial closes over prior 14 quarters.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Interactive Copilot Inquiry</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-lg font-bold text-slate-900 mt-2">
            Ask Gemini Copilot
          </div>
          <button
            onClick={() => setCurrentView('ask-bizai')}
            className="mt-2 text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center space-x-1"
          >
            <span>Ask questions on these findings</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3 Detailed Recommendations */}
      <div className="space-y-6">
        {/* Strategy 1: Working Capital Optimization */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 uppercase">
                  Working Capital
                </span>
                <span className="text-xs text-slate-400">Confidence: 98.2%</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                Accounts Payable Term Extension (TSMC &amp; AWS Infrastructure)
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Immediate Impact</div>
                <div className="text-lg sm:text-xl font-bold text-emerald-600 tabular-nums">+$42,000 Liquidity</div>
              </div>
              <button
                onClick={() => applyRecommendation('rec-working-capital')}
                className={`px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-xs ${
                  appliedRecommendations['rec-working-capital']
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white'
                }`}
              >
                {appliedRecommendations['rec-working-capital'] ? 'Strategy Active ✓' : 'Apply Strategy'}
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Algorithmic Observation</span>
              <p className="leading-relaxed">
                Rao &amp; Co. is currently settling AP within 28 days despite tier-1 contracts permitting 45-day cycle windows without penalty fees.
              </p>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Recommended Action</span>
              <p className="leading-relaxed">
                Reconfigure ERP billing automation to dispatch payments at day 44. Preserves capital buffer during monthly supplier cycles.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-800 block mb-1">Secondary Benefits</span>
              <p className="leading-relaxed text-slate-500">
                • Adds +1.2 months to operational cash runway.<br/>
                • Zero impact on credit rating or supplier discounts.
              </p>
            </div>
          </div>
        </div>

        {/* Strategy 2: Dynamic Pricing Optimization */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 uppercase">
                  Revenue &amp; Margin
                </span>
                <span className="text-xs text-slate-400">Confidence: 96.1%</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                Enterprise ERP Gateway Elasticity Adjustment (+8%)
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Margin Impact</div>
                <div className="text-lg sm:text-xl font-bold text-emerald-600 tabular-nums">+4.2% Net Margin</div>
              </div>
              <button
                onClick={() => applyRecommendation('rec-pricing-strategy')}
                className={`px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-xs ${
                  appliedRecommendations['rec-pricing-strategy']
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white'
                }`}
              >
                {appliedRecommendations['rec-pricing-strategy'] ? 'Strategy Active ✓' : 'Apply Strategy'}
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Algorithmic Observation</span>
              <p className="leading-relaxed">
                Competitor benchmark indices show median enterprise pricing at $2,650. Rao &amp; Co. is currently pricing at $2,400 with a 91% contract renewal win rate.
              </p>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Recommended Action</span>
              <p className="leading-relaxed">
                Elevate retail list price from $2,400 to $2,592 (+8%) on upcoming renewals and new bookings starting October 1st.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-800 block mb-1">Secondary Benefits</span>
              <p className="leading-relaxed text-slate-500">
                • +$36,400 quarterly gross profit infusion.<br/>
                • Expected customer churn: &lt; 0.4% statistically negligible.
              </p>
            </div>
          </div>
        </div>

        {/* Strategy 3: Inventory Carrying Cost Mitigation */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60 uppercase">
                  Inventory &amp; Burn
                </span>
                <span className="text-xs text-slate-400">Confidence: 94.7%</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                Clearance &amp; Liquidation of Obsolete Batch B49 (Legacy Connector Hubs)
              </h2>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-medium">Burn Reduction</div>
                <div className="text-lg sm:text-xl font-bold text-emerald-600 tabular-nums">+$18,500 Cash</div>
              </div>
              <button
                onClick={() => applyRecommendation('rec-inventory-cost')}
                className={`px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-all shadow-xs ${
                  appliedRecommendations['rec-inventory-cost']
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white'
                }`}
              >
                {appliedRecommendations['rec-inventory-cost'] ? 'Strategy Active ✓' : 'Apply Strategy'}
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Algorithmic Observation</span>
              <p className="leading-relaxed">
                Batch B49 inventory velocity has fallen below 0.2 turns/quarter, generating $2,800/month in warehouse climate storage and insurance overhead.
              </p>
            </div>
            <div>
              <span className="font-semibold text-slate-800 block mb-1">Recommended Action</span>
              <p className="leading-relaxed">
                Execute liquidation lot sale at $290/unit to clear warehouse rack footprint and liberate captive balance sheet capital.
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
              <span className="font-semibold text-slate-800 block mb-1">Secondary Benefits</span>
              <p className="leading-relaxed text-slate-500">
                • Saves $33,600 annualized in ongoing holding costs.<br/>
                • Frees 180 sq. ft. of active fulfillment staging space.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
