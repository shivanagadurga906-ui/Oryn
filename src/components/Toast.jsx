import React from 'react';
import { useFinancial } from '../context/FinancialContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useFinancial();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700/80 flex items-start space-x-3 animate-in slide-in-from-bottom-3 duration-200"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0 text-xs">
            <h4 className="font-bold text-white leading-tight">{toast.title}</h4>
            <p className="text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
