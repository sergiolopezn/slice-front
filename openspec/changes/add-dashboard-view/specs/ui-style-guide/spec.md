## ADDED Requirements

### Requirement: KPI summary card styling

Dashboard KPI cards SHALL use the dark card surface with rounded corners, bold primary metric typography, and monospace formatting for currency and numeric values.

#### Scenario: KPI card appearance

- **WHEN** a KPI summary card renders
- **THEN** it uses `bg-surface-card` with `border-surface-border` and `rounded-2xl` styling
- **AND** primary values use bold white text with monospace font for currency and counts

### Requirement: Capacity progress bar color thresholds

Station capacity progress bars SHALL use status color tokens mapped to load percentage thresholds.

#### Scenario: High load progress bar

- **WHEN** a station capacity is ≥80%
- **THEN** the progress bar fill uses the urgent red token

#### Scenario: Medium load progress bar

- **WHEN** a station capacity is between 50% and 79%
- **THEN** the progress bar fill uses the prep amber token

#### Scenario: Low load progress bar

- **WHEN** a station capacity is below 50%
- **THEN** the progress bar fill uses the ready mint token

### Requirement: Store control toggle card styling

Store control toggle cards SHALL display an icon, label, and accessible switch control with ON/OFF visual states using green for enabled and muted gray for disabled.

#### Scenario: Toggle ON state

- **WHEN** a store control channel is enabled
- **THEN** the switch displays an active green state

#### Scenario: Toggle OFF state

- **WHEN** a store control channel is disabled
- **THEN** the switch displays an inactive muted state

### Requirement: Activity timeline entry styling

Activity feed entries SHALL use a left color-accent border to distinguish event types (orders, alerts, system, refunds) with timestamp and secondary metadata in muted monospace text.

#### Scenario: Activity entry appearance

- **WHEN** an activity timeline item renders
- **THEN** it displays a colored left border accent, primary message text, and muted timestamp metadata
