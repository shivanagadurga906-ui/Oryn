---
name: Executive Precision
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  metric-stat:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.03em
  metric-stat-sm:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style
The design system targets enterprise finance leaders, CFOs, and quantitative controllers who operate in high-velocity, data-dense environments. The brand personality is authoritative, calm, and acutely analytical—balancing institutional financial discipline with cutting-edge artificial intelligence. 

The aesthetic is Modern Corporate with Precision Minimalist leanings: a high-contrast structural canvas pairing an obsidian-tinted slate navigational anchor with airy, luminous analysis planes. The interface intentionally avoids flashy, distracting visual metaphors, choosing instead crisp demarcations, disciplined tabular data densities, and targeted teal/emerald accents that signify synthetic intelligence and actionable insight. Every viewport must communicate security, real-time fidelity, and uncompromising accuracy.

## Colors
The system employs a dual-atmosphere layout strategy: deep structural foundations juxtaposed against an ultra-clean workspace.

### Core Swatches
- **Primary Accent (`#0d9488`):** Represents AI cognition, primary CTAs, active selections, and synthesized intelligence markers. Lighter derivative (`#14b8a6`) applies to interactive hover states; deep variant (`#0f766e`) is used for active states and focused pill containers.
- **Structural Nav / Secondary (`#0f172a`):** Deep Slate Blue forms the immovable visual anchor in navigation rails, header meta-bars, and command bar frames. A slightly deeper shade (`#111827`) provides depth contrast within child navigations.
- **Canvas Base (`#f8fafc`):** Off-white Slate-50 eliminates eye strain while establishing subtle contrast against pure white cards.
- **Card Surface (`#ffffff`):** Pure white used for elevated content blocks, metric tiles, and transactional ledgers.
- **Structural Borders (`#e2e8f0`):** Crisp 1px division line across panels, inputs, and chart axis boundaries.

### Semantic Status
- **Positive Trend (`#10b981`):** Quantifiable growth, surplus, and positive delta adjustments. Background tint: `rgba(16, 185, 129, 0.12)`.
- **Negative Trend (`#ef4444` / `#f97316`):** Fiscal burn, deficit, and anomalous volatility. Background tint: `rgba(239, 68, 68, 0.12)`.
- **System Warning (`#f59e0b`):** Pending approvals, fiscal thresholds nearing limit, and uncalibrated models. Background tint: `rgba(245, 158, 11, 0.14)`.

## Typography
Typographic discipline is centered entirely on `Inter` with strict layout rules for quantitative rendering.

- **Tabular Numerals:** All numerals in financial tables, metric cards, percentage pills, and chart tooltips must enforce `font-feature-settings: "tnum" 1, "cv05" 1, "cv11" 1` to ensure perfect vertical column alignment and disambiguated characters (like lowercase `l` and numeral `1`).
- **Scale Hierarchy:** Metric displays leverage tightly tracked weights (`-0.03em`) to anchor dashboards without sprawling across horizontal real estate.
- **Label Discipline:** Data headers, column titles, and indicator pills enforce uppercase or semi-bold micro-copy (`11px` - `12px`) with deliberate tracking to ensure readability against dense gray tints.

## Layout & Spacing
The layout implements an Asymmetric Fluid Grid split between a persistent navigation anchor and a fluid analytical stage.

- **Sidebar Region:** Static width of 260px (desktop) or collapsible 72px icon rail (compact desktop), rendered in structural Slate `#0f172a`.
- **Analytical Canvas:** 12-column dynamic fluid grid on `#f8fafc`. Breakpoints align as follows:
  - **Desktop (>= 1280px):** 12 columns, 24px gutters, 32px canvas padding.
  - **Tablet (768px - 1279px):** 8 columns, 16px gutters, 24px canvas padding; sidebar collapses into a drawer.
  - **Mobile (< 768px):** 4 columns, 12px gutters, 16px canvas padding; navigation shifts to a top navigation bar with off-canvas tray.
- **Rhythm:** Spacing between atomic elements inside cards relies strictly on `space-sm` (8px) and `space-md` (16px). Section intervals and card grids adhere to `space-lg` (24px).

