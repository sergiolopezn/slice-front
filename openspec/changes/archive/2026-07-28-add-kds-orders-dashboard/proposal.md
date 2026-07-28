## Why

Kitchen staff need an itemized, card-based live orders view where they can check off individual items as they are prepared, track order timers, and advance orders through status-specific actions ("Bump Order", "Check Temp", "Complete"). The `/live-orders` route currently renders a placeholder; this change delivers the full KDS station dashboard for Kitchen-A.

## What Changes

- Add a station header with station label (`STATION: KITCHEN-A`), live metric pills (`1 URGENT`, `2 IN OVEN`), and in-page quick links (`Live Orders`, `History`, `Kitchen Stats`).
- Build a horizontal card stream layout with color-coded ticket headers by order phase (urgent/red, in-oven/amber, ready/mint, pending/muted).
- Add ticket cards with item-level completion checkboxes and strikethrough styling for completed line items.
- Render status-specific primary action buttons on each card (`BUMP ORDER`, `CHECK TEMP`, `COMPLETE`).
- Display order metadata sub-headers (distance, server name, pickup rack ID, prep instructions, pre-paid status).
- Wire the feature into `LiveOrdersPage` at `/live-orders` via a `live-orders` feature module with mock data and polling.
- Add integration tests for item toggling, status actions, and dashboard rendering.

## Capabilities

### New Capabilities

- `live-orders-dashboard`: Station header, horizontal order card stream, item-level progress tracking, status-specific card actions, and mock data layer for the Kitchen-A KDS view.

### Modified Capabilities

- `ui-style-guide`: Extend layout guidance with the horizontal card stream pattern and item-row strikethrough/checkbox styling for live order tickets.

## Impact

- **Code**: New `src/features/live-orders/` feature slice; update `src/app/pages/LiveOrdersPage.tsx` to mount the dashboard; reuse shared UI primitives (`Card`, `OrderCardHeader`, `Button`, `Badge`).
- **Dependencies**: Adds `@tanstack/react-query` and `zustand` for server-state polling and local item-completion state.
- **Tests**: RTL tests for ticket item toggling, status action buttons, and dashboard header metrics.
- **Routing**: No route changes — dashboard mounts at existing `/live-orders` path inside `MainLayout`.
