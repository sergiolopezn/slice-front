## Why

Restaurant managers need a single-screen operational hub to monitor daily KPIs, track kitchen capacity by station, control order channels, and review recent activity. The `/dashboard` route currently renders a placeholder; this change delivers the full management dashboard view.

## What Changes

- Build a top 4-card KPI summary row: Today's Revenue (with trend badge), Total Orders (with channel breakdown), Avg. Prep Time (with warning), and Active Rush Status (with review capacity action).
- Build a Kitchen Capacity & Station Health section with progress bars and ticket counts for Kitchen-A, Kitchen-B, and Beverage stations, using color thresholds (red ≥80%, amber 50–79%, green <50%).
- Build Quick Store Controls with three toggle cards: Pause Telegram Orders, Dine-In Orders, and Delivery Zones.
- Build a Recent Activity Feed timeline with color-accented entries for order bumps, system updates, capacity alerts, and refunds.
- Wire the feature into `DashboardPage` at `/` and `/dashboard` via a `dashboard` feature module with mock data layer.
- Add integration tests for KPI rendering, capacity thresholds, toggle interactions, and route mounting.

## Capabilities

### New Capabilities

- `management-dashboard`: Operations dashboard with KPI summary, station capacity visualization, store control toggles, and recent activity feed.

### Modified Capabilities

- `ui-style-guide`: Add dashboard-specific patterns for KPI cards, capacity progress bars, toggle switches, and activity timeline entries.

## Impact

- **Code**: New `src/features/dashboard/` feature slice; update `src/app/pages/DashboardPage.tsx` to mount the dashboard view; reuse shared `Card` and `Badge` primitives where applicable.
- **Dependencies**: Uses existing TanStack Query and Zustand stack for mock data fetching and toggle state; inline SVG icons (no new icon library per dependency discipline).
- **Tests**: RTL integration tests for dashboard sections and toggle behavior.
- **Routing**: No route URL changes — dashboard mounts at existing `/` and `/dashboard` paths inside `MainLayout`.
