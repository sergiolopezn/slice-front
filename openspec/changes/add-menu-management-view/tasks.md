## 1. Feature Scaffold & Mock API

- [x] 1.1 Create `src/features/menu-management/types/menu.ts` with category, menu item, quick86 ingredient, topping, and sync types
- [x] 1.2 Create `src/features/menu-management/api/mockMenuApi.ts` with seed data, availability mutations, and `resetMenuForTests()`
- [x] 1.3 Create inline SVG icons in `src/features/menu-management/components/icons.tsx`
- [x] 1.4 Create `src/features/menu-management/index.ts` public export

## 2. State Hooks

- [x] 2.1 Implement `useMenuQuery.ts` for fetching menu snapshot via TanStack Query
- [x] 2.2 Implement `useQuick86Toggle.ts` with optimistic mutation for quick 86 ingredients
- [x] 2.3 Implement `useMenuItemAvailability.ts` with optimistic mutation for item restock/toggle
- [x] 2.4 Implement `useToppingStockToggle.ts` with optimistic mutation for toppings table

## 3. Menu Management Components

- [x] 3.1 Implement `StockToggle.tsx` reusable switch with emerald ON and crimson OFF states
- [x] 3.2 Implement `SyncStatusBadge.tsx` for Synced (green) and Paused (red) indicators
- [x] 3.3 Implement `CategoryTabs.tsx` with pill-style category navigation
- [x] 3.4 Implement `Quick86Bar.tsx` with ingredient toggles and last sync timestamp
- [x] 3.5 Implement `MenuItemCard.tsx` with available and out-of-stock visual states
- [x] 3.6 Implement `MenuItemGrid.tsx` responsive grid wrapper
- [x] 3.7 Implement `ToppingsTable.tsx` with sync badges and stock toggles
- [x] 3.8 Implement `MenuManagementView.tsx` composing tabs, 86 bar, grid, and table panels

## 4. Route Integration

- [x] 4.1 Update `src/app/pages/MenuPage.tsx` to render `MenuManagementView` from `@/features/menu-management`

## 5. Testing

- [x] 5.1 Test: category tabs render and switch content panels
- [x] 5.2 Test: quick 86 toggle updates switch color and sync badge
- [x] 5.3 Test: out-of-stock item card shows dashed border and Restock Item action
- [x] 5.4 Test: restock action transitions item to available state
- [x] 5.5 Test: toppings table renders with sync status and stock toggle
- [x] 5.6 Test: `/menu` route renders menu management view

## 6. Validation

- [x] 6.1 Run `npm run build`, `npm run lint`, and `npm test` — all pass without errors
