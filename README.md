# Oryn - Executive Financial Copilot

> Enterprise-grade treasury intelligence and autonomous financial analysis platform powered by Google Gemini and Firebase.

[![Live Deployment](https://img.shields.io/badge/Deployment-Live-success?style=flat-square)](https://oryn-1dbb0.web.app)
[![Platform](https://img.shields.io/badge/Hosting-Firebase-orange?style=flat-square)](https://oryn-1dbb0.web.app)
[![AI Engine](https://img.shields.io/badge/AI-Google%20Gemini%20Flash-blue?style=flat-square)](https://deepmind.google/technologies/gemini/)
[![Frontend](https://img.shields.io/badge/Framework-React%2018%20%7C%20Vite%206-teal?style=flat-square)](https://react.dev/)

---

## Live Links

- **Production URL**: [https://oryn-1dbb0.web.app](https://oryn-1dbb0.web.app)
- **Firebase Domain**: [https://oryn-1dbb0.firebaseapp.com](https://oryn-1dbb0.firebaseapp.com)

---

## Overview

Oryn is an AI-powered financial copilot engineered for CFOs, controllers, and executive leadership teams. Built on top of Google Gemini's multimodal reasoning engine and integrated with Firebase Firestore and Cloud Storage, Oryn bridges quantitative treasury analysis with natural language intelligence.

The platform provides continuous ledger monitoring, predictive liquidity forecasts, scenario simulations, unit economics modeling, and automated working capital recommendations.

---

## Core Capabilities

### 1. Executive Treasury Dashboard
- **Liquidity Health Index**: Real-time scoring of cash stability and operational sustainability.
- **Key Metrics Tracking**: Total Cash Flow, Working Capital, Net Operating Margin, and Runway Months.
- **1-Click Interventions**: Instant execution of high-impact AI recommendations directly adjusting liquid capital.

### 2. Autonomous Financial Analysis & Insights
- **Strategic Briefs**: Algorithmic detection of working capital bottlenecks, pricing elasticity, and inventory holding costs.
- **Scenario Simulation Engine**: Dynamic slider-based modeling for pricing adjustments and OPEX reductions with real-time recalculation of runway and EBITDA.
- **Unit Economics Waterfall**: Granular product margin breakdowns and velocity classification.

### 3. Ask Oryn (Gemini Live Copilot)
- **Financial Context Grounding**: Every prompt is grounded with live ledger metrics (cash flow, receivables, payables, product margins).
- **Executive Synthesis**: Delivers structured, bulleted, quantitative analysis with actionable next steps.
- **Cloud Archiving**: Conversation history synchronized with Firebase Firestore with local fallback.

### 4. Working Capital & Ledger Operations
- **Payments & Invoicing**: Accounts Receivable and Accounts Payable tracking, collection health indexing, and invoice creation.
- **Inventory Optimization**: Stock velocity monitoring, depleted SKU alerts, and automated purchase order generation.
- **Data Integrations**: Drag-and-drop CSV general ledger ingestion and cloud file uploads via Firebase Storage.

---

## Technology Architecture

| Layer | Technology | Description |
|---|---|---|
| **Frontend Framework** | React 18 (Vite 6) | High-performance Single Page Application |
| **Styling & Design System** | Tailwind CSS + Lucide Icons | Executive Precision Design System (Teal & Slate) |
| **Artificial Intelligence** | Google Gemini Live Flash | Low-latency contextual financial reasoning |
| **Cloud Database** | Firebase Firestore | Persistent chat logging and financial records |
| **Cloud Object Storage** | Firebase Cloud Storage | Secure ledger and report ingestion |
| **Production Hosting** | Firebase Hosting | Globally distributed CDN deployment |

---

## Design System: Executive Precision

Oryn utilizes the **Executive Precision** design tokens engineered for high-density analytical dashboards:

- **Primary Accent**: `#0d9488` (Teal) — Signifies AI cognition, active selections, and synthesized intelligence.
- **Structural Anchor**: `#0f172a` (Slate 900) — Persistent navigation foundation.
- **Analytical Canvas**: `#f8fafc` (Slate 50) — High-legibility workspace reducing visual strain.
- **Card Surface**: `#ffffff` (Pure White) with 1px border `#e2e8f0` and ambient elevation.
- **Typography**: Inter with strict tabular numeral formatting (`tnum`) for quantitative column alignment.

---

## Repository Structure

```
Oryn/
├── src/
│   ├── components/
│   │   ├── modals/          # Interactive simulation, invoice, and SKU modals
│   │   ├── views/           # 10 comprehensive analytical views
│   │   ├── Header.jsx       # Global application header with omni-search
│   │   ├── Sidebar.jsx      # Navigation rail with Oryn branding
│   │   └── Toast.jsx        # Notification dispatch system
│   ├── context/
│   │   └── FinancialContext.jsx # Central state management and calculation engine
│   ├── firebase.js          # Firebase SDK initialization (Firestore, Storage, Analytics)
│   ├── gemini.js            # Google Gemini Flash API service with multi-model fallback
│   ├── App.jsx              # Application router and modal container
│   ├── main.jsx             # React DOM entry point
│   └── index.css            # Tailwind directives and custom scrollbar styling
├── .stitch/                 # Google Stitch project design tokens and metadata
├── dist/                    # Compiled production build
├── firebase.json            # Firebase Hosting rewrites and deployment configuration
├── .firebaserc              # Firebase project alias (oryn-1dbb0)
└── package.json             # Dependencies and build scripts
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/jahnavi2513/Oryn.git
   cd Oryn
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Production Build

To compile and optimize the production bundle:

```bash
npm run build
```

The output files will be generated in the `dist/` directory.

### Deploying to Firebase

Deploy directly using Firebase CLI:

```bash
npx firebase-tools deploy --only hosting --project oryn-1dbb0
```

---

## License

This project is licensed under the MIT License.
