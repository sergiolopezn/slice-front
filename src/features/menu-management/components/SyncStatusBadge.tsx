import { Badge } from '@/shared/components/ui'
import type { SyncStatus } from '../types/menu'

type SyncStatusBadgeProps = {
  status: SyncStatus
}

export function SyncStatusBadge({ status }: SyncStatusBadgeProps) {
  const isSynced = status === 'synced'

  return (
    <Badge
      variant={isSynced ? 'ready' : 'rush'}
      data-testid={`sync-badge-${status}`}
      className="inline-flex items-center gap-1.5 normal-case tracking-normal"
    >
      <span aria-hidden="true">{isSynced ? '🟢' : '🔴'}</span>
      {isSynced ? 'Synced' : 'Paused'}
    </Badge>
  )
}
