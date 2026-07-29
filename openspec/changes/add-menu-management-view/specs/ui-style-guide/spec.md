## ADDED Requirements

### Requirement: Category pill tab styling

Menu management category tabs SHALL use pill-style navigation with an active amber fill matching the sidebar active state and muted inactive tabs on the dark surface.

#### Scenario: Active category tab appearance

- **WHEN** a category tab is selected
- **THEN** it uses the nav active amber fill with dark text
- **AND** inactive tabs use muted text with hover highlight on the dark surface

### Requirement: Quick 86 toggle bar styling

The quick availability bar SHALL display horizontal ingredient toggle chips with ON/OFF color states: emerald green for in stock and crimson red for out of stock (86'd).

#### Scenario: Quick 86 toggle ON state

- **WHEN** an ingredient is in stock
- **THEN** the toggle switch displays an active emerald green state

#### Scenario: Quick 86 toggle OFF state

- **WHEN** an ingredient is out of stock (86'd)
- **THEN** the toggle switch displays a crimson red inactive state

### Requirement: Menu item card available styling

Available menu item cards SHALL use the standard dark card surface with category pill, amber price accent, and emerald availability toggle.

#### Scenario: Available menu item card appearance

- **WHEN** a menu item is available
- **THEN** the card uses `bg-surface-card` with solid border and rounded corners
- **AND** the price displays in prep amber monospace accent
- **AND** the availability toggle shows emerald green ON state

### Requirement: Menu item card out-of-stock styling

Out-of-stock menu item cards SHALL use a dashed border, dimmed opacity, OUT OF STOCK badge overlay, and a primary Restock Item action button.

#### Scenario: Out-of-stock menu item card appearance

- **WHEN** a menu item is out of stock
- **THEN** the card displays a dashed outer border with reduced opacity
- **AND** an OUT OF STOCK badge overlay is visible
- **AND** Edit Item is replaced by a Restock Item primary action button

### Requirement: Toppings table styling

The toppings management table SHALL use dark surface rows with monospace price columns, sync status badges (green Synced / red Paused), and accessible stock toggle switches.

#### Scenario: Toppings table row appearance

- **WHEN** a toppings table row renders
- **THEN** it displays on the dark card surface with column headers in muted uppercase text
- **AND** sync status uses green for Synced and red for Paused
- **AND** stock toggles follow the same ON/OFF color pattern as quick 86 toggles
