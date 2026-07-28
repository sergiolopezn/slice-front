## ADDED Requirements

### Requirement: Hamburger toggle button styling

The mobile sidebar toggle button SHALL use a minimum 48px touch target with muted icon color and visible focus outline, positioned in the top-left of the main content area.

#### Scenario: Toggle button appearance

- **WHEN** the hamburger toggle renders on a small viewport
- **THEN** it displays a 3-bar menu icon with at least 48px height and width
- **AND** uses `text-text-muted` with hover state transitioning to white

### Requirement: Mobile drawer backdrop styling

The mobile sidebar backdrop SHALL use a semi-transparent dark overlay covering the full viewport behind the drawer.

#### Scenario: Backdrop appearance

- **WHEN** the mobile drawer is open
- **THEN** the backdrop covers the full viewport with a dark semi-transparent fill
- **AND** the sidebar drawer retains the existing sidebar surface styling (`bg-sidebar-bg`, `border-surface-border`)

### Requirement: Mobile drawer transition

The mobile sidebar drawer SHALL animate in and out with a horizontal slide transition.

#### Scenario: Drawer slide animation

- **WHEN** the mobile sidebar opens or closes
- **THEN** the drawer transitions horizontally using `transform: translateX`
- **AND** the transition completes within 300ms
