## 1. Dashboard API mappers

- [x] 1.1 Add `src/features/dashboard/api/mapDashboardSnapshot.ts` mapping `DashboardMetrics` + activity entries → `DashboardSnapshot`
- [x] 1.2 Map KPI fields: currency format for `todaysRevenue`, nullable trend/prep time, Telegram/direct subtitle from metrics counts
- [x] 1.3 Map `stations[]` using API `stationId`, `stationName`, `activeTickets`, `capacityPercent` (Bar not Beverage)
- [x] 1.4 Map activity entries: `StorePaused` / `StoreResumed` + reason + relative `createdAt`
- [x] 1.5 Derive initial `isPaused` from latest activity entry (default active when feed empty)

## 2. Hooks — replace mocks with shared client

- [x] 2.1 Update `useDashboardQuery` to call `fetchMetrics()` + `fetchActivity()` in parallel via mapper; add 30s refetch interval
- [x] 2.2 Replace `useStoreControls` with `useStorePause` calling `postStoreStatus({ isPaused, reason })` with optimistic rollback on `ApiError`
- [x] 2.3 Add `getStorePauseErrorMessage()` helper mirroring live-orders error pattern

## 3. UI — align with backend contract

- [x] 3.1 Replace three channel toggles with single `StorePauseCard` (pause/resume + required reason input)
- [x] 3.2 Update `DashboardView` to use new pause hook and show mutation error banner
- [x] 3.3 Simplify `ActivityFeed` / timeline for API audit entries only
- [x] 3.4 Remove `StoreControlChannel` and per-channel types from `types/dashboard.ts`
- [x] 3.5 Delete `src/features/dashboard/api/mockDashboardApi.ts`

## 4. Tests

- [x] 4.1 Add `dashboardFetchMock.ts` with Postman-shaped metrics/activity/store-status responses
- [x] 4.2 Update `dashboard-view.test.tsx`: KPI rendering from API metrics, station thresholds, pause with reason, activity entries
- [x] 4.3 Add test for pause rollback on API 400 (missing reason from server)

## 5. Verification

- [x] 5.1 Confirm no imports of `mockDashboardApi` remain in `src/`
- [x] 5.2 Confirm no Telegram routes added under `src/shared/api/` or dashboard feature
- [x] 5.3 Manual smoke against `VITE_API_BASE_URL`: load `/dashboard`, pause store with reason, verify activity feed updates

## 6. Explicitly out of scope

- [x] _(no action)_ Telegram `/api/telegram/webhook` and `/api/telegram/notify`
- [x] _(no action)_ Menu, settings, order-history mock replacement
- [x] _(no action)_ `POST /api/orders` order intake UI
