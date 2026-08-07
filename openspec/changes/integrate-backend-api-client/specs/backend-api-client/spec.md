## ADDED Requirements

### Requirement: Configurable API base URL

The application SHALL read the backend base URL from the `VITE_API_BASE_URL` environment variable and default to `http://localhost:7071` when unset.

#### Scenario: Default base URL in local development

- **WHEN** the app starts without `VITE_API_BASE_URL`
- **THEN** all API requests are sent to `http://localhost:7071`

#### Scenario: Custom base URL override

- **WHEN** `VITE_API_BASE_URL` is set to a non-empty value
- **THEN** all API requests use that value as the request origin prefix

### Requirement: Shared JSON fetch wrapper

The shared API client SHALL expose a single fetch helper that sets `Content-Type: application/json` for mutating requests, parses JSON success bodies, and throws typed errors for non-2xx responses.

#### Scenario: Successful JSON response

- **WHEN** the backend returns a 2xx response with a JSON body
- **THEN** the client resolves with the parsed JSON payload

#### Scenario: Error response parsing

- **WHEN** the backend returns a non-2xx response with `{ "code": "...", "message": "..." }`
- **THEN** the client throws an error carrying the HTTP status, `code`, and `message` fields

### Requirement: Live orders list endpoint

The orders API module SHALL expose a function that calls `GET /api/orders/live` and returns the typed `{ orders: LiveOrder[] }` payload defined by the backend contract.

#### Scenario: Fetch active orders

- **WHEN** the client calls the live orders list function
- **THEN** it sends `GET {baseUrl}/api/orders/live`
- **AND** returns the `orders` array from the response body

#### Scenario: Empty live board

- **WHEN** the backend returns `{ "orders": [] }`
- **THEN** the client resolves with an empty array

### Requirement: Order status update endpoint

The orders API module SHALL expose a function that calls `PATCH /api/orders/{orderId}/status` with body `{ "status": "<OrderStatus>" }` and returns the updated order.

#### Scenario: Advance order status

- **WHEN** the client patches order `3fa85f64-5717-4562-b3fc-2c963f66afa6` to `InPrep`
- **THEN** it sends `PATCH {baseUrl}/api/orders/3fa85f64-5717-4562-b3fc-2c963f66afa6/status` with JSON body `{ "status": "InPrep" }`
- **AND** returns the updated order object from the response body

#### Scenario: Invalid transition surfaced to caller

- **WHEN** the backend responds with HTTP 409 and code `INVALID_TRANSITION`
- **THEN** the client throws an error with status 409, code `INVALID_TRANSITION`, and the backend message

### Requirement: Dashboard endpoints contract

The dashboard API module SHALL expose typed functions for `GET /api/dashboard/metrics`, `GET /api/dashboard/activity`, and `POST /api/dashboard/store-status` matching the Postman collection and backend contract shapes.

#### Scenario: Metrics snapshot

- **WHEN** the client calls the dashboard metrics function
- **THEN** it sends `GET {baseUrl}/api/dashboard/metrics`
- **AND** returns the metrics payload including nullable `revenueTrendPercent` and `avgPrepTimeMins`

#### Scenario: Activity feed

- **WHEN** the client calls the dashboard activity function
- **THEN** it sends `GET {baseUrl}/api/dashboard/activity`
- **AND** returns the `entries` array

#### Scenario: Store pause toggle

- **WHEN** the client posts `{ "isPaused": true, "reason": "Kitchen Overload" }`
- **THEN** it sends `POST {baseUrl}/api/dashboard/store-status` with that JSON body
- **AND** returns `{ isPaused, updatedAt }`

### Requirement: Order creation endpoint contract

The orders API module SHALL expose a typed function for `POST /api/orders` that accepts the backend create-order request body and returns the created order on HTTP 201.

#### Scenario: Create order success

- **WHEN** the client submits a valid create-order payload
- **THEN** it sends `POST {baseUrl}/api/orders` with the payload
- **AND** returns the created order with status `New`

#### Scenario: Store paused rejection

- **WHEN** the backend responds with HTTP 409 and code `STORE_PAUSED`
- **THEN** the client throws an error with status 409 and code `STORE_PAUSED`

### Requirement: Future endpoint placeholders

The shared API layer SHALL include stub modules (types and function signatures only) for menu management, store settings, and order history endpoints that are not yet in the Postman collection, so feature slices can import stable contracts before backend routes exist.

#### Scenario: Placeholder module exports

- **WHEN** a feature imports from the menu, settings, or order-history API stub module
- **THEN** TypeScript types and named function exports are available
- **AND** calling those functions throws a clear "not implemented" error until the backend route exists

### Requirement: Backend order status type

The shared API types SHALL define `OrderStatus` as the string union `New | InPrep | InOven | Ready | Completed | Cancelled`, matching the backend enum documented in the Postman collection.

#### Scenario: Status union matches backend

- **WHEN** application code references `OrderStatus`
- **THEN** only the six backend enum values are assignable
