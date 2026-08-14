import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { AppRoutes } from '@/app/router'
import {
  resetSettingsForTests,
  setAdminUnlinkedForTests,
} from '@/features/settings/api/mockSettingsApi'
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

function telegramCard() {
  return within(screen.getByTestId('telegram-integration-card'))
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

  it('renders Telegram integration section with linked admin handle', async () => {
    renderSettings()

    await waitFor(() => {
      expect(screen.getByTestId('telegram-integration-card')).toBeInTheDocument()
    })

    expect(
      screen.getByRole('heading', { name: 'Telegram Integration & Admin Alerts' }),
    ).toBeInTheDocument()

    expect(telegramCard().getByTestId('admin-telegram-handle-label')).toHaveTextContent(
      'Admin Telegram Handle',
    )

    const adminInput = telegramCard().getByTestId('admin-telegram-handle-input')
    expect(adminInput).not.toBeDisabled()
    expect(adminInput).toHaveValue('')
    expect(adminInput).toHaveAttribute('placeholder', 'Manager official Telegram username')
    expect(adminInput.value).not.toContain('@MarioPizzaOwner')

    const linkedStatus = telegramCard().getByTestId('admin-telegram-linked-status')
    expect(linkedStatus).toHaveTextContent('Linked Chat ID: 987654321')
    expect(linkedStatus).toHaveTextContent('(@MarioPizzaOwner)')

    const sendTestButton = telegramCard().getByTestId('send-test-notification')
    expect(
      linkedStatus.compareDocumentPosition(sendTestButton) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()

    expect(telegramCard().getByTestId('admin-telegram-handle-helper')).toHaveTextContent(
      'Only messages from this Telegram handle can trigger admin commands.',
    )
  })

  it('renders editable admin handle when unlinked', async () => {
    setAdminUnlinkedForTests()
    renderSettings()

    await waitFor(() => {
      expect(screen.getByTestId('admin-telegram-handle-input')).toBeInTheDocument()
    })

    const adminInput = telegramCard().getByTestId('admin-telegram-handle-input')
    expect(adminInput).not.toBeDisabled()
    expect(adminInput).toHaveValue('')
    expect(adminInput).toHaveAttribute('placeholder', 'Manager official Telegram username')
    expect(telegramCard().queryByTestId('admin-telegram-linked-status')).not.toBeInTheDocument()
    expect(telegramCard().getByTestId('admin-telegram-handle-helper')).toHaveTextContent(
      'Only messages from this Telegram handle can trigger admin commands.',
    )
  })

  it('keeps webhook metrics, connection badge, and test notification controls', async () => {
    const user = userEvent.setup()
    renderSettings()

    await waitFor(() => {
      expect(screen.getByTestId('telegram-integration-card')).toBeInTheDocument()
    })

    expect(telegramCard().getByTestId('bot-connection-badge')).toHaveTextContent('Connected')
    expect(telegramCard().getByText(/webhooks\/telegram/i)).toBeInTheDocument()
    expect(telegramCard().getByTestId('webhook-latency')).toHaveTextContent('42ms')

    const adminInput = telegramCard().getByTestId('admin-telegram-handle-input')
    const sendTestButton = telegramCard().getByTestId('send-test-notification')
    expect(
      adminInput.compareDocumentPosition(sendTestButton) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()

    await user.click(sendTestButton)

    await waitFor(() => {
      expect(telegramCard().getByTestId('test-notification-success')).toHaveTextContent(
        'Test notification sent successfully.',
      )
    })
  })

  it('does not render notification trigger toggles in the Telegram card', async () => {
    renderSettings()

    await waitFor(() => {
      expect(screen.getByTestId('telegram-integration-card')).toBeInTheDocument()
    })

    expect(screen.queryByText('Notification Triggers')).not.toBeInTheDocument()
    expect(screen.queryByRole('switch', { name: /order accepted/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('switch', { name: /in oven/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('switch', { name: /^ready$/i })).not.toBeInTheDocument()
  })

  it('renders on the /settings route', async () => {
    renderApp('/settings')

    await waitFor(() => {
      expect(mainContent().getByTestId('store-operations-card')).toBeInTheDocument()
    })

    expect(mainContent().getByRole('heading', { name: 'Settings' })).toBeInTheDocument()
  })
})
