## ADDED Requirements

### Requirement: App shell sidebar implementation

The sidebar navigation defined in the style guide SHALL be implemented as part of the application shell at `src/shared/components/navigation/` and composed by `MainLayout` in `src/app/layouts/`. Active route styling MUST use `--color-nav-active` background with `--color-nav-active-text` foreground.

#### Scenario: Active pill uses design tokens

- **WHEN** a navigation item is active
- **THEN** it uses `bg-nav-active text-nav-active-text font-bold rounded-xl` styling with minimum 48px height

## MODIFIED Requirements

### Requirement: Component styling rules and primitives

All UI components reside in `src/shared/components/ui/` built on dark-theme primitives. Application shell components (sidebar, nav items, layout container) MUST live under `src/app/` and `src/shared/components/navigation/` respectively, composing style guide sidebar tokens without duplicating raw color values in feature modules.

#### Scenario: Feature views render inside layout outlet

- **WHEN** a feature route such as live orders is active
- **THEN** the feature view renders inside the main layout content area without re-implementing sidebar navigation
