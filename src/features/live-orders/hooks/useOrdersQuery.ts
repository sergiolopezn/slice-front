import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { advanceOrderStatus, fetchOrders } from '../api/mockOrdersApi'
import type { OrderTicket } from '../types/order'

export const ORDERS_QUERY_KEY = ['live-orders'] as const

export function useOrdersQuery() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: fetchOrders,
    refetchInterval: 10_000,
  })
}

export function useAdvanceOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: advanceOrderStatus,
    onMutate: async (orderId: string) => {
      await queryClient.cancelQueries({ queryKey: ORDERS_QUERY_KEY })

      const previous = queryClient.getQueryData<OrderTicket[]>(ORDERS_QUERY_KEY)

      if (previous) {
        const previousOrder = previous.find((order) => order.id === orderId)

        queryClient.setQueryData<OrderTicket[]>(ORDERS_QUERY_KEY, (current) => {
          if (!current) return current

          return current
            .map((order) => {
              if (order.id !== orderId) return order

              if (order.status === 'URGENT') return { ...order, status: 'IN_OVEN' as const }
              if (order.status === 'IN_OVEN') return { ...order, status: 'READY' as const }
              return order
            })
            .filter((order) => {
              if (order.id !== orderId) return true
              return previousOrder?.status !== 'READY'
            })
        })
      }

      return { previous }
    },
    onError: (_error, _orderId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(ORDERS_QUERY_KEY, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
    },
  })
}
