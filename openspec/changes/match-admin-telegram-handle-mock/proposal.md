## Why

The Admin Telegram Handle block still puts linked metadata in the input and can show `@MarioPizzaOwner` as the field value. Product layout is explicit: the input is an **always-enabled** empty field whose only hint is the placeholder **Manager official Telegram username**; the linked handle appears **only** in the status card below.

## What Changes

- Restyle admin handle subsection to match target layout:
  - Uppercase accent label **ADMIN TELEGRAM HANDLE**
  - Input **always enabled** — shows placeholder `Manager official Telegram username` (not a saved handle value when linked)
  - Accent helper text below input
  - When linked: status card with green link icon, `Linked Chat ID: 987654321`, and `(@MarioPizzaOwner)` on the second line
  - When unlinked: no status card; user edits handle via the empty/placeholder input
- **BREAKING (UI)**: Remove `@MarioPizzaOwner` (or any handle) from the input value when linked; handle display moves to status card only.
- Allow handle entry/save on blur when unlinked; when linked, input remains editable with placeholder visible (handle metadata read from status card + API fields).
- Add `LinkIcon`; update mock + tests.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `store-settings`: Admin handle layout — placeholder-only input, linked status card carries handle + chat ID.

## Impact

- **In scope**: `TelegramIntegrationCard.tsx`, `icons.tsx`, `mockSettingsApi.ts`, `settings-view.test.tsx`.
- **Out of scope**: Webhook controls, Send Test Notification, backend link flow.
