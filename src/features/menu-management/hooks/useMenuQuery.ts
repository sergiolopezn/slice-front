import { useQuery } from '@tanstack/react-query'
import { fetchMenuOverview } from '@/shared/api'
import { mapMenuOverview } from '../api/mapMenuOverview'

export const MENU_QUERY_KEY = ['menu-snapshot'] as const

export function useMenuQuery() {
  return useQuery({
    queryKey: MENU_QUERY_KEY,
    queryFn: async () => {
      const overview = await fetchMenuOverview()
      return mapMenuOverview(overview)
    },
    refetchInterval: 60_000,
  })
}
