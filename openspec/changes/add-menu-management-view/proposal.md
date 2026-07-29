## Why

Kitchen staff and managers need a real-time menu controls hub to edit pizza items, toggle dish availability, manage topping pricing, and quickly "86" ingredients so out-of-stock items cannot be ordered via Telegram. The `/menu` route currently renders a placeholder; this change delivers the full menu and inventory management view.

## What Changes

- Add a top category navigation bar with tabs for `Pizzas`, `Sides & Drinks`, and `Toppings & Modifiers`.
- Implement a **Quick Availability (86 List)** horizontal bar with fast toggle switches for high-velocity ingredients (Pepperoni, Fresh Basil, Mushrooms, GF Crust) and a last Telegram sync timestamp.
- Implement an **Item Cards Grid** for menu products:
  - Available items: product photo placeholder, category pill, title, amber price accent, emerald availability toggle, and `Edit Item` button.
  - Out-of-stock items: dashed border, dimmed layout, `OUT OF STOCK` badge overlay, disabled status pill, and primary `Restock Item` action.
- Implement a **Toppings Management Table** with columns for topping name, category, extra price, Telegram sync status, and stock toggle.
- Wire the feature into `MenuPage` at `/menu` via a `menu-management` feature module with mock data layer and optimistic availability mutations.
- Add integration tests for 86 toggles, disabled item styling, toppings table sync badges, category tab filtering, and route mounting.

## Capabilities

### New Capabilities

- `menu-management`: Menu and inventory management view with category tabs, quick 86 bar, item card grid, and toppings table with Telegram sync indicators.

### Modified Capabilities

- `ui-style-guide`: Add menu-management patterns for category pill tabs, quick 86 toggle bar, menu item cards (available vs out-of-stock), and toppings data table styling.

## Impact

- **Code**: New `src/features/menu-management/` feature slice; update `src/app/pages/MenuPage.tsx` to mount the menu management view; reuse shared `Card`, `Badge`, and `Button` primitives where applicable.
- **Dependencies**: Uses existing TanStack Query stack for mock data fetching and availability mutations; inline SVG icons (no Lucide per dependency discipline).
- **Tests**: RTL integration tests for 86 toggles, item grid states, toppings table, and route behavior.
- **Routing**: No route URL changes — menu management mounts at existing `/menu` path inside `MainLayout` (source doc references `/menu-management`; shell already uses `/menu`).
