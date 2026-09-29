import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { X, Sliders, Sparkles, TrendingUp, Check } from 'lucide-react';

export default function ScenarioSimulationModal() {
  const { metrics, setMetrics, closeModal, addToast } = useFinancial();

  const [revChange, setRevChange] = useState(10); // %
  const [cogsSavings, setCogsSavings] = useState(5); // %
  const [dsoChange, setDsoChange] = useState(-5); // days

  // Calculate dynamic projected outcomes
  const projectedRevenue = Math.round(metrics.revenueMTD * (1 + revChange / 100));
  const projectedCashFlow = Math.round(metrics.cashFlow * (1 + revChange / 100) + (cogsSavings * 1200) - (dsoChange * 2800));
  const projectedMargin = Number((metrics.netMargin + (cogsSavings * 0.4) + (revChange * 0.15)).toFixed(1));
  const projectedRunway = Number((metrics.runwayMonths * (projectedCashFlow / metrics.cashFlow)).toFixed(1));

  const applyScenario = () => {
    setMetrics(prev => ({
      ...prev,
      cashFlow: projectedCashFlow,
      netMargin: projectedMargin,
      runwayMonths: projectedRunway,
      revenueMTD: projectedRevenue
    }));
    addToast('Scenario Adopted', `Simulated variables incorporated into current financial baseline.`, 'success');
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Corporate Scenario Simulator</h3>
              <p className="text-xs text-slate-500">Test forward financial resilience under macro variances</p>
            </div>
          </div>
          <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Sliders */}
        <div className="p-6 space-y-5 text-xs">
          {/* Slider 1 */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
              <span>Topline Revenue Growth Variance</span>
              <span className="font-mono text-teal-700 font-bold text-sm">{revChange > 0 ? `+${revChange}%` : `${revChange}%`}</span>
            </div>
            <input
              type="range"
              min="-25"
              max="50"
              step="5"
              value={revChange}
              onChange={(e) => setRevChange(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Slider 2 */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
              <span>COGS Supplier Savings Target</span>
              <span className="font-mono text-teal-700 font-bold text-sm">+{cogsSavings}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              step="1"
              value={cogsSavings}
              onChange={(e) => setCogsSavings(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Slider 3 */}
          <div>
            <div className="flex justify-between font-semibold text-slate-700 mb-1.5">
              <span>DSO Receivables Collection Velocity</span>
              <span className="font-mono text-teal-700 font-bold text-sm">{dsoChange} days</span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              step="1"
              value={dsoChange}
              onChange={(e) => setDsoChange(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* Result Card Preview */}
          <div className="p-4 bg-teal-50/60 border border-teal-200/80 rounded-xl space-y-3 mt-4">
            <div className="flex items-center space-x-2 text-teal-800 font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Projected Scenario Equilibrium</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-700">
              <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                <span className="text-[11px] text-slate-400 block">Projected Cash Flow</span>
                <span className="font-bold text-slate-900 text-sm tabular-nums">${projectedCashFlow.toLocaleString()}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                <span className="text-[11px] text-slate-400 block">Projected Net Margin</span>
                <span className="font-bold text-slate-900 text-sm tabular-nums">{projectedMargin}%</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                <span className="text-[11px] text-slate-400 block">Projected Monthly Revenue</span>
                <span className="font-bold text-slate-900 text-sm tabular-nums">${projectedRevenue.toLocaleString()}</span>
              </div>
              <div className="bg-white p-2.5 rounded-lg border border-teal-100">
                <span className="text-[11px] text-slate-400 block">Projected Runway</span>
                <span className="font-bold text-slate-900 text-sm tabular-nums">{projectedRunway} mos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={applyScenario}
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center space-x-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Adopt as Active Baseline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
