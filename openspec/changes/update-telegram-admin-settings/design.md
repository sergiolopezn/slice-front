## Context

Current [`TelegramBotConfigCard.tsx`](src/features/settings/components/TelegramBotConfigCard.tsx) displays bot handle, connection badge, webhook URL, latency, Send Test Notification, and notification trigger toggles. [`StoreSettingsSnapshot`](src/features/settings/types/settings.ts) carries `botHandle`, `botConnected`, `webhookUrl`, `webhookLatencyMs`, `lastTestNotificationAt`, and `notificationTriggers`.

Product request: **add** admin authorization fields before Send Test Notification; **remove** the Notification Triggers subsection; keep webhook monitoring and test notification.

## Goals / Non-Goals

**Goals:**
- Rename section to **Telegram Integration & Admin Alerts**.
- Add Admin Telegram Handle input with helper text and linked/unlinked visual states.
- Preserve connection badge, webhook URL, latency, and Send Test Notification.
- Remove notification trigger toggles from the card and data model.
- Mock API stores new admin handle + optional linked chat ID.

**Non-Goals:**
- Backend settings API or Telegram webhook integration.
- Validating handle format against Telegram API.
- Real link/unlink flow via bot OAuth (mock simulates linked state from seed data).
- Removing webhook URL, latency, connection badge, or Send Test Notification.

## Decisions

### 1. Snapshot fields

```typescript
type StoreSettingsSnapshot = {
  // retained
  botHandle: string
  botConnected: boolean
  webhookUrl: string
  webhookLatencyMs: number
  lastTestNotificationAt: string | null
  // new
  adminTelegramHandle: string
  adminTelegramChatId: string | null
  // removed
  // notificationTriggers — deleted
}
```

Remove `NotificationTrigger`, `NotificationTriggers`, and `NOTIFICATION_TRIGGER_LABELS` from settings types if unused elsewhere.

| Admin state | Condition | UI |
|---|---|---|
| Unlinked | `adminTelegramChatId === null` | Enabled `<input>` with placeholder `@MarioPizzaOwner`, helper text below |
| Linked | `adminTelegramChatId` is set | Disabled input value: `Linked Chat ID: {chatId} ({handle})` |

### 2. Component layout

Rename to `TelegramIntegrationCard.tsx`; update imports in `SettingsView`.

```
Card title: Telegram Integration & Admin Alerts
├── Bot handle + connection badge (unchanged)
├── Webhook URL + latency (unchanged)
├── Admin Telegram Handle (NEW)
│   ├── input (enabled or disabled per linked state)
│   └── helper text (always visible)
└── Send Test Notification button + success feedback (unchanged)
```

No Notification Triggers subheading or toggles at the bottom of the card.

### 3. Mock seed data

```typescript
adminTelegramHandle: '@MarioPizzaOwner',
adminTelegramChatId: '987654321',
// existing bot/webhook fields retained; notificationTriggers removed from seed
```

### 4. Hooks and view cleanup

- Add `updateAdminTelegramHandle(handle)` mock + `useAdminTelegramHandleMutation`.
- Keep `useSendTestNotificationMutation` and `testSuccessMessage`.
- Remove `useNotificationTriggerMutation`, `updateNotificationTrigger` mock, and card props `onTriggerChange` / `notificationTriggers`.
- Drop `notificationTrigger` from `SettingsView` `isMutating` aggregate.

### 5. Accessibility

- Label: `Admin Telegram Handle`
- Helper: `aria-describedby` linking input to helper paragraph
- Disabled linked input: `aria-readonly="true"` + visible linked-state value

## Risks / Trade-offs

- **[Risk] Losing per-status trigger config in Settings** → Acceptable; triggers move to backend defaults or future admin surface.
- **[Risk] No real link flow** → Mock linked state only; future backend work.
- **[Trade-off] Handle edit without validation** → Accept any string in mock; backend validates later.

## Migration Plan

1. Add admin snapshot fields; remove `notificationTriggers` from types/mock.
2. Refactor card: rename title, insert admin handle before Send Test Notification, delete trigger toggles block.
3. Wire handle mutation; remove notification trigger hook from view.
4. Update tests: admin handle + webhook/test preserved; no trigger toggles in DOM.
5. Manual check: `/settings` card ends after Send Test Notification feedback.

## Open Questions

- File rename to `TelegramIntegrationCard.tsx` — **yes**.
- Default admin seed linked — **yes** (`987654321` / `@MarioPizzaOwner`).
