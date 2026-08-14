## Context

Target layout (confirmed):

```
ADMIN TELEGRAM HANDLE
[Manager official Telegram username          ]  ← always enabled, placeholder visible
Only messages from this Telegram handle...
┌─────────────────────────────────────────────┐
│ 🔗 Linked Chat ID: 987654321               │
│    (@MarioPizzaOwner)                       │
└─────────────────────────────────────────────┘
[ Send Test Notification ]
```

**Key rule:** `@MarioPizzaOwner` does **not** appear in the input. The input shows placeholder copy only (empty field). Linked handle + chat ID live in the status card.

## Goals / Non-Goals

**Goals:**
- Match layout: accent label, placeholder input, accent helper, linked card.
- Input always enabled.
- Handle never rendered as input `value` when linked.

**Non-Goals:**
- Webhook / test notification changes.
- Real Telegram link/unlink API.

## Decisions

### 1. Input value when linked

| State | Input `value` | Placeholder | Disabled |
|---|---|---|---|
| Unlinked | user draft / empty | `Manager official Telegram username` | false |
| Linked | **empty string** (placeholder visible) | same | false |

Do not bind `adminTelegramHandle` to input value when linked.

```tsx
const isLinked = settings.adminTelegramChatId !== null
const [draftHandle, setDraftHandle] = useState('')

// unlinked: sync draft from settings.adminTelegramHandle on load
// linked: keep input empty; show handle in status card only

<input
  value={isLinked ? '' : draftHandle}
  placeholder="Manager official Telegram username"
  disabled={disabled}
/>
```

When unlinked, on blur persist `draftHandle` via `onAdminHandleChange`.

When linked, optional: blur still allowed but input stays visually empty; handle edits deferred to future unlink flow — **v1: linked input empty, non-mutating on blur** (handle shown only in card from `adminTelegramHandle`).

### 2. Linked status card

Only when `adminTelegramChatId !== null`:

- Line 1: `Linked Chat ID: {chatId}` (bold white)
- Line 2: `({adminTelegramHandle})` (muted)

### 3. Label & helper

Uppercase amber label; amber helper text (matches mock).

### 4. Mock API

No change to linked guard required if linked input does not submit handle edits on blur.

## Open Questions

None — layout confirmed by product.
