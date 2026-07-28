## ADDED Requirements

### Requirement: Horizontal KDS card stream layout

The live orders board SHALL use a horizontal scrollable card stream layout instead of a multi-column Kanban grid, with consistent gap and padding on the dark app background.

#### Scenario: Horizontal stream styling

- **WHEN** the live orders dashboard renders ticket cards
- **THEN** cards are laid out in a horizontal flex/scroll container with `gap-6` and `p-6` on `bg-bg-app`
- **AND** each card maintains minimum 48px touch targets on action buttons

### Requirement: Order item row styling

Completed order line items SHALL use strikethrough text styling and a visible checkbox aligned with the item description and modifiers.

#### Scenario: Completed item appearance

- **WHEN** a line item is marked complete
- **THEN** the item label renders with line-through decoration and muted text color
- **AND** the checkbox shows a checked state
