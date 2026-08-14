## 1. Settings types and mock data

- [x] 1.1 Add `adminTelegramHandle` and `adminTelegramChatId` to `StoreSettingsSnapshot`; remove `notificationTriggers` and related types/constants
- [x] 1.2 Update `mockSettingsApi` seed: linked admin state `adminTelegramHandle: '@MarioPizzaOwner'`, `adminTelegramChatId: '987654321'`; remove `updateNotificationTrigger`
- [x] 1.3 Add `updateAdminTelegramHandle(handle: string)` mock mutation (unlinked state only)

## 2. Telegram integration card UI

- [x] 2.1 Rename/refactor `TelegramBotConfigCard.tsx` → `TelegramIntegrationCard.tsx` with title **Telegram Integration & Admin Alerts**
- [x] 2.2 Keep bot handle, connection badge, webhook URL, and latency unchanged
- [x] 2.3 Insert Admin Telegram Handle block **before** Send Test Notification: enabled + placeholder + helper when unlinked
- [x] 2.4 Implement linked disabled state: `Linked Chat ID: {chatId} ({handle})`
- [x] 2.5 Keep Send Test Notification and success feedback unchanged
- [x] 2.6 Remove Notification Triggers subsection and all trigger toggle controls from the card

## 3. Hooks and view wiring

- [x] 3.1 Add `useAdminTelegramHandleMutation` hook; wire blur/change handler in unlinked state
- [x] 3.2 Update `SettingsView`: pass admin fields; keep `useSendTestNotificationMutation`; remove `useNotificationTriggerMutation` and trigger props
- [x] 3.3 Delete `useNotificationTriggerMutation` from `useSettingsMutations.ts` if unused
- [x] 3.4 Export updated component from `features/settings/index.ts` if public API changed

## 4. Tests

- [x] 4.1 Update `settings-view.test.tsx`: assert new section title and linked handle disabled text
- [x] 4.2 Add test for unlinked state: editable input, placeholder, helper text
- [x] 4.3 Keep Send Test Notification test passing; confirm webhook/latency/badge still render
- [x] 4.4 Assert notification trigger toggles are not present in the Telegram card

## 5. Verification

- [x] 5.1 Confirm admin handle appears above Send Test Notification; card has no Notification Triggers section
- [x] 5.2 Run full test suite; manual smoke on `/settings`
