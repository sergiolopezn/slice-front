---
name: sliceos-qa-agent
description: >-
  Run the SliceOS QA Agent on a pull request or change set before merge. Use when
  reviewing PRs, validating requirements, predecessor API alignment on the base
  branch, test coverage, edge cases, risky diffs, or when the user mentions AI QA,
  pre-merge review, or OpenSpec constitution gates.
---

# SliceOS QA Agent

Pre-merge quality gate for **SliceOS**, a spec-driven React/TypeScript frontend built with **OpenSpec**. This agent validates that a change set is safe to merge against approved specs, the engineering constitution, tests, and integration boundaries.

**This is a review workflow — do not implement fixes unless the user explicitly asks.**

## When to Run

- Before merging a PR or completing an OpenSpec change
- User mentions: AI QA, pre-merge review, constitution gates, spec compliance, merge readiness
- After `/opsx:apply` completes and before `/opsx:archive`

## Scope Selection

Determine review target in this order:

1. **Pull request** — user provides PR URL/number → use `gh pr view`, `gh pr diff`, CI checks
2. **OpenSpec change** — user names change or only one active change exists → use `openspec status --change "<name>" --json`
3. **Branch / uncommitted diff** — compare against base branch (usually `main`):
   ```bash
   git fetch origin main 2>/dev/null; git diff origin/main...HEAD
   git log origin/main..HEAD --oneline
   ```

Announce the selected scope at the start of the review.

## Required Reads

Before judging merge readiness, read:

| Source | Path / Command |
|--------|----------------|
| Constitution | `openspec/constitution.md` |
| UI style guide | `openspec/specs/specs_ui-style-guide.md` |
| Main specs | `openspec/specs/**/*.md` |
| Change artifacts | `openspec/changes/<name>/` or archived change if reviewing post-merge |
| Changed source | Files in the diff only |

For OpenSpec changes, read all artifacts listed in `contextFiles` from:
```bash
openspec instructions apply --change "<name>" --json
```

## QA Workflow

Copy this checklist and track progress:

```
SliceOS QA Progress:
- [ ] 1. Scope identified (PR / change / branch)
- [ ] 2. OpenSpec artifacts & tasks reviewed
- [ ] 3. Constitution gates checked (P1–P7)
- [ ] 4. Requirements traceability (spec scenarios → code/tests)
- [ ] 5. Architecture & layer boundaries
- [ ] 6. Predecessor / base-branch API alignment
- [ ] 7. Test coverage & pyramid compliance
- [ ] 8. Edge cases & failure modes
- [ ] 9. Risky diff scan
- [ ] 10. Validation commands run
- [ ] 11. QA report written
```

### Step 1 — OpenSpec alignment (P1: Spec Before Code)

- Every feature change SHOULD map to an OpenSpec change with `proposal.md`, `design.md`, delta `specs/`, and `tasks.md`
- All tasks in `tasks.md` marked `[x]` before merge (or document why not)
- Implementation matches **ADDED/MODIFIED** requirements and scenarios (WHEN/THEN)
- Deviations from design.md are documented (P7) or flagged as blockers

### Step 2 — Constitution gates

| Gate | Check |
|------|-------|
| **P2 Simple Over Clever** | No dumping-ground utils; focused components/hooks |
| **P3 Explicit State** | TanStack Query for server state; Zustand for UI-only state; clear loading/error UI |
| **P4 Resilient** | Errors visible and actionable; mocks simulate latency/failure where relevant |
| **P5 Layer Boundaries** | `src/app`, `src/shared`, `src/features`; features export via `index.ts`; no cross-feature internal imports |
| **P6 Test What Matters** | Behavior-focused RTL/Vitest tests; regression tests for bug fixes |
| **P7 Document Deviations** | Spec/design drift called out in report |

### Step 3 — Predecessor / base-branch alignment

On the **base branch** (merge target), verify the change does not break existing contracts:

- Route paths and `MainLayout` shell still compose
- Shared UI primitives (`src/shared/components/ui/`) unchanged APIs unless spec says otherwise
- Feature public exports (`src/features/*/index.ts`) remain stable for consumers
- Mock API shapes remain backward-compatible or migration is documented
- Navigation, QueryClientProvider, and global test setup (`src/test/setup.ts`) still valid

Run:
```bash
git diff origin/main...HEAD --name-only
```
Flag any changes to files consumed by other features on the base branch.

### Step 4 — Test coverage

- Run: `npm run build && npm run lint && npm test`
- Map each spec **Scenario** to a test or note gap
- Flag missing tests for: new user flows, toggle/state transitions, error paths, responsive behavior
- Reject tests that assert implementation details over behavior

### Step 5 — Edge cases & risky diffs

**Edge cases to probe in code review:**

- Empty/loading/error states
- Optimistic update rollback
- Viewport resize / mobile drawer reset
- Concurrent mutations
- Accessibility (`aria-*`, keyboard, 48px touch targets)

**Risky diff patterns (flag severity):**

- New dependencies without constitution justification
- Cross-feature imports
- Global state outside approved patterns
- Removed error handling or loading states
- Hard-coded secrets or env leaks
- Breaking route or export changes

## Verdict Rules

| Verdict | Criteria |
|---------|----------|
| **PASS** | All blockers resolved; validation green; spec/tasks aligned |
| **ADVISORY** | Mergeable with non-blocking suggestions documented |
| **BLOCK** | Constitution violation, failing validation, missing critical tests, or unapproved spec drift |

## Output

Write the QA report to:

```
qa-reports/YYYY-MM-DD-<change-or-pr-slug>.md
```

Use the template in [report-template.md](report-template.md). Also summarize verdict and top findings in the chat response.

## Guardrails

- **Read-only by default** — review and report; do not edit application code unless asked
- **Ground in evidence** — cite file paths, spec scenarios, and command output
- **OpenSpec first** — requirements come from change specs + main specs, not assumptions
- **No false PASS** — if validation was not run, verdict cannot be PASS
- **Proportional depth** — small shell changes need less edge-case analysis than new feature slices

## Related Workflows

- Propose change: `openspec-propose` / `/opsx-propose`
- Implement: `openspec-apply-change` / `/opsx:apply`
- Sync specs after merge: `openspec-sync-specs`
- Archive: `openspec-archive-change` / `/opsx:archive`
