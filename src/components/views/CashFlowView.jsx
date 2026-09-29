import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sliders, 
  Landmark, 
  ShieldCheck, 
  Sparkles,
  Download
} from 'lucide-react';

export default function CashFlowView() {
  const { metrics, openModal, addToast } = useFinancial();
  const [dsoAdjustment, setDsoAdjustment] = useState(0); // days
  const [revDelta, setRevDelta] = useState(0); // percent

  const bankAccounts = [
    { name: 'Silicon Valley Bank (SVB)', type: 'Primary Operating Account', balance: 320400, routing: '••• 8912', status: 'Active' },
    { name: 'JPMorgan Chase Commercial', type: 'Payroll & Tax Safe Reserve', balance: 115800, routing: '••• 4401', status: 'Active' },
    { name: 'Stripe Merchant Gateway', type: 'Credit Card Settlement Escrow', balance: 50000, routing: '••• 9028', status: 'Active' }
  ];

  const totalBankBalances = bankAccounts.reduce((sum, b) => sum + b.balance, 0);

  // Dynamic simulated runway calculation
  const simulatedRunway = Number((metrics.runwayMonths * (1 + revDelta / 100) + (dsoAdjustment * 0.05)).toFixed(1));

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto" data-purpose="cash-flow-page">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
            <span>Treasury &amp; Liquidity Horizon</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            13-Week Cash Flow Horizon
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time multi-entity cash positioning, burn trajectory, and liquidity stress testing.
          </p>
        </div>

        <button
          onClick={() => openModal('scenario')}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm flex items-center space-x-2 transition-all transform active:scale-95 self-start sm:self-auto"
        >
          <Sliders className="w-4 h-4" />
          <span>Launch Scenario Simulator</span>
        </button>
      </div>

      {/* Bank Account Balances */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {bankAccounts.map((account, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Landmark className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  {account.status}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm mt-3">{account.name}</h3>
              <p className="text-xs text-slate-500">{account.type} · {account.routing}</p>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-4 tabular-nums">
              ${account.balance.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* 13-Week Projection Visualizer */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Weekly Cash Reservoir vs Projected Outflow</h3>
            <p className="text-xs text-slate-500">13-week forward model factoring seasonality and collection curves</p>
          </div>
          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center text-teal-600">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 mr-1.5"></span>
              Net Cash Position
            </span>
            <span className="flex items-center text-rose-500">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400 mr-1.5"></span>
              Weekly Net Burn
            </span>
          </div>
        </div>

        {/* 13 Week Bars */}
        <div className="h-56 w-full flex items-end justify-between gap-2 pt-4 pb-2 border-b border-slate-100">
          {[
            { w: 'W1', cash: 486, burn: 38 },
            { w: 'W2', cash: 494, burn: 41 },
            { w: 'W3', cash: 512, burn: 35 },
            { w: 'W4', cash: 528, burn: 39 },
            { w: 'W5', cash: 518, burn: 46 },
            { w: 'W6', cash: 542, burn: 34 },
            { w: 'W7', cash: 560, burn: 38 },
            { w: 'W8', cash: 575, burn: 42 },
            { w: 'W9', cash: 590, burn: 36 },
            { w: 'W10', cash: 615, burn: 40 },
            { w: 'W11', cash: 630, burn: 37 },
            { w: 'W12', cash: 648, burn: 44 },
            { w: 'W13', cash: 672, burn: 39 }
          ].map((bar, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="w-full flex items-end justify-center gap-1 h-44">
                {/* Cash Balance Bar */}
                <div 
                  className="w-1/2 bg-teal-600 group-hover:bg-teal-500 rounded-t-sm transition-all"
                  style={{ height: `${(bar.cash / 700) * 100}%` }}
                  title={`${bar.w} Projected Cash: $${bar.cash}k`}
                />
                {/* Burn Bar */}
                <div 
                  className="w-1/2 bg-rose-300 group-hover:bg-rose-400 rounded-t-sm transition-all"
                  style={{ height: `${(bar.burn / 700) * 100 * 3}%` }}
                  title={`${bar.w} Projected Burn: $${bar.burn}k`}
                />
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{bar.w}</span>
            </div>
          ))}
        </div>

        {/* Interactive Sensitivity Sliders */}
        <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 p-5 rounded-xl border border-slate-200">
          <div className="flex items-center space-x-2 mb-3">
            <Sliders className="w-4 h-4 text-teal-700" />
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Quick Liquidity Stress-Test</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Revenue Delta Scenario</span>
                <span className="font-mono text-teal-700 font-bold">{revDelta > 0 ? `+${revDelta}%` : `${revDelta}%`}</span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={revDelta}
                onChange={(e) => setRevDelta(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
              <span className="text-[11px] text-slate-400">Simulate macroeconomic volatility or sales surges</span>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Days Sales Outstanding (DSO) Shift</span>
                <span className="font-mono text-teal-700 font-bold">{dsoAdjustment > 0 ? `+${dsoAdjustment} days` : `${dsoAdjustment} days`}</span>
              </div>
              <input
                type="range"
                min="-15"
                max="15"
                step="1"
                value={dsoAdjustment}
                onChange={(e) => setDsoAdjustment(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
              <span className="text-[11px] text-slate-400">Faster collections expand buffer (+1 day ≈ +$4k cash)</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-600">
              Stress-Tested Runway Result: <strong className="text-slate-900 font-bold text-sm ml-1">{simulatedRunway} months</strong>
            </span>
            <button
              onClick={() => {
                setRevDelta(0);
                setDsoAdjustment(0);
                addToast('Parameters Reset', 'Returned to verified baseline treasury forecast.', 'info');
              }}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium"
            >
              Reset to Base
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
