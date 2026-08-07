## Context

The frontend uses feature-local mocks (`mockOrdersApi.ts`, etc.) with KDS-specific status enums that diverge from the backend. The backend Postman collection (`sliceos.postman_collection.json`) and contract docs under `backend/specs/*/contracts/api.md` define six live endpoints today:

| Method | Path |
| --- | --- |
| GET | `/api/orders/live` |
| PATCH | `/api/orders/{orderId}/status` |
| POST | `/api/orders` |
| GET | `/api/dashboard/metrics` |
| GET | `/api/dashboard/activity` |
| POST | `/api/dashboard/store-status` |

User decisions for this change:
- Full shared client layer with stubs for future endpoints (menu, settings, order history).
- No mock fallback — always hit the real API for integrated features.
- Phase 1 implements live orders only.
- Align UI status model to backend enums.

## Goals / Non-Goals

**Goals:**
- Introduce `src/shared/api/` as the single HTTP boundary for backend communication.
- Type all six Postman endpoints plus error shape `{ code, message }`.
- Replace live-orders mocks with real API calls and backend-aligned domain mapping.
- Preserve TanStack Query patterns (polling, optimistic updates, rollback).

**Non-Goals:**
- Wiring dashboard, menu, settings, or order-history views to the API (stubs only).
- MSW or env-toggle mock mode.
- Persisting item-level checkbox state to the backend.
- Auth headers or production deployment config.

## Decisions

### 1. Module layout under `src/shared/api/`

```
src/shared/api/
  client.ts          # fetch wrapper, ApiError, getBaseUrl()
  types/
    orders.ts        # LiveOrder, OrderStatus, CreateOrderRequest, ...
    dashboard.ts     # MetricsSnapshot, ActivityEntry, StoreStatusRequest, ...
    errors.ts        # ErrorResponse, ApiError
  orders.ts          # fetchLiveOrders(), patchOrderStatus(), createOrder()
  dashboard.ts       # fetchMetrics(), fetchActivity(), postStoreStatus()
  stubs/
    menu.ts          # types + throw not implemented
    settings.ts
    order-history.ts
  index.ts           # public exports
```

**Rationale**: Keeps cross-feature contracts in `shared` per constitution P5; features import only from `index.ts`.

**Alternative considered**: Per-feature API files duplicating fetch logic — rejected (violates DRY and error-handling consistency).

### 2. Environment variable `VITE_API_BASE_URL`

Default `http://localhost:7071`; read via `import.meta.env.VITE_API_BASE_URL`.

**Rationale**: Standard Vite pattern; matches Postman `baseUrl` variable.

### 3. Feature adapter layer in live-orders

Keep presentation types in `src/features/live-orders/types/order.ts` but map from `LiveOrder` (API) → `OrderTicket` (UI) in a dedicated mapper (`mapLiveOrderToTicket.ts`).

**Rationale**: UI can retain `#1042`-style formatting, timer display, and local checkbox state without leaking presentation concerns into shared API types.

**Status mapping**:

| Backend | Header color | Next status on action |
| --- | --- | --- |
| `New` | red (urgent) | `InPrep` |
| `InPrep` | amber (prep) | `InOven` |
| `InOven` | amber (prep) | `Ready` |
| `Ready` | mint | `Completed` (removes from board) |

Remove `PENDING_REVIEW` entirely.

### 4. TanStack Query integration

- `useOrdersQuery`: `queryFn` → `fetchLiveOrders()` + map; `refetchInterval: 10_000`.
- `useAdvanceOrderStatus`: `mutationFn` → compute next status, call `patchOrderStatus()`; optimistic update uses backend status values; rollback on `ApiError`.

**Alternative considered**: Polling-only without optimistic UI — rejected (kitchen UX requires instant feedback per constitution P3).

### 5. Error handling

Throw `ApiError extends Error` with `{ status, code, message }`. Live-orders mutation `onError` rolls back cache and shows `message` (409) or generic retry text (network/5xx).

### 6. Stub modules for future endpoints

Export types and functions that `throw new Error('… API not implemented')` so imports compile but fail loudly if called prematurely.

### 7. Testing strategy

- Unit-test `client.ts` error parsing and mappers with `vi.stubGlobal('fetch', ...)`.
- Update live-orders integration tests to mock `fetch` with backend-shaped JSON instead of importing seed mocks.
- No new test library (constitution P6).

## Risks / Trade-offs

- **[Risk] Backend unavailable during dev** → Developers must run Azure Functions locally; document in README/.env.example.
- **[Risk] CORS misconfiguration** → Backend must allow `http://localhost:5173`; verify against `AllowReactApp` policy.
- **[Risk] UI fields not in API** (distance, server name, rack ID) → Map from available fields (`fulfillmentType`, `customerPhone`, `telegramChatId`); omit unavailable fields rather than invent data.
- **[Trade-off] Item checkboxes stay local-only** → Simpler phase 1; may confuse staff if page refreshes — acceptable until backend supports prep tracking.

## Migration Plan

1. Add `src/shared/api/` and `.env.example` with `VITE_API_BASE_URL`.
2. Implement orders + dashboard client functions (dashboard unused until phase 2).
3. Add live-order mapper and refactor hooks to use API.
4. Update components/tests for new status enums; delete `mockOrdersApi.ts`.
5. Manual verification: backend running, navigate to `/live-orders`, advance an order through the pipeline.

**Rollback**: Revert feature branch; mocks remain in git history if needed.

## Open Questions

- Should header metric pills also count `InPrep`, or only `New` + `InOven`? **Default for phase 1**: `New` (rush) and `InOven` (oven), matching prior urgent/in-oven semantics.
- Toast/inline error UI component — reuse existing pattern if present, otherwise inline banner in live-orders dashboard.
