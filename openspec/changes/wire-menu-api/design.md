## Context

Postman collection audit (2026-08-13) vs frontend:

| Endpoint | Client | Feature wired |
|---|---|---|
| Orders (3) | Yes | Yes (live + status); `POST` typed only |
| Dashboard (3) | Yes | Yes |
| Telegram (2) | No | Excluded — server-to-server |
| **Menu (4)** | **Stub throws** | **Mock only** |
| Settings / history | Stubs | Mock (no routes) |

Backend contract: [`specs/005-menu-management-api/contracts/api.md`](../../backend/specs/005-menu-management-api/contracts/api.md). Shared client pattern established by [`dashboard.ts`](src/shared/api/dashboard.ts) and [`orders.ts`](src/shared/api/orders.ts).

## Goals / Non-Goals

**Goals:**
- Single vertical slice: menu reads/writes real API.
- Mapper transforms API DTOs → existing `MenuSnapshot` / component props.
- Mutations invalidate menu query cache (optimistic optional; rollback on `ApiError`).
- Tests mock `fetch` with Postman JSON shapes.
- Replace menu stub with real module; export from `@/shared/api`.

**Non-Goals:**
- Telegram webhook/notify client or UI.
- Settings, order-history integration.
- `POST /api/orders` / order intake UI.
- Edit Item modal / CRUD beyond availability toggles (not in Postman).
- Separate `GET /api/menu/quick-86` polling path unless needed — full overview includes `quick86List`.

## Decisions

### 1. Primary data source: `GET /api/menu`

```typescript
// useMenuQuery queryFn
const overview = await fetchMenuOverview()
return mapMenuOverview(overview)
```

**Rationale:** One GET returns items, toppings, quick86, and `lastSyncedAt`. Avoid duplicate fetches. `GET /api/menu/quick-86` exposed on client for completeness but not used by main query unless a lighter refresh is needed later.

### 2. Shared API module

```
src/shared/api/
  menu.ts                    # fetchMenuOverview, patchItemAvailability, patchToppingStock
  types/menu.ts              # MenuOverview, MenuItemDto, ToppingDto, Quick86Entry, etc.
```

Delete or replace `stubs/menu.ts`. Update `index.ts` exports.

Functions:
- `fetchMenuOverview()` → `GET /api/menu`
- `fetchQuick86List()` → `GET /api/menu/quick-86` (optional export)
- `patchItemAvailability(itemId, { isAvailable })` → `PATCH /api/menu/items/{itemId}/availability`
- `patchToppingStock(toppingId, { inStock })` → `PATCH /api/menu/toppings/{toppingId}/stock`

### 3. DTO → presentation mapping

| API field | UI field | Notes |
|---|---|---|
| `items[].category` (`"Pizzas"`, `"Sides"`, …) | `MenuItem.category` (`pizzas` \| `sides-drinks`) | Map `"Pizzas"` → `pizzas`; `"Sides"`, `"Drinks"`, `"Desserts"` → `sides-drinks` |
| `items[].category` | `categoryPill` | Uppercase category string when no dedicated pill |
| `items[].available` | `available` | Direct |
| `items[].sizes[]` | _(unused v1)_ | Keep on DTO; display base `price` only |
| `toppings[].telegramSync` (`Synced` \| `Paused`) | `syncStatus` (`synced` \| `paused`) | Lowercase map |
| `quick86List[].inStock` | `syncStatus` | Derive via `getSyncStatus(inStock)` |
| `lastSyncedAt` (ISO \| null) | `lastSyncLabel` | Relative time (`formatDistanceToNow`) or `"NEVER"` when null |

Quick-86 bar renders `quick86List` from API (dynamic count/names), not hardcoded seed names.

### 4. Mutation routing

| UI action | API call |
|---|---|
| Item availability toggle / Restock | `patchItemAvailability(itemId, { isAvailable })` |
| Quick-86 toggle | `patchToppingStock(toppingId, { inStock })` — same as topping row |
| Topping stock toggle | `patchToppingStock(toppingId, { inStock })` |

After successful PATCH, invalidate `['menu']` query (or merge returned entity into cache). On `ApiError`, show message and revert optimistic state if used.

### 5. Category tab filtering

Keep existing tab logic: filter `items` by mapped `category`; toppings tab uses `toppings` array from snapshot. Backend may return categories not present in mock — mapper handles unknown strings by bucketing non-`Pizzas` into `sides-drinks`.

### 6. Polling

`refetchInterval: 60_000` on menu query (inventory changes less frequently than KDS). Refetch after mutations regardless.

### 7. File layout

```
src/shared/api/
  menu.ts
  types/menu.ts
src/features/menu-management/
  api/
    mapMenuOverview.ts      # new
  hooks/
    useMenuQuery.ts         # real API
    useMenuItemAvailability.ts
    useQuick86Toggle.ts
    useToppingStockToggle.ts
  # delete mockMenuApi.ts
```

### 8. Error handling

Map `MENU_ITEM_NOT_FOUND`, `TOPPING_NOT_FOUND`, `INVALID_REQUEST` via existing `ApiError` pattern. Surface mutation errors in toggle vicinity or toast banner consistent with dashboard pause card.

### 9. Telegram exclusion

No frontend calls to `/api/telegram/*`. Topping `telegramSync` is display-only from menu PATCH responses.

## Risks / Trade-offs

- **[Risk] Category mapping mismatch** → Log/map unknown categories to `sides-drinks`; refine when backend publishes enum list.
- **[Risk] Loss of mock `categoryPill` variety** → Use API `category` uppercase as pill text.
- **[Risk] Quick-86 IDs differ from topping IDs in edge cases** → API docs state quick86 entries are toppings; use entry `id` for PATCH.
- **[Trade-off] No optimistic UI on slow network** → Start with invalidate-on-success; add optimistic later if needed.

## Migration Plan

1. Add shared menu types + client functions.
2. Add `mapMenuOverview` mapper.
3. Update hooks to call shared client.
4. Swap tests to fetch mocks (`menuFetchMock.ts`).
5. Delete `mockMenuApi.ts` and menu stub.
6. Manual smoke: load `/menu`, toggle item + topping + quick86 against Azure dev API.

## Open Questions

- Relative sync label format: match existing `"LAST SYNC: 2 MIN AGO"` prefix — yes, reuse dashboard relative time helper if available.
- Default item image when `imageUrl` missing — use existing `DEFAULT_ITEM_IMAGE` constant from feature.
