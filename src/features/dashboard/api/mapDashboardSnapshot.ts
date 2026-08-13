import type { ActivityFeedEntry, DashboardMetrics } from '@/shared/api'
import type {
  ActivityEvent,
  DashboardSnapshot,
  KpiMetric,
  KpiTrend,
  StationCapacity,
} from '../types/dashboard'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

function formatTrend(percent: number | null): KpiTrend | undefined {
  if (percent === null) return undefined

  const sign = percent >= 0 ? '+' : ''
  return {
    label: `${sign}${percent}% vs Yesterday`,
    variant: percent >= 0 ? 'positive' : 'warning',
  }
}

export function deriveIsPaused(entries: ActivityFeedEntry[]): boolean {
  if (entries.length === 0) return false
  return entries[0].action === 'StorePaused'
}

export function formatRelativeTime(iso: string, nowMs = Date.now()): string {
  const diffMs = Math.max(0, nowMs - new Date(iso).getTime())
  const diffMin = Math.floor(diffMs / 60_000)

  if (diffMin < 1) return 'Just now'
  if (diffMin < 60) return `${diffMin} min ago`

  const diffHr = Math.floor(diffMin / 60)
  if (diffHr < 24) return `${diffHr} hr ago`

  return new Date(iso).toLocaleDateString()
}

function mapActivityEntry(entry: ActivityFeedEntry, nowMs = Date.now()): ActivityEvent {
  const paused = entry.action === 'StorePaused'

  return {
    id: entry.id,
    type: 'system',
    message: paused ? `Store paused: ${entry.reason}` : `Store resumed: ${entry.reason}`,
    timestamp: formatRelativeTime(entry.createdAt, nowMs),
  }
}

function mapKpis(metrics: DashboardMetrics): KpiMetric[] {
  const isHighLoad = metrics.activeRushStatus === 'High Load'

  return [
    {
      id: 'revenue',
      label: "Today's Revenue",
      value: formatCurrency(metrics.todaysRevenue),
      trend: formatTrend(metrics.revenueTrendPercent),
    },
    {
      id: 'orders',
      label: 'Total Orders',
      value: String(metrics.totalOrdersToday),
      subtitle: `${metrics.telegramOrdersCount} Telegram, ${metrics.directOrdersCount} Direct`,
    },
    {
      id: 'prep-time',
      label: 'Avg. Prep Time',
      value: metrics.avgPrepTimeMins === null ? '—' : `${metrics.avgPrepTimeMins} mins`,
    },
    {
      id: 'rush',
      label: 'Active Rush Status',
      value: metrics.activeRushStatus,
      isRush: isHighLoad,
      actionLabel: isHighLoad ? 'Review Capacity' : undefined,
    },
  ]
}

function mapStations(metrics: DashboardMetrics): StationCapacity[] {
  return metrics.stations.map((station) => ({
    id: station.stationId,
    name: station.stationName,
    ticketCount: station.activeTickets,
    capacityPercent: station.capacityPercent,
  }))
}

export function mapDashboardSnapshot(
  metrics: DashboardMetrics,
  entries: ActivityFeedEntry[],
  nowMs = Date.now(),
): DashboardSnapshot {
  return {
    kpis: mapKpis(metrics),
    stations: mapStations(metrics),
    isPaused: deriveIsPaused(entries),
    activity: entries.map((entry) => mapActivityEntry(entry, nowMs)),
  }
}
