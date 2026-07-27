# SliceOS UI & Style Guide Spec

This document governs all visual styling, Tailwind CSS usage, accessibility requirements, and reusable component patterns across **SliceOS**.

---

## 1. Design System Foundations (Dark KDS Theme)

SliceOS utilizes a sleek, high-contrast **Dark Mode** design system optimized for Kitchen Display System (KDS) hardware, low-light kitchen environments, and high-speed touch interaction.

### Color Palette Tokens
```css
:root {
  /* Core Dark Surfaces */
  --color-bg-app: #121214;          /* Main App Background */
  --color-surface-card: #1c1c20;    /* Order Card / Panel Surface */
  --color-surface-border: #2a2a30;  /* Card & Modal Dividers */
  --color-sidebar-bg: #18181c;     /* Navigation Sidebar */

  /* Text Hierarchy */
  --color-text-main: #ffffff;       /* Pure White for Primary Text */
  --color-text-muted: #a1a1aa;      /* Zinc 400 for secondary meta/timestamps */
  --color-text-dim: #71717a;        /* Zinc 500 for captions */

  /* Status Tokens (Card Banners & Action Buttons) */
  --status-urgent-red: #ff2a4b;     /* High priority / Rush orders / BUMP ORDER */
  --status-prep-amber: #ffa826;     /* Active preparation / CHECK TEMP */
  --status-ready-mint: #00e699;     /* Completed / Ready for dispatch */
  --status-idle-gray: #27272a;      /* Pending / Archived background */

  /* Active Navigation Highlight */
  --color-nav-active: #ffa826;      /* Active sidebar item pill fill */
  --color-nav-active-text: #121214; /* Text on active sidebar item */
}
```

---

## 2. Typography & Hierarchy

- **Primary Font:** `Inter`, `system-ui`, `-apple-system`, `sans-serif`.
- **Monospace Font:** `JetBrains Mono` reserved for **Ticket Numbers** (`#402`, `#398`), **Timers** (`12:06`), and **Price Totals** (`$42.50`).

| Element | Class Mix | Usage |
|---|---|---|
| **Page Title** | `text-2xl font-bold text-white tracking-tight` | Header titles (`Live Orders`, `Order History`) |
| **Ticket Header** | `font-mono text-lg font-bold text-black` | Solid card top bar (`#402`, `#398`) |
| **Card Heading** | `text-base font-bold text-white` | Customer Name (`Marco Rossi`, `David Chen`) |
| **Body Item** | `text-sm font-medium text-zinc-200` | Ordered items (`1x Large Pepperoni`, `1x Caesar Salad`) |
| **Muted Meta** | `text-xs font-mono text-zinc-400` | Timer badges (`12:06`, `08:14`), item modifiers |
| **Active Nav Label**| `text-sm font-bold text-zinc-900` | Selected sidebar pill text |

---

## 3. Component Styling Rules & Primitives

All UI components reside in `src/shared/components/ui/` built on dark-theme primitives.

### A. Order Card (`OrderCard.tsx`)
- **Container:** `bg-[#1c1c20] border border-[#2a2a30] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between`
- **Banner Header:** Color-coded top section containing order # and live timer:
  - *Rush/Urgent:* `bg-[#ff2a4b] text-white px-4 py-2 flex justify-between items-center font-mono font-bold`
  - *In Prep:* `bg-[#ffa826] text-black px-4 py-2 flex justify-between items-center font-mono font-bold`
  - *Ready/Mint:* `bg-[#00e699] text-black px-4 py-2 flex justify-between items-center font-mono font-bold`

### B. Action Buttons
- **Bump / Urgent Action:** `w-full bg-[#ff2a4b] hover:bg-[#e0203f] text-white font-bold py-3 px-4 rounded-xl text-center uppercase tracking-wider transition-colors`
- **Check Temp / Prep Action:** `w-full bg-[#ffa826] hover:bg-[#e5951d] text-black font-bold py-3 px-4 rounded-xl text-center uppercase tracking-wider transition-colors`
- **Complete Action:** `w-full bg-[#00e699] hover:bg-[#00c784] text-black font-bold py-3 px-4 rounded-xl text-center uppercase tracking-wider transition-colors`

### C. Sidebar Navigation
- **Container:** `bg-[#18181c] border-r border-[#2a2a30] w-64 p-4 flex flex-col gap-2 min-h-screen`
- **Active Tab Pill:** `bg-[#ffa826] text-[#121214] font-bold px-4 py-3 rounded-xl flex items-center gap-3`
- **Inactive Tab:** `text-zinc-400 hover:text-white hover:bg-[#27272a] font-medium px-4 py-3 rounded-xl flex items-center gap-3 transition-colors`

---

## 4. Layout Architecture

- **Main KDS Board:** `bg-[#121214] min-h-screen grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6`
- **Touch Ergonomics:** All card action buttons and navigation items feature minimum **48px height** for seamless kitchen touch screen usage.

---

## 5. Accessibility & High-Contrast Compliance

1. **Dark Room Ergonomics:** Uses rich charcoal background layers to prevent screen glare during long kitchen shifts.
2. **Dynamic Contrast Rules:** Card banners automatically toggle between white text (on Red headers) and crisp black text (on Mint/Amber headers) to maintain WCAG AAA compliance.