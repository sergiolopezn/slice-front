import { getAdvanceErrorMessage, useAdvanceOrderStatus, useOrdersQuery } from '../hooks/useOrdersQuery'
import { countByStatus, nextOrderStatus } from '../types/order'
import { KdsHeader } from './KdsHeader'
import { OrderGrid } from './OrderGrid'

export function LiveOrdersDashboard() {
  const { data: orders = [], isLoading, isError, refetch } = useOrdersQuery()
  const advanceStatus = useAdvanceOrderStatus()

  const newCount = countByStatus(orders, 'New')
  const inOvenCount = countByStatus(orders, 'InOven')

  return (
    <main aria-label="Live orders page" className="min-h-screen bg-bg-app p-6">
      <h1 className="sr-only">Live orders</h1>

      <KdsHeader newCount={newCount} inOvenCount={inOvenCount} />

      {advanceStatus.isError ? (
        <p role="alert" className="mb-4 text-sm text-status-urgent-red">
          {getAdvanceErrorMessage(advanceStatus.error)}
        </p>
      ) : null}

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
          onAdvance={(orderId) => {
            const order = orders.find((entry) => entry.id === orderId)
            const nextStatus = order ? nextOrderStatus(order.status) : null
            if (nextStatus) {
              advanceStatus.mutate({ orderId, nextStatus })
            }
          }}
          advancingOrderId={
            advanceStatus.isPending ? (advanceStatus.variables?.orderId ?? null) : null
          }
        />
      )}
    </main>
  )
}
