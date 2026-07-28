## Context

SliceOS has a navigation shell (`MainLayout` + sidebar) with `/live-orders` rendering a placeholder. Shared dark KDS UI primitives exist (`Card`, `OrderCardHeader`, `Button`, `Badge`) with status color tokens aligned to the UI style guide. The source proposal (`dashboard.md`) describes a Kitchen-A station dashboard with horizontal ticket cards, item-level checkboxes, and phase-specific action buttons.

The constitution requires feature-based architecture: the dashboard belongs in `src/features/live-orders/`, not the source doc's `src/components/kds/` path.

## Goals / Non-Goals

**Goals:**

- Deliver a complete `live-orders` vertical slice: UI, local state, domain types, and mock API.
- Horizontal scrollable ticket stream with status-colored headers (urgent, in-oven, ready, pending).
- Item-level checkbox toggling with strikethrough styling persisted in client state.
- Status-specific action buttons (`BUMP ORDER`, `CHECK TEMP`, `COMPLETE`) that advance order phase via mock API.
- Station header with live metric counts and in-page quick links.
- Mount dashboard on existing `/live-orders` route.
- RTL integration tests for core interactions.

**Non-Goals:**

- Real backend/WebSocket integration (mock polling only).
- Audio alerts for new orders (future enhancement).
- History or Kitchen Stats page implementation (links may be disabled or route to placeholders).
- Multi-station switching or authentication.
- Kanban column layout (this change uses horizontal card stream per updated spec).

## Decisions

### 1. Feature module structure (constitution-aligned)

**Decision:** Implement under `src/features/live-orders/` with public export via `index.ts`.

```
src/features/live-orders/
├── index.ts                    # exports LiveOrdersDashboard
├── components/
│   ├── LiveOrdersDashboard.tsx # page-level composition
│   ├── KdsHeader.tsx           # station label, metric pills, quick links
│   ├── OrderGrid.tsx           # horizontal scroll container
│   ├── TicketCard.tsx          # card wrapper + metadata + action
│   ├── OrderItemRow.tsx        # checkbox + item text + modifiers
│   └── StatusActionButton.tsx  # phase-specific primary CTA
├── hooks/
│   ├── useOrdersQuery.ts       # TanStack Query polling
│   └── useItemCompletion.ts    # Zustand store for checked items
├── api/
│   └── mockOrdersApi.ts        # fetch orders, bump/advance status
├── types/
│   └── order.ts                # OrderStatus, OrderTicket, OrderLineItem
└── __tests__/
    └── live-orders-dashboard.test.tsx
```

**Rationale:** Matches constitution layer boundaries and mirrors naming from source doc while living in the correct feature slice.

### 2. State management split

**Decision:** TanStack Query for order list fetching/polling and status mutations; Zustand for ephemeral item-completion checkbox state keyed by `orderId:itemId`.

**Rationale:** Order data is server-shaped and benefits from query cache + refetch; item checkmarks are local UX state that should not require API round-trips in v1.

**Alternative considered:** Single Zustand store for everything — rejected because it duplicates query-cache concerns and makes polling harder.

### 3. Order status model

**Decision:** Map source doc phases to typed statuses:

| Status | Header token | Action button |
|--------|-------------|---------------|
| `URGENT` | `rush` / urgent red | BUMP ORDER |
| `IN_OVEN` | `prep` / amber | CHECK TEMP |
| `READY` | `ready` / mint | COMPLETE |
| `PENDING_REVIEW` | idle gray | none (placeholder card) |

Reuse existing `OrderStatus` type from `OrderCardHeader` (`rush` | `prep` | `ready`) with an additional `pending` variant for placeholder cards.

### 4. Layout: horizontal stream over Kanban

**Decision:** Use `flex overflow-x-auto gap-6` for `OrderGrid` instead of the style guide's 4-column grid.

**Rationale:** Updated `dashboard.md` explicitly specifies horizontal card stream. Delta spec extends style guide accordingly.

### 5. Reuse shared UI primitives

**Decision:** Compose tickets from shared `Card`, `OrderCardHeader`, and `Button`; add feature-local `StatusActionButton` wrapper that applies style-guide action button classes per phase.

**Rationale:** Avoid duplicating token definitions; keep feature components focused on domain composition.

### 6. KdsHeader placement

**Decision:** Render `KdsHeader` inside `LiveOrdersDashboard` within the main content area (below app sidebar), not as a replacement for the app shell sidebar.

**Rationale:** App navigation already lives in `MainLayout` sidebar. Station header is contextual to the KDS view. Quick links (`History`, `Kitchen Stats`) use React Router `Link` to existing placeholder routes.

### 7. Mock API and polling

**Decision:** `mockOrdersApi.ts` returns a static seed set with simulated latency; `useOrdersQuery` polls every 10 seconds.

**Rationale:** Demonstrates live-update pattern without backend. Status advance mutations optimistically update query cache.

### 8. Route wiring

**Decision:** Update `LiveOrdersPage.tsx` to render `<LiveOrdersDashboard />` imported from `@/features/live-orders`.

## Risks / Trade-offs

- **[Item completion not persisted]** → Checkbox state lives in Zustand only; acceptable for v1 mock. Document as known limitation; future API can sync item progress.
- **[Horizontal scroll on small screens]** → Kitchen tablets are primary target; scroll is acceptable. Non-goal: responsive column fallback.
- **[Duplicate navigation]** → Sidebar + KdsHeader quick links overlap partially. Mitigation: KdsHeader links are contextual shortcuts; sidebar remains canonical app nav.
- **[New dependencies]** → Adds TanStack Query + Zustand. Justified by constitution stack references and polling/mutation patterns.

## Migration Plan

1. Add dependencies and feature module behind existing `/live-orders` route.
2. Replace placeholder in `LiveOrdersPage` — no route URL changes.
3. Rollback: revert `LiveOrdersPage` to placeholder import if needed.

## Open Questions

- None blocking v1 — History/Kitchen Stats links route to existing placeholders until those features ship.
