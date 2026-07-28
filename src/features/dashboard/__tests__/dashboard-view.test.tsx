import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AppRoutes } from '@/app/router'
import { resetStoreControlsForTests } from '@/features/dashboard/api/mockDashboardApi'
import { DashboardView } from '@/features/dashboard'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

function renderDashboard() {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <DashboardView />
    </QueryClientProvider>,
  )
}

function renderApp(initialRoute = '/dashboard') {
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
  resetStoreControlsForTests()
})

afterEach(() => {
  cleanup()
})

describe('DashboardView', () => {
  it('renders KPI summary row with four seed metrics', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('kpi-summary-row')).toBeInTheDocument()
    })

    expect(screen.getByText('$3,850.50')).toBeInTheDocument()
    expect(screen.getByText('114')).toBeInTheDocument()
    expect(screen.getByText('11.4 mins')).toBeInTheDocument()
    expect(screen.getByText('High Load')).toBeInTheDocument()
    expect(screen.getByText('+12% vs Yesterday')).toBeInTheDocument()
  })

  it('renders station capacity bars with correct color thresholds', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('station-kitchen-a')).toBeInTheDocument()
    })

    expect(screen.getByTestId('station-bar-kitchen-a').className).toContain(
      'bg-status-urgent-red',
    )
    expect(screen.getByTestId('station-bar-kitchen-b').className).toContain(
      'bg-status-prep-amber',
    )
    expect(screen.getByTestId('station-bar-beverage').className).toContain(
      'bg-status-ready-mint',
    )
  })

  it('updates store control toggle state on click', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('store-control-telegram')).toBeInTheDocument()
    })

    const telegramSwitch = screen.getByRole('switch', { name: /pause telegram orders/i })
    expect(telegramSwitch).toHaveAttribute('aria-checked', 'false')

    await user.click(telegramSwitch)

    await waitFor(() => {
      expect(telegramSwitch).toHaveAttribute('aria-checked', 'true')
    })
  })

  it('renders activity feed timeline entries', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('activity-feed')).toBeInTheDocument()
    })

    expect(screen.getByText('Order #402 bumped from Kitchen-A')).toBeInTheDocument()
    expect(screen.getByText('Kitchen-A capacity reached 80%')).toBeInTheDocument()
    expect(screen.getByText('Telegram ordering channel paused')).toBeInTheDocument()
    expect(screen.getByText('Refund issued for Order #388')).toBeInTheDocument()
  })

  it('renders on the /dashboard route', async () => {
    renderApp('/dashboard')

    await waitFor(() => {
      expect(mainContent().getByTestId('kpi-summary-row')).toBeInTheDocument()
    })

    expect(mainContent().getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })
})
