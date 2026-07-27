## Why

SliceOS needs a persistent application shell so kitchen staff can navigate between primary views (dashboard, live orders, menu management, order history, settings) without losing context. With individual feature slices landing, a shared layout and routing foundation is required before those views can be composed into a cohesive app.

## What Changes

- Add React Router with a `MainLayout` shell: fixed dark sidebar + main content `<Outlet />`.
- Build sidebar navigation components: `Sidebar`, `NavItem`, and `UserProfile` with SliceOS branding and bottom-fixed staff profile (`Kitchen Admin`).
- Expose five top-level routes with placeholder empty-state views for unimplemented screens.
- Wire the `Live orders` route to the existing `live-orders` feature dashboard when available.
- Apply active-route pill styling per the UI style guide (amber active pill, 48px touch targets).
- Add route-level integration tests for navigation highlighting and view switching.

## Capabilities

### New Capabilities

- `app-navigation-shell`: Main layout container, sidebar navigation, route definitions, and placeholder views for primary app sections.

### Modified Capabilities

- `ui-style-guide`: Formalize sidebar navigation as an implemented app-shell pattern with route-aware active state requirements.

## Impact

- **Code**: New `src/app/` routing and layout modules; new `src/shared/components/navigation/` primitives; updates to `App.tsx` and `main.tsx`.
- **Dependencies**: Adds `react-router-dom` for client-side routing.
- **Tests**: RTL integration tests for sidebar active states and route navigation.
- **Features**: Live orders dashboard mounted at `/live-orders`; other routes render placeholders until their feature slices ship.
