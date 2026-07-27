import { NavItem } from './NavItem'
import { NAV_ITEMS } from './navItems'
import { UserProfile } from './UserProfile'

export function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col gap-2 border-r border-surface-border bg-sidebar-bg p-4">
      <div className="mb-6 px-2 py-3">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
          SliceOS
        </p>
        <h1 className="text-xl font-bold tracking-tight text-white">SliceOS</h1>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      <UserProfile />
    </aside>
  )
}
