## MODIFIED Requirements

### Requirement: Station header with live metrics

The live orders dashboard SHALL display a station header identifying the active kitchen station, live count pills for `New` and `InOven` orders, and in-page quick navigation links for Live Orders, History, and Kitchen Stats.

#### Scenario: Header renders station and metrics

- **WHEN** the live orders dashboard loads
- **THEN** the header displays `STATION: KITCHEN-A`
- **AND** metric pills show the current count of `New` and `InOven` orders from the API response
- **AND** quick links for Live Orders, History, and Kitchen Stats are visible

### Requirement: Horizontal order card stream

The dashboard SHALL render active order tickets in a horizontal scrollable card stream ordered by backend `createdAt` (oldest first), using the dark KDS app background.

#### Scenario: Cards render in horizontal stream

- **WHEN** live orders are loaded from `GET /api/orders/live`
- **THEN** ticket cards appear in a horizontal layout within the main content area
- **AND** each card uses the shared dark card surface styling

### Requirement: Status-colored ticket headers

Each ticket card SHALL display a color-coded top banner matching its backend order status: red for `New`, amber for `InPrep` and `InOven`, and mint for `Ready`.

#### Scenario: New ticket header styling

- **WHEN** an order has status `New`
- **THEN** the ticket header uses the urgent red banner token
- **AND** displays the order number and elapsed-time timer in monospace

#### Scenario: InPrep ticket header styling

- **WHEN** an order has status `InPrep`
- **THEN** the ticket header uses the prep amber banner token

#### Scenario: InOven ticket header styling

- **WHEN** an order has status `InOven`
- **THEN** the ticket header uses the prep amber banner token

#### Scenario: Ready ticket header styling

- **WHEN** an order has status `Ready`
- **THEN** the ticket header uses the ready mint banner token

### Requirement: Order metadata sub-headers

Each ticket card SHALL display contextual metadata derived from the backend order payload, including customer name, fulfillment type, phone or Telegram identifier when present, and line-item modifiers.

#### Scenario: Metadata visible on ticket

- **WHEN** an order includes `customerName`, `fulfillmentType`, `customerPhone`, or item `modifiers`
- **THEN** the ticket card renders those fields below the header banner

### Requirement: Item-level progress tracking

The system SHALL allow kitchen staff to toggle completion checkmarks for individual line items inside an order ticket. Completed items MUST render with strikethrough text styling. Item check state is local UI state only and is not persisted to the backend in this phase.

#### Scenario: Marking an item done

- **GIVEN** an active order ticket with unchecked items
- **WHEN** the user checks off an item
- **THEN** the item text renders with a strikethrough visual effect
- **AND** the checkbox state updates immediately in the UI

#### Scenario: Unchecking a completed item

- **GIVEN** a ticket with a checked item
- **WHEN** the user unchecks the item
- **THEN** the strikethrough styling is removed
- **AND** the checkbox returns to unchecked state

### Requirement: Status-specific card actions

The system SHALL render a primary action button on each ticket that advances the order to the next backend status via `PATCH /api/orders/{id}/status`: `New → InPrep`, `InPrep → InOven`, `InOven → Ready`, and `Ready → Completed`. Button styling SHALL match status color tokens (red for `New`, amber for `InPrep`/`InOven`, mint for `Ready`).

#### Scenario: New advance action

- **GIVEN** a ticket with status `New`
- **WHEN** the ticket card renders
- **THEN** a red primary action button is displayed
- **AND** activating it patches the order to `InPrep`

#### Scenario: InPrep advance action

- **GIVEN** a ticket with status `InPrep`
- **WHEN** the user activates the primary action
- **THEN** the client patches the order to `InOven`

#### Scenario: InOven advance action

- **GIVEN** a ticket with status `InOven`
- **WHEN** the ticket card renders
- **THEN** an amber primary action button is displayed
- **AND** activating it patches the order to `Ready`

#### Scenario: Ready complete action

- **GIVEN** a ticket with status `Ready`
- **WHEN** the user activates the primary action
- **THEN** the client patches the order to `Completed`
- **AND** the order is removed from the live board on success

### Requirement: Live orders route integration

The `/live-orders` route SHALL render the live orders dashboard feature backed by the shared API client instead of mock data.

#### Scenario: Route mounts dashboard

- **WHEN** the user navigates to `/live-orders`
- **THEN** the main content area renders the live orders dashboard with station header and ticket stream
- **AND** orders are fetched from `GET /api/orders/live`

## REMOVED Requirements

### Requirement: Pending review empty state

**Reason**: The backend live-orders API does not expose a `PENDING_REVIEW` status; active orders are limited to `New`, `InPrep`, `InOven`, and `Ready`.

**Migration**: Remove the pending-review placeholder card and any references to `PENDING_REVIEW` in live-orders types, UI, and tests.

## ADDED Requirements

### Requirement: API error recovery on status advance

When a status patch fails with HTTP 409 (`INVALID_TRANSITION`) or another API error, the dashboard SHALL roll back optimistic UI updates and surface the backend `message` to the user.

#### Scenario: Conflict rollback

- **WHEN** a status advance receives HTTP 409 with code `INVALID_TRANSITION`
- **THEN** the ticket reverts to its pre-mutation status
- **AND** the backend error message is shown to the user

#### Scenario: Network failure rollback

- **WHEN** a status advance fails due to a network or 5xx error
- **THEN** the ticket reverts to its pre-mutation status
- **AND** a generic retry message is shown

### Requirement: Elapsed timer from createdAt

Each ticket SHALL display a live elapsed-time timer computed from the order's `createdAt` timestamp returned by the backend.

#### Scenario: Timer updates from API timestamp

- **WHEN** an order includes `createdAt`
- **THEN** the ticket header displays elapsed minutes and seconds since that timestamp
