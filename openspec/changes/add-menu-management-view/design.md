## Context

SliceOS has a navigation shell with `/menu` rendering a placeholder page labeled "Menu management". Shared dark KDS UI primitives exist (`Card`, `Badge`, `Button`). TanStack Query is already used for dashboard and live-orders mock data with optimistic mutations. The source proposal (`menu-management.md`) describes a menu controls hub with category tabs, quick 86 bar, item card grid, and toppings table.

The constitution requires feature-based architecture under `src/features/menu-management/`.

## Goals / Non-Goals

**Goals:**

- Deliver a complete `menu-management` vertical slice: UI, state, domain types, and mock API.
- Category pill tabs filtering Pizzas, Sides & Drinks, and Toppings & Modifiers panels.
- Quick 86 horizontal bar with high-velocity ingredient toggles and last sync timestamp.
- Item cards grid with available vs out-of-stock visual states and restock action.
- Toppings table with sync badges and stock toggles.
- Optimistic availability mutations via mock API simulating Telegram sync.
- Mount on existing `/menu` route inside `MainLayout`.
- RTL integration tests for toggles, card states, table, and route mounting.

**Non-Goals:**

- Real Telegram bot or backend integration (mock API only).
- Full item edit modal/form (Edit Item button is present but non-functional stub in v1).
- Lucide icon library (inline SVGs per dependency discipline).
- Persisting availability across sessions.
- Route rename to `/menu-management` (shell already uses `/menu`).

## Decisions

### 1. Feature module structure

**Decision:** Implement under `src/features/menu-management/` with public export via `index.ts`.

```
src/features/menu-management/
├── index.ts                          # exports MenuManagementView
├── components/
│   ├── MenuManagementView.tsx        # Layout container & category state
│   ├── CategoryTabs.tsx              # Top navigation pill menu
│   ├── Quick86Bar.tsx                # Horizontal fast ingredient toggle row
│   ├── MenuItemCard.tsx              # Grid card for active/disabled items
│   ├── MenuItemGrid.tsx              # Responsive grid wrapper
│   ├── ToppingsTable.tsx             # Table view for modifiers & prices
│   ├── SyncStatusBadge.tsx           # Synced / Paused indicator
│   ├── StockToggle.tsx               # Reusable ON/OFF switch (green/red)
│   └── icons.tsx                     # Inline SVG icons
├── hooks/
│   ├── useMenuQuery.ts               # TanStack Query for menu snapshot
│   ├── useQuick86Toggle.ts           # Mutation for quick 86 ingredients
│   ├── useMenuItemAvailability.ts    # Mutation for item restock/toggle
│   └── useToppingStockToggle.ts      # Mutation for toppings table
├── api/
│   └── mockMenuApi.ts                # Seed data + availability mutations
├── types/
│   └── menu.ts                       # Domain types
└── __tests__/
    └── menu-management-view.test.tsx
```

### 2. Category tab state

**Decision:** Local `useState` in `MenuManagementView` for active category tab (`pizzas` | `sides-drinks` | `toppings`). No Zustand — tab selection is ephemeral UI state.

**Rationale:** Constitution P3 — Zustand for UI-only state when shared across components; single-container tab state does not need a store.

### 3. State management for availability

**Decision:** TanStack Query for menu snapshot (items, quick86 ingredients, toppings, sync timestamp); optimistic mutations on toggle with rollback on error.

**Rationale:** Availability data mirrors server/Telegram sync state; matches dashboard and live-orders patterns.

### 4. Stock toggle visual states

**Decision:** Reusable `StockToggle` component:

| State | Switch color | Sync badge |
|-------|-------------|------------|
| In stock (ON) | `bg-status-ready-mint` (emerald) | Synced (green) |
| Out of stock (OFF / 86'd) | `bg-status-urgent-red` (crimson) | Paused (red) |

Pattern mirrors `StoreControlToggleCard` switch mechanics with inverted OFF color (red instead of gray) per menu spec.

### 5. Item card out-of-stock styling

**Decision:**

- Available: solid `border-surface-border`, full opacity, `Edit Item` secondary button.
- Out of stock: `border-dashed border-status-urgent-red/50`, `opacity-60`, absolute `OUT OF STOCK` badge overlay, `Restock Item` primary mint button.

Product images: CSS gradient placeholder blocks (no external image assets in v1).

### 6. Seed data

Match source doc structure:

- **Quick 86:** Pepperoni, Fresh Basil, Mushrooms, GF Crust — mix of in/out stock.
- **Pizzas:** 4–6 items including at least one out-of-stock pizza with CLASSIC category pill.
- **Sides & Drinks:** 3–4 items when Sides tab active.
- **Toppings:** 5+ rows with categories, extra prices, sync states.
- **Last sync:** Relative timestamp string (`2 MIN AGO`) derived from mock `lastSyncAt` field.

### 7. Edit Item button (v1 stub)

**Decision:** Render `Edit Item` button on available cards with `onClick` no-op or toast placeholder; no edit modal in v1.

**Rationale:** Source doc lists Edit Item in UI but does not specify edit flow; stub keeps visual fidelity without scope creep.

### 8. Route wiring

**Decision:** Update `MenuPage.tsx` to render `<MenuManagementView />` from `@/features/menu-management`.

### 9. Shared UI reuse

**Decision:** Compose from shared `Card`, `Badge`, and `Button`; feature-local components for tabs, toggles, grid cards, and table.

## Risks / Trade-offs

- **[Edit Item non-functional]** → Button visible but stubbed; document as v1 limitation. Follow-up change can add edit modal.
- **[Mock Telegram sync]** → Sync badge and timestamp are simulated; acceptable for MVP boundary mock.
- **[No cross-tab item dedup]** → Quick 86 and toppings may represent overlapping ingredients with separate mock records; future backend will unify.
- **[Crimson OFF toggle vs dashboard gray OFF]** → Intentional spec deviation for 86 visual urgency; documented in ui-style-guide delta.

## Migration Plan

1. Add feature module and wire `MenuPage` — no route URL changes.
2. Rollback: revert `MenuPage` to placeholder if needed.

## Open Questions

- None blocking v1.
