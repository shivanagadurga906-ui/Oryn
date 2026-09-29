import React from 'react';
import { useFinancial } from '../context/FinancialContext';
import { 
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
  ChevronRight,
  X
} from 'lucide-react';

export default function Sidebar() {
  const { currentView, setCurrentView, sidebarOpen, setSidebarOpen, openModal } = useFinancial();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ai-insights', label: 'AI Insights', icon: Sparkles, badge: '3' },
    { id: 'financial-analysis', label: 'Financial Analysis', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Layers },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'cash-flow', label: 'Cash Flow', icon: TrendingUp },
    { id: 'ask-bizai', label: 'Ask Oryn', icon: MessageSquare, highlight: true },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 w-[260px] bg-[#0e1828] text-slate-300 z-50 flex flex-col justify-between 
        border-r border-slate-800 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="p-5 flex flex-col h-full overflow-y-auto">
          {/* Logo & Close Button (Mobile) */}
          <div className="flex items-center justify-between mb-8">
            <button 
              onClick={() => { setCurrentView('dashboard'); setSidebarOpen(false); }}
              className="flex items-center space-x-3 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center font-bold text-white text-xl shadow-md group-hover:bg-teal-400 transition-colors">
                O
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight tracking-tight">Oryn</div>
                <div className="text-xs text-teal-400 font-medium">Financial Copilot</div>
              </div>
            </button>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Navigation Menu */}
          <nav className="space-y-1.5 font-medium text-sm flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all text-left
                    ${isActive 
                      ? 'bg-[#1e293b] text-white font-semibold shadow-sm border-l-2 border-teal-400' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }
                    ${item.highlight && !isActive ? 'hover:text-teal-300' : ''}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-teal-400' : item.highlight ? 'text-teal-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#d97706] text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Sidebar Section */}
          <div className="pt-4 border-t border-slate-800/80 space-y-4">
            <div className="space-y-1 text-sm pb-2">
              <button
                onClick={() => {
                  setCurrentView('import-data');
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-3.5 py-2 rounded-lg transition-colors text-left
                  ${currentView === 'import-data' ? 'bg-[#1e293b] text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}
                `}
              >
                <UploadCloud className="w-5 h-5 text-slate-400" />
                <span>Import data</span>
              </button>

              <button
                onClick={() => {
                  setCurrentView('settings');
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-3.5 py-2 rounded-lg transition-colors text-left
                  ${currentView === 'settings' ? 'bg-[#1e293b] text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}
                `}
              >
                <Settings className="w-5 h-5 text-slate-400" />
                <span>Settings</span>
              </button>
            </div>

            {/* User Profile Card */}
            <div 
              onClick={() => openModal('profile')}
              className="flex items-center justify-between pt-2 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer group transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center font-bold text-xs text-white shadow-inner">
                  AR
                </div>
                <div>
                  <div className="text-sm font-semibold text-white leading-tight">Arjun Rao</div>
                  <div className="text-xs text-slate-400">Rao &amp; Co. · Pro</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
