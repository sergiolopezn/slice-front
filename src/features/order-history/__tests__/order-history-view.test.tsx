import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AppRoutes } from '@/app/router'
import { resetOrderHistoryForTests } from '@/features/order-history/api/mockOrderHistoryApi'
import { OrderHistoryView } from '@/features/order-history'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

function renderOrderHistory() {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <OrderHistoryView />
    </QueryClientProvider>,
  )
}

function renderApp(initialRoute = '/order-history') {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRoutes />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

function mainContent() {
  return within(screen.getByTestId('main-content'))
}

beforeEach(() => {
  resetOrderHistoryForTests()
})

afterEach(() => {
  cleanup()
})

describe('OrderHistoryView', () => {
  it('filters orders by customer name in search', async () => {
    const user = userEvent.setup()
    renderOrderHistory()

    await waitFor(() => {
      expect(screen.getByTestId('order-history-table')).toBeInTheDocument()
    })

    expect(screen.getAllByText('Alex P.').length).toBeGreaterThan(0)
    expect(screen.getByText('Maria Lopez')).toBeInTheDocument()

    await user.type(screen.getByTestId('order-history-search'), 'Alex')

    await waitFor(() => {
      expect(screen.queryByText('Maria Lopez')).not.toBeInTheDocument()
    })

    expect(screen.getAllByText('Alex P.').length).toBeGreaterThan(0)
    expect(screen.getByTestId('order-history-pagination')).toHaveTextContent(
      /of 4 entries/i,
    )
  })

  it('filters orders by status tab', async () => {
    const user = userEvent.setup()
    renderOrderHistory()

    await waitFor(() => {
      expect(screen.getByTestId('order-filter-tabs')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('order-filter-cancelled'))

    await waitFor(() => {
      expect(screen.getByTestId('order-history-pagination')).toHaveTextContent(
        /of 3 entries/i,
      )
    })

    expect(screen.getByText('David Chen')).toBeInTheDocument()
    expect(screen.queryByText('Alex P.')).not.toBeInTheDocument()
  })

  it('opens drawer with timeline metadata from View Details', async () => {
    const user = userEvent.setup()
    renderOrderHistory()

    await waitFor(() => {
      expect(screen.getByTestId('view-details-ord-1040')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('view-details-ord-1040'))

    expect(screen.getByTestId('order-detail-drawer')).toBeInTheDocument()
    expect(screen.getByTestId('order-drawer-telegram-id')).toHaveTextContent('@tg_89221')
    expect(screen.getByTestId('order-drawer-timeline')).toHaveTextContent('Order Accepted')
    expect(screen.getByTestId('order-drawer-timeline')).toHaveTextContent('Order Completed')
    expect(screen.getByTestId('drawer-line-item-li-1')).toHaveTextContent('Extra Basil')
  })

  it('closes drawer via close button', async () => {
    const user = userEvent.setup()
    renderOrderHistory()

    await waitFor(() => {
      expect(screen.getByTestId('view-details-ord-1040')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('view-details-ord-1040'))
    expect(screen.getByTestId('order-detail-drawer')).toBeInTheDocument()

    await user.click(screen.getByTestId('order-drawer-close'))

    expect(screen.queryByTestId('order-detail-drawer')).not.toBeInTheDocument()
  })

  it('renders on the /order-history route', async () => {
    renderApp('/order-history')

    await waitFor(() => {
      expect(mainContent().getByTestId('order-history-table')).toBeInTheDocument()
    })

    expect(mainContent().getByRole('heading', { name: 'Order history' })).toBeInTheDocument()
  })
})
