import React, { createContext, useContext, useState, useEffect } from 'react';
import { askGeminiCopilot } from '../gemini';
import { saveChatMessageToCloud } from '../firebase';

const FinancialContext = createContext();

export function FinancialProvider({ children }) {
  // Navigation State
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Core Financial Numbers (Live dynamic state)
  const [metrics, setMetrics] = useState(() => {
    const saved = localStorage.getItem('bizai_metrics');
    return saved ? JSON.parse(saved) : {
      cashFlow: 142500,
      cashFlowDelta: '+12.4%',
      workingCapital: 486200,
      workingCapitalDelta: '+8.1%',
      netMargin: 24.8,
      netMarginDelta: '+2.3%',
      runwayMonths: 18.4,
      liquidityIndex: 94.2,
      revenueMTD: 284500,
      expensesMTD: 142000,
      ebitda: 78400,
      burnRateMonthly: 38200
    };
  });

  // Track Applied AI Recommendations
  const [appliedRecommendations, setAppliedRecommendations] = useState(() => {
    const saved = localStorage.getItem('bizai_applied_recs');
    return saved ? JSON.parse(saved) : {};
  });

  // Products Catalog
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('bizai_products');
    return saved ? JSON.parse(saved) : [
      { id: 'PRD-101', name: 'Enterprise ERP Gateway', sku: 'ERP-GTW-01', price: 2400, cost: 1392, margin: 42, stock: 142, category: 'Hardware', velocity: 'High' },
      { id: 'PRD-102', name: 'Cloud Infrastructure Pack', sku: 'CLD-INF-PRO', price: 850, cost: 272, margin: 68, stock: 820, category: 'Software', velocity: 'High' },
      { id: 'PRD-103', name: 'Edge Sensor Suite v3', sku: 'EDG-SNS-03', price: 340, cost: 235, margin: 31, stock: 38, category: 'Hardware', velocity: 'Medium' },
      { id: 'PRD-104', name: 'Security Compliance Token', sku: 'SEC-CMP-TK', price: 180, cost: 45, margin: 75, stock: 310, category: 'Software', velocity: 'Medium' },
      { id: 'PRD-105', name: 'Quantitative Advisory Retainer', sku: 'ADV-RET-MO', price: 5000, cost: 1800, margin: 64, stock: 15, category: 'Services', velocity: 'Low' },
      { id: 'PRD-106', name: 'Legacy Connector Hub', sku: 'LGC-HUB-B49', price: 420, cost: 311, margin: 26, stock: 12, category: 'Hardware', velocity: 'Low' }
    ];
  });

  // Inventory Table
  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('bizai_inventory');
    return saved ? JSON.parse(saved) : [
      { id: 'INV-01', name: 'Enterprise ERP Gateway', sku: 'ERP-GTW-01', inStock: 142, minThreshold: 50, daysOnHand: 42, unitValuation: 1392, totalValue: 197664, status: 'Optimal' },
      { id: 'INV-02', name: 'Cloud Infrastructure Pack (Licenses)', sku: 'CLD-INF-PRO', inStock: 820, minThreshold: 200, daysOnHand: 65, unitValuation: 272, totalValue: 223040, status: 'Optimal' },
      { id: 'INV-03', name: 'Edge Sensor Suite v3', sku: 'EDG-SNS-03', inStock: 38, minThreshold: 45, daysOnHand: 14, unitValuation: 235, totalValue: 8930, status: 'Warning' },
      { id: 'INV-04', name: 'Security Compliance Token', sku: 'SEC-CMP-TK', inStock: 310, minThreshold: 100, daysOnHand: 55, unitValuation: 45, totalValue: 13950, status: 'Optimal' },
      { id: 'INV-05', name: 'Legacy Connector Hub (Batch B49)', sku: 'LGC-HUB-B49', inStock: 12, minThreshold: 25, daysOnHand: 8, unitValuation: 311, totalValue: 3732, status: 'Critical' }
    ];
  });

  // Invoices & Receivables / Payables
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('bizai_invoices');
    return saved ? JSON.parse(saved) : [
      { id: 'INV-2026-081', type: 'Receivable', entity: 'Apex Financial Technologies', amount: 34200, dueDate: '2026-10-15', issueDate: '2026-09-15', status: 'Pending', category: 'Enterprise Gateway' },
      { id: 'INV-2026-082', type: 'Receivable', entity: 'BlueStone Logistics Group', amount: 18500, dueDate: '2026-09-28', issueDate: '2026-08-28', status: 'Overdue', category: 'Cloud Infrastructure' },
      { id: 'INV-2026-083', type: 'Receivable', entity: 'Hyperion Analytics Corp', amount: 31500, dueDate: '2026-10-30', issueDate: '2026-09-20', status: 'Pending', category: 'Advisory Retainer' },
      { id: 'INV-2026-079', type: 'Receivable', entity: 'Vanguard Systems UK', amount: 22000, dueDate: '2026-09-22', issueDate: '2026-08-22', status: 'Paid', category: 'Edge Sensors' },
      { id: 'BILL-2026-041', type: 'Payable', entity: 'TSMC Silicon Foundry', amount: 16400, dueDate: '2026-10-20', issueDate: '2026-09-10', status: 'Pending', category: 'Component Supply' },
      { id: 'BILL-2026-042', type: 'Payable', entity: 'AWS Cloud Services', amount: 12800, dueDate: '2026-10-05', issueDate: '2026-09-05', status: 'Pending', category: 'Server Infrastructure' },
      { id: 'BILL-2026-043', type: 'Payable', entity: 'KPMG Audit & Tax LLC', amount: 7600, dueDate: '2026-10-25', issueDate: '2026-09-15', status: 'Pending', category: 'Legal & Accounting' }
    ];
  });

  // Recent Transactions
  const [transactions, setTransactions] = useState(() => {
    return [
      { id: 'TXN-991', description: 'Enterprise Gateway Renewal - Apex Fin', amount: 34200, type: 'Credit', date: 'Today, 11:20 AM', status: 'Verified', category: 'Sales Revenue' },
      { id: 'TXN-990', description: 'AWS Production Cloud Infrastructure', amount: -12800, type: 'Debit', date: 'Yesterday, 04:45 PM', status: 'Automated', category: 'Hosting' },
      { id: 'TXN-989', description: 'Client Retainer Wire - Hyperion Corp', amount: 31500, type: 'Credit', date: 'Sep 27, 2026', status: 'Verified', category: 'Services' },
      { id: 'TXN-988', description: 'TSMC Component Supply Batch 12', amount: -16400, type: 'Debit', date: 'Sep 26, 2026', status: 'Flagged by AI', category: 'COGS' },
      { id: 'TXN-987', description: 'Stripe Global Payment Settlement', amount: 48950, type: 'Credit', date: 'Sep 25, 2026', status: 'Reconciled', category: 'Payment Gateway' }
    ];
  });

  // Integrations State
  const [integrations, setIntegrations] = useState([
    { id: 'quickbooks', name: 'QuickBooks Online', category: 'Accounting Ledger', status: 'Connected', lastSync: '10 mins ago', records: '4,892 items' },
    { id: 'stripe', name: 'Stripe Payments', category: 'Merchant & Billing', status: 'Connected', lastSync: 'Just now', records: '12,410 txns' },
    { id: 'xero', name: 'Xero Accounting', category: 'Secondary Ledger', status: 'Disconnected', lastSync: 'Never', records: '0 items' },
    { id: 'plaid', name: 'Plaid Banking API', category: '3 Bank Accounts', status: 'Connected', lastSync: '22 mins ago', records: 'SVB, Chase, Stripe' },
    { id: 'csv', name: 'Manual CSV / Excel File', category: 'Custom Datafeed', status: 'Ready', lastSync: 'Ready to import', records: 'Multi-column' }
  ]);

  // AI Chat Conversation History
  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('bizai_chat_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-init-1',
        sender: 'ai',
        text: `Welcome back, Arjun. I am **BizAI**, your institutional financial copilot.\n\nYour current **Liquidity Index is 94.2/100**, and cash reserves support **18.4 months of operations**.\n\nI have identified **3 strategic high-yield adjustments** that can release an additional **+$96,900** in liquid working capital. How would you like to proceed today?`,
        timestamp: '12:00 PM',
        model: 'gemini-3.5-flash'
      }
    ];
  });

  const [isAiTyping, setIsAiTyping] = useState(false);

  // Modals & Drawers
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null, // 'scenario' | 'add-product' | 'reorder' | 'create-invoice' | 'csv-upload' | 'help' | 'profile' | 'command-palette'
    data: null
  });

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Cloud Sync Status
  const [cloudStatus, setCloudStatus] = useState('synced'); // 'synced' | 'syncing' | 'error'

  // Persist metrics and data
  useEffect(() => {
    localStorage.setItem('bizai_metrics', JSON.stringify(metrics));
    localStorage.setItem('bizai_applied_recs', JSON.stringify(appliedRecommendations));
    localStorage.setItem('bizai_products', JSON.stringify(products));
    localStorage.setItem('bizai_inventory', JSON.stringify(inventory));
    localStorage.setItem('bizai_invoices', JSON.stringify(invoices));
    localStorage.setItem('bizai_chat_history', JSON.stringify(chatMessages));
  }, [metrics, appliedRecommendations, products, inventory, invoices, chatMessages]);

  const addToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const openModal = (type, data = null) => {
    setModalState({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: null, data: null });
  };

  // Apply AI Recommendation with Live Financial Recalculation
  const applyRecommendation = (recId) => {
    if (appliedRecommendations[recId]) {
      addToast('Recommendation Already Applied', 'This strategy is currently factored into your baseline metrics.', 'info');
      return;
    }

    setCloudStatus('syncing');
    if (recId === 'rec-working-capital') {
      setMetrics(prev => ({
        ...prev,
        workingCapital: prev.workingCapital + 42000,
        workingCapitalDelta: '+12.6%',
        cashFlow: prev.cashFlow + 42000,
        runwayMonths: Number((prev.runwayMonths + 1.2).toFixed(1))
      }));
      setAppliedRecommendations(prev => ({ ...prev, [recId]: true }));
      addToast('Working Capital Strategy Applied', 'Extended AP terms negotiated. Released +$42,000 in immediate liquidity.', 'success');
    } else if (recId === 'rec-pricing-strategy') {
      setMetrics(prev => ({
        ...prev,
        netMargin: Number((prev.netMargin + 4.2).toFixed(1)),
        netMarginDelta: '+4.5%',
        revenueMTD: prev.revenueMTD + 36400,
        cashFlow: prev.cashFlow + 36400
      }));
      setAppliedRecommendations(prev => ({ ...prev, [recId]: true }));
      addToast('Dynamic Pricing Adjustment Applied', 'Enterprise catalog pricing adjusted +8%. Projected quarterly gross margin up +4.2%.', 'success');
    } else if (recId === 'rec-inventory-cost') {
      setMetrics(prev => ({
        ...prev,
        cashFlow: prev.cashFlow + 18500,
        workingCapital: prev.workingCapital + 18500,
        burnRateMonthly: prev.burnRateMonthly - 2800
      }));
      // Update inventory item
      setInventory(prev => prev.map(item => item.id === 'INV-05' ? { ...item, inStock: 0, status: 'Liquidated' } : item));
      setAppliedRecommendations(prev => ({ ...prev, [recId]: true }));
      addToast('Inventory Carrying Cost Mitigated', 'Obsolete batch B49 liquidated to bulk buyer. Saved $18,500 in holding costs.', 'success');
    }

    setTimeout(() => {
      setCloudStatus('synced');
    }, 800);
  };

  // Add Product
  const addProduct = (newProduct) => {
    const p = {
      id: `PRD-${100 + products.length + 1}`,
      ...newProduct,
      margin: Math.round(((newProduct.price - newProduct.cost) / newProduct.price) * 100)
    };
    setProducts(prev => [p, ...prev]);
    // Also add to inventory
    setInventory(prev => [
      {
        id: `INV-${inventory.length + 1}`,
        name: p.name,
        sku: p.sku,
        inStock: Number(p.stock) || 50,
        minThreshold: 30,
        daysOnHand: 35,
        unitValuation: Number(p.cost),
        totalValue: (Number(p.stock) || 50) * Number(p.cost),
        status: 'Optimal'
      },
      ...prev
    ]);
    addToast('Product Added', `${p.name} added to catalog and inventory ledgers.`, 'success');
    closeModal();
  };

  // Reorder Stock
  const reorderStock = (itemId, units) => {
    const qty = Number(units) || 50;
    setInventory(prev => prev.map(item => {
      if (item.id === itemId) {
        const newStock = item.inStock + qty;
        return {
          ...item,
          inStock: newStock,
          daysOnHand: Math.min(90, Math.round(item.daysOnHand + (qty * 0.4))),
          status: newStock >= item.minThreshold ? 'Optimal' : 'Warning',
          totalValue: newStock * item.unitValuation
        };
      }
      return item;
    }));
    setProducts(prev => prev.map(prod => {
      const target = inventory.find(i => i.id === itemId);
      if (target && prod.sku === target.sku) {
        return { ...prod, stock: prod.stock + qty };
      }
      return prod;
    }));
    addToast('Purchase Order Generated', `Reorder for ${qty} units dispatched to supplier. Stock level updated.`, 'success');
    closeModal();
  };

  // Create Invoice
  const createInvoice = (inv) => {
    const newInv = {
      id: `INV-2026-0${84 + invoices.length}`,
      type: 'Receivable',
      issueDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      ...inv,
      amount: Number(inv.amount)
    };
    setInvoices(prev => [newInv, ...prev]);
    addToast('Invoice Created', `Invoice ${newInv.id} for $${newInv.amount.toLocaleString()} generated and emailed to ${newInv.entity}.`, 'success');
    closeModal();
  };

  // Mark Invoice Paid
  const markInvoicePaid = (id) => {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;

    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: 'Paid' } : i));
    setMetrics(prev => ({
      ...prev,
      cashFlow: prev.cashFlow + (inv.type === 'Receivable' ? inv.amount : -inv.amount)
    }));

    // Add transaction
    setTransactions(prev => [
      {
        id: `TXN-${Math.floor(1000 + Math.random() * 9000)}`,
        description: `Settlement: ${inv.entity} (${inv.id})`,
        amount: inv.type === 'Receivable' ? inv.amount : -inv.amount,
        type: inv.type === 'Receivable' ? 'Credit' : 'Debit',
        date: 'Just now',
        status: 'Reconciled',
        category: inv.category || 'Invoicing'
      },
      ...prev
    ]);

    addToast('Payment Reconciled', `Invoice ${inv.id} marked as Paid. +$${inv.amount.toLocaleString()} settled to Operating Account.`, 'success');
  };

  // Send message to Gemini Copilot
  const sendMessageToBizAI = async (text) => {
    if (!text || !text.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);
    setCloudStatus('syncing');

    // Save to Firebase in background
    saveChatMessageToCloud(userMsg).catch(() => {});

    try {
      const response = await askGeminiCopilot(text, chatMessages, metrics);
      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: response.modelUsed
      };
      setChatMessages(prev => [...prev, aiMsg]);
      saveChatMessageToCloud(aiMsg).catch(() => {});
    } catch (err) {
      console.error("BizAI Chat Error:", err);
      const errMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `I encountered an unexpected issue while generating your financial brief. Here is a quick synthesis: Rao & Co. has $${metrics.cashFlow.toLocaleString()} in cash flow and ${metrics.runwayMonths} months runway.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errMsg]);
    } finally {
      setIsAiTyping(false);
      setCloudStatus('synced');
    }
  };

  // Trigger simulated sync for integration
  const syncIntegration = (id) => {
    setCloudStatus('syncing');
    addToast('Sync Initiated', `Connecting to ${id.toUpperCase()} API endpoint...`, 'info');
    setTimeout(() => {
      setIntegrations(prev => prev.map(int => int.id === id ? { ...int, lastSync: 'Just now', status: 'Connected' } : int));
      setCloudStatus('synced');
      addToast('Data Sync Complete', `Successfully ingested latest ledger balances from ${id.toUpperCase()}.`, 'success');
    }, 1500);
  };

  return (
    <FinancialContext.Provider value={{
      currentView,
      setCurrentView,
      sidebarOpen,
      setSidebarOpen,
      metrics,
      setMetrics,
      appliedRecommendations,
      applyRecommendation,
      products,
      addProduct,
      inventory,
      reorderStock,
      invoices,
      createInvoice,
      markInvoicePaid,
      transactions,
      integrations,
      syncIntegration,
      chatMessages,
      isAiTyping,
      sendMessageToBizAI,
      modalState,
      openModal,
      closeModal,
      toasts,
      addToast,
      cloudStatus
    }}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
}
