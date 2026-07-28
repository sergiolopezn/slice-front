## MODIFIED Requirements

### Requirement: Main layout shell

The application SHALL render a persistent `MainLayout` with a left sidebar and a main content area using React Router `<Outlet />`. The layout MUST span the full viewport height with the dark KDS app background. On viewports below the `lg` breakpoint (1024px), the sidebar SHALL be hidden by default and accessible via a hamburger toggle; on desktop viewports the sidebar SHALL remain persistently visible.

#### Scenario: Layout renders on app load

- **WHEN** the application loads at any top-level route on a desktop viewport
- **THEN** a sidebar and main content area are visible
- **AND** the main content area renders the matched route view

#### Scenario: Mobile layout maximizes content area

- **WHEN** the application loads on a viewport below 1024px
- **THEN** the main content area spans the full viewport width
- **AND** a hamburger toggle is available to open the sidebar drawer