## Elevation & Depth
Depth is created through low-contrast structural outlines accompanied by subtle ambient shadows, avoiding heavy, skeuomorphic drop-shadows.

- **Level 0 (Canvas Base):** Flat `#f8fafc` background with no elevation.
- **Level 1 (Cards & Data Containers):** Pure `#ffffff` surface, bounded by a 1px border in `#e2e8f0` and an ultra-soft ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Hovered Cards & Dropdowns):** Subtle elevation with enhanced clarity: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`, border color transitions to `#cbd5e1`.
- **Level 3 (Modals & Command Palettes):** Layered float with backdrop blur (`backdrop-filter: blur(8px)` with `rgba(15, 23, 42, 0.4)` scrim) and targeted deep shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)`.

## Shapes
The design uses calibrated geometric corners that balance technical precision with approachable modern SaaS ergonomics:
- **Structural Containers & Cards:** Standard `rounded` (8px) ensures metric cards and chart frames align cleanly without soft consumer-app bloat.
- **Buttons & Input Elements:** Standard `rounded` (8px) maintains unified click targets.
- **Status Indicators, Pill Tags, and Filter Chips:** Fully rounded pill structure (`rounded-full` / 9999px) for percentage changes, system states, and categorical pills.
- **Avatar & Icon Badges:** Rounded squares (`8px`) or pure circles (`9999px`) depending on entity type (companies vs. users).

## Components

### Buttons
- **Primary:** Background `#0d9488`, text `#ffffff`, border transparent. On hover: `#14b8a6`. Active: `#0f766e`. Focus: 2px ring `#0d9488` with 2px offset.
- **Secondary / Outline:** Background `#ffffff`, text `#0f172a`, border 1px solid `#e2e8f0`. Hover: background `#f8fafc` and border `#cbd5e1`.
- **Ghost:** Text `#64748b`. Hover: background `rgba(226, 232, 240, 0.5)` and text `#0f172a`.

### Navigation Items & Active Pills
- **Sidebar Navigation:** Unselected items use `#94a3b8` on dark slate `#0f172a`. Hover states introduce `#f8fafc` text with `rgba(255, 255, 255, 0.05)` background fill.
- **Active Navigation State:** Pill container rendered in `rgba(13, 148, 136, 0.15)` with text `#14b8a6`, accompanied by an absolute left-aligned 3px vertical accent indicator bar in `#14b8a6`.
- **Notification Badges:** Enclosed pill in `#0d9488` or `#ef4444` for alerts; text is bold `11px` white tabular figures.

### Metric Summary Stat Cards
- Enclosed in Level 1 white containers with 16px internal padding.
- **Top Row:** Metric title (`label-md`, `#64748b`) paired with a contextual category icon or contextual menu trigger.
- **Middle Row:** High-contrast numeral (`metric-stat`, `#0f172a`, tabular numbers).
- **Bottom Row:** Trend indicator pill—positive trends use green text (`#10b981`) on mint tint (`rgba(16, 185, 129, 0.12)`); negative trends use coral-red (`#ef4444`) on red tint (`rgba(239, 68, 68, 0.12)`). Accompanied by a muted timeframe baseline (e.g., "vs last quarter").

### Breadcrumbs Header
- Displayed in the top application header on white surface (`#ffffff`) with bottom border 1px `#e2e8f0`.
- Levels separated by a forward slash `/` in `#cbd5e1`.
- Dormant links: `#64748b`; terminal/active page: `#0f172a` with `font-weight: 600`.

### Form Controls & Inputs
- **Text Inputs:** Height 40px, background `#ffffff`, border 1px solid `#e2e8f0`, text `#0f172a`, placeholder `#94a3b8`. Focus state applies a 1px border `#0d9488` and a 3px outer glow ring `rgba(13, 148, 136, 0.15)`.
- **Checkboxes & Radios:** Border 1px `#cbd5e1`, checked state filled with `#0d9488` displaying a white checkmark or center pip.

### Lists & Ledger Rows
- Table and list items feature an alternating hover highlight (`#f8fafc`).
- Status icon background: 32px circular pill containers with a 10% opacity wash matching the semantic state (e.g., amber wash for pending transactions, teal wash for AI automated resolutions).