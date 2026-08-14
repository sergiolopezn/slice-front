## MODIFIED Requirements

### Requirement: Telegram webhook monitoring

#### Scenario: Admin handle when unlinked

- **GIVEN** no admin Telegram chat is linked
- **WHEN** the Telegram integration section renders
- **THEN** an uppercase accent label reads "ADMIN TELEGRAM HANDLE"
- **AND** an enabled empty text input is visible with placeholder `Manager official Telegram username`
- **AND** the input does not display a pre-filled handle value
- **AND** accent helper text reads "Only messages from this Telegram handle can trigger admin commands."
- **AND** no linked status card is displayed

#### Scenario: Admin handle when linked

- **GIVEN** an admin Telegram chat is linked with chat ID `987654321` and handle `@MarioPizzaOwner`
- **WHEN** the Telegram integration section renders
- **THEN** the admin handle input remains enabled and empty with placeholder `Manager official Telegram username`
- **AND** the input does not display `@MarioPizzaOwner` or linked chat metadata as its value
- **AND** a linked status card below the helper text shows a link icon, bold text `Linked Chat ID: 987654321`, and `(@MarioPizzaOwner)` on a second line
- **AND** the Send Test Notification button appears below the admin handle block

## MODIFIED Requirements

### Requirement: Admin Telegram handle configuration

#### Scenario: Editing admin handle when unlinked

- **GIVEN** no admin Telegram chat is linked
- **WHEN** the manager enters a handle in the Admin Telegram Handle input and commits the change
- **THEN** the mock API persists the new handle value
- **AND** the input remains enabled

#### Scenario: Linked handle shown in status card only

- **GIVEN** an admin Telegram chat is linked
- **WHEN** the admin handle section renders
- **THEN** `@MarioPizzaOwner` appears only in the linked status card, not in the input field
