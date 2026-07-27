# SliceOS Engineering Constitution

These principles are **non-negotiable** for all new work, features, and code refactors in SliceOS.

---

## 1. Core Principles Summary Map

> *Note: If a conflict arises between this summary table and the detailed sections below, the detailed principle takes precedence.*

| # | Principle | Detailed Principle |
|---|-----------|-------------------|
| **P1** | **Spec Before Code** | Spec-Driven Development & Definition of Done |
| **P2** | **Simple Over Clever** | Clean Code Rules, Complexity Limits, No "Dumping Grounds" |
| **P3** | **Explicit State** | Trustworthy Kitchen UX, Unidirectional State Flow |
| **P4** | **Offline/Resilient-Aware** | Explicit Error Handling, Network Latency, Read/Write Contracts |
| **P5** | **Layer Boundaries** | Feature-Based Architecture, Dependency Discipline |
| **P6** | **Test What Matters** | Common-First Testing Strategy, Strict Testing Pyramid |
| **P7** | **Document Deviations** | Architectural Decision Records (ADR) & Spec Changes |

---

## 2. Architecture & Vertical Slices

- **Pattern:** Strict **Feature-Based Architecture** (`src/app`, `src/shared`, `src/features`). Features must export their public interface strictly via `index.ts`. Direct imports of internal feature files from another feature are strictly prohibited.
- **Vertical Feature Slices:** Every feature MUST be delivered as a complete, end-to-end slice containing UI, state management, domain logic, and a data layer using either contract-ready mocks or real integrations. Infrastructure-only work is allowed **only** when it directly unblocks a demonstrable vertical slice.
- **Dependency Discipline:** 
  - Prefer the **TypeScript/JS standard library** and existing project dependencies before adding third-party packages.
  - Do not add new libraries to solve problems already covered by our current stack (e.g., TanStack Query, Zustand, Tailwind CSS).
- **Clean Code & Design:** 
  - Avoid dumping-ground files like `Utils`, `Helpers`, or `Misc`.
  - Avoid hidden mutable state and implicit global dependencies.
  - Functions and components MUST be small, focused, and favor immutability and explicitly injected collaborators.

---

## 3. Mock & Integration Contracts

- **Production-Boundary Mocks:** Mocks are expected during early MVP phases, but they MUST respect domain boundaries, mirror planned API/Webhook contracts, and simulate realistic network conditions (latency, network drops, and failure states).
- **Mock Longevity:** Mock implementations are production-boundary prototypes—never disposable or throwaway code. They must accelerate, rather than distort, future backend and Telegram bot integrations.

---

## 4. State Management & Trustworthy Kitchen UX

- **Server State:** Use **TanStack Query** for all API fetching, caching, and server mutations. Do not mirror or store server data in global client stores.
- **Client UI State:** Use **Zustand** exclusively for local UI state (modal toggles, active dashboard filter selections, UI views).
- **UX Clarity:** All kitchen and order-facing flows MUST favor clarity over cleverness. UI elements must explicitly expose loading, error, and success states, and always present clear next actions (e.g., retry buttons, manual overrides).
- **Unidirectional Data Flow:** State flows down via props/hooks and mutates strictly through explicit, deterministic handlers.

---

## 5. Error Handling, Resilience & Offline Behavior

- **Explicit Domain Errors:** Every feature MUST define user-visible errors, retry behaviors, fallback states, and degraded/offline behaviors appropriate to high-stress restaurant operations.
- **No Generic Hiding:** Never swallow errors or present generic, unhelpful messages. Distinguish clearly between network failures, validation errors, and server drops.
- **User Actionability:** Provide clear recovery paths (e.g., *"Failed to update order status. Tap to retry or check network Connection"*).
- **React Error Boundaries:** Wrap feature modules and major application sections with Error Boundaries to ensure isolated failures never crash the entire Kitchen Display System.

---

## 6. Testing Strategy & Testing Pyramid

SliceOS enforces a strict **Common-First Testing Strategy** following the testing pyramid:

```
        /   E2E   \        -> Few (Critical paths only)
       / UI / Integration \ -> Some (Key component interactions)
      /    Unit Tests      \ -> Many (Domain logic, hooks, state)
```

- **Distribution:** Maintain **many** unit tests, **some** integration/UI tests, and **few** full E2E tests.
- **Deterministic Execution:** Unit tests MUST avoid real network calls. Timeouts, timers, and async dispatchers must be fully deterministic.
- **Regression Guarantee:** Every bug fix MUST include a corresponding regression test added to the suite before closing the task.
- **Tooling Standards:** Use **Vitest** for unit/logic tests and **React Testing Library** for component integration testing. Focus on testing behavior over internal implementation details.

---

## 7. Spec-Driven Development (SDD) & Definition of Done

A feature satisfies SDD and is considered **Done** only when it fulfills all of the following criteria:

1. **Spec Approved:** The OpenSpec proposal is written, reviewed, and approved.
2. **Acceptance Criteria (AC) Met:** All user stories and requirements defined in the spec pass validation.
3. **Tests Passing:** Unit and integration tests pass without flakiness and adhere to the testing pyramid rule.
4. **Boundaries Hold:** No leakages across feature modules or unapproved global utility creations.
5. **Smoke Validation Complete:** Manual or automated smoke test verifies the vertical slice functions end-to-end (including mock handling).
6. **Deviations Documented:** Any architectural divergence from the constitution or spec is documented via an Architectural Decision Record (ADR).