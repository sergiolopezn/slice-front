## 1. Icons

- [x] 1.1 Add `LinkIcon` to `src/features/settings/components/icons.tsx`

## 2. Admin handle UI (target layout)

- [x] 2.1 Uppercase accent label (`ADMIN TELEGRAM HANDLE`)
- [x] 2.2 Input always enabled, empty with placeholder `Manager official Telegram username` — never show `@MarioPizzaOwner` as input value when linked
- [x] 2.3 Accent helper text styling
- [x] 2.4 Linked status card: icon + `Linked Chat ID: 987654321` + `(@MarioPizzaOwner)` — hidden when unlinked
- [x] 2.5 Status card after helper, before Send Test Notification

## 3. Input behavior

- [x] 3.1 Unlinked: editable input, persist handle on blur via mock API
- [x] 3.2 Linked: input stays empty (placeholder visible); handle read from status card only

## 4. Tests

- [x] 4.1 Linked: input enabled, empty, placeholder visible; status card shows chat ID + `(@MarioPizzaOwner)`; input value must not contain `@MarioPizzaOwner`
- [x] 4.2 Unlinked: enabled empty input with placeholder; no status card
- [x] 4.3 Status card before Send Test Notification when linked

## 5. Verification

- [x] 5.1 Run settings tests and full suite
- [x] 5.2 Visual compare on `/settings`
