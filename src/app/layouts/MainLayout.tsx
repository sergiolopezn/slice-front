import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import {
  Sidebar,
  SidebarBackdrop,
  SidebarToggle,
} from '@/shared/components/navigation'

const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)'

export function MainLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const closeMobile = () => setIsMobileOpen(false)
  const toggleMobile = () => setIsMobileOpen((open) => !open)

  useEffect(() => {
    if (!isMobileOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeMobile()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)

    function handleChange(event: MediaQueryListEvent) {
      if (event.matches) {
        closeMobile()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="flex min-h-screen bg-bg-app">
      <SidebarBackdrop isOpen={isMobileOpen} onClose={closeMobile} />
      <Sidebar isOpen={isMobileOpen} onNavigate={closeMobile} />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-surface-border p-2 lg:hidden">
          <SidebarToggle isOpen={isMobileOpen} onToggle={toggleMobile} />
        </header>

        <div className="min-w-0 flex-1" data-testid="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
