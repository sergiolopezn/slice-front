## Why

The Settings screen shows a **Telegram Bot Status** card with webhook health controls, but it does not yet expose **who can trigger admin commands** via Telegram. Product needs an **Admin Telegram Handle** field with a clear linked/unlinked state, added alongside existing webhook monitoring — while simplifying the card by dropping per-status notification trigger toggles that are no longer needed in Settings.

## What Changes

- Rename the right-column Telegram card title from "Telegram Bot Status" to **"Telegram Integration & Admin Alerts"**.
- **Add** **Admin Telegram Handle** control (inserted **before** the existing Send Test Notification button) with:
  - Editable text input (placeholder e.g. `@MarioPizzaOwner`) when no admin chat is linked
  - Helper text: *"Only messages from this Telegram handle can trigger admin commands."*
  - Disabled read-only state when linked: `Linked Chat ID: 987654321 (@MarioPizzaOwner)`
- Extend settings snapshot/mock types with `adminTelegramHandle` and `adminTelegramChatId` (nullable — linked when chat ID present).
- **Retain existing webhook controls:**
  - Bot connection status badge
  - Webhook URL and latency metrics
  - Send Test Notification button and success feedback
- **Remove** the **Notification Triggers** subsection (Order Accepted, In Oven, Ready toggles) from this card.
- Remove `notificationTriggers` from settings snapshot, mock API, and related mutation hook usage.
- Update settings integration tests for the new section title, admin handle states, preserved webhook/test behavior, and absence of trigger toggles.

## Capabilities

### New Capabilities

_(none — UI refinement within existing store settings feature)_

### Modified Capabilities

- `store-settings`: Extend Telegram settings with admin handle linking UX; keep webhook monitoring and test notification; remove notification trigger toggles from Settings.

## Impact

- **In scope**: `TelegramBotConfigCard` (rename/refactor), `StoreSettingsSnapshot` types, `mockSettingsApi`, settings hooks/mutations, `settings-view.test.tsx`.
- **Out of scope**: Real settings API wiring (still mock); Telegram webhook/notify backend routes; changes to other settings cards.
- **Tests**: Assert linked vs unlinked handle rendering; confirm webhook URL, latency, badge, and Send Test Notification still work; assert notification trigger toggles are gone.
