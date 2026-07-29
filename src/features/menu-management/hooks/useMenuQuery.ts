import { useQuery } from '@tanstack/react-query'
import { fetchMenuSnapshot } from '../api/mockMenuApi'

export const MENU_QUERY_KEY = ['menu-snapshot'] as const

export function useMenuQuery() {
  return useQuery({
    queryKey: MENU_QUERY_KEY,
    queryFn: fetchMenuSnapshot,
  })
}
