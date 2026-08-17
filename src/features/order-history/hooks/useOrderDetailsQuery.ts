import { useQuery } from '@tanstack/react-query'
import { fetchOrderDetails } from '@/shared/api'
import { mapOrderDetails } from '../api/mapOrderHistory'

export const orderDetailsQueryKey = (orderId: string) => ['order-details', orderId] as const

export function useOrderDetailsQuery(orderId: string | null) {
  return useQuery({
    queryKey: orderDetailsQueryKey(orderId ?? ''),
    queryFn: async () => {
      if (!orderId) {
        throw new Error('Order id is required')
      }

      const details = await fetchOrderDetails(orderId)
      return mapOrderDetails(details)
    },
    enabled: Boolean(orderId),
  })
}
