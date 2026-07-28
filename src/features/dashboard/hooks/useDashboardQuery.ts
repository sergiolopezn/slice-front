import { useQuery } from '@tanstack/react-query'
import { fetchDashboardSnapshot } from '../api/mockDashboardApi'

export const DASHBOARD_QUERY_KEY = ['dashboard-snapshot'] as const

export function useDashboardQuery() {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: fetchDashboardSnapshot,
  })
}
