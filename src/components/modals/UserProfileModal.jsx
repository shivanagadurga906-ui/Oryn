import React from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { X, User, Shield, Building, Settings, CheckCircle2 } from 'lucide-react';

export default function UserProfileModal() {
  const { closeModal, setCurrentView } = useFinancial();

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-900 text-sm">Executive User Profile</h3>
          <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-md ring-4 ring-slate-100">
            AR
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-base">Arjun Rao</h4>
            <p className="text-xs text-slate-500 font-medium">Chief Financial Officer &amp; Controller</p>
            <div className="flex items-center justify-center space-x-1.5 mt-1 text-xs text-teal-700 font-semibold">
              <Building className="w-3.5 h-3.5" />
              <span>Rao &amp; Co. · Pro Tier</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left text-xs space-y-1.5 text-slate-600">
            <div className="flex justify-between">
              <span>Security Access:</span>
              <span className="font-semibold text-slate-800 flex items-center">
                <Shield className="w-3 h-3 text-emerald-600 mr-1" /> Root Controller
              </span>
            </div>
            <div className="flex justify-between">
              <span>Firebase Cloud ID:</span>
              <span className="font-mono text-slate-800">oryn-1dbb0</span>
            </div>
            <div className="flex justify-between">
              <span>Active Workspace:</span>
              <span className="font-semibold text-slate-800">Production Horizon</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                closeModal();
                setCurrentView('settings');
              }}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center justify-center space-x-1.5"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Corporate Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
