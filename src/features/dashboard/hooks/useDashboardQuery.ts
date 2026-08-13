import { useQuery } from '@tanstack/react-query'
import { fetchActivity, fetchMetrics } from '@/shared/api'
import { mapDashboardSnapshot } from '../api/mapDashboardSnapshot'

export const DASHBOARD_QUERY_KEY = ['dashboard-snapshot'] as const

export function useDashboardQuery() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: async () => {
      const [metrics, entries] = await Promise.all([fetchMetrics(), fetchActivity()])
      return mapDashboardSnapshot(metrics, entries)
    },
    refetchInterval: 30_000,
  })
}
