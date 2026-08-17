import { useQuery } from '@tanstack/react-query'
import { fetchOrderHistory } from '@/shared/api'
import { mapOrderHistoryPage } from '../api/mapOrderHistory'
import type { OrderStatusFilter } from '../types/orderHistory'

export type OrderHistoryQueryParams = {
  searchTerm: string
  status: OrderStatusFilter
  startDate: string
  endDate: string
  page: number
  pageSize: number
}

export const orderHistoryQueryKey = (params: OrderHistoryQueryParams) =>
  ['order-history', params] as const

export function useOrderHistoryQuery(params: OrderHistoryQueryParams) {
  return useQuery({
    queryKey: orderHistoryQueryKey(params),
    queryFn: async () => {
      const response = await fetchOrderHistory({
        searchTerm: params.searchTerm || undefined,
        status: params.status,
        startDate: params.startDate || undefined,
        endDate: params.endDate || undefined,
        page: params.page,
        pageSize: params.pageSize,
      })
      return mapOrderHistoryPage(response)
    },
  })
}
