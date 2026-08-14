import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '@/app/router'
import { MenuManagementView } from '@/features/menu-management'
import {
  installMenuFetchMock,
  resetMenuForTests,
} from '@/features/menu-management/__tests__/menuFetchMock'

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  })
}

function renderMenuView() {
  const queryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>
      <MenuManagementView />
    </QueryClientProvider>,
  )
}

function renderApp(initialRoute = '/menu') {
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
  resetMenuForTests()
  installMenuFetchMock()
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('MenuManagementView', () => {
  it('renders category tabs and switches content panels', async () => {
    const user = userEvent.setup()
    renderMenuView()

    await waitFor(() => {
      expect(screen.getByTestId('category-tabs')).toBeInTheDocument()
    })

    expect(screen.getByTestId('quick-86-bar')).toBeInTheDocument()
    expect(screen.getByTestId('menu-item-grid')).toBeInTheDocument()
    expect(screen.getByText('Margherita')).toBeInTheDocument()

    await user.click(screen.getByTestId('category-tab-toppings'))

    expect(screen.getByTestId('toppings-table')).toBeInTheDocument()
    expect(screen.queryByTestId('menu-item-grid')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('category-tab-sides-drinks'))

    expect(screen.getByTestId('quick-86-bar')).toBeInTheDocument()
    expect(screen.getByText('Garlic Knots')).toBeInTheDocument()
    expect(screen.queryByText('Margherita')).not.toBeInTheDocument()
  })

  it('updates quick 86 toggle color and sync badge', async () => {
    const user = userEvent.setup()
    renderMenuView()

    await waitFor(() => {
      expect(screen.getByTestId('quick-86-86-pepperoni')).toBeInTheDocument()
    })

    const pepperoniRow = screen.getByTestId('quick-86-86-pepperoni')
    const pepperoniToggle = within(pepperoniRow).getByRole('switch', { name: 'Pepperoni' })

    expect(pepperoniToggle).toHaveAttribute('aria-checked', 'true')
    expect(pepperoniToggle.className).toContain('bg-status-ready-mint')
    expect(within(pepperoniRow).getByTestId('sync-badge-synced')).toBeInTheDocument()

    await user.click(pepperoniToggle)

    await waitFor(() => {
      expect(pepperoniToggle).toHaveAttribute('aria-checked', 'false')
    })

    expect(pepperoniToggle.className).toContain('bg-status-urgent-red')
    expect(within(pepperoniRow).getByTestId('sync-badge-paused')).toBeInTheDocument()
  })

  it('shows dashed border and Restock Item for out-of-stock cards', async () => {
    renderMenuView()

    await waitFor(() => {
      expect(screen.getByTestId('menu-item-item-truffle-funghi')).toBeInTheDocument()
    })

    const outOfStockCard = screen.getByTestId('menu-item-item-truffle-funghi')

    expect(outOfStockCard.className).toContain('border-dashed')
    expect(screen.getByTestId('out-of-stock-badge-item-truffle-funghi')).toHaveTextContent(
      'OUT OF STOCK',
    )
    expect(
      screen.getByRole('button', { name: /restock item/i }),
    ).toBeInTheDocument()
  })

  it('restocks an out-of-stock item to available state', async () => {
    const user = userEvent.setup()
    renderMenuView()

    await waitFor(() => {
      expect(screen.getByTestId('restock-item-item-truffle-funghi')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('restock-item-item-truffle-funghi'))

    await waitFor(() => {
      const card = screen.getByTestId('menu-item-item-truffle-funghi')
      expect(card.className).not.toContain('border-dashed')
    })

    expect(screen.getByTestId('edit-item-item-truffle-funghi')).toBeInTheDocument()
    expect(
      screen.queryByTestId('out-of-stock-badge-item-truffle-funghi'),
    ).not.toBeInTheDocument()
  })

  it('renders toppings table with sync status and stock toggle', async () => {
    const user = userEvent.setup()
    renderMenuView()

    await waitFor(() => {
      expect(screen.getByTestId('category-tabs')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('category-tab-toppings'))

    await waitFor(() => {
      expect(screen.getByTestId('toppings-table')).toBeInTheDocument()
    })

    const basilRow = screen.getByTestId('topping-row-top-basil')
    expect(within(basilRow).getByTestId('sync-badge-paused')).toBeInTheDocument()
    expect(within(basilRow).getByRole('switch', { name: /fresh basil stock/i })).toHaveAttribute(
      'aria-checked',
      'false',
    )

    const pepperoniRow = screen.getByTestId('topping-row-top-pepperoni')
    expect(within(pepperoniRow).getByTestId('sync-badge-synced')).toBeInTheDocument()
  })

  it('rolls back item availability toggle when the API returns 404', async () => {
    installMenuFetchMock({
      itemAvailabilityHandler: (itemId) =>
        new Response(
          JSON.stringify({
            code: 'MENU_ITEM_NOT_FOUND',
            message: `Menu item '${itemId}' was not found.`,
          }),
          { status: 404, headers: { 'Content-Type': 'application/json' } },
        ),
    })

    const user = userEvent.setup()
    renderMenuView()

    await waitFor(() => {
      expect(screen.getByTestId('menu-item-item-margherita')).toBeInTheDocument()
    })

    const margheritaToggle = within(screen.getByTestId('menu-item-item-margherita')).getByRole(
      'switch',
      { name: 'Margherita availability' },
    )

    await user.click(margheritaToggle)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/was not found/i)
    })

    expect(margheritaToggle).toHaveAttribute('aria-checked', 'true')
  })

  it('rolls back topping stock toggle when the API returns 404', async () => {
    installMenuFetchMock({
      toppingStockHandler: (toppingId) =>
        new Response(
          JSON.stringify({
            code: 'TOPPING_NOT_FOUND',
            message: `Topping '${toppingId}' was not found.`,
          }),
          { status: 404, headers: { 'Content-Type': 'application/json' } },
        ),
    })

    const user = userEvent.setup()
    renderMenuView()

    await waitFor(() => {
      expect(screen.getByTestId('category-tabs')).toBeInTheDocument()
    })

    await user.click(screen.getByTestId('category-tab-toppings'))

    await waitFor(() => {
      expect(screen.getByTestId('topping-row-top-pepperoni')).toBeInTheDocument()
    })

    const pepperoniToggle = within(screen.getByTestId('topping-row-top-pepperoni')).getByRole(
      'switch',
      { name: /extra pepperoni stock/i },
    )

    await user.click(pepperoniToggle)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/was not found/i)
    })

    expect(pepperoniToggle).toHaveAttribute('aria-checked', 'true')
  })

  it('renders on the /menu route', async () => {
    renderApp('/menu')

    await waitFor(() => {
      expect(mainContent().getByTestId('category-tabs')).toBeInTheDocument()
    })

    expect(mainContent().getByRole('heading', { name: 'Menu management' })).toBeInTheDocument()
  })
})
