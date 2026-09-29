import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  Download, 
  Search, 
  Filter, 
  Calendar,
  PieChart,
  FileText,
  DollarSign
} from 'lucide-react';

export default function FinancialAnalysisView() {
  const { metrics, addToast } = useFinancial();
  const [timeRange, setTimeRange] = useState('q3'); // '30d' | 'q3' | 'ytd'
  const [searchTerm, setSearchTerm] = useState('');

  const pnlItems = [
    { code: '4000', name: 'Software Subscription Revenue', q3: '$178,200', ytd: '$512,000', margin: '82%', type: 'Revenue' },
    { code: '4100', name: 'Hardware Gateway Deployments', q3: '$76,800', ytd: '$224,500', margin: '42%', type: 'Revenue' },
    { code: '4200', name: 'Strategic Advisory & Retainers', q3: '$29,500', ytd: '$88,000', margin: '64%', type: 'Revenue' },
    { code: '5000', name: 'Silicon Components & COGS', q3: '$64,200', ytd: '$188,400', margin: '-', type: 'Cost' },
    { code: '5100', name: 'AWS & Cloud Infrastructure Compute', q3: '$38,400', ytd: '$112,000', margin: '-', type: 'Cost' },
    { code: '6000', name: 'Engineering & R&D Payroll', q3: '$48,200', ytd: '$144,000', margin: '-', type: 'Expense' },
    { code: '6100', name: 'Sales & Customer Acquisition', q3: '$28,600', ytd: '$84,500', margin: '-', type: 'Expense' },
    { code: '6200', name: 'General & Administrative (G&A)', q3: '$17,300', ytd: '$51,200', margin: '-', type: 'Expense' }
  ];

  const filteredItems = pnlItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.includes(searchTerm)
  );

  const handleExportPL = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Code,Account Name,Q3 Total,YTD Total,Margin,Type\n" +
      pnlItems.map(e => `${e.code},"${e.name}",${e.q3},${e.ytd},${e.margin},${e.type}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Rao_Co_P_and_L_${timeRange}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('P&L Exported', 'Financial statement CSV downloaded successfully.', 'success');
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto" data-purpose="financial-analysis-page">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit mb-1">
            <BarChart3 className="w-3.5 h-3.5 text-slate-600" />
            <span>P&amp;L Statements &amp; Unit Economics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Financial Performance Analysis
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Detailed variance decomposition, margin health, and operating expense ledger.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1.5 rounded-md transition-colors ${timeRange === '30d' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
            >
              Last 30 Days
            </button>
            <button
              onClick={() => setTimeRange('q3')}
              className={`px-3 py-1.5 rounded-md transition-colors ${timeRange === 'q3' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
            >
              Q3 2026
            </button>
            <button
              onClick={() => setTimeRange('ytd')}
              className={`px-3 py-1.5 rounded-md transition-colors ${timeRange === 'ytd' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'}`}
            >
              YTD
            </button>
          </div>

          <button
            onClick={handleExportPL}
            className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-lg shadow-xs flex items-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Gross Revenue</span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tabular-nums">$284,500</div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">+14.2% vs Q2</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Cost of Goods Sold (COGS)</span>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tabular-nums">$102,600</div>
          <span className="text-xs text-slate-500 mt-2 inline-block">36.1% revenue share</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Gross Margin</span>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-1 tabular-nums">63.9%</div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">+2.1% expansion</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Operating EBITDA</span>
          <div className="text-2xl sm:text-3xl font-bold text-teal-700 mt-1 tabular-nums">$78,400</div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">27.5% EBITDA margin</span>
        </div>
      </div>

      {/* Expense Allocation Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-6 shadow-sm">
        <h3 className="font-bold text-slate-900 text-base mb-4">Operating Expense Distribution (OpEx)</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Engineering &amp; Platform Architecture (38%)</span>
              <span className="text-slate-900 font-mono">$48,200</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-teal-600 rounded-full" style={{ width: '38%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Cloud Infrastructure &amp; Data Fabric (27%)</span>
              <span className="text-slate-900 font-mono">$38,400</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '27%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">Go-to-Market &amp; Enterprise Sales (22%)</span>
              <span className="text-slate-900 font-mono">$28,600</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '22%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700">General &amp; Legal Compliance (13%)</span>
              <span className="text-slate-900 font-mono">$17,300</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600 rounded-full" style={{ width: '13%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* P&L Statement Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 text-base">General Ledger Accounts</h3>
            <p className="text-xs text-slate-500">Hierarchical chart of accounts</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search ledger account..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-6">GL Code</th>
                <th className="py-3 px-6">Account Designation</th>
                <th className="py-3 px-6 text-center">Classification</th>
                <th className="py-3 px-6 text-right">Q3 Total</th>
                <th className="py-3 px-6 text-right">YTD Position</th>
                <th className="py-3 px-6 text-center">Gross Margin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filteredItems.map((item) => (
                <tr key={item.code} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-medium text-slate-500">{item.code}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-800">{item.name}</td>
                  <td className="py-3.5 px-6 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      item.type === 'Revenue' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      item.type === 'Cost' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono font-semibold text-slate-900">{item.q3}</td>
                  <td className="py-3.5 px-6 text-right font-mono text-slate-500">{item.ytd}</td>
                  <td className="py-3.5 px-6 text-center font-bold text-teal-700">{item.margin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
