import type { ActivityEvent } from '../types/dashboard'
import { ActivityTimelineItem } from './ActivityTimelineItem'

type ActivityFeedProps = {
  events: ActivityEvent[]
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  return (
    <section aria-label="Recent activity" data-testid="activity-feed">
      <h2 className="mb-4 text-base font-bold text-white">Recent Activity</h2>
      <div className="space-y-3">
        {events.map((event) => (
          <ActivityTimelineItem key={event.id} event={event} />
        ))}
      </div>
    </section>
  )
}
