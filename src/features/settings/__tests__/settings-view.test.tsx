import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AppRoutes } from '@/app/router'
import { resetSettingsForTests } from '@/features/settings/api/mockSettingsApi'
import { SettingsView } from '@/features/settings'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

function renderSettings() {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <SettingsView />
    </QueryClientProvider>,
  )
}

function renderApp(initialRoute = '/settings') {
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
  resetSettingsForTests()
})

afterEach(() => {
  cleanup()
})

describe('SettingsView', () => {
  it('updates store paused state when master pause is toggled', async () => {
    const user = userEvent.setup()
    renderSettings()

    await waitFor(() => {
      expect(screen.getByTestId('store-operations-card')).toBeInTheDocument()
    })

    const pauseToggle = screen.getByRole('switch', { name: /pause all telegram orders/i })
    expect(pauseToggle).toHaveAttribute('aria-checked', 'false')

    await user.click(pauseToggle)

    await waitFor(() => {
      expect(pauseToggle).toHaveAttribute('aria-checked', 'true')
    })

    expect(screen.getByTestId('pause-duration-30m')).toBeInTheDocument()
  })

  it('disables schedule time inputs when a day is marked closed', async () => {
    const user = userEvent.setup()
    renderSettings()

    await waitFor(() => {
      expect(screen.getByTestId('schedule-row-sunday')).toBeInTheDocument()
    })

    const sundayOpen = screen.getByTestId('schedule-open-sunday')
    expect(sundayOpen).toBeDisabled()

    const mondayRow = screen.getByTestId('schedule-row-monday')
    const mondayOpen = screen.getByTestId('schedule-open-monday')
    expect(mondayOpen).not.toBeDisabled()

    await user.click(within(mondayRow).getByRole('switch', { name: /monday closed/i }))

    await waitFor(() => {
      expect(screen.getByTestId('schedule-open-monday')).toBeDisabled()
    })
  })

  it('updates delivery fulfillment toggles on click', async () => {
    const user = userEvent.setup()
    renderSettings()

    await waitFor(() => {
      expect(screen.getByTestId('delivery-fulfillment-card')).toBeInTheDocument()
    })

    const deliveryToggle = screen.getByRole('switch', { name: /allow delivery/i })
    expect(deliveryToggle).toHaveAttribute('aria-checked', 'true')

    await user.click(deliveryToggle)

    await waitFor(() => {
      expect(deliveryToggle).toHaveAttribute('aria-checked', 'false')
    })
  })

  it('shows success feedback when send test notification is clicked', async () => {
    const user = userEvent.setup()
    renderSettings()

    await waitFor(() => {
      expect(screen.getByTestId('send-test-notification')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('send-test-notification'))

    await waitFor(() => {
      expect(screen.getByTestId('test-notification-success')).toHaveTextContent(
        'Test notification sent successfully.',
      )
    })
  })

  it('renders on the /settings route', async () => {
    renderApp('/settings')

    await waitFor(() => {
      expect(mainContent().getByTestId('store-operations-card')).toBeInTheDocument()
    })

    expect(mainContent().getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
  })
})
