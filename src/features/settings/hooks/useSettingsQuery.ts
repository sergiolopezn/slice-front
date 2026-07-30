import { useQuery } from '@tanstack/react-query'
import { fetchSettingsSnapshot } from '../api/mockSettingsApi'

export const SETTINGS_QUERY_KEY = ['store-settings'] as const

export function useSettingsQuery() {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: fetchSettingsSnapshot,
  })
}
