## 1. Shared API client foundation

- [x] 1.1 Create `src/shared/api/client.ts` with `getBaseUrl()`, JSON fetch helper, and `ApiError` class parsing `{ code, message }` from non-2xx responses
- [x] 1.2 Add `src/shared/api/types/errors.ts` and `src/shared/api/types/orders.ts` with `OrderStatus`, `LiveOrder`, line-item, and list/patch response types aligned to Postman examples
- [x] 1.3 Add `src/shared/api/types/dashboard.ts` with metrics, activity, and store-status types aligned to backend contract
- [x] 1.4 Implement `src/shared/api/orders.ts` (`fetchLiveOrders`, `patchOrderStatus`, `createOrder`)
- [x] 1.5 Implement `src/shared/api/dashboard.ts` (`fetchMetrics`, `fetchActivity`, `postStoreStatus`)
- [x] 1.6 Add stub modules under `src/shared/api/stubs/` for menu, settings, and order-history with types and not-implemented throws
- [x] 1.7 Export public API from `src/shared/api/index.ts`
- [x] 1.8 Add `.env.example` documenting `VITE_API_BASE_URL=http://localhost:7071`

## 2. Live orders integration (Phase 1)

- [x] 2.1 Replace `OrderPhase` with backend `OrderStatus` in `src/features/live-orders/types/order.ts`; remove `PENDING_REVIEW` and legacy enum values
- [x] 2.2 Add `mapLiveOrderToTicket.ts` to transform API `LiveOrder` → UI `OrderTicket` (order number formatting, `createdAt` → timer, item labels from `menuItemName`/`modifiers`)
- [x] 2.3 Add `nextOrderStatus()` helper implementing `New → InPrep → InOven → Ready → Completed` transitions
- [x] 2.4 Update `useOrdersQuery` to call `fetchLiveOrders()` via mapper; keep 10s refetch interval
- [x] 2.5 Update `useAdvanceOrderStatus` to call `patchOrderStatus()` with optimistic rollback on `ApiError`
- [x] 2.6 Update live-orders components (`LiveOrdersDashboard`, ticket cards, header metrics) for backend status values and colors
- [x] 2.7 Remove `src/features/live-orders/api/mockOrdersApi.ts` and any imports
- [x] 2.8 Surface API error messages on failed status advance (409 message or generic retry)

## 3. Tests

- [x] 3.1 Unit tests for `client.ts` error parsing and `mapLiveOrderToTicket`
- [x] 3.2 Update `live-orders-dashboard.test.tsx` to mock `fetch` with backend-shaped responses instead of seed mocks
- [x] 3.3 Add test coverage for status advance optimistic rollback on 409 conflict

## 4. Verification

- [x] 4.1 Manual smoke test with backend at `http://localhost:7071`: load `/live-orders`, verify cards render, advance order through `New → Completed`
- [x] 4.2 Confirm no remaining imports of live-orders mock API in `src/`

## 5. Future phases (document only — not in this change)

- [ ] 5.1 Wire dashboard feature to `dashboard.ts` API module (metrics, activity, store-status)
- [ ] 5.2 Wire order creation when order-intake UI exists
- [ ] 5.3 Replace menu, settings, and order-history mocks when backend routes are available
