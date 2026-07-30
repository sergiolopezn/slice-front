## 1. Feature Scaffold & Mock API

- [x] 1.1 Create `src/features/order-history/types/orderHistory.ts` with order, line item, timeline, and filter types
- [x] 1.2 Create `src/features/order-history/api/mockOrderHistoryApi.ts` with seed orders and `resetOrderHistoryForTests()`
- [x] 1.3 Create inline SVG icons in `src/features/order-history/components/icons.tsx`
- [x] 1.4 Create `src/features/order-history/index.ts` public export

## 2. State Hooks

- [x] 2.1 Implement `useOrderHistoryQuery.ts` for fetching order history via TanStack Query

## 3. Order History Components

- [x] 3.1 Implement `OrderStatusBadge.tsx` for Completed, Cancelled, and Refunded states
- [x] 3.2 Implement `DeliveryTypeBadge.tsx` for Pickup and Delivery pills
- [x] 3.3 Implement `OrderFilterTabs.tsx` with status tabs and counts
- [x] 3.4 Implement `OrderHistoryTable.tsx` with paginated table rows and View Details action
- [x] 3.5 Implement `OrderDetailDrawer.tsx` with metadata, items, timeline, and footer actions
- [x] 3.6 Implement `OrderHistoryView.tsx` composing search, filters, table, pagination, and drawer

## 4. Route Integration

- [x] 4.1 Update `src/app/pages/OrderHistoryPage.tsx` to render `OrderHistoryView`

## 5. Testing

- [x] 5.1 Test: search filters orders by customer name
- [x] 5.2 Test: status tab filters orders by status
- [x] 5.3 Test: View Details opens drawer with timeline metadata
- [x] 5.4 Test: drawer closes via close button
- [x] 5.5 Test: `/order-history` route renders order history view

## 6. Validation

- [x] 6.1 Run `npm run build`, `npm run lint`, and `npm test` — all pass without errors
