import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { X, CreditCard, Plus } from 'lucide-react';

export default function CreateInvoiceModal() {
  const { createInvoice, closeModal } = useFinancial();

  const [entity, setEntity] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Enterprise Gateway');
  const [type, setType] = useState('Receivable');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!entity || !amount || !dueDate) return;

    createInvoice({
      entity,
      amount: Number(amount),
      dueDate,
      category,
      type
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Generate New Financial Invoice</h3>
          </div>
          <button onClick={closeModal} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Invoice Direction</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setType('Receivable')}
                className={`py-2 rounded-lg font-semibold border transition-colors ${type === 'Receivable' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
              >
                Customer Receivable (AR)
              </button>
              <button
                type="button"
                onClick={() => setType('Payable')}
                className={`py-2 rounded-lg font-semibold border transition-colors ${type === 'Payable' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}
              >
                Vendor Bill (AP)
              </button>
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Counterparty Company Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Goldman Sachs Asset Mgt"
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Invoice Amount ($)</label>
              <input
                type="number"
                required
                min="1"
                placeholder="25000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Maturity / Due Date</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Designation Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option>Enterprise Gateway</option>
              <option>Cloud Infrastructure</option>
              <option>Advisory Retainer</option>
              <option>Hardware Components</option>
              <option>Legal &amp; Professional</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Issue Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
