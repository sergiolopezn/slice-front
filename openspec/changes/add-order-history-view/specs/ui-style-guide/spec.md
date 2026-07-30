## ADDED Requirements

### Requirement: Order status badge styling

Order status badges SHALL use green for Completed, red for Cancelled, and amber for Refunded states on the dark surface.

#### Scenario: Completed status badge

- **WHEN** an order status is completed
- **THEN** the badge displays with the ready mint token styling

#### Scenario: Cancelled status badge

- **WHEN** an order status is cancelled
- **THEN** the badge displays with the urgent red token styling

### Requirement: Delivery type pill styling

Delivery type pills SHALL display pickup and delivery variants with icon and label on the dark table surface.

#### Scenario: Pickup delivery pill

- **WHEN** an order fulfillment type is pickup
- **THEN** a pill badge displays with pickup label and icon

### Requirement: Order detail drawer styling

The order detail drawer SHALL slide in from the right with dark card surface, timeline left-accent entries, and footer action buttons.

#### Scenario: Drawer appearance

- **WHEN** the detail drawer opens
- **THEN** it overlays the main content with a dark panel and visible close control
