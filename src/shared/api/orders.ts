import { apiRequest } from './client'
import type {
  CreateOrderRequest,
  LiveOrder,
  LiveOrdersResponse,
  OrderStatus,
} from './types/orders'

export async function fetchLiveOrders(): Promise<LiveOrder[]> {
  const response = await apiRequest<LiveOrdersResponse>('/api/orders/live')
  return response.orders
}

export async function patchOrderStatus(
  orderId: string,
  status: OrderStatus,
): Promise<LiveOrder> {
  return apiRequest<LiveOrder>(`/api/orders/${orderId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  })
}

export async function createOrder(payload: CreateOrderRequest): Promise<LiveOrder> {
  return apiRequest<LiveOrder>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
