## ADDED Requirements

### Requirement: Shared component library reference

The UI style guide SHALL reference `src/shared/components/ui/` as the canonical location for reusable KDS primitives. Style tokens documented in this guide MUST be implemented by those components rather than duplicated inline in feature modules.

#### Scenario: Component token alignment

- **WHEN** a developer consults the style guide for button styling
- **THEN** the guide directs them to use the shared `Button` component with typed variants instead of copying raw Tailwind classes

### Requirement: Design token CSS variables

The application SHALL define KDS color palette tokens as CSS custom properties in `src/index.css` matching the documented values: `--color-bg-app`, `--color-surface-card`, `--color-surface-border`, status tokens (`--status-urgent-red`, `--status-prep-amber`, `--status-ready-mint`, `--status-idle-gray`), and text hierarchy tokens.

#### Scenario: Token availability at runtime

- **WHEN** the application loads
- **THEN** all documented CSS custom properties are available on `:root` for use by Tailwind and components

### Requirement: Typography font loading

The application SHALL load `Inter` and `JetBrains Mono` fonts for primary and monospace typography respectively, as specified in the style guide.

#### Scenario: Monospace ticket display

- **WHEN** OrderCardHeader renders a ticket number
- **THEN** the text uses the monospace font stack (`JetBrains Mono`, fallback monospace)

## MODIFIED Requirements

### Requirement: Component styling rules and primitives

All UI components reside in `src/shared/components/ui/` built on dark-theme primitives. The library MUST include at minimum: `Badge`, `Button`, `Card`, and `OrderCardHeader`. Feature-specific composites (e.g., full `OrderCard` with line items) remain in feature modules but MUST compose these shared primitives.

#### Scenario: Order card composition

- **WHEN** a feature builds an order card
- **THEN** it composes `Card`, `OrderCardHeader`, and `Button` from the shared library rather than re-implementing surface or banner styles

#### Scenario: Action button consistency

- **WHEN** any KDS action button is rendered in the dashboard
- **THEN** it uses the shared `Button` component with the appropriate variant (`bump`, `check-temp`, or `complete`)
