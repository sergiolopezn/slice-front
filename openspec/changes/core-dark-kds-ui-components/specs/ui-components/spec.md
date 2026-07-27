## ADDED Requirements

### Requirement: Shared UI component library location

The system SHALL expose all domain-agnostic KDS UI primitives from `src/shared/components/ui/` via a single barrel export at `src/shared/components/ui/index.ts`. Feature modules MUST import UI primitives only through this public boundary.

#### Scenario: Feature imports a primitive

- **WHEN** a feature module needs a Button
- **THEN** it imports `{ Button }` from `src/shared/components/ui` (or the configured path alias equivalent)

#### Scenario: Internal file import blocked by convention

- **WHEN** a developer attempts to import directly from `src/shared/components/ui/Button.tsx`
- **THEN** the barrel export remains the documented and required import path per architecture guidelines

### Requirement: Badge status variants

The `Badge` component SHALL render inline status indicators with typed variants: `rush`, `prep`, `ready`, and `cod` (cash on delivery / idle). Each variant MUST map to the corresponding KDS status color token from the UI style guide.

#### Scenario: Rush badge rendering

- **WHEN** `<Badge variant="rush">RUSH</Badge>` is rendered
- **THEN** the badge displays with urgent red background (`#ff2a4b`) and white text

#### Scenario: Prep badge rendering

- **WHEN** `<Badge variant="prep">PREP</Badge>` is rendered
- **THEN** the badge displays with prep amber background (`#ffa826`) and black text

#### Scenario: Ready badge rendering

- **WHEN** `<Badge variant="ready">READY</Badge>` is rendered
- **THEN** the badge displays with ready mint background (`#00e699`) and black text

#### Scenario: COD badge rendering

- **WHEN** `<Badge variant="cod">COD</Badge>` is rendered
- **THEN** the badge displays with idle gray background (`#27272a`) and muted text

### Requirement: Button action variants with touch targets

The `Button` component SHALL render full-width, touch-optimized action buttons with typed variants: `bump`, `check-temp`, and `complete`. All variants MUST have a minimum height of 48px, uppercase label styling, and hover state color transitions per the UI style guide.

#### Scenario: Bump button interaction

- **WHEN** `<Button variant="bump" onClick={handler}>BUMP ORDER</Button>` is rendered and clicked
- **THEN** the button shows urgent red styling, meets 48px minimum height, and invokes the click handler

#### Scenario: Check temp button styling

- **WHEN** `<Button variant="check-temp">CHECK TEMP</Button>` is rendered
- **THEN** the button displays prep amber background with black text and rounded-xl corners

#### Scenario: Complete button disabled state

- **WHEN** `<Button variant="complete" disabled>COMPLETE</Button>` is rendered
- **THEN** the button is non-interactive and visually indicates disabled state while preserving minimum 48px height

### Requirement: Card surface primitive

The `Card` component SHALL render a dark KDS panel surface with `#1c1c20` background, `#2a2a30` border, `rounded-2xl` corners, shadow, and vertical flex layout suitable for order content.

#### Scenario: Default card surface

- **WHEN** `<Card>content</Card>` is rendered
- **THEN** the card displays the dark surface styling with overflow hidden and flex column layout

#### Scenario: Card accepts child content

- **WHEN** `<Card><OrderCardHeader /><div>items</div></Card>` is rendered
- **THEN** child elements render inside the card container in document order

### Requirement: OrderCardHeader banner

The `OrderCardHeader` component SHALL render a color-coded banner header containing an order ticket number and a live timer display. It MUST accept `orderNumber`, `timer`, and `status` props where `status` drives banner color and text contrast (white on red, black on amber/mint).

#### Scenario: Rush order header

- **WHEN** `<OrderCardHeader orderNumber="#402" timer="12:06" status="rush" />` is rendered
- **THEN** the banner shows red background, white monospace ticket number, and white monospace timer aligned on opposite ends

#### Scenario: In-prep order header

- **WHEN** `<OrderCardHeader orderNumber="#398" timer="08:14" status="prep" />` is rendered
- **THEN** the banner shows amber background with black monospace text for both ticket number and timer

#### Scenario: Ready order header

- **WHEN** `<OrderCardHeader orderNumber="#401" timer="00:00" status="ready" />` is rendered
- **THEN** the banner shows mint background with black monospace text

### Requirement: Component accessibility

All UI primitives SHALL meet WCAG AAA contrast requirements for their variant color pairings. Interactive components MUST support keyboard focus visibility and appropriate ARIA attributes where semantics are not implicit (e.g., `disabled` on buttons).

#### Scenario: Button focus visibility

- **WHEN** a user tabs to a Button
- **THEN** a visible focus ring or outline is displayed

#### Scenario: Contrast on amber header

- **WHEN** OrderCardHeader renders with `status="prep"`
- **THEN** black text on amber background maintains high-contrast readability
