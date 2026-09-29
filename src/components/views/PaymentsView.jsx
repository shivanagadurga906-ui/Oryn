import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Send, 
  Search,
  Filter
} from 'lucide-react';

export default function PaymentsView() {
  const { invoices, markInvoicePaid, openModal, addToast } = useFinancial();
  const [filter, setFilter] = useState('all'); // 'all' | 'receivables' | 'payables'

  const totalReceivables = invoices
    .filter(i => i.type === 'Receivable' && i.status !== 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const totalPayables = invoices
    .filter(i => i.type === 'Payable' && i.status !== 'Paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const filtered = invoices.filter(i => {
    if (filter === 'receivables') return i.type === 'Receivable';
    if (filter === 'payables') return i.type === 'Payable';
    return true;
  });

  const sendReminder = (inv) => {
    addToast('Payment Reminder Sent', `Automated dunning notice dispatched to billing contact at ${inv.entity}.`, 'info');
  };

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto" data-purpose="payments-page">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit mb-1">
            <CreditCard className="w-3.5 h-3.5 text-slate-600" />
            <span>Cash Management &amp; Invoicing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Payments &amp; Working Invoices
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track customer receivables, vendor obligations, and automated reconciliation.
          </p>
        </div>

        <button
          onClick={() => openModal('create-invoice')}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm flex items-center space-x-2 transition-all transform active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* AR vs AP KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Outstanding Receivables (AR)</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1 tabular-nums">
            ${totalReceivables.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 mt-2 inline-block">Expected inflow across next 30 days</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Upcoming Vendor Obligations (AP)</span>
            <ArrowDownRight className="w-4 h-4 text-slate-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 tabular-nums">
            ${totalPayables.toLocaleString()}
          </div>
          <span className="text-xs text-slate-400 mt-2 inline-block">Scheduled disbursements</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Net Near-Term Liquidity Delta</span>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">Surplus</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-teal-700 mt-1 tabular-nums">
            +${(totalReceivables - totalPayables).toLocaleString()}
          </div>
          <span className="text-xs text-emerald-600 font-semibold mt-2 inline-block">Positive cash delta projected</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-slate-200/90 shadow-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          All Invoices ({invoices.length})
        </button>
        <button
          onClick={() => setFilter('receivables')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === 'receivables' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Customer Receivables
        </button>
        <button
          onClick={() => setFilter('payables')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === 'payables' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Vendor Payables
        </button>
      </div>

      {/* Invoices Ledger Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-6">Invoice ID</th>
                <th className="py-3 px-6">Counterparty Entity</th>
                <th className="py-3 px-6">Type</th>
                <th className="py-3 px-6">Due Date</th>
                <th className="py-3 px-6 text-right">Amount</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-medium text-slate-500">{inv.id}</td>
                  <td className="py-3.5 px-6 font-semibold text-slate-800">{inv.entity}</td>
                  <td className="py-3.5 px-6">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      inv.type === 'Receivable' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'
                    }`}>
                      {inv.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-slate-500 font-mono">{inv.dueDate}</td>
                  <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-900">
                    ${inv.amount.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      inv.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                      'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <div className="flex items-center justify-center space-x-1.5">
                      {inv.status !== 'Paid' ? (
                        <>
                          <button
                            onClick={() => markInvoicePaid(inv.id)}
                            className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold rounded text-[11px] transition-colors"
                          >
                            Mark Paid
                          </button>
                          {inv.type === 'Receivable' && (
                            <button
                              onClick={() => sendReminder(inv)}
                              className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
                              title="Send Reminder Email"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </>
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Reconciled
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
