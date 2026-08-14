## 1. Shared API — menu types and client

- [ ] 1.1 Add `src/shared/api/types/menu.ts` with DTOs matching Postman (`MenuOverview`, `MenuItemDto`, `ToppingDto`, `Quick86Entry`, patch request/response types)
- [ ] 1.2 Add `src/shared/api/menu.ts` with `fetchMenuOverview`, `fetchQuick86List`, `patchItemAvailability`, `patchToppingStock`
- [ ] 1.3 Export menu functions from `src/shared/api/index.ts`; remove or replace `stubs/menu.ts` placeholder

## 2. Menu API mappers

- [ ] 2.1 Add `src/features/menu-management/api/mapMenuOverview.ts` mapping overview → `MenuSnapshot`
- [ ] 2.2 Map backend `category` strings to `MenuItemCategory` tabs (`Pizzas` → `pizzas`, others → `sides-drinks`)
- [ ] 2.3 Map `telegramSync` (`Synced`/`Paused`) and quick-86 `inStock` → `syncStatus`; format `lastSyncedAt` → relative `lastSyncLabel`

## 3. Hooks — replace mocks with shared client

- [ ] 3.1 Update `useMenuQuery` to call `fetchMenuOverview()` via mapper; add 60s refetch interval
- [ ] 3.2 Update `useMenuItemAvailability` to call `patchItemAvailability()` and invalidate menu query on success
- [ ] 3.3 Update `useQuick86Toggle` to call `patchToppingStock()` (quick-86 entries are toppings)
- [ ] 3.4 Update `useToppingStockToggle` to call `patchToppingStock()` with rollback on `ApiError`
- [ ] 3.5 Add `getMenuMutationErrorMessage()` helper mirroring dashboard/live-orders error pattern

## 4. UI — align with backend data

- [ ] 4.1 Update quick-86 bar to render dynamic `quick86List` from API (remove hardcoded seed name assumptions in tests/copy)
- [ ] 4.2 Show mutation error feedback on toggle failures
- [ ] 4.3 Use API `imageUrl` with fallback to default placeholder when missing
- [ ] 4.4 Delete `src/features/menu-management/api/mockMenuApi.ts`

## 5. Tests

- [ ] 5.1 Add `menuFetchMock.ts` with Postman-shaped overview and PATCH responses
- [ ] 5.2 Update `menu-management-view.test.tsx`: overview load, item restock, quick-86 toggle, topping stock toggle
- [ ] 5.3 Add test for PATCH 404 rollback (`MENU_ITEM_NOT_FOUND` / `TOPPING_NOT_FOUND`)

## 6. Verification

- [ ] 6.1 Confirm no imports of `mockMenuApi` remain in `src/`
- [ ] 6.2 Confirm no Telegram routes added under `src/shared/api/` or menu feature
- [ ] 6.3 Manual smoke against `VITE_API_BASE_URL`: load `/menu`, toggle item availability and topping stock, verify sync badge updates

## 7. Explicitly out of scope

- [ ] _(no action)_ Telegram `/api/telegram/webhook` and `/api/telegram/notify`
- [ ] _(no action)_ Settings and order-history mock replacement (no Postman routes)
- [ ] _(no action)_ `POST /api/orders` order intake UI
