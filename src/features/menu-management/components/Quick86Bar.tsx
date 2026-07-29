import type { Quick86Ingredient } from '../types/menu'
import { StockToggle } from './StockToggle'
import { SyncStatusBadge } from './SyncStatusBadge'

type Quick86BarProps = {
  ingredients: Quick86Ingredient[]
  lastSyncLabel: string
  onToggle: (ingredientId: string, inStock: boolean) => void
  disabled?: boolean
}

export function Quick86Bar({
  ingredients,
  lastSyncLabel,
  onToggle,
  disabled,
}: Quick86BarProps) {
  return (
    <section
      aria-label="Quick availability"
      data-testid="quick-86-bar"
      className="rounded-2xl border border-surface-border bg-surface-card p-4"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-white">
            Quick Availability (86 List)
          </h2>
          <p className="mt-1 font-mono text-xs text-text-muted">
            LAST SYNC: {lastSyncLabel}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {ingredients.map((ingredient) => (
            <div
              key={ingredient.id}
              data-testid={`quick-86-${ingredient.id}`}
              className="flex min-h-12 items-center gap-3 rounded-xl border border-surface-border bg-bg-app px-3 py-2"
            >
              <span className="text-sm font-medium text-white">{ingredient.name}</span>
              <StockToggle
                id={ingredient.id}
                label={ingredient.name}
                inStock={ingredient.inStock}
                disabled={disabled}
                onToggle={(inStock) => onToggle(ingredient.id, inStock)}
              />
              <SyncStatusBadge status={ingredient.syncStatus} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
