## 1. Feature Scaffold & Mock API

- [x] 1.1 Create `src/features/settings/types/settings.ts` with schedule, delivery, bot, and kitchen alert types
- [x] 1.2 Create `src/features/settings/api/mockSettingsApi.ts` with seed settings, mutations, and `resetSettingsForTests()`
- [x] 1.3 Create inline SVG icons in `src/features/settings/components/icons.tsx`
- [x] 1.4 Create `src/features/settings/index.ts` public export

## 2. State Hooks

- [x] 2.1 Implement `useSettingsQuery.ts` for fetching settings snapshot via TanStack Query
- [x] 2.2 Implement `useSettingsMutations.ts` with optimistic mutations for all settings sections

## 3. Settings Components

- [x] 3.1 Implement `SettingsToggle.tsx` reusable accessible switch
- [x] 3.2 Implement `StoreOperationsCard.tsx` with master pause, duration selector, and weekly schedule
- [x] 3.3 Implement `DeliveryFulfillmentCard.tsx` with fee inputs and fulfillment toggles
- [x] 3.4 Implement `TelegramBotConfigCard.tsx` with status, webhook metrics, test action, and trigger toggles
- [x] 3.5 Implement `KitchenAlertsCard.tsx` with chime dropdown and delay threshold input
- [x] 3.6 Implement `SettingsView.tsx` composing two-column layout with loading/error states

## 4. Route Integration

- [x] 4.1 Update `src/app/pages/SettingsPage.tsx` to render `SettingsView` from `@/features/settings`

## 5. Testing

- [x] 5.1 Test: master pause toggle updates store paused state
- [x] 5.2 Test: weekly schedule closed toggle disables time inputs
- [x] 5.3 Test: delivery fulfillment toggles update on click
- [x] 5.4 Test: send test notification shows success feedback
- [x] 5.5 Test: `/settings` route renders settings view

## 6. Validation

- [x] 6.1 Run `npm run build`, `npm run lint`, and `npm test` — all pass without errors
