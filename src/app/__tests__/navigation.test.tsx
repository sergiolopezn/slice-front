import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '@/app/router'

function renderApp(initialRoute = '/') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchInterval: false } },
  })

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

afterEach(() => {
  cleanup()
})

describe('App navigation shell', () => {
  it('renders all five navigation items in the sidebar', async () => {
    renderApp('/')

    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument()
    })

    expect(screen.getByRole('link', { name: 'Live orders' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Menu management' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Order history' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Settings' })).toBeInTheDocument()
  })

  it('navigates to live orders and applies active styling', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await waitFor(() => {
      expect(mainContent().getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    })

    await user.click(screen.getByRole('link', { name: 'Live orders' }))

    await waitFor(() => {
      expect(mainContent().getByTestId('kds-header')).toBeInTheDocument()
    })

    const liveOrdersLink = screen.getByRole('link', { name: 'Live orders' })
    expect(liveOrdersLink).toHaveAttribute('aria-current', 'page')
    expect(liveOrdersLink.className).toContain('bg-nav-active')
  })

  it('shows dashboard at root path', async () => {
    renderApp('/')

    await waitFor(() => {
      expect(mainContent().getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
    })

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })
})

describe('Responsive sidebar', () => {
  it('opens the sidebar when the hamburger is clicked', async () => {
    const user = userEvent.setup()
    renderApp('/')

    const sidebar = screen.getByTestId('app-sidebar')
    expect(sidebar).toHaveAttribute('data-mobile-open', 'false')

    await user.click(screen.getByTestId('sidebar-toggle'))

    expect(sidebar).toHaveAttribute('data-mobile-open', 'true')
    expect(screen.getByTestId('sidebar-toggle')).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the sidebar when the backdrop is clicked', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByTestId('sidebar-toggle'))
    expect(screen.getByTestId('app-sidebar')).toHaveAttribute('data-mobile-open', 'true')

    await user.click(screen.getByTestId('sidebar-backdrop'))

    expect(screen.getByTestId('app-sidebar')).toHaveAttribute('data-mobile-open', 'false')
  })

  it('closes the sidebar and navigates when a nav link is clicked', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByTestId('sidebar-toggle'))
    await user.click(screen.getByRole('link', { name: 'Live orders' }))

    await waitFor(() => {
      expect(mainContent().getByTestId('kds-header')).toBeInTheDocument()
    })

    expect(screen.getByTestId('app-sidebar')).toHaveAttribute('data-mobile-open', 'false')
  })

  it('keeps desktop sidebar layout classes without requiring toggle interaction', async () => {
    renderApp('/')

    const sidebar = screen.getByTestId('app-sidebar')
    expect(sidebar.className).toContain('lg:static')
    expect(sidebar.className).toContain('lg:translate-x-0')

    const mobileHeader = screen.getByTestId('sidebar-toggle').closest('header')
    expect(mobileHeader?.className).toContain('lg:hidden')
  })

  it('closes the sidebar when Escape is pressed', async () => {
    const user = userEvent.setup()
    renderApp('/')

    await user.click(screen.getByTestId('sidebar-toggle'))
    expect(screen.getByTestId('app-sidebar')).toHaveAttribute('data-mobile-open', 'true')

    await user.keyboard('{Escape}')

    expect(screen.getByTestId('app-sidebar')).toHaveAttribute('data-mobile-open', 'false')
  })

  it('hides mobile drawer from accessibility tree when closed', async () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockImplementation((query: string) => ({
        matches: !query.includes('min-width: 1024px'),
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      })),
    )

    renderApp('/')

    expect(screen.getByTestId('app-sidebar')).toHaveAttribute('aria-hidden', 'true')

    vi.unstubAllGlobals()
  })
})
