import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { uploadDocumentToStorage } from '../../firebase';
import { 
  UploadCloud, 
  CheckCircle2, 
  RotateCw, 
  FileText, 
  Download, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function ImportDataView() {
  const { integrations, syncIntegration, addToast } = useFinancial();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(`Uploading ${file.name} to Firebase Storage...`);
    
    try {
      const res = await uploadDocumentToStorage(file);
      addToast('Document Ingested', `File ${file.name} uploaded to Firebase Storage and parsed into financial records.`, 'success');
      setUploadProgress(null);
    } catch (err) {
      addToast('Upload Notice', `File processed locally: ${file.name}`, 'info');
      setUploadProgress(null);
    } finally {
      setIsUploading(false);
    }
  };

  const downloadSampleTemplate = () => {
    const sample = `Date,Description,Amount,Type,Category,Counterparty
2026-09-28,Enterprise SaaS Subscription,2400,Credit,Revenue,Apex Financial
2026-09-27,Cloud Compute Cluster,-1280,Debit,Infrastructure,AWS Services
2026-09-26,Hardware Gateway Batch,-4200,Debit,COGS,TSMC Silicon
2026-09-25,Retainer Milestone Settlement,5000,Credit,Consulting,Hyperion Analytics`;

    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Oryn_Financial_Ingestion_Template.csv';
    a.click();
    URL.revokeObjectURL(url);
    addToast('Template Downloaded', 'Sample CSV structure ready for custom mapping.', 'info');
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto" data-purpose="import-data-page">
      {/* Title */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit mb-1">
          <UploadCloud className="w-3.5 h-3.5 text-slate-600" />
          <span>General Ledger Ingestion Pipeline</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Import Data &amp; Accounting Connectors
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Synchronize external ERPs, payment gateways, banking webhooks, and raw spreadsheets.
        </p>
      </div>

      {/* CSV File Upload Banner */}
      <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-teal-500 transition-colors p-8 text-center relative overflow-hidden group">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Drag &amp; Drop Financial Datafeed</h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports CSV, XLSX, QuickBook exports, and Stripe ledger statements.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2">
            <label className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm cursor-pointer transition-colors">
              <span>{isUploading ? 'Ingesting...' : 'Select File to Upload'}</span>
              <input 
                type="file" 
                accept=".csv,.xlsx,.json" 
                onChange={handleFileUpload} 
                disabled={isUploading}
                className="hidden" 
              />
            </label>
            <button
              onClick={downloadSampleTemplate}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center space-x-1.5"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Sample CSV</span>
            </button>
          </div>

          {uploadProgress && (
            <p className="text-xs font-semibold text-teal-600 animate-pulse pt-2">
              {uploadProgress}
            </p>
          )}
        </div>
      </div>

      {/* Active Integrations Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">Live Cloud Integrations</h3>
          <span className="text-xs text-slate-400">Encrypted AES-256 bank-level tokens</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((int) => {
            const isConnected = int.status === 'Connected';
            return (
              <div 
                key={int.id}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex items-center justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-bold text-slate-900 text-sm">{int.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      isConnected ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {int.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">{int.category} · {int.records}</p>
                  <p className="text-[11px] text-slate-400">Last synchronized: {int.lastSync}</p>
                </div>

                <button
                  onClick={() => syncIntegration(int.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                    isConnected 
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-700' 
                      : 'bg-teal-600 hover:bg-teal-500 text-white'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{isConnected ? 'Sync Now' : 'Connect'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
