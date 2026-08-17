import { useEffect, useState } from 'react'
import { useOrderHistoryQuery } from '../hooks/useOrderHistoryQuery'
import type { OrderHistoryListItem, OrderStatusFilter } from '../types/orderHistory'
import { SearchIcon } from './icons'
import { OrderDetailDrawer } from './OrderDetailDrawer'
import { OrderFilterTabs } from './OrderFilterTabs'
import { OrderHistoryTable } from './OrderHistoryTable'

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 300

export function OrderHistoryView() {
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>('all')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [page, setPage] = useState(1)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearch(searchInput)
      setPage(1)
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timer)
  }, [searchInput])

  const { data, isLoading, isError, refetch } = useOrderHistoryQuery({
    searchTerm: debouncedSearch,
    status: statusFilter,
    startDate,
    endDate,
    page,
    pageSize: PAGE_SIZE,
  })

  const selectedSummary: OrderHistoryListItem | null =
    data?.orders.find((order) => order.id === selectedOrderId) ?? null

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

  const totalPages = Math.max(1, data.totalPages)
  const currentPage = Math.min(page, totalPages)
  const rangeStart = data.totalEntries === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, data.totalEntries)

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
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by Order ID or Customer..."
              data-testid="order-history-search"
              className="min-h-12 w-full rounded-xl border border-surface-border bg-surface-card py-3 pl-12 pr-4 text-sm text-white placeholder:text-text-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            />
          </label>

          <div className="flex gap-3">
            <input
              type="date"
              aria-label="Start date"
              value={startDate}
              onChange={(event) => {
                setStartDate(event.target.value)
                setPage(1)
              }}
              className="min-h-12 rounded-xl border border-surface-border bg-surface-card px-4 text-sm text-text-muted"
            />
            <input
              type="date"
              aria-label="End date"
              value={endDate}
              onChange={(event) => {
                setEndDate(event.target.value)
                setPage(1)
              }}
              className="min-h-12 rounded-xl border border-surface-border bg-surface-card px-4 text-sm text-text-muted"
            />
          </div>
        </div>

        <OrderFilterTabs
          activeFilter={statusFilter}
          totalEntries={data.totalEntries}
          onFilterChange={(filter) => {
            setStatusFilter(filter)
            setPage(1)
          }}
        />

        <OrderHistoryTable orders={data.orders} onViewDetails={setSelectedOrderId} />

        <div
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          data-testid="order-history-pagination"
        >
          <p className="text-sm text-text-muted">
            Showing {rangeStart} to {rangeEnd} of {data.totalEntries.toLocaleString()} entries
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

      {selectedOrderId && selectedSummary ? (
        <OrderDetailDrawer
          orderId={selectedOrderId}
          summary={selectedSummary}
          onClose={() => setSelectedOrderId(null)}
        />
      ) : null}
    </main>
  )
}
