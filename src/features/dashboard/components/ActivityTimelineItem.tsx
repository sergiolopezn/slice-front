import type { ActivityEvent, ActivityEventType } from '../types/dashboard'

const accentClasses: Record<ActivityEventType, string> = {
  order: 'border-l-status-ready-mint',
  system: 'border-l-zinc-500',
  alert: 'border-l-status-prep-amber',
  refund: 'border-l-status-urgent-red',
}

type ActivityTimelineItemProps = {
  event: ActivityEvent
}

export function ActivityTimelineItem({ event }: ActivityTimelineItemProps) {
  return (
    <article
      className={`border-l-4 bg-surface-card/50 py-3 pl-4 ${accentClasses[event.type]}`}
      data-testid={`activity-${event.id}`}
    >
      <p className="text-sm font-medium text-white">{event.message}</p>
      {event.metadata ? (
        <p className="mt-1 font-mono text-xs text-text-muted">{event.metadata}</p>
      ) : null}
      <p className="mt-1 font-mono text-xs text-text-dim">{event.timestamp}</p>
    </article>
  )
}
