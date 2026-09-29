import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { X, Layers, ShoppingBag, Check } from 'lucide-react';

export default function ReorderModal() {
  const { modalState, reorderStock, closeModal } = useFinancial();
  const item = modalState?.data?.item;

  const [qty, setQty] = useState(50);

  if (!item) return null;

  const totalCost = qty * item.unitValuation;

  const handleReorder = (e) => {
    e.preventDefault();
    reorderStock(item.id, qty);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Replenish Inventory PO</h3>
              <p className="text-xs text-slate-500 font-mono">{item.sku}</p>
            </div>
          </div>
          <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleReorder} className="p-5 space-y-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
            <div className="font-bold text-slate-900 text-sm">{item.name}</div>
            <div className="flex justify-between text-slate-500">
              <span>Current Stock: <strong className="text-slate-800">{item.inStock} units</strong></span>
              <span>Min Safe Threshold: <strong className="text-slate-800">{item.minThreshold} units</strong></span>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Reorder Quantity (Units)</label>
            <input
              type="number"
              min="1"
              max="5000"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="p-3 bg-teal-50/70 border border-teal-200/60 rounded-xl space-y-1.5 text-slate-700">
            <div className="flex justify-between">
              <span>Unit Cost Valuation:</span>
              <span className="font-mono font-bold">${item.unitValuation}</span>
            </div>
            <div className="flex justify-between border-t border-teal-200/60 pt-1.5 text-slate-900 font-bold text-sm">
              <span>Total Purchase Obligation:</span>
              <span className="font-mono text-teal-700">${totalCost.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center space-x-1"
            >
              <Check className="w-4 h-4" />
              <span>Issue Purchase Order</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
