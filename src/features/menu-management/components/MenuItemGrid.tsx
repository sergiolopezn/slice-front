import type { MenuItem } from '../types/menu'
import { MenuItemCard } from './MenuItemCard'

type MenuItemGridProps = {
  items: MenuItem[]
  onAvailabilityChange: (itemId: string, available: boolean) => void
  onRestock: (itemId: string) => void
  disabled?: boolean
}

export function MenuItemGrid({
  items,
  onAvailabilityChange,
  onRestock,
  disabled,
}: MenuItemGridProps) {
  if (items.length === 0) {
    return (
      <p className="text-text-muted" data-testid="menu-item-grid-empty">
        No items in this category.
      </p>
    )
  }

  return (
    <section aria-label="Menu items" data-testid="menu-item-grid">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            onAvailabilityChange={onAvailabilityChange}
            onRestock={onRestock}
            disabled={disabled}
          />
        ))}
      </div>
    </section>
  )
}
