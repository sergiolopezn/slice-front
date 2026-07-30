type SettingsToggleProps = {
  id: string
  label: string
  checked: boolean
  disabled?: boolean
  variant?: 'default' | 'pause'
  onChange: (checked: boolean) => void
}

export function SettingsToggle({
  id,
  label,
  checked,
  disabled,
  variant = 'default',
  onChange,
}: SettingsToggleProps) {
  const isPause = variant === 'pause'

  const trackClass = isPause
    ? checked
      ? 'bg-status-urgent-red'
      : 'bg-status-ready-mint'
    : checked
      ? 'bg-status-ready-mint'
      : 'bg-status-idle-gray'

  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      data-testid={`settings-toggle-${id}`}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 ${trackClass}`}
    >
      <span
        className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${
          checked ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
  )
}
