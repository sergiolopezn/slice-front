## Context

SliceOS has a fixed `w-64` sidebar in `MainLayout` that is always visible. The original navigation shell change explicitly deferred mobile collapsible behavior. With dashboard and live-orders features now filling the main content area, narrow viewports (phones, small tablets) need a responsive shell that maximizes content space while keeping navigation one tap away.

## Goals / Non-Goals

**Goals:**

- Hide sidebar by default below `lg` (1024px); always visible at/above `lg`.
- Hamburger (3-bar) button to open sidebar on small viewports.
- Overlay drawer with backdrop on mobile.
- Close drawer on nav link click, backdrop tap, and Escape key.
- Reset mobile open state when viewport resizes to desktop.
- Accessible toggle (`aria-expanded`, `aria-controls`, 48px touch target).
- Integration tests for toggle and close behavior.

**Non-Goals:**

- Desktop sidebar collapse / icon-rail mode.
- Persisting open/closed preference across sessions.
- Focus trap inside drawer (recommended follow-up, not v1).
- Body scroll lock while drawer open.
- Animating main content push (overlay only, not push layout).

## Decisions

### 1. Breakpoint: `lg` (1024px)

**Decision:** Use Tailwind `lg:` prefix as the desktop/mobile boundary.

**Rationale:** Kitchen wall-mounted tablets are typically landscape ≥1024px and should keep the sidebar always visible. Phones and portrait small tablets fall below this threshold.

### 2. Overlay drawer, not push layout

**Decision:** Mobile sidebar uses `fixed inset-y-0 left-0 z-40` with `-translate-x-full` when closed; backdrop at `z-30`.

**Rationale:** Overlay preserves content layout without reflow. Standard mobile nav pattern.

### 3. State in `MainLayout` (local React state)

**Decision:** `MainLayout` owns `isMobileOpen` state via `useState`. Pass `onClose` to `Sidebar`/`NavItem`; no Zustand needed.

**Rationale:** Shell-level UI state with no cross-feature consumers. Keeps scope minimal.

### 4. Viewport resize via `matchMedia`

**Decision:** `useEffect` listening to `(min-width: 1024px)` matchMedia change event; close mobile drawer and clear state on desktop match.

**Rationale:** Reliable breakpoint detection without polling resize events manually.

### 5. Component split

**Decision:**

| Component | Location | Role |
|-----------|----------|------|
| `SidebarToggle` | `navigation/SidebarToggle.tsx` | Hamburger button, visible `lg:hidden` |
| `SidebarBackdrop` | `navigation/SidebarBackdrop.tsx` | Dimmed overlay, visible when mobile open |
| `Sidebar` | updated | Accepts `isOpen`, `onClose`; responsive classes |
| `NavItem` | updated | Calls `onNavigate` callback after link click |
| `MainLayout` | updated | Composes toggle, backdrop, sidebar, content |

### 6. Escape key handler

**Decision:** `useEffect` in `MainLayout` adds/removes `keydown` listener for `Escape` when `isMobileOpen`.

### 7. Menu icon

**Decision:** Add `MenuIcon` (3 horizontal bars) to `icons.tsx`, matching existing inline SVG pattern.

### 8. App shell header row

**Decision:** Add a thin header bar inside `MainLayout` above `<Outlet />` on mobile only (`lg:hidden`) containing the hamburger toggle. Desktop renders content directly without the bar.

```
Mobile MainLayout:
┌─────────────────────────────────┐
│ ☰                               │  ← shell header (lg:hidden)
├─────────────────────────────────┤
│ <Outlet /> (feature content)    │
└─────────────────────────────────┘

Desktop MainLayout:
┌──────┬──────────────────────────┐
│ Side │ <Outlet />               │
└──────┴──────────────────────────┘
```

## Risks / Trade-offs

- **[No focus trap]** → Keyboard users can tab behind drawer. Acceptable for v1; add in follow-up.
- **[matchMedia in tests]** → Need to mock viewport or use CSS class assertions. Tests can toggle state directly via hamburger click in jsdom (no real viewport).
- **[Feature page titles below shell header]** → Dashboard/KDS h1 titles appear below hamburger row on mobile. Acceptable; shell header is minimal.

## Migration Plan

1. Update navigation components and `MainLayout` — no route changes.
2. Existing desktop behavior preserved at `lg+`.
3. Rollback: revert `MainLayout` and `Sidebar` to fixed layout.

## Open Questions

- None blocking v1.
