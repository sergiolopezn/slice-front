## Why

The Postman collection now includes **Orders history** routes (`GET /api/orders/history`, `GET /api/orders/{orderId}/details`) alongside the live-orders and dashboard routes already integrated in SliceOS. The order history screen at `/order-history` still runs on [`mockOrderHistoryApi.ts`](src/features/order-history/api/mockOrderHistoryApi.ts) with client-side filtering and pagination, and [`src/shared/api/stubs/order-history.ts`](src/shared/api/stubs/order-history.ts) throws "not implemented." Managers see seed data that does not reflect real completed/cancelled orders. Wiring order history to the shared API client is the next integration slice now that backend routes exist.

## What Changes

- Replace the order-history stub with a real [`src/shared/api/order-history.ts`](src/shared/api/order-history.ts) module matching Postman contracts.
- Add mapper layer translating history list DTOs → table row types and details DTO → drawer model.
- Switch `OrderHistoryView` from client-side `filterOrders` / `paginateOrders` to **server-driven** query params: `searchTerm`, `status`, `startDate`, `endDate`, `page`, `pageSize`.
- Lazy-load order details via `GET /api/orders/{orderId}/details` when the user clicks **View Details**.
- Wire date range inputs (currently decorative) to `startDate` / `endDate` query params.
- Remove [`mockOrderHistoryApi.ts`](src/features/order-history/api/mockOrderHistoryApi.ts) from the data path.
- **Remove the Payment column** from the history table (no payment field on the list endpoint; aligns UI with API).
- **Remove the Refunded status tab** (backend supports `all | completed | cancelled` only).
- Update integration tests to mock `fetch` with Postman-shaped history and details responses.

## Capabilities

### New Capabilities

_(none — builds on existing order-history feature and shared API client)_

### Modified Capabilities

- `order-history`: Data sourced from real history + details API; server-side search/filter/pagination; detail drawer loads on demand; table columns and status tabs aligned with backend contract.
- `backend-api-client`: Replace order-history stub with typed module; expand Postman scope to include Orders history routes (fourteen frontend-facing endpoints across Orders, Dashboard, and Menu groups; Telegram and Settings remain excluded or stubbed).

## Impact

- **In scope**: Order history feature (`src/features/order-history/`), shared API types + `order-history.ts`, order-history tests.
- **Out of scope**: Settings integration (`GET/PUT /api/settings`, Telegram admin routes in Postman Settings group); Telegram webhook/notify; `POST /api/orders` intake UI; Re-print Receipt / Refund Order drawer actions (UI buttons stay non-functional).
- **Environment**: Same `VITE_API_BASE_URL` and CORS requirements as dashboard and menu.
- **Postman verification** (2026-08-14):

| Group | Endpoint | Frontend status |
|---|---|---|
| Orders | `GET /api/orders/live` | Integrated |
| Orders | `PATCH /api/orders/{id}/status` | Integrated |
| Orders | `POST /api/orders` | Client only, no UI |
| Orders | **`GET /api/orders/history`** | **New — this change** |
| Orders | **`GET /api/orders/{id}/details`** | **New — this change** |
| Dashboard | 3 routes | Integrated |
| Menu | 4 routes | Integrated |
| Telegram | 2 routes | Excluded (server-to-server) |
| Settings | 4 routes | Stub / not wired |
