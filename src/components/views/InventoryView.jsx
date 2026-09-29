import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Plus, 
  Search, 
  ArrowUpRight,
  TrendingDown,
  Box
} from 'lucide-react';

export default function InventoryView() {
  const { inventory, openModal } = useFinancial();
  const [filter, setFilter] = useState('all'); // 'all' | 'warning' | 'optimal'

  const totalValuation = inventory.reduce((sum, item) => sum + (item.totalValue || 0), 0);

  const filtered = inventory.filter(item => {
    if (filter === 'warning') return item.status === 'Warning' || item.status === 'Critical';
    if (filter === 'optimal') return item.status === 'Optimal';
    return true;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto" data-purpose="inventory-page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit mb-1">
            <Layers className="w-3.5 h-3.5 text-slate-600" />
            <span>Supply Chain &amp; Working Capital</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Inventory Health &amp; Stock Levels
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor inventory turnover, days on hand (DOH), and automated supplier replenishment.
          </p>
        </div>

        <button
          onClick={() => openModal('reorder', { item: inventory[0] })}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm flex items-center space-x-2 transition-all transform active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Generate Purchase Order</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Total Capital Tied in Inventory</span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tabular-nums">
            ${totalValuation.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 mt-2 inline-block">Across {inventory.length} active catalog SKUs</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Average Days of Inventory on Hand (DOH)</span>
          <div className="text-2xl sm:text-3xl font-bold text-teal-700 mt-1 tabular-nums">
            36.8 days
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">Target benchmark: 35-45 days</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">SKUs Requiring Immediate Reorder</span>
          <div className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1 tabular-nums">
            {inventory.filter(i => i.status === 'Warning' || i.status === 'Critical').length} Items
          </div>
          <span className="text-xs text-amber-600 font-semibold mt-2 inline-block">Approaching safe stock floor</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-200/90 shadow-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          All Items ({inventory.length})
        </button>
        <button
          onClick={() => setFilter('warning')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${filter === 'warning' ? 'bg-amber-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          <AlertTriangle className="w-3 h-3" />
          <span>Needs Attention</span>
        </button>
        <button
          onClick={() => setFilter('optimal')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === 'optimal' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Optimal Stock
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-6">SKU</th>
                <th className="py-3 px-6">Item Designation</th>
                <th className="py-3 px-6 text-right">In Stock</th>
                <th className="py-3 px-6 text-right">Min Threshold</th>
                <th className="py-3 px-6 text-center">Days On Hand</th>
                <th className="py-3 px-6 text-right">Total Valuation</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-medium text-slate-500">{item.sku}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-800">{item.name}</td>
                  <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-900">
                    {item.inStock}
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono text-slate-400">
                    {item.minThreshold}
                  </td>
                  <td className="py-3.5 px-6 text-center font-mono font-semibold text-slate-700">
                    {item.daysOnHand}d
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono font-semibold text-slate-800">
                    ${item.totalValue.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      item.status === 'Warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      item.status === 'Liquidated' ? 'bg-slate-100 text-slate-500 line-through' :
                      'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <button
                      onClick={() => openModal('reorder', { item })}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-semibold rounded text-[11px] transition-colors"
                    >
                      Reorder
                    </button>
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
