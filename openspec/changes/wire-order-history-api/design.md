## Context

Postman collection audit (2026-08-14) vs frontend:

| Endpoint | Client | Feature wired |
|---|---|---|
| Orders live + status + create (3) | Yes | Yes (live + status); `POST` typed only |
| **Orders history + details (2)** | **Stub throws** | **Mock only** |
| Dashboard (3) | Yes | Yes |
| Menu (4) | Yes | Yes |
| Telegram (2) | No | Excluded |
| Settings (4) | Stub | Mock (not wired) |

Backend contract: [`specs/006-order-history-api/contracts/api.md`](../../backend/specs/006-order-history-api/contracts/api.md). Shared client pattern established by [`dashboard.ts`](src/shared/api/dashboard.ts), [`menu.ts`](src/shared/api/menu.ts), and [`orders.ts`](src/shared/api/orders.ts).

Current UI gaps vs API (resolved in this change):
- **Payment column** removed — list endpoint has no payment fields.
- **Refunded tab** removed — API returns `400` for `status=refunded`.
- **Client-side filter/pagination** replaced with server query params.
- **Detail drawer** currently reads full row from mock; API requires a second fetch.

## Goals / Non-Goals

**Goals:**
- Single vertical slice: order history reads from real API; drawer loads details on demand.
- Mapper transforms API DTOs → existing table/drawer presentation types.
- Search, status tabs, date range, and pagination drive query key + `fetchOrderHistory` params.
- Tests mock `fetch` with Postman JSON shapes.
- Replace order-history stub with real module; export from `@/shared/api`.

**Non-Goals:**
- Settings or Telegram client/UI integration.
- `POST /api/orders` / order intake UI.
- Re-print Receipt and Refund Order actions (buttons remain presentational).
- Per-tab status counts for inactive filters (show `totalEntries` for active filter only).
- Backend changes (history list already includes `itemsSummary`).

## Decisions

### 1. Two shared API functions

```
src/shared/api/
  order-history.ts           # fetchOrderHistory, fetchOrderDetails
  types/order-history.ts     # HistoryQueryParams, OrderHistoryResponse, OrderDetailsDto, etc.
```

Delete or replace `stubs/order-history.ts`. Update `index.ts` exports.

- `fetchOrderHistory(params)` → `GET /api/orders/history?...`
- `fetchOrderDetails(orderId)` → `GET /api/orders/{orderId}/details`

Build query string from optional params; omit empty `searchTerm`; default `status=all`, `page=1`, `pageSize=10`.

### 2. Server-driven query hook

Replace single `useOrderHistoryQuery()` with parameterized query:

```typescript
useOrderHistoryQuery({
  searchTerm,
  status: statusFilter === 'all' ? 'all' : statusFilter,
  startDate,
  endDate,
  page,
  pageSize: 10,
})
```

Query key: `['order-history', params]`. Debounce search input (~300ms) before updating query param. Reset `page` to 1 when search, status, or date filters change.

Pagination footer uses API `totalEntries`, `totalPages`, `page` — not local array length.

### 3. DTO → presentation mapping (list rows)

| API field | UI field | Notes |
|---|---|---|
| `orderNumber` (number) | `orderNumber` (string) | Prefix `#` for display |
| `createdAt` (ISO) | `dateTimeLabel` | Relative/short datetime formatter |
| `fulfillmentType` (`Delivery`/`Pickup`) | `deliveryType` (`delivery`/`pickup`) | Lowercase map |
| `status` (`Completed`/`Cancelled`) | `status` (`completed`/`cancelled`) | Lowercase map |
| `totalAmount` | `total` | Direct |
| `itemsSummary` | `itemsSummary` | Render as-is (multiline from backend) |

List rows do **not** carry `lineItems`, `timeline`, or `telegramChatId` — those come from details fetch.

Remove `paymentLabel` from `HistoricalOrder` and drop Payment column from table.

### 4. Details fetch on drawer open

```typescript
useOrderDetailsQuery(orderId, { enabled: !!orderId })
```

Map `OrderDetailsDto` → drawer `HistoricalOrder` subset:

| API field | UI field | Notes |
|---|---|---|
| `items[]` | `lineItems[]` | `menuItemName` → `name`; `unitPrice * quantity` → `price`; split `modifiers` on `,` |
| `deliveryAddress` | `fulfillmentAddress` | Direct |
| `telegramChatId` | `telegramChatId` | Direct |
| `timeline[]` | `timeline[]` | Generate stable `id` from index + timestamp; format ISO → display label |

Show loading/error state in drawer while details fetch runs.

### 5. Status filter tabs

Tabs: **All Orders**, **Completed**, **Cancelled** only. Remove Refunded tab, type, badge, and mock seed rows.

Tab counts: display `totalEntries` from the **current** query response on the active tab; inactive tabs show label without count or reuse last known count — prefer showing count only on active tab to avoid extra API calls.

Remove hardcoded `displayTotalCount: 1284` from mock snapshot model.

### 6. Date range inputs

Wire existing `<input type="date">` controls to `startDate` / `endDate` state (ISO `YYYY-MM-DD`). Pass to API only when set. Clear dates resets params.

### 7. File layout

```
src/shared/api/
  order-history.ts
  types/order-history.ts
src/features/order-history/
  api/
    mapOrderHistory.ts        # list + details mappers
  hooks/
    useOrderHistoryQuery.ts   # parameterized, server-driven
    useOrderDetailsQuery.ts   # lazy details
  components/
    OrderHistoryView.tsx      # remove client filter/paginate
    OrderHistoryTable.tsx     # remove Payment column
    OrderFilterTabs.tsx       # remove Refunded tab
  types/orderHistory.ts       # remove refunded, paymentLabel
  # delete mockOrderHistoryApi.ts
```

### 8. Error handling

Map `INVALID_REQUEST` (400) and `ORDER_NOT_FOUND` (404) via existing `ApiError` pattern. History list errors show retry banner (existing pattern). Details 404 shows message inside drawer.

### 9. Polling

No polling — history is archival. Refetch on filter/page change and manual retry only.

## Risks / Trade-offs

- **[Risk] `itemsSummary` multiline format differs from mock comma-separated strings** → Accept backend format; table cell uses `whitespace-pre-line` if needed.
- **[Risk] Tab counts inaccurate for inactive filters** → Show count on active tab only; document in UI copy if needed.
- **[Risk] Search debounce feels laggy** → 300ms debounce; tune in implementation if needed.
- **[Trade-off] Drawer requires network round-trip** → Acceptable; show loading skeleton in drawer.

## Migration Plan

1. Add shared order-history types + client functions.
2. Add mappers for list rows and details.
3. Update hooks and `OrderHistoryView` for server-driven params.
4. Remove Payment column, Refunded tab, and mock API.
5. Swap tests to fetch mocks (`orderHistoryFetchMock.ts`).
6. Manual smoke: load `/order-history`, search, filter, paginate, open drawer against Azure dev API.

## Open Questions

- None blocking — Payment column removal and Refunded tab removal are decided.
