## 1. Feature Scaffold & Mock API

- [x] 1.1 Create `src/features/dashboard/types/dashboard.ts` with KPI, station, store control, and activity types
- [x] 1.2 Create `src/features/dashboard/api/mockDashboardApi.ts` with seed data and toggle mutation
- [x] 1.3 Create inline SVG icons in `src/features/dashboard/components/icons.tsx`
- [x] 1.4 Create `src/features/dashboard/index.ts` public export

## 2. State Hooks

- [x] 2.1 Implement `useDashboardQuery.ts` for fetching dashboard snapshot via TanStack Query
- [x] 2.2 Implement `useStoreControls.ts` with Zustand toggle state and mock API mutation

## 3. Dashboard Components

- [x] 3.1 Implement `KpiCard.tsx` reusable KPI card wrapper
- [x] 3.2 Implement `KpiSummaryRow.tsx` with 4 KPI cards (revenue, orders, prep time, rush status)
- [x] 3.3 Implement `StationCapacityCard.tsx` with color-threshold progress bars
- [x] 3.4 Implement `StoreControlToggleCard.tsx` with icon, label, and accessible switch
- [x] 3.5 Implement `ActivityTimelineItem.tsx` with color-accent left border
- [x] 3.6 Implement `ActivityFeed.tsx` activity list container
- [x] 3.7 Implement `DashboardView.tsx` composing 2-column layout

## 4. Route Integration

- [x] 4.1 Update `src/app/pages/DashboardPage.tsx` to render `DashboardView` from `@/features/dashboard`

## 5. Testing

- [x] 5.1 Test: KPI summary row renders four cards with seed metrics
- [x] 5.2 Test: station capacity bars render with correct color thresholds
- [x] 5.3 Test: store control toggle updates switch state on click
- [x] 5.4 Test: activity feed renders timeline entries
- [x] 5.5 Test: `/dashboard` route renders dashboard view

## 6. Validation

- [x] 6.1 Run `npm run build`, `npm run lint`, and `npm test` — all pass without errors
