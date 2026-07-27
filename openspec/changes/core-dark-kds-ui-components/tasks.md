## 1. Toolchain & Design Tokens

- [x] 1.1 Install Tailwind CSS, PostCSS, autoprefixer, `@fontsource/inter`, and `@fontsource/jetbrains-mono`
- [x] 1.2 Configure Tailwind in Vite (PostCSS plugin or `@tailwindcss/vite` per version) and add `@/` → `src/` path alias in `vite.config.ts` and `tsconfig`
- [x] 1.3 Replace starter CSS in `src/index.css` with KDS design tokens (`:root` CSS custom properties) and Tailwind directives; set app background to `#121214`
- [x] 1.4 Import Inter and JetBrains Mono font packages in `src/main.tsx`

## 2. Shared UI Module Scaffold

- [x] 2.1 Create `src/shared/components/ui/` directory structure and `index.ts` barrel export
- [x] 2.2 Implement `Card.tsx` with dark surface styling (`#1c1c20` bg, `#2a2a30` border, rounded-2xl, flex column)
- [x] 2.3 Implement `Badge.tsx` with variants: `rush`, `prep`, `ready`, `cod`
- [x] 2.4 Implement `Button.tsx` with variants: `bump`, `check-temp`, `complete`; 48px min height; disabled and focus states
- [x] 2.5 Implement `OrderCardHeader.tsx` with `orderNumber`, `timer`, and `status` props driving banner color and text contrast

## 3. Testing

- [x] 3.1 Add Vitest, `@testing-library/react`, `@testing-library/jest-dom`, and `jsdom`; configure `vitest.config.ts` and test script in `package.json`
- [x] 3.2 Write integration tests for `Badge` (all four variants render correct labels)
- [x] 3.3 Write integration tests for `Button` (click handler, disabled state, variant class presence)
- [x] 3.4 Write integration tests for `Card` (children render inside container)
- [x] 3.5 Write integration tests for `OrderCardHeader` (rush/prep/ready status contrast and monospace ticket/timer display)

## 4. Smoke Validation & Cleanup

- [x] 4.1 Replace Vite starter content in `App.tsx` with a component showcase grid demonstrating all primitives and variants
- [x] 4.2 Remove unused Vite starter assets/styles (`App.css`, hero images) no longer referenced
- [x] 4.3 Run `npm run build`, `npm run lint`, and `npm test` — all pass without errors
