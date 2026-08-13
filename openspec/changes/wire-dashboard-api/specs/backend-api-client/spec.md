## ADDED Requirements

### Requirement: Dashboard API scope boundary

The shared API client integration for this phase SHALL cover only the Orders and Dashboard Postman groups. Telegram endpoints (`POST /api/telegram/webhook`, `POST /api/telegram/notify`) are explicitly excluded and MUST NOT be added to the frontend client or invoked from React features.

#### Scenario: No Telegram client exports for UI

- **WHEN** dashboard or other frontend features import from `@/shared/api`
- **THEN** no Telegram webhook or notify functions are exported for UI consumption
- **AND** no React feature calls Telegram routes

### Requirement: Dashboard feature uses shared dashboard client

The dashboard feature SHALL load and mutate data exclusively through `fetchMetrics()`, `fetchActivity()`, and `postStoreStatus()` from the shared API module.

#### Scenario: Metrics and activity fetched on load

- **WHEN** the dashboard query runs
- **THEN** it calls `GET /api/dashboard/metrics` and `GET /api/dashboard/activity` via the shared client
- **AND** does not import mock dashboard API modules

#### Scenario: Store status mutated via API

- **WHEN** the manager confirms a pause or resume action
- **THEN** the mutation calls `postStoreStatus()` with `{ isPaused, reason }`
- **AND** does not use local-only mock toggle state
