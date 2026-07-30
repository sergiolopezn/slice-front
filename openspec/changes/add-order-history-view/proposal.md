## Why

Restaurant managers and staff need a searchable archive of historical orders to track order status, review detailed customer fulfillment timelines, and handle receipts/refunds. The `/order-history` route currently renders a placeholder; this change delivers the full order history and logs view.

## What Changes

- Add top header controls: search bar and date range filter placeholders.
- Add status filter tabs: All Orders, Completed, Cancelled, Refunded with badge counts.
- Implement paginated order history table with order ID, date/time, customer, delivery type, items summary, total, payment, status, and View Details action.
- Implement a right-side detail drawer with customer metadata, item breakdown, order timeline, and Re-print Receipt / Refund Order actions.
- Wire the feature into `OrderHistoryPage` at `/order-history` via an `order-history` feature module with mock data layer.
- Add integration tests for search filtering, status tabs, drawer open/close, and route mounting.

## Capabilities

### New Capabilities

- `order-history`: Searchable order archive with status filters, paginated table, and detail drawer with timeline.

### Modified Capabilities

- `ui-style-guide`: Add order history table, status badges, delivery type pills, and detail drawer patterns.

## Impact

- **Code**: New `src/features/order-history/` feature slice; update `src/app/pages/OrderHistoryPage.tsx`.
- **Dependencies**: TanStack Query for mock data; inline SVG icons; client-side filter/pagination.
- **Tests**: RTL integration tests for search, filters, drawer, and route.
- **Routing**: No route URL changes — mounts at existing `/order-history` path.
