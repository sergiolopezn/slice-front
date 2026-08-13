import type { ActivityEvent } from '../types/dashboard'

type ActivityTimelineItemProps = {
  event: ActivityEvent
}

export function ActivityTimelineItem({ event }: ActivityTimelineItemProps) {
  return (
    <article
      className="border-l-4 border-l-zinc-500 bg-surface-card/50 py-3 pl-4"
      data-testid={`activity-${event.id}`}
    >
      <p className="text-sm font-medium text-white">{event.message}</p>
      <p className="mt-1 font-mono text-xs text-text-dim">{event.timestamp}</p>
    </article>
  )
}
