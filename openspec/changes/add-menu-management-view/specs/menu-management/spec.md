## ADDED Requirements

### Requirement: Category tab navigation

The menu management view SHALL display a top category navigation bar with tabs for Pizzas, Sides & Drinks, and Toppings & Modifiers that filter the visible content panel.

#### Scenario: Category tabs render on load

- **WHEN** the menu management view loads
- **THEN** three category tabs are visible labeled Pizzas, Sides & Drinks, and Toppings & Modifiers
- **AND** Pizzas is selected by default

#### Scenario: Switching category tabs

- **GIVEN** the menu management view is rendered
- **WHEN** the user selects the Toppings & Modifiers tab
- **THEN** the toppings management table is displayed
- **AND** the item cards grid is hidden

#### Scenario: Pizzas tab shows item grid

- **GIVEN** the Pizzas category tab is active
- **WHEN** the content panel renders
- **THEN** the quick availability bar and item cards grid are visible

### Requirement: Quick availability 86 bar

The system SHALL provide a horizontal quick availability bar with fast toggle switches for high-velocity ingredients and a last Telegram sync timestamp.

#### Scenario: Quick 86 bar renders

- **WHEN** the Pizzas or Sides & Drinks tab is active
- **THEN** a quick availability bar displays toggle switches for Pepperoni, Fresh Basil, Mushrooms, and GF Crust
- **AND** a last sync timestamp is visible (e.g., `LAST SYNC: 2 MIN AGO`)

#### Scenario: Toggling a quick 86 ingredient off

- **GIVEN** an ingredient in the quick 86 bar is in stock (ON)
- **WHEN** kitchen staff flips the stock toggle to OFF
- **THEN** the switch turns crimson red
- **AND** the Telegram sync badge reflects Paused
- **AND** the mock API records the availability change

#### Scenario: Toggling a quick 86 ingredient on

- **GIVEN** an ingredient in the quick 86 bar is out of stock (OFF)
- **WHEN** kitchen staff flips the stock toggle to ON
- **THEN** the switch turns emerald green
- **AND** the Telegram sync badge reflects Synced

### Requirement: Menu item cards grid

The system SHALL display menu items in a responsive card grid with distinct available and out-of-stock visual states.

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
- **THEN** the item availability toggles to in stock
- **AND** the card transitions to the available item visual state

### Requirement: Toppings management table

The system SHALL display a toppings management table with topping name, category, extra price, Telegram sync status, and stock toggle columns.

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
- **AND** the mock API records the availability change

### Requirement: Ingredient 86ing and Telegram sync

The system SHALL immediately update item availability in the mock Telegram sync layer when toggled from the Quick Availability bar or Toppings table.

#### Scenario: Marking an ingredient out of stock

- **GIVEN** an ingredient is marked active
- **WHEN** kitchen staff flips the stock toggle to OFF
- **THEN** the switch turns crimson red
- **AND** the Telegram Sync badge reflects Paused
- **AND** the mock API blocks orders containing that item

### Requirement: Menu management route integration

The `/menu` route SHALL render the menu management feature instead of a placeholder page.

#### Scenario: Route mounts menu management view

- **WHEN** the user navigates to `/menu`
- **THEN** the main content area renders the menu management view with category tabs and the default Pizzas content panel
