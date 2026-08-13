import { vi } from 'vitest'
import type { ActivityFeedEntry, DashboardMetrics } from '@/shared/api'

const BASE_TIME = '2026-08-06T19:20:00Z'

export const SEED_METRICS: DashboardMetrics = {
  todaysRevenue: 3850.5,
  revenueTrendPercent: 12.5,
  totalOrdersToday: 114,
  telegramOrdersCount: 88,
  directOrdersCount: 26,
  avgPrepTimeMins: 11.4,
  activeRushStatus: 'High Load',
  stations: [
    {
      stationId: 'kitchen-a',
      stationName: 'Kitchen-A (Oven)',
      activeTickets: 8,
      capacityPercent: 80,
    },
    {
      stationId: 'kitchen-b',
      stationName: 'Kitchen-B (Prep)',
      activeTickets: 5,
      capacityPercent: 65,
    },
    {
      stationId: 'bar',
      stationName: 'Bar',
      activeTickets: 4,
      capacityPercent: 40,
    },
  ],
}

let activityEntries: ActivityFeedEntry[] = [
  {
    id: 'act-1',
    action: 'StorePaused',
    reason: 'Kitchen Overload',
    createdAt: BASE_TIME,
  },
]

export function resetDashboardForTests() {
  activityEntries = [
    {
      id: 'act-1',
      action: 'StorePaused',
      reason: 'Kitchen Overload',
      createdAt: BASE_TIME,
    },
  ]
}

export function installDashboardFetchMock(options?: {
  storeStatusHandler?: (body: { isPaused: boolean; reason: string }) => Response | Promise<Response>
}) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString()
      const method = init?.method ?? 'GET'

      if (url.endsWith('/api/dashboard/metrics') && method === 'GET') {
        return new Response(JSON.stringify(SEED_METRICS), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      if (url.endsWith('/api/dashboard/activity') && method === 'GET') {
        return new Response(JSON.stringify({ entries: activityEntries }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      if (url.endsWith('/api/dashboard/store-status') && method === 'POST') {
        const body = JSON.parse(String(init?.body)) as { isPaused: boolean; reason: string }

        if (options?.storeStatusHandler) {
          return options.storeStatusHandler(body)
        }

        if (!body.reason?.trim()) {
          return new Response(
            JSON.stringify({
              code: 'INVALID_REQUEST',
              message: "A 'reason' is required when changing the store status.",
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } },
          )
        }

        const action = body.isPaused ? 'StorePaused' : 'StoreResumed'
        activityEntries = [
          {
            id: `act-${Date.now()}`,
            action,
            reason: body.reason,
            createdAt: new Date().toISOString(),
          },
          ...activityEntries,
        ]

        return new Response(
          JSON.stringify({ isPaused: body.isPaused, updatedAt: new Date().toISOString() }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        )
      }

      return new Response(JSON.stringify({ code: 'NOT_FOUND', message: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }),
  )
}
