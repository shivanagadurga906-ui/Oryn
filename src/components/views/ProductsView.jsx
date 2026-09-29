import React, { useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { 
  Package, 
  Plus, 
  Search, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight, 
  Tag, 
  Check,
  Filter
} from 'lucide-react';

export default function ProductsView() {
  const { products, openModal, addToast, applyRecommendation, appliedRecommendations } = useFinancial();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Hardware', 'Software', 'Services'];

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto" data-purpose="products-catalog-page">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full w-fit mb-1">
            <Package className="w-3.5 h-3.5 text-slate-600" />
            <span>Product Unit Economics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Products &amp; Contribution Margins
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Analyze unit margins, pricing elasticity, and stock velocity per SKU.
          </p>
        </div>

        <button
          onClick={() => openModal('add-product')}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold text-xs sm:text-sm rounded-lg shadow-sm flex items-center space-x-2 transition-all transform active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Top Margin Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Highest Margin SKU</span>
          <div className="text-xl font-bold text-slate-900 mt-1">Security Compliance Token</div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">75% Unit Margin</span>
            <span className="text-slate-400">COGS: $45 / Retail: $180</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">Highest Revenue Driver</span>
          <div className="text-xl font-bold text-slate-900 mt-1">Enterprise ERP Gateway</div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded-full">42% Unit Margin</span>
            <span className="text-slate-400">Retail: $2,400</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm">
          <span className="text-xs font-medium text-slate-500">AI Optimization Highlight</span>
          <div className="text-xl font-bold text-slate-900 mt-1">+8% Gateway Elasticity</div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <button
              onClick={() => applyRecommendation('rec-pricing-strategy')}
              className="text-teal-600 hover:text-teal-700 font-semibold flex items-center space-x-1"
            >
              <span>{appliedRecommendations['rec-pricing-strategy'] ? 'Applied (+$36.4k) ✓' : 'Apply +8% Increase'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs font-medium w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md transition-colors ${selectedCategory === cat ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-200/80">
                <th className="py-3 px-6">SKU Identifier</th>
                <th className="py-3 px-6">Product Designation</th>
                <th className="py-3 px-6">Classification</th>
                <th className="py-3 px-6 text-right">Retail List</th>
                <th className="py-3 px-6 text-right">Unit COGS</th>
                <th className="py-3 px-6 text-center">Gross Margin</th>
                <th className="py-3 px-6 text-center">Stock Velocity</th>
                <th className="py-3 px-6 text-right">Units In Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-mono font-medium text-slate-500">{prod.sku}</td>
                  <td className="py-3.5 px-6">
                    <div className="font-semibold text-slate-800">{prod.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{prod.id}</div>
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {prod.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono font-bold text-slate-900">
                    ${prod.price.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono text-slate-500">
                    ${prod.cost.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      prod.margin >= 60 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' :
                      prod.margin >= 35 ? 'bg-teal-50 text-teal-700 border border-teal-200/60' :
                      'bg-amber-50 text-amber-700 border border-amber-200/60'
                    }`}>
                      {prod.margin}%
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      prod.velocity === 'High' ? 'text-emerald-700 bg-emerald-50' :
                      prod.velocity === 'Medium' ? 'text-blue-700 bg-blue-50' :
                      'text-slate-600 bg-slate-100'
                    }`}>
                      {prod.velocity}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-right font-mono font-medium text-slate-800">
                    {prod.stock.toLocaleString()}
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
