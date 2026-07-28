## Context

SliceOS has a navigation shell with `/dashboard` (and `/`) rendering a placeholder. Shared dark KDS UI primitives exist (`Card`, `Badge`, `Button`). TanStack Query and Zustand are already installed for the live-orders feature. The source proposal (`dashboard.md`) describes a management operations dashboard with KPIs, station capacity, store toggles, and an activity feed.

The constitution requires feature-based architecture under `src/features/dashboard/`.

## Goals / Non-Goals

**Goals:**

- Deliver a complete `dashboard` vertical slice: UI, state, domain types, and mock API.
- 4-card KPI summary row with trend badges and rush status action.
- Station capacity section with color-threshold progress bars.
- Three store control toggle cards with optimistic local updates via mock API.
- Recent activity timeline with color-accented entries.
- Mount dashboard on existing `/` and `/dashboard` routes.
- RTL integration tests for core sections and toggle behavior.

**Non-Goals:**

- Real backend/WebSocket integration (mock API only).
- Persisting toggle state across sessions.
- Lucide icon library (use inline SVGs per dependency discipline, matching navigation shell pattern).
- Drill-down navigation from KPI cards to detail views.

## Decisions

### 1. Feature module structure

**Decision:** Implement under `src/features/dashboard/` with public export via `index.ts`.

```
src/features/dashboard/
├── index.ts                         # exports DashboardView
├── components/
│   ├── DashboardView.tsx            # 2-column layout composition
│   ├── KpiSummaryRow.tsx            # Top 4 KPI metrics banner
│   ├── KpiCard.tsx                  # Reusable KPI card wrapper
│   ├── StationCapacityCard.tsx      # Station load progress bar
│   ├── StoreControlToggleCard.tsx   # Icon + label + toggle switch
│   ├── ActivityTimelineItem.tsx     # Timestamped log entry
│   └── ActivityFeed.tsx             # Activity list container
├── hooks/
│   ├── useDashboardQuery.ts         # TanStack Query for dashboard data
│   └── useStoreControls.ts          # Zustand + mutation for toggles
├── api/
│   └── mockDashboardApi.ts          # KPI, stations, controls, activity seed
├── types/
│   └── dashboard.ts                 # Domain types
└── __tests__/
    └── dashboard-view.test.tsx
```

### 2. Layout: two-column dashboard

**Decision:** Use a responsive 2-column grid — left column for KPI row + station capacity + store controls; right column for activity feed. Stack to single column on smaller viewports.

```
┌─────────────────────────────────────────────────┐
│ KPI Summary Row (4 cards, grid)                 │
├──────────────────────────┬──────────────────────┤
│ Station Capacity         │ Recent Activity Feed │
│ Quick Store Controls     │                      │
└──────────────────────────┴──────────────────────┘
```

### 3. Icons: inline SVG over Lucide

**Decision:** Add dashboard icons (pause, utensils, truck, trend) as inline SVGs in `src/features/dashboard/components/icons.tsx`.

**Rationale:** Source doc mentions Lucide, but constitution dependency discipline and existing nav shell pattern favor inline SVGs without adding a new package.

### 4. State management

**Decision:** TanStack Query for dashboard snapshot data (KPIs, stations, activity); Zustand store for store-control toggle state with mock API mutation on toggle.

**Rationale:** Dashboard metrics are read-heavy snapshot data; toggles need immediate optimistic UX.

### 5. Capacity color thresholds

**Decision:** Utility function `getCapacityColor(percent)` returns token class:

| Range | Color token |
|-------|-------------|
| ≥ 80% | urgent red |
| 50–79% | prep amber |
| < 50% | ready mint |

Seed data from source doc: Kitchen-A 80% (red), Kitchen-B 65% (amber), Beverage 40% (green).

### 6. KPI seed data

Match source doc values:
- Revenue: `$3,850.50`, `+12% vs Yesterday`
- Orders: `114` (`88 Telegram, 26 Direct`)
- Avg prep: `11.4 mins`, rising warning
- Rush: `High Load` with `REVIEW CAPACITY` outline button

### 7. Route wiring

**Decision:** Update `DashboardPage.tsx` to render `<DashboardView />` from `@/features/dashboard`.

### 8. Shared UI reuse

**Decision:** Compose from shared `Card` and `Badge`; add feature-local components for KPI layout, progress bars, toggles, and timeline items.

## Risks / Trade-offs

- **[Toggle state not persisted]** → Mock API simulates update; acceptable for v1. Document as known limitation.
- **[Static KPI data]** → Seed values don't reflect live orders feature; future integration can derive from shared domain.
- **[Crimson rush accent vs style guide]** → Rush status card uses urgent red token from style guide rather than introducing new crimson; maintains token consistency.

## Migration Plan

1. Add feature module and wire `DashboardPage` — no route URL changes.
2. Rollback: revert `DashboardPage` to placeholder if needed.

## Open Questions

- None blocking v1.
