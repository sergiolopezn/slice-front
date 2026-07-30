## 1. Feature Scaffold & Mock API

- [ ] 1.1 Create `src/features/settings/types/settings.ts` with schedule, delivery, bot, and kitchen alert types
- [ ] 1.2 Create `src/features/settings/api/mockSettingsApi.ts` with seed settings, mutations, and `resetSettingsForTests()`
- [ ] 1.3 Create inline SVG icons in `src/features/settings/components/icons.tsx`
- [ ] 1.4 Create `src/features/settings/index.ts` public export

## 2. State Hooks

- [ ] 2.1 Implement `useSettingsQuery.ts` for fetching settings snapshot via TanStack Query
- [ ] 2.2 Implement `useSettingsMutations.ts` with optimistic mutations for all settings sections

## 3. Settings Components

- [ ] 3.1 Implement `SettingsToggle.tsx` reusable accessible switch
- [ ] 3.2 Implement `StoreOperationsCard.tsx` with master pause, duration selector, and weekly schedule
- [ ] 3.3 Implement `DeliveryFulfillmentCard.tsx` with fee inputs and fulfillment toggles
- [ ] 3.4 Implement `TelegramBotConfigCard.tsx` with status, webhook metrics, test action, and trigger toggles
- [ ] 3.5 Implement `KitchenAlertsCard.tsx` with chime dropdown and delay threshold input
- [ ] 3.6 Implement `SettingsView.tsx` composing two-column layout with loading/error states

## 4. Route Integration

- [ ] 4.1 Update `src/app/pages/SettingsPage.tsx` to render `SettingsView` from `@/features/settings`

## 5. Testing

- [ ] 5.1 Test: master pause toggle updates store paused state
- [ ] 5.2 Test: weekly schedule closed toggle disables time inputs
- [ ] 5.3 Test: delivery fulfillment toggles update on click
- [ ] 5.4 Test: send test notification shows success feedback
- [ ] 5.5 Test: `/settings` route renders settings view

## 6. Validation

- [ ] 6.1 Run `npm run build`, `npm run lint`, and `npm test` — all pass without errors
