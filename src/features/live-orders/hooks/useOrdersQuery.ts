import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ApiError, fetchLiveOrders, patchOrderStatus } from '@/shared/api'
import { mapLiveOrderToTicket, mapLiveOrdersToTickets } from '../api/mapLiveOrderToTicket'
import type { OrderTicket } from '../types/order'

export const ORDERS_QUERY_KEY = ['live-orders'] as const

export type AdvanceOrderVariables = {
  orderId: string
  nextStatus: OrderTicket['status']
}

export function useOrdersQuery() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: async () => {
      const orders = await fetchLiveOrders()
      return mapLiveOrdersToTickets(orders)
    },
    refetchInterval: 10_000,
  })
}

export function useAdvanceOrderStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ orderId, nextStatus }: AdvanceOrderVariables) => {
      const updated = await patchOrderStatus(orderId, nextStatus)
      return mapLiveOrderToTicket(updated)
    },
    onMutate: async ({ orderId, nextStatus }: AdvanceOrderVariables) => {
      await queryClient.cancelQueries({ queryKey: ORDERS_QUERY_KEY })

      const previous = queryClient.getQueryData<OrderTicket[]>(ORDERS_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<OrderTicket[]>(ORDERS_QUERY_KEY, (current) => {
          if (!current) return current

          if (nextStatus === 'Completed') {
            return current.filter((order) => order.id !== orderId)
          }

          return current.map((order) =>
            order.id === orderId ? { ...order, status: nextStatus } : order,
          )
        })
      }

      return { previous }
    },
    onError: (error, _orderId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(ORDERS_QUERY_KEY, context.previous)
      }

      if (!(error instanceof ApiError)) {
        console.error('Failed to advance order status', error)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY })
    },
  })
}

export function getAdvanceErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  return 'Failed to update order. Tap to retry.'
}
