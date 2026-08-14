## ADDED Requirements

### Requirement: Menu overview endpoint

The menu API module SHALL expose a function that calls `GET /api/menu` and returns the typed overview payload (`quick86List`, `items`, `toppings`, `lastSyncedAt`) defined by the Postman collection and backend contract.

#### Scenario: Fetch full menu overview

- **WHEN** the client calls the menu overview function
- **THEN** it sends `GET {baseUrl}/api/menu`
- **AND** returns the parsed overview object

#### Scenario: Empty overview

- **WHEN** the backend returns `{ "quick86List": [], "items": [], "toppings": [], "lastSyncedAt": null }`
- **THEN** the client resolves with empty arrays and null `lastSyncedAt`

### Requirement: Quick-86 list endpoint

The menu API module SHALL expose a function that calls `GET /api/menu/quick-86` and returns the `{ quick86List }` payload.

#### Scenario: Fetch quick-86 list

- **WHEN** the client calls the quick-86 list function
- **THEN** it sends `GET {baseUrl}/api/menu/quick-86`
- **AND** returns the `quick86List` array from the response body

### Requirement: Menu item availability endpoint

The menu API module SHALL expose a function that calls `PATCH /api/menu/items/{itemId}/availability` with body `{ "isAvailable": boolean }` and returns the updated menu item.

#### Scenario: Mark item unavailable

- **WHEN** the client patches item `3fa85f64-5717-4562-b3fc-2c963f66afa6` with `{ "isAvailable": false }`
- **THEN** it sends `PATCH {baseUrl}/api/menu/items/3fa85f64-5717-4562-b3fc-2c963f66afa6/availability` with that JSON body
- **AND** returns the updated item with `available: false`

#### Scenario: Missing isAvailable rejected

- **WHEN** the backend responds with HTTP 400 and code `INVALID_REQUEST`
- **THEN** the client throws an error with status 400, code `INVALID_REQUEST`, and the backend message

### Requirement: Topping stock endpoint

The menu API module SHALL expose a function that calls `PATCH /api/menu/toppings/{toppingId}/stock` with body `{ "inStock": boolean }` and returns the updated topping including `telegramSync`.

#### Scenario: Mark topping out of stock

- **WHEN** the client patches topping `1ca85f64-5717-4562-b3fc-2c963f66afa1` with `{ "inStock": false }`
- **THEN** it sends `PATCH {baseUrl}/api/menu/toppings/1ca85f64-5717-4562-b3fc-2c963f66afa1/stock` with that JSON body
- **AND** returns the updated topping with `telegramSync: "Paused"`

#### Scenario: Topping not found

- **WHEN** the backend responds with HTTP 404 and code `TOPPING_NOT_FOUND`
- **THEN** the client throws an error with status 404 and code `TOPPING_NOT_FOUND`

### Requirement: Postman scope boundary

The shared API client integration for this phase SHALL cover the Orders, Dashboard, and Menu Postman groups (twelve endpoints total). Telegram endpoints (`POST /api/telegram/webhook`, `POST /api/telegram/notify`) remain excluded from frontend client exports and React features.

#### Scenario: No Telegram client exports for UI

- **WHEN** menu or other frontend features import from `@/shared/api`
- **THEN** no Telegram webhook or notify functions are exported for UI consumption

### Requirement: Menu feature uses shared menu client

The menu management feature SHALL load and mutate data exclusively through `fetchMenuOverview()`, `patchItemAvailability()`, and `patchToppingStock()` from the shared API module.

#### Scenario: Overview fetched on load

- **WHEN** the menu query runs
- **THEN** it calls `GET /api/menu` via the shared client
- **AND** does not import mock menu API modules

#### Scenario: Stock toggles use PATCH endpoints

- **WHEN** kitchen staff toggles item availability or topping stock
- **THEN** the mutation calls the corresponding shared menu PATCH function
- **AND** does not mutate local-only mock state

## MODIFIED Requirements

### Requirement: Future endpoint placeholders

The shared API layer SHALL include stub modules (types and function signatures only) for **store settings** and **order history** endpoints that are not yet in the Postman collection. The menu module SHALL be a fully implemented client (not a stub) now that menu routes exist in Postman.

#### Scenario: Settings and history placeholder exports

- **WHEN** a feature imports from the settings or order-history API stub module
- **THEN** TypeScript types and named function exports are available
- **AND** calling those functions throws a clear "not implemented" error until the backend route exists

#### Scenario: Menu module is implemented

- **WHEN** a feature imports menu functions from `@/shared/api`
- **THEN** `fetchMenuOverview`, `patchItemAvailability`, and `patchToppingStock` call real backend routes
- **AND** do not throw "not implemented"
