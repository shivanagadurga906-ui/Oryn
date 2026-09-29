import React, { useState, useEffect } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  Search, 
  LayoutDashboard, 
  Sparkles, 
  BarChart3, 
  Package, 
  Layers, 
  CreditCard, 
  TrendingUp, 
  MessageSquare, 
  UploadCloud, 
  Settings, 
  Sliders, 
  Plus,
  X
} from 'lucide-react';

export default function CommandPaletteModal() {
  const { closeModal, setCurrentView, openModal } = useFinancial();
  const [query, setQuery] = useState('');

  const actions = [
    { title: 'Go to Dashboard', category: 'Navigation', icon: LayoutDashboard, action: () => setCurrentView('dashboard') },
    { title: 'Go to AI Strategic Insights', category: 'Navigation', icon: Sparkles, action: () => setCurrentView('ai-insights') },
    { title: 'Go to Financial Analysis (P&L)', category: 'Navigation', icon: BarChart3, action: () => setCurrentView('financial-analysis') },
    { title: 'Go to Products Catalog', category: 'Navigation', icon: Package, action: () => setCurrentView('products') },
    { title: 'Go to Inventory Management', category: 'Navigation', icon: Layers, action: () => setCurrentView('inventory') },
    { title: 'Go to Payments & Invoicing', category: 'Navigation', icon: CreditCard, action: () => setCurrentView('payments') },
    { title: 'Go to 13-Week Cash Flow', category: 'Navigation', icon: TrendingUp, action: () => setCurrentView('cash-flow') },
    { title: 'Ask Oryn Financial Copilot', category: 'Intelligence', icon: MessageSquare, action: () => setCurrentView('ask-bizai') },
    { title: 'Simulate Custom Financial Scenario', category: 'Simulation', icon: Sliders, action: () => openModal('scenario') },
    { title: 'Add New Product SKU', category: 'Action', icon: Plus, action: () => openModal('add-product') },
    { title: 'Create Customer Invoice', category: 'Action', icon: CreditCard, action: () => openModal('create-invoice') },
    { title: 'Import Data & Manage Connectors', category: 'Data', icon: UploadCloud, action: () => setCurrentView('import-data') },
    { title: 'Workspace Settings & Profile', category: 'Settings', icon: Settings, action: () => setCurrentView('settings') }
  ];

  const filtered = actions.filter(a => a.title.toLowerCase().includes(query.toLowerCase()) || a.category.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (item) => {
    closeModal();
    item.action();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center space-x-3 bg-white">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or jump to page... (e.g. cash flow, scenario, products)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono text-slate-500">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className="w-full text-left p-3 rounded-xl hover:bg-slate-100/80 transition-colors flex items-center justify-between group text-xs"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-teal-50 text-slate-600 group-hover:text-teal-700 flex items-center justify-center transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-slate-800 group-hover:text-slate-900">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-600 px-2 py-0.5 rounded bg-slate-50 border border-slate-100">
                    {item.category}
                  </span>
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-400">
              No matching actions or destinations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
