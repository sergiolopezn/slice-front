## Context

SliceOS is a greenfield React 19 + Vite + TypeScript project. The app currently ships the default Vite starter template with no feature-based architecture folders, no Tailwind CSS, and no shared UI layer. The constitution (P5) mandates feature-based architecture with shared primitives in `src/shared/`, and the UI style guide defines a dark KDS design system with specific color tokens, typography, and touch ergonomics.

This change establishes the first shared module and introduces Tailwind CSS as the styling mechanism referenced throughout the style guide.

## Goals / Non-Goals

**Goals:**

- Scaffold `src/shared/components/ui/` with `Badge`, `Button`, `Card`, `OrderCardHeader`, and barrel exports.
- Install and configure Tailwind CSS v4 (or latest stable compatible with Vite 8) with design tokens mapped from the style guide.
- Define TypeScript prop types for all variant enums and ensure 48px minimum touch targets on interactive elements.
- Add Vitest + React Testing Library and write integration tests for each component's primary variants.
- Provide a minimal demo page or Storybook-free smoke view so primitives are visually verifiable during development.

**Non-Goals:**

- Full `OrderCard` composite with line items, modifiers, or order state management.
- Sidebar navigation components (documented in style guide but not in the initial primitive set).
- TanStack Query, Zustand, or any data-fetching integration.
- E2E test suite (deferred to feature vertical slices).

## Decisions

### 1. Tailwind CSS for styling

**Decision:** Add Tailwind CSS + PostCSS to the Vite project and implement component styles as Tailwind utility classes per the style guide.

**Rationale:** The style guide already specifies Tailwind class mixes. The constitution lists Tailwind as part of the approved stack. No additional UI library (Radix, shadcn, MUI) is needed for these simple presentational primitives.

**Alternatives considered:**
- CSS Modules — rejected; diverges from style guide's Tailwind-first approach.
- Inline CSS variables only — rejected; harder to maintain variant maps without utility composition.

### 2. Variant API via discriminated union props

**Decision:** Each component accepts a required `variant` prop typed as a string union (e.g., `ButtonVariant = 'bump' | 'check-temp' | 'complete'`). Variant-to-class mapping lives in a co-located `variants.ts` or inline `const variantClasses` record within each file.

**Rationale:** Explicit, type-safe API aligns with constitution P3 (explicit state). Keeps components small without a class-variance-authority dependency.

**Alternatives considered:**
- CVA (class-variance-authority) — rejected to avoid new dependency for four simple components.

### 3. OrderCardHeader timer as controlled prop

**Decision:** `OrderCardHeader` accepts `timer: string` as a prop; it does NOT run an internal interval clock.

**Rationale:** Timer tick logic belongs in feature hooks (TanStack Query / domain layer). The header is a presentational primitive.

### 4. File structure and exports

```
src/shared/components/ui/
├── index.ts
├── Badge.tsx
├── Button.tsx
├── Card.tsx
├── OrderCardHeader.tsx
└── __tests__/
    ├── Badge.test.tsx
    ├── Button.test.tsx
    ├── Card.test.tsx
    └── OrderCardHeader.test.tsx
```

**Decision:** Single barrel export; no sub-folder splitting until the library grows beyond ~8 components.

### 5. Design tokens in CSS + Tailwind theme extension

**Decision:** Define CSS custom properties in `src/index.css` under `:root`, then reference them in Tailwind config via `@theme` (Tailwind v4) or `theme.extend.colors` (v3).

**Rationale:** Keeps a single source of truth aligned with the style guide spec; enables future theming without component edits.

### 6. Testing stack

**Decision:** Add Vitest, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`. Test behavior (rendered text, click handlers, class presence for variants) not implementation internals.

**Rationale:** Matches constitution P6 testing pyramid — integration/UI tests for key component interactions.

## Risks / Trade-offs

- **[Tailwind not yet installed]** → First task in implementation is toolchain setup before any component work.
- **[Font loading adds network dependency in dev]** → Use `@fontsource/inter` and `@fontsource/jetbrains-mono` npm packages for self-hosted fonts (no Google Fonts CDN dependency).
- **[Hardcoded hex in Tailwind classes vs CSS vars]** → Prefer CSS var references in Tailwind theme; fall back to documented hex only where Tailwind arbitrary values are clearer for one-off banner colors.
- **[No path alias configured]** → Add `@/` → `src/` alias in `vite.config.ts` and `tsconfig` for ergonomic imports; document in tasks.

## Migration Plan

1. Install Tailwind, PostCSS, fonts, and test dependencies.
2. Replace Vite starter CSS with KDS token definitions; set `body` background to `#121214`.
3. Implement components and tests.
4. Replace or augment `App.tsx` with a component showcase grid for manual smoke validation.
5. No production deployment migration required — greenfield setup.

## Open Questions

- Should a `@/` path alias be introduced in this change or deferred? **Recommendation:** Include it now to match expected feature-based imports.
- Full `OrderCard` composite: defer to a follow-up feature change once live orders vertical slice begins.
