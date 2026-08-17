## MODIFIED Requirements

### Requirement: Order history search and filtering

The system SHALL filter order history records by order ID or customer name via a search input, by status via filter tabs, and by optional date range via start/end date inputs. Filtering SHALL be performed server-side through `GET /api/orders/history` query parameters.

#### Scenario: Searching orders by customer name

- **GIVEN** historical orders exist on the backend
- **WHEN** the user types "Alex" into the search bar
- **THEN** the client sends `GET /api/orders/history` with `searchTerm=Alex`
- **AND** the table displays matching orders from the API response
- **AND** the pagination summary reflects `totalEntries` from the response

#### Scenario: Filtering by status tab

- **GIVEN** orders with mixed statuses exist on the backend
- **WHEN** the user selects the Cancelled status tab
- **THEN** the client sends `GET /api/orders/history` with `status=cancelled`
- **AND** only cancelled orders from the API response are displayed

#### Scenario: Filtering by date range

- **GIVEN** the user sets start and end dates
- **WHEN** the order history view refetches
- **THEN** the client sends `GET /api/orders/history` with `startDate` and `endDate` as ISO-8601 dates
- **AND** the table displays orders within that inclusive range

### Requirement: Order history table

The system SHALL display a paginated table of historical orders with order ID, date/time, customer, delivery type, items summary, total, status, and actions. The table SHALL NOT include a Payment column.

#### Scenario: Table renders order rows

- **WHEN** the order history view loads
- **THEN** the client sends `GET /api/orders/history` with default paging (`page=1`, `pageSize=10`)
- **AND** a table displays order rows with columns: Order ID, Date & Time, Customer, Delivery Type, Items Summary, Total, Status, Actions
- **AND** pagination controls show the current range using `totalEntries` and `totalPages` from the API

#### Scenario: Server-side pagination

- **GIVEN** more historical orders exist than one page
- **WHEN** the user clicks Next
- **THEN** the client sends `GET /api/orders/history` with an incremented `page` parameter
- **AND** the table displays the next page of results from the API

### Requirement: Order detail side drawer

The system SHALL open a slide-in side drawer displaying detailed order metadata and milestone timeline when View Details is clicked. Detail data SHALL be loaded from `GET /api/orders/{orderId}/details`.

#### Scenario: Opening order drawer

- **GIVEN** an order row in the history table
- **WHEN** the user clicks View Details
- **THEN** the client sends `GET /api/orders/{orderId}/details`
- **AND** a side drawer slides in from the right
- **AND** displays Telegram Chat ID, item modifier breakdown, and timestamped lifecycle timeline

#### Scenario: Closing order drawer

- **GIVEN** the detail drawer is open
- **WHEN** the user clicks the close button
- **THEN** the drawer closes and the table remains visible

#### Scenario: Order details not found

- **WHEN** `GET /api/orders/{orderId}/details` returns HTTP 404 with code `ORDER_NOT_FOUND`
- **THEN** the drawer displays an error message
- **AND** the user can close the drawer

## ADDED Requirements

### Requirement: Order history data loaded from backend API

The order history feature SHALL load its list exclusively through `fetchOrderHistory()` from the shared API module and SHALL NOT import mock order history API modules.

#### Scenario: History query calls list endpoint

- **WHEN** the order history view mounts
- **THEN** the client sends `GET {baseUrl}/api/orders/history`
- **AND** maps the response into table row types

#### Scenario: Empty history result

- **WHEN** the backend returns `{ "items": [], "totalEntries": 0, "totalPages": 0 }`
- **THEN** the view renders an empty state without throwing

### Requirement: Status filter tabs aligned with backend

The order history feature SHALL provide status filter tabs for All Orders, Completed, and Cancelled only. A Refunded tab SHALL NOT be displayed.

#### Scenario: Refunded tab absent

- **WHEN** the order history view renders filter tabs
- **THEN** tabs are All Orders, Completed, and Cancelled
- **AND** no Refunded tab is present

### Requirement: Order history error surfacing

The order history feature SHALL surface `ApiError` messages when history or details requests fail.

#### Scenario: Invalid history query

- **WHEN** `GET /api/orders/history` returns HTTP 400 with code `INVALID_REQUEST`
- **THEN** the view shows an error state with retry action

#### Scenario: History list retry

- **GIVEN** the history list failed to load
- **WHEN** the user clicks Retry
- **THEN** the client refetches `GET /api/orders/history`
