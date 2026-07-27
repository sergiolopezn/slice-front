## Context

SliceOS currently renders a single-page view in `App.tsx` (component showcase or feature dashboard). The constitution mandates feature-based architecture with `src/app`, `src/shared`, and `src/features`. The UI style guide already defines sidebar navigation tokens but no app shell exists yet.

The source proposal (`menu.md`) describes a navigation shell with five primary routes and React Router integration.

## Goals / Non-Goals

**Goals:**

- Install `react-router-dom` and establish client-side routing.
- Build `MainLayout` with sidebar + `<Outlet />`.
- Implement `Sidebar`, `NavItem`, `UserProfile` with style-guide-compliant active states.
- Define routes: `/dashboard`, `/live-orders`, `/menu`, `/order-history`, `/settings`.
- Mount existing `LiveOrdersDashboard` at `/live-orders`; placeholders elsewhere.
- Redirect `/` → `/dashboard`.

**Non-Goals:**

- Implementing actual Dashboard, Menu management, Order history, or Settings feature content.
- Authentication or role-based nav visibility.
- Mobile collapsible sidebar (desktop/kitchen tablet first).
- External icon library dependency.

## Decisions

### 1. Directory structure (constitution-aligned)

**Decision:** Place routing in `src/app/`, navigation primitives in `src/shared/components/navigation/`, layout in `src/app/layouts/MainLayout.tsx`.

**Rationale:** Matches constitution layer boundaries rather than the source doc's `src/layouts/` and `src/components/navigation/` paths.

```
src/app/
├── router.tsx
├── layouts/MainLayout.tsx
└── pages/
    ├── DashboardPage.tsx
    ├── MenuPage.tsx
    ├── OrderHistoryPage.tsx
    └── SettingsPage.tsx
src/shared/components/navigation/
├── Sidebar.tsx
├── NavItem.tsx
├── UserProfile.tsx
├── navItems.ts
└── icons.tsx
```

### 2. Active state color: style guide over source doc

**Decision:** Use amber active pill (`#ffa826` / `bg-nav-active`) from the UI style guide, not the source doc's "crimson/pink" description.

**Rationale:** Established design system takes precedence (constitution P7). Style guide section 3.C already specifies sidebar active tab styling.

### 3. Inline SVG icons (no icon library)

**Decision:** Provide simple inline SVG icons in `icons.tsx` for the five nav items (layout grid, utensils, clock, gear).

**Rationale:** Avoids adding `lucide-react` or similar per dependency discipline.

### 4. Route configuration

| Label | Path | Component |
|-------|------|-----------|
| Dashboard | `/dashboard` | `DashboardPage` (placeholder) |
| Live orders | `/live-orders` | `LiveOrdersDashboard` from `@/features/live-orders` |
| Menu management | `/menu` | `MenuPage` (placeholder) |
| Order history | `/order-history` | `OrderHistoryPage` (placeholder) |
| Settings | `/settings` | `SettingsPage` (placeholder) |

Root `/` redirects to `/dashboard` via `<Navigate replace />`.

### 5. Placeholder page pattern

**Decision:** Shared minimal placeholder component:

```tsx
<main className="min-h-screen bg-bg-app p-6">
  <h1>{title}</h1>
  <p className="text-text-muted">Coming soon.</p>
</main>
```

Live orders route renders the full feature dashboard (which includes its own header nav — acceptable overlap for now; deduplication deferred).

### 6. Router provider placement

**Decision:** Wrap app in `BrowserRouter` in `main.tsx` (inside `QueryClientProvider`). `App.tsx` renders `<AppRouter />` from `src/app/router.tsx`.

### 7. NavItem active detection

**Decision:** Use `NavLink` from react-router-dom with a function `className={({ isActive }) => ...}` for active/inactive classes.

## Risks / Trade-offs

- **[Live orders header duplication]** → `OrderHeaderNav` inside feature + app sidebar coexist temporarily; future change can slim feature header once app shell is stable.
- **[Live orders feature may not exist in all branches]** → Router imports feature via barrel export; if missing, fall back to placeholder (implementation checks for feature availability).
- **[No 404 route]** → Unknown paths redirect to `/dashboard` for MVP simplicity.

## Migration Plan

1. Install `react-router-dom`.
2. Create navigation components and layout.
3. Create router with routes and placeholders.
4. Update `App.tsx` / `main.tsx`.
5. Add navigation integration tests.
6. Verify live orders route works when feature module present.

## Open Questions

- Should unknown routes show 404 or redirect to dashboard? **Recommendation:** Redirect to `/dashboard`.
- Collapse sidebar on narrow viewports? **Deferred.**
