## Context

SliceOS has `/settings` as a placeholder. Shared dark KDS UI primitives and TanStack Query patterns exist across dashboard, menu-management, and order-history features. Source proposal describes a two-column store configuration panel.

The constitution requires feature-based architecture under `src/features/settings/`.

## Goals / Non-Goals

**Goals:**

- Complete `settings` vertical slice: UI, types, mock API, optimistic mutations.
- Two-column responsive layout with four settings cards.
- Master pause with duration selector and weekly schedule editor.
- Delivery fee/minimum inputs and fulfillment mode toggles.
- Telegram bot status panel with test notification action.
- Kitchen alerts chime selector and delay threshold.
- Mount on `/settings`.

**Non-Goals:**

- Real Telegram webhook integration (mock API only).
- Persisting settings across sessions.
- Lucide icons (inline SVGs).
- Actual audio playback for chime test (mock success feedback only in v1).

## Decisions

### 1. Feature module structure

```
src/features/settings/
├── index.ts
├── types/settings.ts
├── api/mockSettingsApi.ts
├── hooks/
│   ├── useSettingsQuery.ts
│   └── useSettingsMutations.ts
├── components/
│   ├── SettingsView.tsx
│   ├── StoreOperationsCard.tsx
│   ├── DeliveryFulfillmentCard.tsx
│   ├── TelegramBotConfigCard.tsx
│   ├── KitchenAlertsCard.tsx
│   ├── SettingsToggle.tsx
│   └── icons.tsx
└── __tests__/settings-view.test.tsx
```

### 2. State management

**Decision:** TanStack Query for settings snapshot; optimistic mutations grouped in `useSettingsMutations.ts` for pause, schedule, delivery, bot triggers, and kitchen alerts.

### 3. Master pause + duration

**Decision:** Pause toggle updates `storePaused` boolean; duration selector (`15m` | `30m` | `1h` | `manual`) stored alongside and shown when paused. Mock API simulates Telegram customer notification message in response metadata (not displayed in v1 UI beyond status badge).

### 4. Weekly schedule

**Decision:** Array of 7 `DaySchedule` entries with `day`, `openTime`, `closeTime`, `closed` boolean. When `closed` is true, time inputs disabled.

### 5. Telegram bot test

**Decision:** `sendTestNotification()` mock returns success; UI shows brief inline success message and updates last-test timestamp. Chime selection stored but no Web Audio in v1.

### 6. Layout

**Decision:** Responsive 2-column grid — left: Store Operations + Delivery; right: Telegram Bot + Kitchen Alerts. Stack single column below `lg`.

### 7. Shared patterns

**Decision:** Reuse switch pattern from `StoreControlToggleCard` / `StockToggle`; compose cards from shared `Card` and `Badge`.

## Risks / Trade-offs

- **[No real webhook]** → Mock latency/status only; acceptable for MVP boundary.
- **[Chime test without audio]** → Success toast/message only; follow-up can add Web Audio.
- **[Pause overlaps dashboard toggle]** → Separate mock domains; future backend unifies store controls.

## Migration Plan

Update `SettingsPage` to render `SettingsView`. Rollback: revert to placeholder.

## Open Questions

- None blocking v1.
