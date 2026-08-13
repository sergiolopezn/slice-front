import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '@/app/router'
import { DashboardView } from '@/features/dashboard'
import {
  installDashboardFetchMock,
  resetDashboardForTests,
} from './dashboardFetchMock'

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
  resetDashboardForTests()
  installDashboardFetchMock()
})

afterEach(() => {
  vi.unstubAllGlobals()
  cleanup()
})

describe('DashboardView', () => {
  it('renders KPI summary row from API metrics', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('kpi-summary-row')).toBeInTheDocument()
    })

    expect(screen.getByText('$3,850.50')).toBeInTheDocument()
    expect(screen.getByText('114')).toBeInTheDocument()
    expect(screen.getByText('11.4 mins')).toBeInTheDocument()
    expect(screen.getByText('High Load')).toBeInTheDocument()
    expect(screen.getByText('+12.5% vs Yesterday')).toBeInTheDocument()
    expect(screen.getByText('88 Telegram, 26 Direct')).toBeInTheDocument()
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
    expect(screen.getByTestId('station-bar-bar').className).toContain('bg-status-ready-mint')
  })

  it('pauses the store when a reason is submitted', async () => {
    const user = userEvent.setup()
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('store-pause-panel')).toBeInTheDocument()
    })

    expect(screen.getByText('Store is paused')).toBeInTheDocument()

    await user.type(screen.getByTestId('store-pause-reason'), 'Staffing shortage')
    await user.click(screen.getByTestId('store-pause-submit'))

    await waitFor(() => {
      expect(screen.getByText('Store is accepting orders')).toBeInTheDocument()
    })
  })

  it('renders activity feed audit entries from API', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('activity-feed')).toBeInTheDocument()
    })

    expect(screen.getByText('Store paused: Kitchen Overload')).toBeInTheDocument()
  })

  it('rolls back optimistic pause update and shows backend message on 400', async () => {
    const user = userEvent.setup()
    installDashboardFetchMock({
      storeStatusHandler: () =>
        new Response(
          JSON.stringify({
            code: 'INVALID_REQUEST',
            message: "A 'reason' is required when changing the store status.",
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } },
        ),
    })

    renderDashboard()

    await waitFor(() => {
      expect(screen.getByTestId('store-pause-panel')).toBeInTheDocument()
    })

    await user.type(screen.getByTestId('store-pause-reason'), 'Ignored by server')
    await user.click(screen.getByTestId('store-pause-submit'))

    await waitFor(() => {
      expect(screen.getByRole('alert').textContent).toMatch(/required when changing the store status/i)
    })

    expect(screen.getByText('Store is paused')).toBeInTheDocument()
  })

  it('renders on the /dashboard route', async () => {
    renderApp('/dashboard')

    await waitFor(() => {
      expect(mainContent().getByTestId('kpi-summary-row')).toBeInTheDocument()
    })

    expect(mainContent().getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })
})
