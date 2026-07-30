## Context

SliceOS has `/order-history` as a placeholder. Shared UI primitives exist. TanStack Query is used across features. Source proposal describes searchable order archive with filters, paginated table, and detail drawer.

## Goals / Non-Goals

**Goals:**

- Complete `order-history` vertical slice with mock API and UI.
- Search by order ID or customer name (client-side filter).
- Status tabs with counts: All, Completed, Cancelled, Refunded.
- Paginated table (10 per page) with pagination summary.
- Detail drawer with metadata, line items, timeline, footer actions.
- Mount on `/order-history`.

**Non-Goals:**

- Real backend search or date-range filtering (date inputs rendered as UI shell only in v1).
- Functional receipt print or refund processing (stub buttons).
- Lucide icons (inline SVGs).

## Decisions

### 1. Feature structure

```
src/features/order-history/
├── index.ts
├── types/orderHistory.ts
├── api/mockOrderHistoryApi.ts
├── hooks/useOrderHistoryQuery.ts
├── components/
│   ├── OrderHistoryView.tsx
│   ├── OrderFilterTabs.tsx
│   ├── OrderHistoryTable.tsx
│   ├── OrderStatusBadge.tsx
│   ├── DeliveryTypeBadge.tsx
│   ├── OrderDetailDrawer.tsx
│   └── icons.tsx
└── __tests__/order-history-view.test.tsx
```

### 2. Filtering & pagination

**Decision:** Fetch full mock snapshot via TanStack Query; filter/search/paginate in `OrderHistoryView` with local state.

### 3. Drawer

**Decision:** Fixed right panel with backdrop overlay; close via X, backdrop click, or Escape. `aria-modal` + focus trap not required v1 (match responsive sidebar pattern).

### 4. Seed data

~12 orders mixing statuses and delivery types; total count label `1,284` as display total (mock simulates subset with representative filter counts).

## Risks / Trade-offs

- **[Static total count]** → Tab "All Orders (1,284)" uses fixed marketing count; filtered subset from seed data.
- **[Date filter non-functional]** → Inputs rendered for layout fidelity only in v1.

## Migration Plan

Update `OrderHistoryPage` to render `OrderHistoryView`. Rollback: revert to placeholder.

## Open Questions

- None blocking v1.
