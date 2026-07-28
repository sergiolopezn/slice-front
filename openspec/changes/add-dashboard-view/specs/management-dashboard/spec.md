## ADDED Requirements

### Requirement: KPI summary banner

The dashboard SHALL display a top row of four KPI summary cards showing today's revenue, total orders, average prep time, and active rush status with contextual trend badges or actions.

#### Scenario: KPI cards render on load

- **WHEN** the dashboard view loads
- **THEN** four KPI cards are visible showing revenue, order count, avg prep time, and rush status
- **AND** revenue displays a positive trend badge when applicable
- **AND** rush status displays a high-load state with a review capacity action when load is elevated

### Requirement: Kitchen station capacity visualization

The system SHALL calculate and visually display capacity percentages and active ticket counts for each station lead.

#### Scenario: Displaying station health

- **GIVEN** active tickets are assigned to stations
- **WHEN** the dashboard view loads
- **THEN** progress bars display for Kitchen-A, Kitchen-B, and Beverage stations with ticket counts
- **AND** progress bar colors follow load thresholds: red for ≥80%, amber for 50–79%, green for <50%

#### Scenario: Station metrics visible

- **WHEN** station capacity data is available
- **THEN** each station card shows the station name, active ticket count, and capacity percentage

### Requirement: Quick store control toggles

The system SHALL provide dedicated toggle controls for Telegram ordering, Dine-In table servicing, and Delivery zones.

#### Scenario: Toggle controls render

- **WHEN** the Quick Store Controls panel renders
- **THEN** three toggle cards are visible for Telegram, Dine-In, and Delivery Zones
- **AND** each card displays an icon, label, and switch reflecting current channel state

#### Scenario: Toggling operational channels

- **GIVEN** the Quick Store Controls panel is rendered
- **WHEN** a user flips any toggle switch
- **THEN** the channel status updates immediately in the UI
- **AND** the updated state is sent to the mock API layer

### Requirement: Recent activity feed

The dashboard SHALL display a timeline of recent operational events including order bumps, system status updates, capacity alerts, and order refunds.

#### Scenario: Activity feed renders entries

- **WHEN** the dashboard view loads
- **THEN** a recent activity section lists timestamped log entries
- **AND** each entry displays a color-accented left border and secondary metadata

### Requirement: Dashboard route integration

The `/` and `/dashboard` routes SHALL render the management dashboard feature instead of a placeholder page.

#### Scenario: Route mounts dashboard

- **WHEN** the user navigates to `/dashboard`
- **THEN** the main content area renders the management dashboard with KPI row, station capacity, controls, and activity feed
