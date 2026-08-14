## MODIFIED Requirements

### Requirement: Telegram webhook monitoring

The system SHALL display Telegram bot connection health, webhook metrics, admin Telegram handle configuration, and allow sending a test notification.

#### Scenario: Bot status display

- **WHEN** the settings view loads
- **THEN** the section title reads "Telegram Integration & Admin Alerts"
- **AND** the bot handle, connection status badge, webhook URL, and latency are visible

#### Scenario: Admin handle when unlinked

- **GIVEN** no admin Telegram chat is linked
- **WHEN** the Telegram integration section renders
- **THEN** an enabled "Admin Telegram Handle" text input is visible with placeholder `@MarioPizzaOwner`
- **AND** helper text reads "Only messages from this Telegram handle can trigger admin commands."
- **AND** the admin handle control appears above the Send Test Notification button

#### Scenario: Admin handle when linked

- **GIVEN** an admin Telegram chat is linked with chat ID `987654321` and handle `@MarioPizzaOwner`
- **WHEN** the Telegram integration section renders
- **THEN** the admin handle input is disabled
- **AND** its value displays `Linked Chat ID: 987654321 (@MarioPizzaOwner)`
- **AND** the Send Test Notification button remains visible below the admin handle control

#### Scenario: Testing notifications

- **GIVEN** the settings page is open
- **WHEN** the user clicks Send Test Notification
- **THEN** a test ping is sent to the mock webhook layer
- **AND** a success confirmation is shown in the UI

## ADDED Requirements

### Requirement: Admin Telegram handle configuration

The system SHALL allow configuring which Telegram handle is authorized to trigger admin commands, with distinct linked and unlinked UI states.

#### Scenario: Editing admin handle when unlinked

- **GIVEN** no admin Telegram chat is linked
- **WHEN** the manager updates the Admin Telegram Handle input and commits the change
- **THEN** the mock API persists the new handle value
- **AND** the input remains editable

#### Scenario: Linked admin handle is read-only

- **GIVEN** an admin Telegram chat is linked
- **WHEN** the admin handle control renders
- **THEN** the input is disabled and cannot be edited from the Settings UI

## REMOVED Requirements

### Requirement: Notification trigger toggles (from Telegram webhook monitoring)

**Reason**: Settings no longer exposes per-order-status auto-notification toggles; admin authorization and webhook health are the focus of the Telegram Integration & Admin Alerts card.

**Migration**: Order-status Telegram notifications are assumed enabled by backend defaults or configured outside the Settings UI.

#### Scenario: Notification trigger toggles (removed)

- **WHEN** the Telegram Integration & Admin Alerts section renders
- **THEN** no Order Accepted, In Oven, or Ready notification trigger toggles are displayed
