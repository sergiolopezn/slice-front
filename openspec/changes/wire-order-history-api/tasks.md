## 1. Shared API — order history types and client

- [x] 1.1 Add `src/shared/api/types/order-history.ts` with DTOs matching Postman (`OrderHistoryQueryParams`, `OrderHistoryItemDto`, `OrderHistoryResponse`, `OrderDetailsDto`, `OrderDetailsItemDto`, `OrderTimelineEntryDto`)
- [x] 1.2 Add `src/shared/api/order-history.ts` with `fetchOrderHistory(params)` and `fetchOrderDetails(orderId)`
- [x] 1.3 Export order-history functions and types from `src/shared/api/index.ts`; remove or replace `stubs/order-history.ts` placeholder

## 2. Order history mappers

- [x] 2.1 Add `src/features/order-history/api/mapOrderHistory.ts` mapping list DTOs → table row types
- [x] 2.2 Map `orderNumber` → `#` prefixed string; `fulfillmentType`/`status` → lowercase UI enums; `createdAt` → `dateTimeLabel`
- [x] 2.3 Map details DTO → drawer model (`lineItems`, `timeline`, `fulfillmentAddress`, `telegramChatId`)

## 3. Hooks — replace mocks with shared client

- [x] 3.1 Update `useOrderHistoryQuery` to accept filter/pagination params and call `fetchOrderHistory()` via mapper
- [x] 3.2 Add `useOrderDetailsQuery(orderId)` for lazy drawer fetch
- [x] 3.3 Debounce search input (~300ms) before updating query params; reset page on filter/date changes

## 4. UI — align with backend data and contract

- [x] 4.1 Update `OrderHistoryView` to use server-driven pagination (`totalEntries`, `totalPages`) instead of `filterOrders` / `paginateOrders`
- [x] 4.2 Wire start/end date inputs to `startDate` / `endDate` query params
- [x] 4.3 Remove Payment column from `OrderHistoryTable`; remove `paymentLabel` from `HistoricalOrder` type and mock seed data
- [x] 4.4 Remove Refunded tab from `OrderFilterTabs`; remove `refunded` from status types, badges, and mock data
- [x] 4.5 Update `OrderDetailDrawer` to accept details query loading/error states
- [x] 4.6 Delete `src/features/order-history/api/mockOrderHistoryApi.ts`

## 5. Tests

- [x] 5.1 Add `orderHistoryFetchMock.ts` with Postman-shaped history list and details responses
- [x] 5.2 Update `order-history-view.test.tsx`: server-driven search, status filter, pagination, drawer details fetch
- [x] 5.3 Add test for details 404 error handling in drawer

## 6. Verification

- [x] 6.1 Confirm no imports of `mockOrderHistoryApi` remain in `src/`
- [x] 6.2 Confirm order-history stub no longer throws "not implemented"
- [x] 6.3 Manual smoke against `VITE_API_BASE_URL`: load `/order-history`, search, filter by status, paginate, open drawer

## 7. Explicitly out of scope

- [x] _(no action)_ Settings Postman routes (`GET/PUT /api/settings`, Telegram admin routes)
- [x] _(no action)_ Telegram `/api/telegram/webhook` and `/api/telegram/notify`
- [x] _(no action)_ Re-print Receipt and Refund Order drawer actions
- [x] _(no action)_ `POST /api/orders` order intake UI
