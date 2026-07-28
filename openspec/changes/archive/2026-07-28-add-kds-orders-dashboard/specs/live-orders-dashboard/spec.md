## ADDED Requirements

### Requirement: Station header with live metrics

The live orders dashboard SHALL display a station header identifying the active kitchen station, live count pills for urgent and in-oven orders, and in-page quick navigation links for Live Orders, History, and Kitchen Stats.

#### Scenario: Header renders station and metrics

- **WHEN** the live orders dashboard loads
- **THEN** the header displays `STATION: KITCHEN-A`
- **AND** metric pills show the current count of urgent and in-oven orders
- **AND** quick links for Live Orders, History, and Kitchen Stats are visible

### Requirement: Horizontal order card stream

The dashboard SHALL render active order tickets in a horizontal scrollable card stream ordered by urgency and elapsed time, using the dark KDS app background.

#### Scenario: Cards render in horizontal stream

- **WHEN** mock orders are loaded
- **THEN** ticket cards appear in a horizontal layout within the main content area
- **AND** each card uses the shared dark card surface styling

### Requirement: Status-colored ticket headers

Each ticket card SHALL display a color-coded top banner matching its order phase: red for urgent, amber for in-oven, mint for ready, and muted gray for pending review.

#### Scenario: Urgent ticket header styling

- **WHEN** an order has status `URGENT`
- **THEN** the ticket header uses the urgent red banner token
- **AND** displays the order number and live timer in monospace

#### Scenario: In-oven ticket header styling

- **WHEN** an order has status `IN_OVEN`
- **THEN** the ticket header uses the prep amber banner token

#### Scenario: Ready ticket header styling

- **WHEN** an order has status `READY`
- **THEN** the ticket header uses the ready mint banner token

### Requirement: Order metadata sub-headers

Each ticket card SHALL display contextual metadata including distance, server name, pickup rack ID, prep instructions, and pre-paid status when provided by the order data.

#### Scenario: Metadata visible on ticket

- **WHEN** an order includes metadata fields
- **THEN** the ticket card renders distance, server, rack ID, prep notes, and pre-paid indicator below the header banner

### Requirement: Item-level progress tracking

The system SHALL allow kitchen staff to toggle completion checkmarks for individual line items inside an order ticket. Completed items MUST render with strikethrough text styling.

#### Scenario: Marking an item done

- **GIVEN** an active order ticket with unchecked items
- **WHEN** the user checks off an item (e.g., "12x Buffalo Wings")
- **THEN** the item text renders with a strikethrough visual effect
- **AND** the checkbox state updates immediately in the UI

#### Scenario: Unchecking a completed item

- **GIVEN** a ticket with a checked item
- **WHEN** the user unchecks the item
- **THEN** the strikethrough styling is removed
- **AND** the checkbox returns to unchecked state

### Requirement: Status-specific card actions

The system SHALL render a primary action button on each ticket customized to the order's current phase: red "BUMP ORDER" for urgent, amber "CHECK TEMP" for in-oven, and mint "COMPLETE" for ready.

#### Scenario: Urgent bump action

- **GIVEN** a ticket with status `URGENT`
- **WHEN** the ticket card renders
- **THEN** a red "BUMP ORDER" button is displayed at the bottom of the card

#### Scenario: In-oven check temp action

- **GIVEN** a ticket with status `IN_OVEN`
- **WHEN** the ticket card renders
- **THEN** an amber "CHECK TEMP" button is displayed at the bottom of the card

#### Scenario: Ready complete action

- **GIVEN** a ticket with status `READY`
- **WHEN** the ticket card renders
- **THEN** a mint "COMPLETE" button is displayed at the bottom of the card

### Requirement: Pending review empty state

When no active tickets match a pending-review phase, the dashboard SHALL render a muted placeholder card indicating no orders are awaiting review.

#### Scenario: Empty pending state

- **WHEN** there are no pending-review orders
- **THEN** a muted placeholder card with pending-review labeling is shown in the stream

### Requirement: Live orders route integration

The `/live-orders` route SHALL render the live orders dashboard feature instead of a placeholder page.

#### Scenario: Route mounts dashboard

- **WHEN** the user navigates to `/live-orders`
- **THEN** the main content area renders the live orders dashboard with station header and ticket stream
