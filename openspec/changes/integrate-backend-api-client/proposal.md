## Why

The SliceOS frontend currently runs entirely on feature-local mocks while the backend exposes a real HTTP API (documented in the Postman collection and backend `specs/*/contracts/api.md`). Without a shared client layer and aligned domain types, the KDS and dashboard cannot talk to production data. This change establishes the API integration contract and delivers the first vertical slice (live orders) against the real backend.

## What Changes

- Add a shared HTTP client under `src/shared/api/` with typed contracts for all six Postman endpoints today, plus placeholder modules for menu, settings, and order-history endpoints that do not exist on the backend yet.
- Configure the API base URL via `VITE_API_BASE_URL` (default `http://localhost:7071`).
- **BREAKING**: Replace live-orders mock types and status enums (`URGENT`, `IN_OVEN`, `READY`, `PENDING_REVIEW`) with backend-aligned values (`New`, `InPrep`, `InOven`, `Ready`, `Completed`, `Cancelled`).
- **Phase 1 (this change)**: Wire live orders to `GET /api/orders/live` and `PATCH /api/orders/{id}/status`; remove `mockOrdersApi.ts` from the live-orders data path.
- **Phase 2+ (documented, not implemented here)**: Swap dashboard, order creation, and remaining features from mocks to the shared client when those views are prioritized.
- No mock fallback or env toggle — all integrated features call the real API.

## Capabilities

### New Capabilities

- `backend-api-client`: Shared fetch wrapper, error parsing, environment config, typed endpoint modules for orders and dashboard, and stub contracts for future menu/settings/history APIs.

### Modified Capabilities

- `live-orders-dashboard`: Order status model, header metrics, ticket styling, and card actions aligned to backend enums; data loaded and mutated via the shared API client instead of mocks.

## Impact

- **Code**: New `src/shared/api/` module; refactor `src/features/live-orders/` types, hooks, components, and tests; remove live-orders mock API usage.
- **Environment**: Requires `VITE_API_BASE_URL` and a running backend at `http://localhost:7071` (CORS policy `AllowReactApp` from `http://localhost:5173`).
- **Tests**: Live-orders integration tests must mock `fetch` or MSW against backend-shaped responses instead of seed mocks.
- **Out of scope (this change)**: Dashboard, menu, settings, and order-history mock replacement; Telegram bot integration.
