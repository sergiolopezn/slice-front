## Context

[`TelegramIntegrationCard.tsx`](src/features/settings/components/TelegramIntegrationCard.tsx) sets `placeholder="@MarioPizzaOwner"`. No other admin-handle behavior changes are in scope for this change.

## Goals / Non-Goals

**Goals:**
- Replace placeholder with `Manager official Telegram username`.

**Non-Goals:**
- Layout, typography, linked status card, input disabled state, mock mutations, or any other settings changes.

## Decisions

### 1. Placeholder string

Use exact product copy:

```tsx
placeholder="Manager official Telegram username"
```

No `@` prefix — descriptive guidance, not an example handle.

### 2. Tests

Update `settings-view.test.tsx` unlinked test assertion from `@MarioPizzaOwner` to the new placeholder.

## Risks / Trade-offs

None — single-string copy change.

## Migration Plan

1. Update placeholder in `TelegramIntegrationCard.tsx`.
2. Update test expectation.
3. Run settings tests.
