## Why

SliceOS needs a foundational, reusable UI component library before any KDS dashboard features can be built. Without shared primitives aligned to the dark KDS design system, each feature would re-implement styling inconsistently, violating constitution layer boundaries and making touch-optimized kitchen UX harder to maintain.

## What Changes

- Add a new `src/shared/components/ui/` directory with domain-agnostic UI primitives: `Badge`, `Button`, `Card`, and `OrderCardHeader`.
- Expose a single public API boundary via `src/shared/components/ui/index.ts`.
- Implement components using dark KDS tokens from the UI style guide (`#121214` surfaces, status colors, 48px touch targets, monospace ticket/timer typography).
- Add component-level integration tests for key variants and interaction states.
- Wire Tailwind CSS into the Vite project (required by the style guide; not yet installed).

## Capabilities

### New Capabilities

- `ui-components`: Reusable dark KDS UI primitives (Badge, Button, Card, OrderCardHeader) with typed variants, accessibility-compliant contrast rules, and a barrel export boundary.

### Modified Capabilities

- `ui-style-guide`: Extend requirements to reference the concrete shared component library location and primitive contracts (Badge status variants, Button action variants, Card surface, OrderCardHeader banner behavior).

## Impact

- **Code**: New `src/shared/components/ui/` module; updates to `src/index.css` (design tokens); Tailwind/Vite config additions; optional demo usage in `App.tsx` for smoke validation.
- **Dependencies**: Tailwind CSS (+ PostCSS/autoprefixer) added to dev dependencies per style guide; no other third-party UI libraries.
- **Tests**: New React Testing Library + Vitest component tests under `src/shared/components/ui/__tests__/`.
- **Architecture**: Establishes the first `src/shared/` vertical slice boundary referenced in the constitution (P5).
