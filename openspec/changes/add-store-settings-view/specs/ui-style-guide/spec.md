## ADDED Requirements

### Requirement: Settings two-column card layout

Settings cards SHALL use the dark card surface in a responsive two-column grid with consistent spacing and section headings.

#### Scenario: Settings layout appearance

- **WHEN** the settings view renders on a large viewport
- **THEN** store operations and delivery cards appear in the left column
- **AND** Telegram bot and kitchen alert cards appear in the right column

### Requirement: Master pause switch styling

The master pause switch SHALL use urgent red when paused and ready mint when active, with visible duration selector when paused.

#### Scenario: Pause switch ON state

- **WHEN** the store is paused
- **THEN** the master pause switch displays an urgent red inactive-order state

### Requirement: Bot connection status badge

Telegram bot status SHALL display Connected (green) or Disconnected (red) badge styling on the dark surface.

#### Scenario: Connected bot badge

- **WHEN** the bot webhook is healthy
- **THEN** a green Synced-style badge displays Connected status

### Requirement: Weekly schedule table styling

The weekly schedule editor SHALL use monospace time inputs and muted day labels on the dark card surface with disabled styling when a day is closed.

#### Scenario: Closed day row appearance

- **WHEN** a schedule day is marked closed
- **THEN** the row time inputs appear disabled with reduced opacity
