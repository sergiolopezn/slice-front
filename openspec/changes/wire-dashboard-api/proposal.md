## Why

Live orders already call the real backend, but the management dashboard still runs on [`mockDashboardApi.ts`](src/features/dashboard/api/mockDashboardApi.ts) while the Postman collection exposes three ready endpoints: `GET /api/dashboard/metrics`, `GET /api/dashboard/activity`, and `POST /api/dashboard/store-status`. Managers see mock KPIs, fictional activity events, and three channel toggles that do not map to any backend route. Wiring the dashboard to the shared API client closes the largest frontend–backend gap without touching Telegram routes (webhook/notify are server-to-server and out of scope).

## What Changes

- Replace dashboard mock data with real calls via existing [`src/shared/api/dashboard.ts`](src/shared/api/dashboard.ts) functions.
- Add mapper layer (`mapDashboardMetrics`, `mapActivityFeed`) to transform API DTOs into dashboard presentation types.
- **BREAKING**: Redesign Quick Store Controls from three independent channel toggles to a **single store pause/resume** control backed by `POST /api/dashboard/store-status` with a required `reason`.
- **BREAKING**: Activity feed shows only backend audit entries (`StorePaused`, `StoreResumed`) instead of mock order/refund/alert events.
- Align station labels with API (`bar` instead of mock `beverage`).
- Add TanStack Query polling/refetch for dashboard snapshot; surface `ApiError` messages on pause toggle failure.
- Remove [`mockDashboardApi.ts`](src/features/dashboard/api/mockDashboardApi.ts) from the dashboard data path.
- Update integration tests to mock `fetch` with Postman-shaped responses.

## Capabilities

### New Capabilities

_(none — builds on existing shared API client and dashboard feature)_

### Modified Capabilities

- `management-dashboard`: Data sourced from real dashboard API; store pause UX and activity feed aligned to backend contracts.
- `backend-api-client`: Clarify dashboard client usage from the feature layer (no new endpoints; Telegram routes explicitly excluded).

## Impact

- **In scope**: Dashboard feature (`src/features/dashboard/`), shared API mappers, dashboard tests.
- **Out of scope**: Telegram endpoints (`/api/telegram/webhook`, `/api/telegram/notify`); menu, settings, order-history (no backend routes); `POST /api/orders` (no intake UI); live-orders (already integrated).
- **Environment**: Same `VITE_API_BASE_URL` and CORS requirements as live orders.
- **Tests**: Replace mock-dashboard test setup with fetch mocks matching Postman examples.
