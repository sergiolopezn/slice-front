import { useQuery } from '@tanstack/react-query'
import { fetchOrderHistory } from '../api/mockOrderHistoryApi'

export const ORDER_HISTORY_QUERY_KEY = ['order-history'] as const

export function useOrderHistoryQuery() {
  return useQuery({
    queryKey: ORDER_HISTORY_QUERY_KEY,
    queryFn: fetchOrderHistory,
  })
}
