## Why

The app shell currently renders a fixed 256px sidebar on all screen sizes, consuming valuable horizontal space on phones and small tablets. Managers and staff on narrow viewports need the main content area maximized, with navigation available on demand via a familiar hamburger control.

## What Changes

- Add responsive sidebar behavior: persistent and always visible on large screens (`≥ lg` / 1024px), hidden by default on smaller viewports.
- Add a 3-bar hamburger button in the app shell header to manually open the sidebar on small screens.
- Render the mobile sidebar as an overlay drawer with a dimmed backdrop, sliding in from the left.
- Close the mobile drawer when the user taps a nav link, taps the backdrop, or presses Escape.
- Reset mobile open state when the viewport crosses to desktop width (sidebar becomes permanently visible).
- Add accessibility attributes (`aria-expanded`, `aria-controls`) on the toggle button.
- Add integration tests for mobile toggle, backdrop close, and desktop always-visible behavior.

## Capabilities

### New Capabilities

- `responsive-sidebar`: Breakpoint-driven sidebar visibility, hamburger toggle, overlay drawer, and close interactions for the app navigation shell.

### Modified Capabilities

- `app-navigation-shell`: Extend main layout requirements to support responsive sidebar behavior alongside existing nav items and active-route styling.

## Impact

- **Code**: Updates to `MainLayout.tsx`, `Sidebar.tsx`, `NavItem.tsx`; new `SidebarToggle.tsx` and `SidebarBackdrop.tsx` in `src/shared/components/navigation/`; new menu icon in `icons.tsx`.
- **Dependencies**: None — Tailwind responsive utilities and local React state only.
- **Tests**: Extend `src/app/__tests__/navigation.test.tsx` with mobile drawer scenarios.
- **Design system**: Delta to UI style guide for mobile drawer and hamburger button styling.
