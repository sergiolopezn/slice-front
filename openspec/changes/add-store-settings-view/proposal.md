## Why

Restaurant managers need a centralized configuration panel to adjust operating hours, pause incoming Telegram orders, configure delivery rules, monitor Telegram bot webhook health, and set up kitchen display alerts. The `/settings` route currently renders a placeholder; this change delivers the full store settings view.

## What Changes

- Implement a two-column settings layout: left column for Store Operations and Delivery Configuration; right column for Telegram Bot Health and Kitchen Display Alerts.
- Add **Store Operations Card** with master pause switch (`Pause All Telegram Orders`), pause duration selection (`15m`, `30m`, `1h`, `Manual`), and weekly schedule editor (Monday–Sunday) with open/close time inputs and Closed toggles.
- Add **Delivery & Fulfillment Card** with flat delivery fee, minimum order amount, and Allow Delivery / Allow Pickup toggles.
- Add **Telegram Bot Status Card** with bot handle, connection status badge, webhook URL, latency metrics, Send Test Notification action, and notification trigger checkboxes (Order Accepted, In Oven, Ready).
- Add **Kitchen Display & Alerts Card** with new order chime dropdown and delayed order highlight threshold input.
- Wire the feature into `SettingsPage` at `/settings` via a `settings` feature module with mock data layer and optimistic mutations.
- Add integration tests for pause toggle, schedule editing, delivery toggles, test notification, and route mounting.

## Capabilities

### New Capabilities

- `store-settings`: Store configuration view with operations pause, weekly hours, delivery rules, Telegram bot health, and kitchen alert settings.

### Modified Capabilities

- `ui-style-guide`: Add settings card layout, master pause switch, weekly schedule table, and bot status badge patterns.

## Impact

- **Code**: New `src/features/settings/` feature slice; update `src/app/pages/SettingsPage.tsx`; reuse shared `Card`, `Badge`, and toggle patterns from dashboard/menu features.
- **Dependencies**: TanStack Query for settings snapshot and mutations; inline SVG icons (no Lucide per dependency discipline).
- **Tests**: RTL integration tests for pause, schedule, delivery, bot test action, and route.
- **Routing**: No route URL changes — mounts at existing `/settings` path inside `MainLayout`.
