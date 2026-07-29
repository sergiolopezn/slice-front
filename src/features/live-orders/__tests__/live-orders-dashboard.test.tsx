import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AppRoutes } from '@/app/router'
import { LiveOrdersDashboard } from '@/features/live-orders'
import { resetOrdersForTests } from '@/features/live-orders/api/mockOrdersApi'
import { useItemCompletion } from '@/features/live-orders/hooks/useItemCompletion'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchInterval: false },
      mutations: { retry: false },
    },
  })
}

function renderDashboard() {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LiveOrdersDashboard />
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

function renderApp(initialRoute = '/live-orders') {
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
  resetOrdersForTests()
  useItemCompletion.setState({ completed: {} })
})

afterEach(() => {
  cleanup()
})

describe('LiveOrdersDashboard', () => {
  it('renders station header with metric pills', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByText(/1 urgent/i)).toBeInTheDocument()
    })

    expect(screen.getByTestId('kds-header')).toBeInTheDocument()
    expect(screen.getByText(/station: kitchen-a/i)).toBeInTheDocument()
    expect(screen.getByText(/2 in oven/i)).toBeInTheDocument()
  })

  it('renders ticket cards with status-colored headers', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('ticket-ord-402')).toBeInTheDocument()
    })

    const urgentBanner = screen.getByText('#402').closest('div')
    expect(urgentBanner?.className).toContain('bg-status-urgent-red')

    const inOvenBanner = screen.getByText('#398').closest('div')
    expect(inOvenBanner?.className).toContain('bg-status-prep-amber')

    const readyBanner = screen.getByText('#390').closest('div')
    expect(readyBanner?.className).toContain('bg-status-ready-mint')
  })

  it('applies strikethrough when an item is checked', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByText('12x Buffalo Wings')).toBeInTheDocument()
    })

    const label = screen.getByText('12x Buffalo Wings')
    expect(label.className).not.toContain('line-through')

    await user.click(screen.getByRole('checkbox', { name: /12x buffalo wings/i }))

    expect(screen.getByText('12x Buffalo Wings').className).toContain('line-through')
  })

  it('shows phase-specific action buttons', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /bump order/i })).toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: /bump order/i })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /check temp/i }).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByRole('button', { name: /complete/i })).toBeInTheDocument()
  })

  it('advances urgent order to in-oven without removing the ticket', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('ticket-ord-402')).toBeInTheDocument()
    })

    const urgentCard = screen.getByTestId('ticket-ord-402')
    await user.click(within(urgentCard).getByRole('button', { name: /bump order/i }))

    await waitFor(() => {
      expect(within(urgentCard).getByRole('button', { name: /check temp/i })).toBeInTheDocument()
    })
  })

  it('advances in-oven order to ready without removing the ticket', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('ticket-ord-398')).toBeInTheDocument()
    })

    const inOvenCard = screen.getByTestId('ticket-ord-398')
    await user.click(within(inOvenCard).getByRole('button', { name: /check temp/i }))

    await waitFor(() => {
      expect(within(inOvenCard).getByRole('button', { name: /complete/i })).toBeInTheDocument()
    })
  })

  it('removes ready order when complete is clicked', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('ticket-ord-390')).toBeInTheDocument()
    })

    const readyCard = screen.getByTestId('ticket-ord-390')
    await user.click(within(readyCard).getByRole('button', { name: /complete/i }))

    await waitFor(() => {
      expect(screen.queryByTestId('ticket-ord-390')).not.toBeInTheDocument()
    })
  })

  it('renders on the /live-orders route', async () => {
    renderApp('/live-orders')

    await waitFor(() => {
      expect(mainContent().getByTestId('kds-header')).toBeInTheDocument()
    })

    expect(mainContent().getByRole('heading', { name: 'Live orders' })).toBeInTheDocument()
  })
})
