export type KpiTrendVariant = 'positive' | 'warning' | 'neutral'

export type KpiTrend = {
  label: string
  variant: KpiTrendVariant
}

export type KpiMetric = {
  id: string
  label: string
  value: string
  subtitle?: string
  trend?: KpiTrend
  warning?: string
  actionLabel?: string
  isRush?: boolean
}

export type StationCapacity = {
  id: string
  name: string
  ticketCount: number
  capacityPercent: number
}

export type StoreControlChannel = 'telegram' | 'dine-in' | 'delivery'

export type StoreControl = {
  id: StoreControlChannel
  label: string
  enabled: boolean
}

export type ActivityEventType = 'order' | 'system' | 'alert' | 'refund'

export type ActivityEvent = {
  id: string
  type: ActivityEventType
  message: string
  timestamp: string
  metadata?: string
}

export type DashboardSnapshot = {
  kpis: KpiMetric[]
  stations: StationCapacity[]
  storeControls: StoreControl[]
  activity: ActivityEvent[]
}

export function getCapacityColorClass(percent: number): string {
  if (percent >= 80) return 'bg-status-urgent-red'
  if (percent >= 50) return 'bg-status-prep-amber'
  return 'bg-status-ready-mint'
}
