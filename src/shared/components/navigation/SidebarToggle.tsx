import { MenuIcon } from './icons'

const SIDEBAR_ID = 'app-sidebar'

type SidebarToggleProps = {
  isOpen: boolean
  onToggle: () => void
}

export function SidebarToggle({ isOpen, onToggle }: SidebarToggleProps) {
  return (
    <button
      type="button"
      data-testid="sidebar-toggle"
      aria-expanded={isOpen}
      aria-controls={SIDEBAR_ID}
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      onClick={onToggle}
      className="flex min-h-12 min-w-12 items-center justify-center rounded-xl text-text-muted transition-colors hover:bg-status-idle-gray hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <MenuIcon />
    </button>
  )
}

export { SIDEBAR_ID }
