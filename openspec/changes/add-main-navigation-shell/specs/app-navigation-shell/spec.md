## ADDED Requirements

### Requirement: Main layout shell

The application SHALL render a persistent `MainLayout` with a fixed left sidebar and a main content area using React Router `<Outlet />`. The layout MUST span the full viewport height with the dark KDS app background.

#### Scenario: Layout renders on app load

- **WHEN** the application loads at any top-level route
- **THEN** a fixed sidebar and main content area are visible
- **AND** the main content area renders the matched route view

### Requirement: Sidebar navigation items

The sidebar SHALL expose the following navigation items in order: Dashboard, Live orders, Menu management, Order history, and Settings. Each item MUST include an icon and label, with a minimum 48px touch target height.

#### Scenario: All nav items visible

- **WHEN** the sidebar renders
- **THEN** all five navigation items appear in the specified order with icons and labels

### Requirement: Active route highlighting

The system SHALL highlight the currently active route in the sidebar with a filled active pill background and contrasting text per the UI style guide tokens.

#### Scenario: Active route styling

- **WHEN** the user navigates to `/live-orders`
- **THEN** the "Live orders" nav item displays the active pill styling
- **AND** all other nav items display inactive styling

#### Scenario: Navigation updates URL and view

- **WHEN** the user clicks "Live orders" in the sidebar
- **THEN** the browser URL updates to `/live-orders`
- **AND** the main content area renders the live orders view

### Requirement: Sidebar branding and profile

The sidebar SHALL display the SliceOS logo/brand at the top and a fixed staff profile label ("Kitchen Admin") at the bottom.

#### Scenario: Brand and profile placement

- **WHEN** the sidebar renders
- **THEN** the SliceOS brand appears at the top
- **AND** "Kitchen Admin" appears fixed at the bottom of the sidebar

### Requirement: Route placeholders

Unimplemented sections SHALL render a placeholder empty-state view with the section title. The Live orders route MUST render the existing live orders dashboard feature.

#### Scenario: Placeholder view for settings

- **WHEN** the user navigates to `/settings`
- **THEN** the main content area renders a placeholder view indicating Settings is coming soon

#### Scenario: Live orders feature route

- **WHEN** the user navigates to `/live-orders`
- **THEN** the main content area renders the live orders dashboard from the `live-orders` feature module

### Requirement: Default route redirect

The application SHALL redirect the root path `/` to `/dashboard` and render the dashboard placeholder view.

#### Scenario: Root URL redirect

- **WHEN** the user navigates to `/`
- **THEN** the URL resolves to `/dashboard`
- **AND** the Dashboard nav item is highlighted as active
