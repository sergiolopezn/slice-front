## 1. Dependencies & Router Setup

- [x] 1.1 Install `react-router-dom`
- [x] 1.2 Create `src/app/router.tsx` with route definitions and `/` → `/dashboard` redirect
- [x] 1.3 Wrap app in `BrowserRouter` in `src/main.tsx`; update `App.tsx` to render router

## 2. Navigation Components

- [x] 2.1 Create inline SVG icons and nav item config in `src/shared/components/navigation/`
- [x] 2.2 Implement `NavItem.tsx` with `NavLink` active/inactive pill styling (48px min height)
- [x] 2.3 Implement `UserProfile.tsx` with "Kitchen Admin" bottom-fixed label
- [x] 2.4 Implement `Sidebar.tsx` with SliceOS brand, nav items, and user profile
- [x] 2.5 Export navigation components via `src/shared/components/navigation/index.ts`

## 3. Layout & Pages

- [x] 3.1 Implement `MainLayout.tsx` with sidebar + `<Outlet />` main content area
- [x] 3.2 Create placeholder pages for Dashboard, Menu management, Order history, and Settings
- [x] 3.3 Wire `/live-orders` route to `LiveOrdersDashboard` from `@/features/live-orders` (placeholder if feature absent)

## 4. Testing

- [x] 4.1 Integration test: sidebar renders all five navigation items
- [x] 4.2 Integration test: clicking "Live orders" navigates to `/live-orders` and applies active styling
- [x] 4.3 Integration test: root `/` redirects to `/dashboard`

## 5. Validation

- [x] 5.1 Run `npm run build`, `npm run lint`, and `npm test` — all pass without errors
