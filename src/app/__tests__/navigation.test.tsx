import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it } from 'vitest'
import { AppRoutes } from '@/app/router'

function renderApp(initialRoute = '/') {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <AppRoutes />
    </MemoryRouter>,
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
      expect(mainContent().getByRole('heading', { name: 'Live orders' })).toBeInTheDocument()
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
