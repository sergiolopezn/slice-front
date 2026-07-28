import { Link } from 'react-router-dom'
import { Badge } from '@/shared/components/ui'

type KdsHeaderProps = {
  urgentCount: number
  inOvenCount: number
}

export function KdsHeader({ urgentCount, inOvenCount }: KdsHeaderProps) {
  return (
    <header
      className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-surface-border pb-4"
      data-testid="kds-header"
    >
      <div className="flex flex-wrap items-center gap-4">
        <p className="font-mono text-sm font-bold uppercase tracking-wider text-white">
          Station: Kitchen-A
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="rush">{urgentCount} Urgent</Badge>
          <Badge variant="prep">{inOvenCount} In Oven</Badge>
        </div>
      </div>

      <nav aria-label="KDS quick links" className="flex flex-wrap gap-4">
        <Link
          to="/live-orders"
          className="text-sm font-bold text-nav-active"
          aria-current="page"
        >
          Live Orders
        </Link>
        <Link
          to="/order-history"
          className="text-sm font-medium text-text-muted transition-colors hover:text-white"
        >
          History
        </Link>
        <Link
          to="/dashboard"
          className="text-sm font-medium text-text-muted transition-colors hover:text-white"
        >
          Kitchen Stats
        </Link>
      </nav>
    </header>
  )
}
