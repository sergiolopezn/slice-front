## ADDED Requirements

### Requirement: Master store pause

The system SHALL allow staff to temporarily pause incoming orders from Telegram with an optional pause duration.

#### Scenario: Pausing store orders

- **GIVEN** the store status is active
- **WHEN** the manager flips "Pause All Telegram Orders" to ON
- **THEN** the store status updates to paused in the UI
- **AND** the mock API records the pause state with the selected duration

#### Scenario: Resuming store orders

- **GIVEN** the store is paused
- **WHEN** the manager flips "Pause All Telegram Orders" to OFF
- **THEN** the store status updates to active in the UI

### Requirement: Weekly operating schedule

The system SHALL display a weekly schedule editor with open/close times and closed toggles for each day Monday through Sunday.

#### Scenario: Editing a day schedule

- **GIVEN** the store operations card is visible
- **WHEN** the manager updates open or close times for a weekday
- **THEN** the schedule reflects the updated times in the UI
- **AND** the mock API persists the change

#### Scenario: Marking a day closed

- **GIVEN** a weekday is open
- **WHEN** the manager toggles the day to Closed
- **THEN** the open/close time inputs are disabled for that day

### Requirement: Delivery and fulfillment configuration

The system SHALL provide inputs for delivery fee, minimum order amount, and toggles for Allow Delivery and Allow Pickup.

#### Scenario: Updating delivery settings

- **GIVEN** the delivery configuration card is visible
- **WHEN** the manager changes the flat delivery fee or minimum order amount
- **THEN** the updated values display in the UI
- **AND** the mock API records the change

#### Scenario: Toggling fulfillment modes

- **GIVEN** delivery or pickup is enabled
- **WHEN** the manager toggles Allow Delivery or Allow Pickup
- **THEN** the toggle state updates immediately in the UI

### Requirement: Telegram webhook monitoring

The system SHALL display Telegram bot connection health, webhook metrics, and allow sending a test notification.

#### Scenario: Bot status display

- **WHEN** the settings view loads
- **THEN** the bot handle, connection status badge, webhook URL, and latency are visible

#### Scenario: Testing notifications

- **GIVEN** the settings page is open
- **WHEN** the user clicks Send Test Notification
- **THEN** a test ping is sent to the mock webhook layer
- **AND** a success confirmation is shown in the UI

#### Scenario: Notification trigger toggles

- **GIVEN** the Telegram bot config card is visible
- **WHEN** the manager toggles an auto-notification trigger for Order Accepted, In Oven, or Ready
- **THEN** the trigger state updates in the UI and mock API

### Requirement: Kitchen display alerts

The system SHALL provide a chime selector and delayed order highlight threshold input.

#### Scenario: Updating kitchen alerts

- **GIVEN** the kitchen alerts card is visible
- **WHEN** the manager selects a chime option or changes the delay threshold
- **THEN** the updated settings display in the UI
- **AND** the mock API records the change

### Requirement: Settings route integration

The `/settings` route SHALL render the store settings feature instead of a placeholder page.

#### Scenario: Route mounts settings view

- **WHEN** the user navigates to `/settings`
- **THEN** the main content area renders the two-column settings layout with all four configuration cards
