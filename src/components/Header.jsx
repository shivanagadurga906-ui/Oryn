import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { 
  Menu, 
  Search, 
  HelpCircle, 
  Bell, 
  Sparkles, 
  Cloud, 
  CloudLightning, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function Header() {
  const { currentView, setCurrentView, setSidebarOpen, cloudStatus, openModal } = useFinancial();
  const [showNotifications, setShowNotifications] = useState(false);

  const viewTitles = {
    'dashboard': 'Dashboard',
    'ai-insights': 'AI Strategic Insights',
    'financial-analysis': 'Financial Analysis & P&L',
    'products': 'Product Margins & Catalog',
    'inventory': 'Inventory Optimization',
    'payments': 'Payments & Invoicing',
    'cash-flow': '13-Week Cash Flow',
    'ask-bizai': 'Oryn Executive Copilot',
    'import-data': 'Import Data & Integrations',
    'settings': 'Settings & Workspace Configuration'
  };

  const notifications = [
    { id: 1, title: 'Working Capital Opportunity', text: 'AI detected $42k liquidity gain via AP renegotiation.', time: '12m ago', unread: true },
    { id: 2, title: 'Invoice Overdue', text: 'BlueStone Logistics ($18,500) is 2 days past due date.', time: '1h ago', unread: true },
    { id: 3, title: 'Low Stock Alert', text: 'Edge Sensor Suite v3 reached reorder threshold (38 units left).', time: '3h ago', unread: false }
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between flex-shrink-0 z-30 sticky top-0 shadow-sm">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center space-x-3 sm:space-x-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 focus:outline-none"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <span 
            onClick={() => setCurrentView('dashboard')}
            className="hover:text-slate-700 cursor-pointer hidden sm:inline"
          >
            Workspace
          </span>
          <span className="hidden sm:inline">›</span>
          <span className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-none">
            {viewTitles[currentView] || 'Overview'}
          </span>
        </div>
      </div>

      {/* Right: Quick Controls, Cloud Status, Notifications, Profile */}
      <div className="flex items-center space-x-3 sm:space-x-5">
        {/* Quick Search / Command Bar Trigger */}
        <button
          onClick={() => openModal('command-palette')}
          className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs text-slate-500 transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Quick actions...</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded text-[10px] font-mono text-slate-600">⌘K</kbd>
        </button>

        {/* Firebase Cloud Sync Badge */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200/60">
          {cloudStatus === 'syncing' ? (
            <>
              <CloudLightning className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
              <span className="hidden sm:inline">Syncing oryn-1dbb0...</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
              <span className="hidden sm:inline">Firebase Connected</span>
              <span className="sm:hidden text-[10px]">Synced</span>
            </>
          )}
        </div>

        {/* Quick Ask AI button if not on chat page */}
        {currentView !== 'ask-bizai' && (
          <button
            onClick={() => setCurrentView('ask-bizai')}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 rounded-lg text-xs font-semibold border border-teal-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Ask Oryn</span>
          </button>
        )}

        {/* Help Centre */}
        <button 
          onClick={() => openModal('help')}
          className="flex items-center space-x-1 text-xs font-medium text-slate-500 hover:text-slate-800"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span className="hidden md:inline">Help centre</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg relative hover:bg-slate-100 focus:outline-none"
          >
            <Bell className="w-4 h-4" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></div>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Live System Alerts</span>
                <span className="text-[11px] bg-rose-100 text-rose-700 font-semibold px-2 py-0.5 rounded-full">2 unread</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map(n => (
                  <div 
                    key={n.id}
                    onClick={() => {
                      if (n.id === 1) setCurrentView('ai-insights');
                      else if (n.id === 2) setCurrentView('payments');
                      else if (n.id === 3) setCurrentView('inventory');
                      setShowNotifications(false);
                    }}
                    className="p-3 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="font-semibold text-xs text-slate-800 flex items-center space-x-1.5">
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>}
                        <span>{n.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div 
          onClick={() => openModal('profile')}
          className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors ring-2 ring-transparent hover:ring-teal-400"
          title="Arjun Rao - Profile"
        >
          AR
        </div>
      </div>
    </header>
  );
}
