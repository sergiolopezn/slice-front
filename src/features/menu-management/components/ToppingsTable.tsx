import type { Topping } from '../types/menu'
import { formatMenuPrice } from '../types/menu'
import { StockToggle } from './StockToggle'
import { SyncStatusBadge } from './SyncStatusBadge'

type ToppingsTableProps = {
  toppings: Topping[]
  onToggle: (toppingId: string, inStock: boolean) => void
  disabled?: boolean
}

export function ToppingsTable({ toppings, onToggle, disabled }: ToppingsTableProps) {
  return (
    <section aria-label="Toppings management" data-testid="toppings-table">
      <div className="overflow-x-auto rounded-2xl border border-surface-border bg-surface-card">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-surface-border bg-bg-app">
            <tr>
              {['TOPPING NAME', 'CATEGORY', 'EXTRA PRICE', 'TELEGRAM SYNC', 'STOCK'].map(
                (header) => (
                  <th
                    key={header}
                    scope="col"
                    className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-text-muted"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {toppings.map((topping) => (
              <tr
                key={topping.id}
                data-testid={`topping-row-${topping.id}`}
                className="border-b border-surface-border last:border-b-0"
              >
                <td className="px-4 py-4 font-medium text-white">{topping.name}</td>
                <td className="px-4 py-4 text-text-muted">{topping.category}</td>
                <td className="px-4 py-4 font-mono text-status-prep-amber">
                  {formatMenuPrice(topping.extraPrice)}
                </td>
                <td className="px-4 py-4">
                  <SyncStatusBadge status={topping.syncStatus} />
                </td>
                <td className="px-4 py-4">
                  <StockToggle
                    id={topping.id}
                    label={`${topping.name} stock`}
                    inStock={topping.inStock}
                    disabled={disabled}
                    onToggle={(inStock) => onToggle(topping.id, inStock)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
