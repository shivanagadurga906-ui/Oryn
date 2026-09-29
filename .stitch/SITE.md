# BizAI Financial Copilot - Stitch Site Architecture

## 1. Project Overview
- **Project Name:** BizAI Financial Copilot (Rao & Co.)
- **Stitch Project ID:** `9286588496253357803`
- **Stitch Project Key URL:** `https://stitch.withgoogle.com/projects/9286588496253357803?pli=1`
- **Design System:** Executive Precision (`#00685f` Teal / `#0f172a` Slate)
- **Engine:** Google Gemini Live Flash + Firebase Firestore & Cloud Storage

## 2. Integrated Views
- [x] **Dashboard (`dashboard`):** Real-time Treasury Overview, Working Capital ($486.2k), Cash Flow ($142.5k), Metric Stat cards, AI Recommended Actions with one-click implementation.
- [x] **AI Insights (`ai-insights`):** Automated financial anomalies, scenario recommendations, profit margin expansion alerts, dynamic simulation preview.
- [x] **Financial Analysis (`financial-analysis`):** P&L breakdown, EBITDA analysis, unit economics margin waterfall, burn rate velocity tracking.
- [x] **Products Catalog (`products`):** Interactive product catalog, price elasticity, margin optimization calculator, add product modal.
- [x] **Inventory Management (`inventory`):** Stock velocity, reorder triggers, automated PO drafting, lead time tracking.
- [x] **Payments & Invoicing (`payments`):** Accounts Receivable ($84.2k), Accounts Payable ($36.8k), invoice creation, collection health index.
- [x] **Cash Flow Forecast (`cash-flow`):** 90-day predictive liquidity curve, cash runway forecast, stress-test adjustments.
- [x] **Ask BizAI (`ask-bizai`):** Live bidirectional chat grounded with Rao & Co. financial data via Google Gemini Flash API.
- [x] **Data Import & Integrations (`import-data`):** CSV ledger import, ERP sync (QuickBooks/Xero/Stripe), Firebase Cloud Storage integration.
- [x] **Settings & Preferences (`settings`):** Financial thresholds, notification channels, API keys, export capabilities.

## 3. Modals & Interactive Flows
- [x] **Scenario Simulation Modal:** Dynamic sliders for price adjustment and OPEX reduction with real-time recalculation of runway and EBITDA.
- [x] **Add Product Modal:** Form to add high-margin SKU to catalog with auto-margin calculation.
- [x] **Reorder Modal:** Instant PO generation for depleted inventory items.
- [x] **Create Invoice Modal:** Instant invoice generation with client selection and payment terms.
- [x] **Command Palette (Ctrl+K):** Global omni-search for lightning-fast view navigation and actions.
- [x] **User Profile & Help Modals:** CFO credentials and institutional documentation.
