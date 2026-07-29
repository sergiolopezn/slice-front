import { countByPhase } from '../api/mockOrdersApi'
import { useAdvanceOrderStatus, useOrdersQuery } from '../hooks/useOrdersQuery'
import { KdsHeader } from './KdsHeader'
import { OrderGrid } from './OrderGrid'

export function LiveOrdersDashboard() {
  const { data: orders = [], isLoading, isError, refetch } = useOrdersQuery()
  const advanceStatus = useAdvanceOrderStatus()

  const urgentCount = countByPhase(orders, 'URGENT')
  const inOvenCount = countByPhase(orders, 'IN_OVEN')

  return (
    <main aria-label="Live orders page" className="min-h-screen bg-bg-app p-6">
      <h1 className="sr-only">Live orders</h1>

      <KdsHeader urgentCount={urgentCount} inOvenCount={inOvenCount} />

      {isLoading ? (
        <p className="text-text-muted">Loading orders…</p>
      ) : isError ? (
        <div>
          <p className="text-status-urgent-red">Unable to load orders.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 min-h-12 rounded-xl bg-status-prep-amber px-4 py-2 text-sm font-bold text-black"
          >
            Retry
          </button>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-text-muted">No active orders.</p>
      ) : (
        <OrderGrid
          orders={orders}
          onAdvance={(orderId) => advanceStatus.mutate(orderId)}
          advancingOrderId={
            advanceStatus.isPending ? (advanceStatus.variables ?? null) : null
          }
        />
      )}
    </main>
  )
}
