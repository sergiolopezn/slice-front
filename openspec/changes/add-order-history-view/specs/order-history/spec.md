## ADDED Requirements

### Requirement: Order history search and filtering

The system SHALL filter order history records by order ID or customer name via a search input and by status via filter tabs.

#### Scenario: Searching orders by customer name

- **GIVEN** historical orders exist
- **WHEN** the user types "Alex" into the search bar
- **THEN** the table filters to matching orders
- **AND** the pagination summary updates accordingly

#### Scenario: Filtering by status tab

- **GIVEN** orders with mixed statuses exist
- **WHEN** the user selects the Cancelled status tab
- **THEN** only cancelled orders are displayed

### Requirement: Order history table

The system SHALL display a paginated table of historical orders with order ID, date/time, customer, delivery type, items summary, total, payment, status, and actions.

#### Scenario: Table renders order rows

- **WHEN** the order history view loads
- **THEN** a table displays order rows with required columns
- **AND** pagination controls show the current page range

### Requirement: Order detail side drawer

The system SHALL open a slide-in side drawer displaying detailed order metadata and milestone timeline when View Details is clicked.

#### Scenario: Opening order drawer

- **GIVEN** an order row in the history table
- **WHEN** the user clicks View Details
- **THEN** a side drawer slides in from the right
- **AND** displays Telegram Chat ID, item modifier breakdown, and timestamped lifecycle timeline

#### Scenario: Closing order drawer

- **GIVEN** the detail drawer is open
- **WHEN** the user clicks the close button
- **THEN** the drawer closes and the table remains visible

### Requirement: Order history route integration

The `/order-history` route SHALL render the order history feature instead of a placeholder page.

#### Scenario: Route mounts order history view

- **WHEN** the user navigates to `/order-history`
- **THEN** the main content area renders the order history view with search, filters, and table
