## ADDED Requirements

### Requirement: Order history list endpoint

The order history API module SHALL expose a function that calls `GET /api/orders/history` with optional query parameters (`searchTerm`, `status`, `startDate`, `endDate`, `page`, `pageSize`) and returns the typed paginated response defined by the Postman collection and backend contract.

#### Scenario: Fetch history page

- **WHEN** the client calls the order history function with `{ page: 1, pageSize: 10 }`
- **THEN** it sends `GET {baseUrl}/api/orders/history?page=1&pageSize=10`
- **AND** returns the parsed response including `items`, `totalEntries`, `totalPages`, `page`, and `pageSize`

#### Scenario: Fetch filtered history

- **WHEN** the client calls the order history function with `{ searchTerm: "Alex", status: "completed", startDate: "2026-08-01", endDate: "2026-08-31" }`
- **THEN** it sends `GET {baseUrl}/api/orders/history` with those query parameters
- **AND** returns the filtered paginated response

#### Scenario: Empty history page

- **WHEN** the backend returns `{ "items": [], "totalEntries": 0, "totalPages": 0, "page": 1, "pageSize": 10 }`
- **THEN** the client resolves with an empty `items` array and zero totals

### Requirement: Order details endpoint

The order history API module SHALL expose a function that calls `GET /api/orders/{orderId}/details` and returns the full order record including items and timeline.

#### Scenario: Fetch order details

- **WHEN** the client calls the order details function with a valid order id
- **THEN** it sends `GET {baseUrl}/api/orders/{orderId}/details`
- **AND** returns the parsed details object including `telegramChatId`, `items`, and `timeline`

#### Scenario: Order not found

- **WHEN** the backend responds with HTTP 404 and code `ORDER_NOT_FOUND`
- **THEN** the client throws an error with status 404 and code `ORDER_NOT_FOUND`

### Requirement: Order history feature uses shared client

The order history feature SHALL load list and detail data exclusively through `fetchOrderHistory()` and `fetchOrderDetails()` from the shared API module.

#### Scenario: No mock imports

- **WHEN** the order history query or details query runs
- **THEN** it calls the shared order-history client functions
- **AND** does not import mock order history API modules

## MODIFIED Requirements

### Requirement: Future endpoint placeholders

The shared API layer SHALL include a stub module (types and function signatures only) for **store settings** endpoints that are not yet wired in the frontend. The order history module SHALL be a fully implemented client now that history routes exist in Postman.

#### Scenario: Settings placeholder exports

- **WHEN** a feature imports from the settings API stub module
- **THEN** TypeScript types and named function exports are available
- **AND** calling those functions throws a clear "not implemented" error until the backend route is wired

#### Scenario: Order history module is implemented

- **WHEN** a feature imports order history functions from `@/shared/api`
- **THEN** `fetchOrderHistory` and `fetchOrderDetails` call real backend routes
- **AND** do not throw "not implemented"

### Requirement: Postman scope boundary

The shared API client integration for this phase SHALL cover the Orders (live, status, create, history, details), Dashboard, and Menu Postman groups. Telegram endpoints remain excluded from frontend client exports and React features. Settings endpoints remain stubbed until a dedicated wiring change.

#### Scenario: No Telegram client exports for UI

- **WHEN** order history or other frontend features import from `@/shared/api`
- **THEN** no Telegram webhook or notify functions are exported for UI consumption

#### Scenario: History endpoints are exported

- **WHEN** the order history feature imports from `@/shared/api`
- **THEN** `fetchOrderHistory` and `fetchOrderDetails` are available as typed exports
