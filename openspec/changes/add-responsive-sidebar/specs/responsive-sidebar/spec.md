## ADDED Requirements

### Requirement: Responsive sidebar visibility

The app shell SHALL display the sidebar persistently on viewports at or above the `lg` breakpoint (1024px) and hide it by default on smaller viewports.

#### Scenario: Desktop sidebar always visible

- **WHEN** the viewport width is at or above 1024px
- **THEN** the sidebar is visible without user interaction
- **AND** the hamburger toggle button is not shown

#### Scenario: Mobile sidebar hidden by default

- **WHEN** the viewport width is below 1024px
- **THEN** the sidebar is hidden by default
- **AND** the main content area uses the full viewport width

### Requirement: Hamburger menu toggle

The app shell SHALL provide a 3-bar hamburger button on small viewports that manually opens the sidebar drawer.

#### Scenario: Opening sidebar via hamburger

- **WHEN** the viewport is below 1024px and the sidebar is closed
- **THEN** a hamburger button is visible in the app shell header area
- **WHEN** the user taps the hamburger button
- **THEN** the sidebar drawer slides in from the left
- **AND** the button's `aria-expanded` attribute is `true`

### Requirement: Mobile overlay drawer

On small viewports, the sidebar SHALL render as a fixed overlay drawer above the main content with a dimmed backdrop.

#### Scenario: Drawer overlay with backdrop

- **WHEN** the mobile sidebar is open
- **THEN** a semi-transparent backdrop covers the main content
- **AND** the sidebar appears as a fixed left drawer at `z-40` above the backdrop

### Requirement: Mobile drawer close interactions

The mobile sidebar drawer SHALL close when the user navigates via a sidebar link, taps the backdrop, or presses the Escape key.

#### Scenario: Close on navigation

- **WHEN** the mobile sidebar is open
- **WHEN** the user taps a navigation link
- **THEN** the drawer closes and the selected route renders in the main content area

#### Scenario: Close on backdrop click

- **WHEN** the mobile sidebar is open
- **WHEN** the user taps the backdrop
- **THEN** the drawer closes

#### Scenario: Close on Escape key

- **WHEN** the mobile sidebar is open
- **WHEN** the user presses Escape
- **THEN** the drawer closes

### Requirement: Viewport resize reset

When the viewport expands to desktop width while the mobile drawer is open, the system SHALL reset to the desktop layout with the sidebar permanently visible.

#### Scenario: Resize to desktop clears mobile state

- **WHEN** the mobile sidebar is open
- **WHEN** the viewport width reaches 1024px or wider
- **THEN** the sidebar is permanently visible
- **AND** the backdrop and hamburger toggle are hidden
