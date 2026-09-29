import React from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { X, HelpCircle, Sparkles, BookOpen, Key } from 'lucide-react';

export default function HelpModal() {
  const { closeModal, setCurrentView } = useFinancial();

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Oryn Intelligence Support</h3>
              <p className="text-xs text-slate-500">Executive documentation and feature guides</p>
            </div>
          </div>
          <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto text-xs text-slate-600">
          <div className="p-3.5 bg-teal-50/70 border border-teal-200/60 rounded-xl space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-teal-900 text-sm">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>How Oryn Copilot Operates</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-xs">
              Oryn continuously evaluates your general ledger, bank balances, and customer order history. Using Google Gemini 2.5 Flash, it identifies working capital bottlenecks, margin leakage, and runway expansions.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Quick Navigation Shortcuts</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <span>Quick Actions Bar</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">⌘K / Ctrl+K</kbd>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between">
                <span>Scenario Simulator</span>
                <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Top Banner</kbd>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Frequently Asked Questions</h4>
            <details className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer">
              <summary className="font-semibold text-slate-800">What happens when I click 'Apply' on an AI Recommendation?</summary>
              <p className="mt-2 text-slate-600 leading-relaxed">
                The strategy directly recalculates your liquid working capital, cash flow, and operating runway. It also stores the execution flag in Firebase Cloud Firestore and LocalStorage.
              </p>
            </details>
            <details className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 cursor-pointer">
              <summary className="font-semibold text-slate-800">How do I test the Gemini AI chat?</summary>
              <p className="mt-2 text-slate-600 leading-relaxed">
                Go to the 'Ask Oryn' tab on the left sidebar. Type any financial or scenario question. It calls Google Gemini live with Rao &amp; Co.'s current financial metrics!
              </p>
            </details>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              closeModal();
              setCurrentView('ask-bizai');
            }}
            className="text-teal-700 font-semibold text-xs hover:underline flex items-center space-x-1"
          >
            <span>Ask question directly in Copilot</span>
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
