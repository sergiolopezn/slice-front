import { NavItem } from './NavItem'
import { NAV_ITEMS } from './navItems'
import { SIDEBAR_ID } from './SidebarToggle'
import { UserProfile } from './UserProfile'

type SidebarProps = {
  isOpen: boolean
  onNavigate?: () => void
}

export function Sidebar({ isOpen, onNavigate }: SidebarProps) {
  return (
    <aside
      id={SIDEBAR_ID}
      data-testid="app-sidebar"
      data-mobile-open={isOpen}
      className={[
        'fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-2 border-r border-surface-border bg-sidebar-bg p-4 transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:static lg:translate-x-0 lg:shrink-0',
      ].join(' ')}
    >
      <div className="mb-6 px-2 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
          SliceOS
        </p>
        <h1 className="text-xl font-bold tracking-tight text-white">SliceOS</h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} onNavigate={onNavigate} />
        ))}
      </nav>

      <UserProfile />
    </aside>
  )
}
