import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  Settings, 
  Building, 
  Cpu, 
  Cloud, 
  ShieldCheck, 
  RotateCcw, 
  Save, 
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function SettingsView() {
  const { addToast } = useFinancial();
  const [companyName, setCompanyName] = useState('Rao & Co.');
  const [currency, setCurrency] = useState('USD ($)');
  const [fiscalYear, setFiscalYear] = useState('January - December (Calendar)');
  const [autonomyLevel, setAutonomyLevel] = useState('Semi-Autonomous');
  const [selectedModel, setSelectedModel] = useState('gemini-3.5-flash');

  const handleSave = (e) => {
    e.preventDefault();
    addToast('Preferences Updated', 'Corporate profile and AI parameters saved to cloud.', 'success');
  };

  const resetAllData = () => {
    if (window.confirm("Reset demo data to default baseline? This will clear local modifications.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-5xl w-full mx-auto" data-purpose="settings-page">
      {/* Title */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit mb-1">
          <Settings className="w-3.5 h-3.5 text-slate-600" />
          <span>System &amp; Intelligence Controls</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Settings &amp; Workspace Configuration
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Corporate entity parameters, Gemini model policies, and Firebase cloud connection details.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Company Profile Card */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            <Building className="w-4 h-4 text-teal-600" />
            <span>Corporate Entity Profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">Company Legal Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">Reporting Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>INR (₹)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">Fiscal Year Calendar</label>
              <select
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option>January - December (Calendar)</option>
                <option>April - March (UK / India standard)</option>
                <option>July - June (Institutional)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">Tax EIN / Corporate Identifier</label>
              <input
                type="text"
                disabled
                value="EIN-98-26119818"
                className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-xs cursor-not-allowed font-mono"
              />
            </div>
          </div>
        </div>

        {/* AI Model & Copilot Settings */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            <Cpu className="w-4 h-4 text-teal-600" />
            <span>Google Gemini Copilot Parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">Active Primary Model</label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="gemini-3.5-flash">Gemini 3.5 Flash (Verified · High Speed)</option>
                <option value="gemini-3-flash-preview">Gemini 3 Flash Preview (Verified)</option>
                <option value="gemini-3.5-flash-lite">Gemini 3.5 Flash Lite (Verified · Efficient)</option>
                <option value="gemini-3.8-flash">Gemini 3.8 Flash (High Capacity)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1.5">Advisory Autonomy Level</label>
              <select
                value={autonomyLevel}
                onChange={(e) => setAutonomyLevel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option>Semi-Autonomous (Requires CFO sign-off)</option>
                <option>Full Advisory Autonomous</option>
                <option>Conservative Advisory</option>
              </select>
            </div>
          </div>
        </div>

        {/* Firebase Cloud Connection */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-900">
              <Cloud className="w-4 h-4 text-teal-600" />
              <span>Firebase Cloud Telemetry</span>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>oryn-1dbb0 Connected</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-slate-600">
            <div>
              <span className="text-slate-400 font-sans block text-[11px]">Firebase Project ID</span>
              <span className="text-slate-800 font-semibold">oryn-1dbb0</span>
            </div>
            <div>
              <span className="text-slate-400 font-sans block text-[11px]">Cloud Storage Bucket</span>
              <span className="text-slate-800 font-semibold">oryn-1dbb0.firebasestorage.app</span>
            </div>
            <div>
              <span className="text-slate-400 font-sans block text-[11px]">Messaging Sender ID</span>
              <span className="text-slate-800 font-semibold">261198186467</span>
            </div>
            <div>
              <span className="text-slate-400 font-sans block text-[11px]">Analytics Measurement ID</span>
              <span className="text-slate-800 font-semibold">G-6BV07NPGS1</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={resetAllData}
            className="px-4 py-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Baseline</span>
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm flex items-center space-x-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
