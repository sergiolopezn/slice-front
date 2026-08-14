## Why

The Admin Telegram Handle input still uses `@MarioPizzaOwner` as its placeholder. Product copy should read **"Manager official Telegram username"** to guide managers without implying a specific example account.

## What Changes

- Update the Admin Telegram Handle input placeholder from `@MarioPizzaOwner` to **"Manager official Telegram username"**.
- Update the unlinked-state settings test to assert the new placeholder string.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `store-settings`: Admin handle unlinked placeholder text updated to product copy.

## Impact

- **In scope**: `TelegramIntegrationCard.tsx`, `settings-view.test.tsx`.
- **Out of scope**: Label styling, linked status card, input enabled/disabled behavior, mock API, webhook controls, all other settings UI.
