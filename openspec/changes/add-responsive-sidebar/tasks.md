## 1. Navigation Components

- [x] 1.1 Add `MenuIcon` (3-bar hamburger) to `src/shared/components/navigation/icons.tsx`
- [x] 1.2 Implement `SidebarToggle.tsx` with `aria-expanded`, `aria-controls`, and 48px touch target
- [x] 1.3 Implement `SidebarBackdrop.tsx` with click-to-close handler
- [x] 1.4 Export new components from `src/shared/components/navigation/index.ts`

## 2. Responsive Sidebar

- [x] 2.1 Update `Sidebar.tsx` with responsive classes: fixed overlay drawer below `lg`, persistent column at `lg+`
- [x] 2.2 Add slide transition (`translate-x`) and `isOpen` prop support
- [x] 2.3 Update `NavItem.tsx` to accept optional `onNavigate` callback that closes mobile drawer

## 3. MainLayout Integration

- [x] 3.1 Add `isMobileOpen` state and Escape key handler in `MainLayout.tsx`
- [x] 3.2 Compose `SidebarToggle`, `SidebarBackdrop`, and `Sidebar` with open/close wiring
- [x] 3.3 Add mobile shell header row (`lg:hidden`) containing the hamburger toggle
- [x] 3.4 Add `matchMedia` listener to reset state when viewport reaches `lg`

## 4. Testing

- [x] 4.1 Test: hamburger button visible and opens sidebar on mobile viewport simulation
- [x] 4.2 Test: backdrop click closes mobile drawer
- [x] 4.3 Test: nav link click closes mobile drawer and navigates
- [x] 4.4 Test: sidebar always visible on desktop (no hamburger rendered)

## 5. Validation

- [x] 5.1 Run `npm run build`, `npm run lint`, and `npm test` — all pass without errors
