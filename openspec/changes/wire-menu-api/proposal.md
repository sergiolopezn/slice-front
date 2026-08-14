## Why

The Postman collection grew from eight to **twelve** endpoints with a new **Menu** group (`GET /api/menu`, `GET /api/menu/quick-86`, `PATCH /api/menu/items/{id}/availability`, `PATCH /api/menu/toppings/{id}/stock`). Live orders and the management dashboard already call the real backend, but menu management still runs on [`mockMenuApi.ts`](src/features/menu-management/api/mockMenuApi.ts) and [`src/shared/api/stubs/menu.ts`](src/shared/api/stubs/menu.ts) throws "not implemented." Managers toggling 86/restock see local-only state that does not persist or sync with Telegram. Wiring menu to the shared API client is the next integration slice now that backend routes exist.

## What Changes

- Replace the menu stub with a real [`src/shared/api/menu.ts`](src/shared/api/menu.ts) module matching Postman contracts.
- Add mapper layer (`mapMenuOverview`) translating API DTOs → existing `MenuSnapshot` presentation types (category tabs, sync badges, relative last-sync label).
- Wire menu hooks (`useMenuQuery`, availability/stock toggles) to shared client with TanStack Query cache invalidation after PATCH mutations.
- Map quick-86 toggles to `PATCH /api/menu/toppings/{toppingId}/stock` (quick-86 entries are curated toppings, not a separate entity).
- Remove [`mockMenuApi.ts`](src/features/menu-management/api/mockMenuApi.ts) from the menu data path.
- Update integration tests to mock `fetch` with Postman-shaped menu responses.
- **BREAKING**: Quick-86 bar and toppings table show backend-curated lists (not hardcoded Pepperoni/Basil/Mushrooms/GF Crust seed data); category pills derive from API `category` when no separate pill field exists.

## Capabilities

### New Capabilities

_(none — builds on existing menu-management feature and shared API client)_

### Modified Capabilities

- `menu-management`: Data sourced from real menu API; toggles persist via PATCH endpoints; last sync from `lastSyncedAt`.
- `backend-api-client`: Replace menu stub with typed menu module; document Postman scope (12 endpoints — menu group added; Telegram still excluded from frontend).

## Impact

- **In scope**: Menu feature (`src/features/menu-management/`), shared API types + `menu.ts`, menu tests.
- **Out of scope**: Telegram routes (`/api/telegram/webhook`, `/api/telegram/notify`); settings and order-history (still no Postman routes); `POST /api/orders` (typed client exists, no intake UI); live-orders and dashboard (already integrated).
- **Environment**: Same `VITE_API_BASE_URL` and CORS requirements as other features.
- **Postman verification** (2026-08-13):

| Group | Endpoint | Frontend status |
|---|---|---|
| Orders | `GET /api/orders/live` | Integrated |
| Orders | `PATCH /api/orders/{id}/status` | Integrated |
| Orders | `POST /api/orders` | Client only, no UI |
| Dashboard | 3 routes | Integrated |
| Telegram | 2 routes | Excluded (server-to-server) |
| **Menu** | **4 routes** | **New — this change** |
| Settings / history | — | No backend routes yet |
