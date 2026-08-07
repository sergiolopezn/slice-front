export type DashboardStation = {
  stationId: string
  stationName: string
  activeTickets: number
  capacityPercent: number
}

export type DashboardMetrics = {
  todaysRevenue: number
  revenueTrendPercent: number | null
  totalOrdersToday: number
  telegramOrdersCount: number
  directOrdersCount: number
  avgPrepTimeMins: number | null
  activeRushStatus: string
  stations: DashboardStation[]
}

export type ActivityFeedAction = 'StorePaused' | 'StoreResumed'

export type ActivityFeedEntry = {
  id: string
  action: ActivityFeedAction
  reason: string
  createdAt: string
}

export type ActivityFeedResponse = {
  entries: ActivityFeedEntry[]
}

export type StoreStatusRequest = {
  isPaused: boolean
  reason: string
}

export type StoreStatusResponse = {
  isPaused: boolean
  updatedAt: string
}
