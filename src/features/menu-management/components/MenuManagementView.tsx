import { useState } from 'react'
import { getMenuMutationErrorMessage } from '../api/getMenuMutationErrorMessage'
import { useMenuItemAvailability } from '../hooks/useMenuItemAvailability'
import { useMenuQuery } from '../hooks/useMenuQuery'
import { useQuick86Toggle } from '../hooks/useQuick86Toggle'
import { useToppingStockToggle } from '../hooks/useToppingStockToggle'
import type { MenuCategoryTab, MenuItem } from '../types/menu'
import { CategoryTabs } from './CategoryTabs'
import { MenuItemGrid } from './MenuItemGrid'
import { Quick86Bar } from './Quick86Bar'
import { ToppingsTable } from './ToppingsTable'

function filterItemsByTab(items: MenuItem[], activeTab: MenuCategoryTab): MenuItem[] {
  if (activeTab === 'toppings') return []

  return items.filter((item) => item.category === activeTab)
}

export function MenuManagementView() {
  const [activeTab, setActiveTab] = useState<MenuCategoryTab>('pizzas')
  const { data, isLoading, isError, refetch } = useMenuQuery()
  const quick86Toggle = useQuick86Toggle()
  const itemAvailability = useMenuItemAvailability()
  const toppingStockToggle = useToppingStockToggle()

  const isMutating =
    quick86Toggle.isPending || itemAvailability.isPending || toppingStockToggle.isPending

  const mutationError =
    quick86Toggle.error ?? itemAvailability.error ?? toppingStockToggle.error

  if (isLoading) {
    return (
      <main aria-label="Menu management page" className="min-h-screen bg-bg-app p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Menu management</h1>
        <p className="mt-4 text-text-muted">Loading menu…</p>
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main aria-label="Menu management page" className="min-h-screen bg-bg-app p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Menu management</h1>
        <p className="mt-4 text-status-urgent-red">Unable to load menu.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 min-h-12 rounded-xl bg-status-prep-amber px-4 py-2 text-sm font-bold text-black"
        >
          Retry
        </button>
      </main>
    )
  }

  const visibleItems = filterItemsByTab(data.items, activeTab)

  return (
    <main aria-label="Menu management page" className="min-h-screen bg-bg-app p-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">Menu management</h1>

      {mutationError ? (
        <p role="alert" className="mt-4 text-sm text-status-urgent-red">
          {getMenuMutationErrorMessage(mutationError)}
        </p>
      ) : null}

      <div className="mt-6 space-y-6">
        <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {activeTab === 'toppings' ? (
          <ToppingsTable
            toppings={data.toppings}
            disabled={isMutating}
            onToggle={(toppingId, inStock) =>
              toppingStockToggle.mutate({ toppingId, inStock })
            }
          />
        ) : (
          <>
            <Quick86Bar
              ingredients={data.quick86}
              lastSyncLabel={data.lastSyncLabel}
              disabled={isMutating}
              onToggle={(ingredientId, inStock) =>
                quick86Toggle.mutate({ ingredientId, inStock })
              }
            />

            <MenuItemGrid
              items={visibleItems}
              disabled={isMutating}
              onAvailabilityChange={(itemId, available) =>
                itemAvailability.mutate({ itemId, available })
              }
              onRestock={(itemId) =>
                itemAvailability.mutate({ itemId, available: true })
              }
            />
          </>
        )}
      </div>
    </main>
  )
}
