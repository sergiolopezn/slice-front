## MODIFIED Requirements

### Requirement: Telegram webhook monitoring

#### Scenario: Admin handle when unlinked

- **GIVEN** no admin Telegram chat is linked
- **WHEN** the Telegram integration section renders
- **THEN** an enabled text input is visible with placeholder `Manager official Telegram username`
- **AND** helper text reads "Only messages from this Telegram handle can trigger admin commands."
