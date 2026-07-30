import { useEffect, useMemo, useState } from 'react'
import { useOrderHistoryQuery } from '../hooks/useOrderHistoryQuery'
import {
  filterOrders,
  getStatusCounts,
  paginateOrders,
  type OrderStatusFilter,
} from '../types/orderHistory'
import { SearchIcon } from './icons'
import { OrderDetailDrawer } from './OrderDetailDrawer'
import { OrderFilterTabs } from './OrderFilterTabs'
import { OrderHistoryTable } from './OrderHistoryTable'

const PAGE_SIZE = 10

export function OrderHistoryView() {
  const { data, isLoading, isError, refetch } = useOrderHistoryQuery()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('all')
  const [page, setPage] = useState(1)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const filteredOrders = useMemo(() => {
    if (!data) return []
    return filterOrders(data.orders, searchQuery, statusFilter)
  }, [data, searchQuery, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const paginatedOrders = useMemo(
    () => paginateOrders(filteredOrders, currentPage, PAGE_SIZE),
    [filteredOrders, currentPage],
  )

  const selectedOrder = data?.orders.find((order) => order.id === selectedOrderId) ?? null

  useEffect(() => {
    if (!selectedOrderId) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedOrderId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedOrderId])

  if (isLoading) {
    return (
      <main aria-label="Order history page" className="min-h-screen bg-bg-app p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Order history</h1>
        <p className="mt-4 text-text-muted">Loading order history…</p>
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main aria-label="Order history page" className="min-h-screen bg-bg-app p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Order history</h1>
        <p className="mt-4 text-status-urgent-red">Unable to load order history.</p>
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

  const statusCounts = getStatusCounts(data.orders)
  const rangeStart = filteredOrders.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredOrders.length)

  return (
    <main aria-label="Order history page" className="min-h-screen bg-bg-app p-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">Order history</h1>

      <div className="mt-6 space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative block w-full max-w-xl">
            <span className="sr-only">Search by Order ID or Customer</span>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value)
                setPage(1)
              }}
              placeholder="Search by Order ID or Customer..."
              data-testid="order-history-search"
              className="min-h-12 w-full rounded-xl border border-surface-border bg-surface-card py-3 pl-12 pr-4 text-sm text-white placeholder:text-text-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            />
          </label>

          <div className="flex gap-3">
            <input
              type="date"
              aria-label="Start date"
              className="min-h-12 rounded-xl border border-surface-border bg-surface-card px-4 text-sm text-text-muted"
            />
            <input
              type="date"
              aria-label="End date"
              className="min-h-12 rounded-xl border border-surface-border bg-surface-card px-4 text-sm text-text-muted"
            />
          </div>
        </div>

        <OrderFilterTabs
          activeFilter={statusFilter}
          counts={statusCounts}
          displayTotalCount={data.displayTotalCount}
          onFilterChange={(filter) => {
            setStatusFilter(filter)
            setPage(1)
          }}
        />

        <OrderHistoryTable
          orders={paginatedOrders}
          onViewDetails={setSelectedOrderId}
        />

        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          data-testid="order-history-pagination"
        >
          <p className="text-sm text-text-muted">
            Showing {rangeStart} to {rangeEnd} of {filteredOrders.length.toLocaleString()} entries
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              className="min-h-12 rounded-xl border border-surface-border px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              className="min-h-12 rounded-xl border border-surface-border px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {selectedOrder ? (
        <OrderDetailDrawer order={selectedOrder} onClose={() => setSelectedOrderId(null)} />
      ) : null}
    </main>
  )
}
