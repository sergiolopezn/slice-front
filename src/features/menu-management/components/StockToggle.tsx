type StockToggleProps = {
  id: string
  label: string
  inStock: boolean
  disabled?: boolean
  onToggle: (inStock: boolean) => void
}

export function StockToggle({
  id,
  label,
  inStock,
  disabled,
  onToggle,
}: StockToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={inStock}
      aria-label={label}
      disabled={disabled}
      data-testid={`stock-toggle-${id}`}
      onClick={() => onToggle(!inStock)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 ${
        inStock ? 'bg-status-ready-mint' : 'bg-status-urgent-red'
      }`}
    >
      <span
        className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${
          inStock ? 'left-5' : 'left-0.5'
        }`}
      />
    </button>
  )
}
