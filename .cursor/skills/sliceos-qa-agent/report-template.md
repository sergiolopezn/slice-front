# SliceOS QA Report

**Date:** YYYY-MM-DD  
**Reviewer:** SliceOS QA Agent  
**Scope:** [PR #N | change `<name>` | branch `<branch>` vs `main`]  
**Verdict:** PASS | ADVISORY | BLOCK

---

## Executive Summary

One paragraph: what was reviewed, overall quality, and merge recommendation.

---

## Scope Reviewed

| Item | Value |
|------|-------|
| OpenSpec change | `<change-name>` or N/A |
| Base branch | `main` |
| Files changed | N |
| Commits | N |

### Changed areas

- `path/to/feature/` — brief description
- `path/to/other/` — brief description

---

## OpenSpec Compliance

### Artifacts

| Artifact | Status | Notes |
|----------|--------|-------|
| proposal.md | ✅ / ⚠️ / ❌ | |
| design.md | ✅ / ⚠️ / ❌ | |
| specs/ | ✅ / ⚠️ / ❌ | |
| tasks.md | ✅ / ⚠️ / ❌ | X/Y tasks complete |

### Requirements Traceability

| Requirement (spec) | Implemented | Tested | Notes |
|--------------------|-------------|--------|-------|
| Requirement: … | ✅ / ❌ | ✅ / ❌ | |

### Spec / design deviations

- None, or list each deviation with P7 documentation status

---

## Constitution Gates (P1–P7)

| Principle | Status | Findings |
|-----------|--------|----------|
| P1 Spec Before Code | ✅ / ⚠️ / ❌ | |
| P2 Simple Over Clever | ✅ / ⚠️ / ❌ | |
| P3 Explicit State | ✅ / ⚠️ / ❌ | |
| P4 Offline/Resilient | ✅ / ⚠️ / ❌ | |
| P5 Layer Boundaries | ✅ / ⚠️ / ❌ | |
| P6 Test What Matters | ✅ / ⚠️ / ❌ | |
| P7 Document Deviations | ✅ / ⚠️ / ❌ | |

---

## Predecessor / Base-Branch Alignment

| Contract / consumer | Impact | Status |
|---------------------|--------|--------|
| `src/app/router.tsx` routes | | ✅ / ⚠️ / ❌ |
| Feature exports | | ✅ / ⚠️ / ❌ |
| Shared UI primitives | | ✅ / ⚠️ / ❌ |
| Mock API contracts | | ✅ / ⚠️ / ❌ |

---

## Validation Results

| Command | Result |
|---------|--------|
| `npm run build` | ✅ PASS / ❌ FAIL |
| `npm run lint` | ✅ PASS / ❌ FAIL |
| `npm test` | ✅ PASS (N tests) / ❌ FAIL |

---

## Test Coverage Assessment

### Covered well

- …

### Gaps (non-blocking)

- …

### Gaps (blocking)

- …

---

## Edge Cases Reviewed

| Scenario | Handled | Notes |
|----------|---------|-------|
| Loading state | ✅ / ❌ | |
| Error state | ✅ / ❌ | |
| Empty state | ✅ / ❌ | |
| … | | |

---

## Risky Diffs

### 🔴 Blockers (must fix before merge)

1. …

### 🟡 Advisories (recommended)

1. …

### 🟢 Observations (optional)

1. …

---

## Merge Recommendation

**Verdict:** PASS | ADVISORY | BLOCK

**Rationale:** …

**Before merge checklist:**

- [ ] All blockers resolved
- [ ] Validation green
- [ ] OpenSpec tasks complete
- [ ] Specs synced or archive planned (`/opsx:archive`)
