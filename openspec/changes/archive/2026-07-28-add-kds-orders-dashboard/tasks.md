## 1. Dependencies & Feature Scaffold

- [x] 1.1 Install `@tanstack/react-query` and `zustand`
- [x] 1.2 Add `QueryClientProvider` wrapper in `src/main.tsx`
- [x] 1.3 Create `src/features/live-orders/types/order.ts` with `OrderStatus`, `OrderTicket`, and `OrderLineItem` types
- [x] 1.4 Create `src/features/live-orders/api/mockOrdersApi.ts` with seed data, fetch, and status-advance mutations
- [x] 1.5 Create `src/features/live-orders/index.ts` public export

## 2. State Hooks

- [x] 2.1 Implement `useOrdersQuery.ts` with 10s polling via TanStack Query
- [x] 2.2 Implement Zustand store in `useItemCompletion.ts` keyed by `orderId:itemId`
- [x] 2.3 Implement status-advance mutation hook that updates query cache optimistically

## 3. Dashboard Components

- [x] 3.1 Implement `StatusActionButton.tsx` with phase-specific styling (Bump / Check Temp / Complete)
- [x] 3.2 Implement `OrderItemRow.tsx` with checkbox toggle and strikethrough styling
- [x] 3.3 Implement `TicketCard.tsx` composing header, metadata, item rows, and action button
- [x] 3.4 Implement `OrderGrid.tsx` as horizontal scrollable card stream
- [x] 3.5 Implement `KdsHeader.tsx` with station label, live metric pills, and quick nav links
- [x] 3.6 Implement `LiveOrdersDashboard.tsx` composing header, grid, loading, and empty states

## 4. Route Integration

- [x] 4.1 Update `src/app/pages/LiveOrdersPage.tsx` to render `LiveOrdersDashboard` from `@/features/live-orders`
- [x] 4.2 Extend `OrderCardHeader` or map statuses to support `pending` muted variant if needed

## 5. Testing

- [x] 5.1 Test: dashboard renders station header with metric pills
- [x] 5.2 Test: ticket cards render with status-colored headers
- [x] 5.3 Test: checking an item applies strikethrough styling
- [x] 5.4 Test: urgent ticket shows "BUMP ORDER", in-oven shows "CHECK TEMP", ready shows "COMPLETE"
- [x] 5.5 Test: `/live-orders` route renders dashboard (integration via `LiveOrdersPage`)

## 6. Validation

- [x] 6.1 Run `npm run build`, `npm run lint`, and `npm test` — all pass without errors
