import React, { useEffect } from 'react';
import { FinancialProvider, useFinancial } from './context/FinancialContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastContainer from './components/Toast';

// Views
import DashboardView from './components/views/DashboardView';
import AIInsightsView from './components/views/AIInsightsView';
import FinancialAnalysisView from './components/views/FinancialAnalysisView';
import ProductsView from './components/views/ProductsView';
import InventoryView from './components/views/InventoryView';
import PaymentsView from './components/views/PaymentsView';
import CashFlowView from './components/views/CashFlowView';
import AskBizAIView from './components/views/AskBizAIView';
import ImportDataView from './components/views/ImportDataView';
import SettingsView from './components/views/SettingsView';

// Modals
import ScenarioSimulationModal from './components/modals/ScenarioSimulationModal';
import AddProductModal from './components/modals/AddProductModal';
import ReorderModal from './components/modals/ReorderModal';
import CreateInvoiceModal from './components/modals/CreateInvoiceModal';
import HelpModal from './components/modals/HelpModal';
import UserProfileModal from './components/modals/UserProfileModal';
import CommandPaletteModal from './components/modals/CommandPaletteModal';

function AppContent() {
  const { currentView, modalState, openModal, closeModal } = useFinancial();

  // Listen for global Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (modalState.isOpen && modalState.type === 'command-palette') {
          closeModal();
        } else {
          openModal('command-palette');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalState]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Analytical Stage */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px] h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'ai-insights' && <AIInsightsView />}
          {currentView === 'financial-analysis' && <FinancialAnalysisView />}
          {currentView === 'products' && <ProductsView />}
          {currentView === 'inventory' && <InventoryView />}
          {currentView === 'payments' && <PaymentsView />}
          {currentView === 'cash-flow' && <CashFlowView />}
          {currentView === 'ask-bizai' && <AskBizAIView />}
          {currentView === 'import-data' && <ImportDataView />}
          {currentView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Dynamic Modals */}
      {modalState.isOpen && modalState.type === 'scenario' && <ScenarioSimulationModal />}
      {modalState.isOpen && modalState.type === 'add-product' && <AddProductModal />}
      {modalState.isOpen && modalState.type === 'reorder' && <ReorderModal />}
      {modalState.isOpen && modalState.type === 'create-invoice' && <CreateInvoiceModal />}
      {modalState.isOpen && modalState.type === 'help' && <HelpModal />}
      {modalState.isOpen && modalState.type === 'profile' && <UserProfileModal />}
      {modalState.isOpen && modalState.type === 'command-palette' && <CommandPaletteModal />}

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <FinancialProvider>
      <AppContent />
    </FinancialProvider>
  );
}
