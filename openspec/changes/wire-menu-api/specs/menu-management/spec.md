## MODIFIED Requirements

### Requirement: Quick availability 86 bar

The system SHALL provide a horizontal quick availability bar with fast toggle switches for high-velocity ingredients from the backend quick-86 list and a last Telegram sync timestamp derived from `lastSyncedAt`.

#### Scenario: Quick 86 bar renders

- **WHEN** the Pizzas or Sides & Drinks tab is active
- **THEN** a quick availability bar displays toggle switches for each entry in the API `quick86List`
- **AND** a last sync timestamp is visible (e.g., `LAST SYNC: 2 MIN AGO`, or `NEVER` when `lastSyncedAt` is null)

#### Scenario: Toggling a quick 86 ingredient off

- **GIVEN** an ingredient in the quick 86 bar is in stock (ON)
- **WHEN** kitchen staff flips the stock toggle to OFF
- **THEN** the switch turns crimson red
- **AND** the Telegram sync badge reflects Paused
- **AND** the client sends `PATCH /api/menu/toppings/{toppingId}/stock` with `{ "inStock": false }`

#### Scenario: Toggling a quick 86 ingredient on

- **GIVEN** an ingredient in the quick 86 bar is out of stock (OFF)
- **WHEN** kitchen staff flips the stock toggle to ON
- **THEN** the switch turns emerald green
- **AND** the Telegram sync badge reflects Synced
- **AND** the client sends `PATCH /api/menu/toppings/{toppingId}/stock` with `{ "inStock": true }`

### Requirement: Menu item cards grid

The system SHALL display menu items in a responsive card grid with distinct available and out-of-stock visual states, populated from `GET /api/menu`.

#### Scenario: Available item card renders

- **GIVEN** a menu item has availability set to true
- **WHEN** the item cards grid renders
- **THEN** the card displays a product image placeholder, category pill, title, amber price accent, emerald availability toggle (ON), and an Edit Item button

#### Scenario: Out-of-stock item card renders

- **GIVEN** a menu item availability is set to false
- **WHEN** the item cards grid renders
- **THEN** the card displays a dashed outer border with an OUT OF STOCK badge overlay
- **AND** the layout is dimmed with a disabled status pill
- **AND** a Restock Item action button replaces Edit Item

#### Scenario: Restocking an out-of-stock item

- **GIVEN** a menu item is out of stock
- **WHEN** the user clicks Restock Item
- **THEN** the client sends `PATCH /api/menu/items/{itemId}/availability` with `{ "isAvailable": true }`
- **AND** the card transitions to the available item visual state after the API succeeds

### Requirement: Toppings management table

The system SHALL display a toppings management table with topping name, category, extra price, Telegram sync status, and stock toggle columns, populated from `GET /api/menu`.

#### Scenario: Toppings table renders

- **WHEN** the Toppings & Modifiers tab is active
- **THEN** a table displays columns for TOPPING NAME, CATEGORY, EXTRA PRICE, TELEGRAM SYNC, and STOCK
- **AND** each row shows topping data with a sync status indicator and stock toggle

#### Scenario: Topping sync status display

- **GIVEN** a topping is in stock and synced
- **WHEN** the toppings table renders
- **THEN** the Telegram Sync column displays a Synced indicator

#### Scenario: Topping marked out of stock

- **GIVEN** a topping stock toggle is ON (in stock)
- **WHEN** kitchen staff flips the stock toggle to OFF
- **THEN** the switch turns crimson red
- **AND** the Telegram Sync badge reflects Paused
- **AND** the client sends `PATCH /api/menu/toppings/{toppingId}/stock` with `{ "inStock": false }`

### Requirement: Ingredient 86ing and Telegram sync

The system SHALL reflect Telegram sync status from the backend when availability or stock is toggled from the Quick Availability bar or Toppings table.

#### Scenario: Marking an ingredient out of stock

- **GIVEN** an ingredient is marked active
- **WHEN** kitchen staff flips the stock toggle to OFF
- **THEN** the switch turns crimson red
- **AND** the Telegram Sync badge reflects Paused after the PATCH response returns `telegramSync: "Paused"`

## ADDED Requirements

### Requirement: Menu data loaded from backend API

The menu management feature SHALL load its snapshot exclusively through `fetchMenuOverview()` from the shared API module and SHALL NOT import mock menu API modules.

#### Scenario: Menu query calls overview endpoint

- **WHEN** the menu management view mounts
- **THEN** the client sends `GET {baseUrl}/api/menu`
- **AND** maps the response into the menu snapshot used by category tabs and content panels

#### Scenario: Empty menu overview

- **WHEN** the backend returns empty `items`, `toppings`, and `quick86List` arrays
- **THEN** the view renders empty states without throwing

### Requirement: Menu mutation error surfacing

The menu management feature SHALL surface `ApiError` messages when availability or stock PATCH requests fail.

#### Scenario: Unknown menu item

- **WHEN** `PATCH /api/menu/items/{itemId}/availability` returns HTTP 404 with code `MENU_ITEM_NOT_FOUND`
- **THEN** the UI shows the backend error message
- **AND** the toggle reverts to its prior state

#### Scenario: Unknown topping

- **WHEN** `PATCH /api/menu/toppings/{toppingId}/stock` returns HTTP 404 with code `TOPPING_NOT_FOUND`
- **THEN** the UI shows the backend error message
- **AND** the toggle reverts to its prior state
