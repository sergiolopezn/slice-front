## MODIFIED Requirements

### Requirement: KPI summary banner

The dashboard SHALL display a top row of four KPI summary cards populated from `GET /api/dashboard/metrics`: today's revenue, total orders (with Telegram/direct split), average prep time, and active rush status.

#### Scenario: KPI cards render from API metrics

- **WHEN** the dashboard view loads and `GET /api/dashboard/metrics` succeeds
- **THEN** four KPI cards are visible showing revenue, order count, avg prep time, and rush status
- **AND** revenue trend displays when `revenueTrendPercent` is non-null
- **AND** avg prep time shows a null/empty state when `avgPrepTimeMins` is null
- **AND** rush status reflects `activeRushStatus` (`Normal`, `Busy`, or `High Load`)

### Requirement: Kitchen station capacity visualization

The system SHALL render station capacity from the `stations` array returned by `GET /api/dashboard/metrics`.

#### Scenario: Displaying station health from API

- **WHEN** the dashboard view loads with station metrics
- **THEN** progress bars display for Kitchen-A, Kitchen-B, and Bar stations using `stationName`, `activeTickets`, and `capacityPercent`
- **AND** progress bar colors follow load thresholds: red for ≥80%, amber for 50–79%, green for <50%

#### Scenario: Empty station metrics

- **WHEN** all stations report zero active tickets
- **THEN** each station card shows `0` tickets and `0%` capacity

### Requirement: Store pause control

The system SHALL provide a single store pause/resume control backed by `POST /api/dashboard/store-status` with a required `reason` string.

#### Scenario: Pause control renders current state

- **WHEN** the Quick Store Controls panel renders
- **THEN** a single pause/resume control is visible reflecting whether the store is currently paused
- **AND** the control label indicates pausing blocks new order intake

#### Scenario: Pausing the store

- **GIVEN** the store is active
- **WHEN** the manager pauses the store and submits a non-empty reason
- **THEN** the client sends `POST /api/dashboard/store-status` with `{ "isPaused": true, "reason": "<reason>" }`
- **AND** the UI updates to the paused state on success

#### Scenario: Resuming the store

- **GIVEN** the store is paused
- **WHEN** the manager resumes the store with a reason
- **THEN** the client sends `POST /api/dashboard/store-status` with `{ "isPaused": false, "reason": "<reason>" }`
- **AND** the UI updates to the active state on success

#### Scenario: Missing reason rejected

- **WHEN** the manager attempts to change store status without a reason
- **THEN** the UI prevents submission
- **AND** does not call the API until a reason is provided

#### Scenario: API error on pause toggle

- **WHEN** `POST /api/dashboard/store-status` returns a non-2xx response
- **THEN** the UI rolls back optimistic state
- **AND** displays the backend `message` from the error response

### Requirement: Recent activity feed

The dashboard SHALL display a timeline sourced from `GET /api/dashboard/activity`, showing `StorePaused` and `StoreResumed` audit entries only.

#### Scenario: Activity feed renders API entries

- **WHEN** the dashboard view loads
- **THEN** the recent activity section lists entries from the API `entries` array
- **AND** each entry displays the action, reason, and formatted `createdAt` timestamp

#### Scenario: Empty activity feed

- **WHEN** the API returns `{ "entries": [] }`
- **THEN** the activity section shows an empty state message

### Requirement: Dashboard route integration

The `/` and `/dashboard` routes SHALL render the management dashboard backed by the shared API client instead of mock data.

#### Scenario: Route mounts dashboard with real API

- **WHEN** the user navigates to `/dashboard`
- **THEN** the main content area renders KPIs, station capacity, store pause control, and activity feed from API data

## REMOVED Requirements

### Requirement: Quick store control toggles

**Reason**: Backend exposes a single global store pause via `POST /api/dashboard/store-status`, not per-channel Telegram/Dine-In/Delivery toggles.

**Migration**: Replace three channel toggles with one pause/resume control and reason prompt aligned to the API contract.

### Requirement: Recent activity feed (mock event types)

**Reason**: Backend activity feed only records `StorePaused` and `StoreResumed` events; mock order bumps, refunds, and capacity alerts have no API source.

**Migration**: Render API audit entries only; remove mock-specific activity event types from the dashboard data layer.
