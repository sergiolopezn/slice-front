import type { OrderStatusFilter } from '../types/orderHistory'

type OrderFilterTabsProps = {
  activeFilter: OrderStatusFilter
  totalEntries: number
  onFilterChange: (filter: OrderStatusFilter) => void
}

const tabs: { id: OrderStatusFilter; label: string }[] = [
  { id: 'all', label: 'All Orders' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
]

export function OrderFilterTabs({
  activeFilter,
  totalEntries,
  onFilterChange,
}: OrderFilterTabsProps) {
  return (
    <nav aria-label="Order status filters" data-testid="order-filter-tabs">
      <ul className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = activeFilter === tab.id

          return (
            <li key={tab.id}>
              <button
                type="button"
                role="tab"
                aria-selected={isActive}
                data-testid={`order-filter-${tab.id}`}
                onClick={() => onFilterChange(tab.id)}
                className={`min-h-12 rounded-xl px-4 py-3 text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-nav-active text-nav-active-text'
                    : 'text-text-muted hover:bg-status-idle-gray hover:text-white'
                }`}
              >
                {tab.label}
                {isActive ? ` (${totalEntries.toLocaleString()})` : ''}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
