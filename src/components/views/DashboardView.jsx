import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  ChevronRight,
  Filter,
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';

export default function DashboardView() {
  const { 
    metrics, 
    setCurrentView, 
    openModal, 
    transactions, 
    appliedRecommendations,
    applyRecommendation 
  } = useFinancial();

  const [chartView, setChartView] = useState('optimized'); // 'base' | 'optimized'
  const [txFilter, setTxFilter] = useState('all');

  const filteredTxns = transactions.filter(t => {
    if (txFilter === 'inflow') return t.type === 'Credit';
    if (txFilter === 'outflow') return t.type === 'Debit';
    return true;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto" data-purpose="dashboard-content">
      {/* Hero Welcome Banner */}
      <div className="hero-bg-pattern rounded-2xl p-6 sm:p-8 text-white shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Background Vector Rings */}
        <div className="absolute right-0 top-0 bottom-0 pointer-events-none opacity-20">
          <svg fill="none" height="220" viewBox="0 0 450 220" width="450">
            <circle cx="320" cy="110" r="180" stroke="white" strokeDasharray="4 4" strokeWidth="1.5"></circle>
            <circle cx="320" cy="110" r="120" stroke="white" strokeWidth="1.5"></circle>
            <circle cx="320" cy="110" r="60" stroke="white" strokeDasharray="2 2" strokeWidth="1.5"></circle>
          </svg>
        </div>

        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-teal-300 uppercase">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span>AI Executive Briefing · Q3 2026</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, Arjun
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Your enterprise liquidity index stands at <span className="font-semibold text-white">94.2 / 100</span>, fully optimized for Q3 market expansion. 
            Oryn has identified <span className="underline decoration-teal-400 font-semibold cursor-pointer" onClick={() => setCurrentView('ai-insights')}>3 actionable interventions</span> to unlock an estimated <span className="text-teal-300 font-bold">+$96,900</span> in free working capital.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentView('ask-bizai')}
            className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 active:bg-teal-600 text-white font-semibold text-sm rounded-lg shadow-sm flex items-center space-x-2 transition-all transform active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask Oryn Copilot</span>
          </button>
          <button
            onClick={() => openModal('scenario')}
            className="px-4 py-2.5 bg-slate-900/60 hover:bg-slate-900/80 border border-slate-700 text-slate-100 font-medium text-sm rounded-lg backdrop-blur-sm transition-colors"
          >
            <span>Run Scenario</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Cash Flow */}
        <div 
          onClick={() => setCurrentView('cash-flow')}
          className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Operating Cash Flow</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
            ${metrics.cashFlow.toLocaleString()}
          </div>
          <div className="mt-3 flex items-center space-x-2 text-xs">
            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              {metrics.cashFlowDelta}
            </span>
            <span className="text-slate-400">vs last month</span>
          </div>
        </div>

        {/* Metric 2: Working Capital */}
        <div 
          onClick={() => setCurrentView('financial-analysis')}
          className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Liquid Working Capital</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
            ${metrics.workingCapital.toLocaleString()}
          </div>
          <div className="mt-3 flex items-center space-x-2 text-xs">
            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              {metrics.workingCapitalDelta}
            </span>
            <span className="text-slate-400">vs Q2 close</span>
          </div>
        </div>

        {/* Metric 3: Net Operating Margin */}
        <div 
          onClick={() => setCurrentView('products')}
          className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Net Operating Margin</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
            {metrics.netMargin}%
          </div>
          <div className="mt-3 flex items-center space-x-2 text-xs">
            <span className="inline-flex items-center text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold">
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
              {metrics.netMarginDelta}
            </span>
            <span className="text-slate-400">vs benchmark</span>
          </div>
        </div>

        {/* Metric 4: Cash Runway */}
        <div 
          onClick={() => setCurrentView('cash-flow')}
          className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-2">
            <span>Operating Runway</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
            {metrics.runwayMonths} <span className="text-base font-normal text-slate-500">months</span>
          </div>
          <div className="mt-3 flex items-center space-x-2 text-xs">
            <span className="inline-flex items-center text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-semibold">
              <ShieldCheck className="w-3 h-3 mr-0.5" />
              Defensive buffer
            </span>
            <span className="text-slate-400">burn: $38.2k/mo</span>
          </div>
        </div>
      </div>

      {/* Main Analytical Section: Trajectory Chart & Live AI Interventions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Financial Trajectory Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-900 text-base">Cash Flow Trajectory &amp; AI Forecast</h3>
                <span className="text-[11px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full border border-teal-200/60">
                  Real-time
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Historical inflows compared against synthetic forward predictions</p>
            </div>

            {/* Toggle Baseline vs AI Optimized */}
            <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setChartView('base')}
                className={`px-3 py-1 rounded-md transition-colors ${chartView === 'base' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Base Plan
              </button>
              <button
                onClick={() => setChartView('optimized')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center space-x-1 ${chartView === 'optimized' ? 'bg-teal-600 text-white shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <Sparkles className="w-3 h-3" />
                <span>AI Optimized</span>
              </button>
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="h-64 w-full relative flex items-end pt-4 pb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="baseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#64748b" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#64748b" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="190" x2="600" y2="190" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Area & Line */}
              {chartView === 'optimized' ? (
                <>
                  <path
                    d="M 20 150 Q 120 130, 200 110 T 380 70 T 580 35 L 580 190 L 20 190 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M 20 150 Q 120 130, 200 110 T 380 70 T 580 35"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  {/* Forecast Dash segment */}
                  <line x1="380" y1="70" x2="580" y2="35" stroke="#14b8a6" strokeWidth="3" strokeDasharray="5 5" />
                  {/* High Value Marker */}
                  <circle cx="580" cy="35" r="5" fill="#0d9488" stroke="white" strokeWidth="2" />
                </>
              ) : (
                <>
                  <path
                    d="M 20 150 Q 120 135, 200 125 T 380 100 T 580 85 L 580 190 L 20 190 Z"
                    fill="url(#baseGradient)"
                  />
                  <path
                    d="M 20 150 Q 120 135, 200 125 T 380 100 T 580 85"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="580" cy="85" r="5" fill="#64748b" stroke="white" strokeWidth="2" />
                </>
              )}
            </svg>
          </div>

          {/* Month labels & chart summary */}
          <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
            <span>May 2026</span>
            <span>Jun 2026</span>
            <span>Jul 2026</span>
            <span>Aug 2026 (Actual)</span>
            <span className="text-teal-600 font-semibold">Sep 2026 (Forecast)</span>
            <span className="text-teal-600 font-semibold">Oct 2026 (AI Target)</span>
          </div>

          {/* Chart footer stats */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
              <span className="font-semibold text-slate-700">Projected Q4 Exit Runrate:</span>
              <span className="text-teal-700 font-bold">$239,400 / mo</span>
            </div>
            <button
              onClick={() => openModal('scenario')}
              className="text-teal-700 font-semibold hover:text-teal-800 flex items-center space-x-1"
            >
              <span>Simulate custom variables</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right 1 Col: Top AI Strategic Recommendations */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-base">Key AI Interventions</h3>
              </div>
              <button 
                onClick={() => setCurrentView('ai-insights')}
                className="text-xs text-teal-600 hover:text-teal-700 font-semibold"
              >
                View all (3)
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Rec 1 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-800">1. Working Capital Optimization</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    +$42,000
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Extend AP terms from 30 to 45 days with TSMC &amp; AWS vendors.
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Risk: Minimal</span>
                  <button
                    onClick={() => applyRecommendation('rec-working-capital')}
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                      appliedRecommendations['rec-working-capital']
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}
                  >
                    {appliedRecommendations['rec-working-capital'] ? 'Applied ✓' : 'Apply'}
                  </button>
                </div>
              </div>

              {/* Rec 2 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-800">2. Dynamic Pricing Adjustment</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    +4.2% Margin
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Price elasticity model suggests +8% increase on Enterprise ERP Gateway.
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Risk: Low</span>
                  <button
                    onClick={() => applyRecommendation('rec-pricing-strategy')}
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                      appliedRecommendations['rec-pricing-strategy']
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}
                  >
                    {appliedRecommendations['rec-pricing-strategy'] ? 'Applied ✓' : 'Apply'}
                  </button>
                </div>
              </div>

              {/* Rec 3 */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-800">3. Liquidate Obsolete SKU B49</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                    +$18,500
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Discount legacy connector inventory to eliminate $2.8k monthly carrying cost.
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Carrying: -$2.8k/mo</span>
                  <button
                    onClick={() => applyRecommendation('rec-inventory-cost')}
                    className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-all ${
                      appliedRecommendations['rec-inventory-cost']
                        ? 'bg-emerald-100 text-emerald-800 cursor-default'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}
                  >
                    {appliedRecommendations['rec-inventory-cost'] ? 'Applied ✓' : 'Apply'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setCurrentView('ai-insights')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Explore AI Scenario Model</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Ledger Transactions */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recent Ledger Activity</h3>
            <p className="text-xs text-slate-500">Live synchronized journal entries from QuickBooks &amp; Stripe</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
              <button
                onClick={() => setTxFilter('all')}
                className={`px-3 py-1 rounded-md transition-colors ${txFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
              >
                All
              </button>
              <button
                onClick={() => setTxFilter('inflow')}
                className={`px-3 py-1 rounded-md transition-colors ${txFilter === 'inflow' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
              >
                Inflow
              </button>
              <button
                onClick={() => setTxFilter('outflow')}
                className={`px-3 py-1 rounded-md transition-colors ${txFilter === 'outflow' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
              >
                Outflow
              </button>
            </div>

            <button
              onClick={() => setCurrentView('financial-analysis')}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center space-x-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
              <span>Full P&amp;L Ledger</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-6">Description</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-6 text-right">Amount</th>
                <th className="py-3 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredTxns.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-medium text-slate-500">{tx.id}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-800">{tx.description}</td>
                  <td className="py-3.5 px-6 text-slate-600">{tx.category}</td>
                  <td className="py-3.5 px-6 text-slate-400">{tx.date}</td>
                  <td className={`py-3.5 px-6 text-right font-bold tabular-nums ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                    {tx.amount > 0 ? `+$${tx.amount.toLocaleString()}` : `-$${Math.abs(tx.amount).toLocaleString()}`}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200/60">
                      <CheckCircle className="w-3 h-3 mr-1 text-teal-500" />
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
