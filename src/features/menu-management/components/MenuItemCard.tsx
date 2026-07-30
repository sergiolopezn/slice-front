import { Badge, Button } from '@/shared/components/ui'
import type { MenuItem } from '../types/menu'
import { formatMenuPrice } from '../types/menu'
import { EditIcon } from './icons'
import { StockToggle } from './StockToggle'

type MenuItemCardProps = {
  item: MenuItem
  onAvailabilityChange: (itemId: string, available: boolean) => void
  onRestock: (itemId: string) => void
  disabled?: boolean
}

export function MenuItemCard({
  item,
  onAvailabilityChange,
  onRestock,
  disabled,
}: MenuItemCardProps) {
  const isAvailable = item.available

  return (
    <article
      data-testid={`menu-item-${item.id}`}
      className={`relative flex flex-col overflow-hidden rounded-2xl border shadow-lg ${
        isAvailable
          ? 'border-surface-border bg-surface-card'
          : 'border-dashed border-status-urgent-red/50 bg-surface-card opacity-60'
      }`}
    >
      {!isAvailable ? (
        <div className="absolute inset-0 z-10 flex items-start justify-center pt-16">
          <Badge variant="rush" data-testid={`out-of-stock-badge-${item.id}`}>
            OUT OF STOCK
          </Badge>
        </div>
      ) : null}

      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-36 w-full object-cover"
      />

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <Badge variant="cod">{item.categoryPill}</Badge>
          {!isAvailable ? (
            <Badge variant="rush" className="normal-case tracking-normal">
              Disabled
            </Badge>
          ) : (
            <StockToggle
              id={`item-${item.id}`}
              label={`${item.name} availability`}
              inStock={isAvailable}
              disabled={disabled}
              onToggle={(inStock) => onAvailabilityChange(item.id, inStock)}
            />
          )}
        </div>

        <div>
          <h3 className="text-base font-bold text-white">{item.name}</h3>
          <p className="mt-1 font-mono text-xl font-bold text-status-prep-amber">
            {formatMenuPrice(item.price)}
          </p>
        </div>

        {isAvailable ? (
          <button
            type="button"
            data-testid={`edit-item-${item.id}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-surface-border px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-status-idle-gray"
          >
            <EditIcon />
            Edit Item
          </button>
        ) : (
          <Button
            variant="complete"
            data-testid={`restock-item-${item.id}`}
            disabled={disabled}
            onClick={() => onRestock(item.id)}
          >
            Restock Item
          </Button>
        )}
      </div>
    </article>
  )
}
