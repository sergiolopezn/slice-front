## Context

Gap analysis (Postman vs frontend) shows:

| Endpoint | Client exists | Feature wired |
|---|---|---|
| Orders (live + status) | Yes | Yes (live-orders) |
| Dashboard (metrics, activity, store-status) | Yes | **No** (mock) |
| Telegram (webhook, notify) | No | N/A — excluded per user request |
| Menu / settings / history | Stubs only | Mock (no backend routes) |

Shared client already implements dashboard functions in [`dashboard.ts`](src/shared/api/dashboard.ts). This change wires the dashboard feature and aligns UI contracts to Postman payloads.

## Goals / Non-Goals

**Goals:**
- Single vertical slice: dashboard reads/writes real API.
- Mapper transforms API DTOs → existing presentation components where possible.
- Tests mock `fetch` with Postman JSON shapes.
- Explicit exclusion of Telegram routes from frontend scope.

**Non-Goals:**
- Telegram bot client, types, or UI hooks.
- Menu, settings, order-history API integration.
- `POST /api/orders` / order intake UI.
- Live-orders changes (already on real API).
- Per-channel pause toggles (not in Postman).

## Decisions

### 1. Data loading: parallel fetch in one queryFn

```typescript
// useDashboardQuery queryFn
const [metrics, entries] = await Promise.all([
  fetchMetrics(),
  fetchActivity(),
])
return mapDashboardSnapshot(metrics, entries)
```

**Rationale:** Metrics and activity are independent GETs; parallel reduces load time. Store pause state derived from latest activity entry or explicit field if added later — for v1 infer from most recent `StorePaused`/`StoreResumed` entry plus `postStoreStatus` response after toggle.

**Pause state inference:** Track `isPaused` from the most recent activity entry action (`StorePaused` → paused, `StoreResumed` → active). On initial load with empty activity, default to `isPaused: false`. After successful `postStoreStatus`, use response `{ isPaused, updatedAt }` as source of truth.

### 2. Store control UX redesign

Replace `StoreControlsPanel` three toggles with **`StorePauseCard`**:
- Shows current paused/active state
- "Pause store" / "Resume store" button opens inline reason field (or small modal)
- Submit calls `postStoreStatus({ isPaused, reason })`
- Optimistic update + rollback on `ApiError` (same pattern as live-orders)

Remove `StoreControlChannel` type and per-channel mock state.

### 3. Activity feed mapping

```typescript
type ApiActivity = ActivityFeedEntry // action: StorePaused | StoreResumed

function mapActivityEntry(entry: ApiActivity): ActivityEvent {
  return {
    id: entry.id,
    type: entry.action === 'StorePaused' ? 'system' : 'system',
    message: entry.action === 'StorePaused'
      ? `Store paused: ${entry.reason}`
      : `Store resumed: ${entry.reason}`,
    timestamp: formatRelativeTime(entry.createdAt),
  }
}
```

Drop mock types `order`, `alert`, `refund` from runtime data path (keep type union for component styling if needed, or simplify to `system` only).

### 4. KPI mapping

| API field | KPI card |
|---|---|
| `todaysRevenue` | Revenue — format as currency |
| `revenueTrendPercent` | Trend badge (hide if null) |
| `totalOrdersToday` + telegram/direct counts | Total Orders subtitle |
| `avgPrepTimeMins` | Avg Prep Time (show "—" if null) |
| `activeRushStatus` | Rush status card + review action when `High Load` |

### 5. Station mapping

Map API `stations[]` directly; display `stationName` from API (includes "Bar" not "Beverage"). Remove hardcoded mock station ids where possible; use `stationId` as React key.

### 6. Polling

`refetchInterval: 30_000` on dashboard query (less aggressive than KDS 10s — metrics are daily aggregates).

### 7. File layout

```
src/features/dashboard/
  api/
    mapDashboardSnapshot.ts   # new
  hooks/
    useDashboardQuery.ts      # real API
    useStorePause.ts          # replaces useStoreControls
  components/
    StorePauseCard.tsx        # replaces StoreControlToggleCard panel
  # delete mockDashboardApi.ts
```

### 8. Telegram exclusion

No files under `src/shared/api/` for Telegram. Document in change proposal/spec that notify is server-triggered after order status patch — no frontend work.

## Risks / Trade-offs

- **[Risk] Pause state ambiguous on empty activity feed** → Mitigate with `postStoreStatus` response as authority after first toggle; default active on cold start.
- **[Risk] UI regression from removing rich mock activity** → Acceptable; API is source of truth.
- **[Trade-off] Inferring pause from activity vs dedicated GET** → No GET for store status today; use activity + last mutation response.

## Migration Plan

1. Add mappers and update hooks.
2. Redesign store pause UI component.
3. Update ActivityFeed for API-only entries.
4. Swap tests to fetch mocks.
5. Delete mockDashboardApi.
6. Manual smoke: load `/dashboard` against Azure dev API, pause/resume with reason, verify activity feed entry appears.

## Open Questions

- Reason input: inline expandable field vs modal — default inline below pause button for minimal diff.
- Keep "Review Capacity" rush action scrolling to stations — yes, unchanged UX affordance.
