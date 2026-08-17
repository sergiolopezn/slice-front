import { apiRequest } from './client'
import type {
  OrderDetailsDto,
  OrderHistoryQueryParams,
  OrderHistoryResponse,
} from './types/order-history'

function buildHistoryQuery(params: OrderHistoryQueryParams): string {
  const search = new URLSearchParams()

  if (params.searchTerm?.trim()) {
    search.set('searchTerm', params.searchTerm.trim())
  }

  if (params.status && params.status !== 'all') {
    search.set('status', params.status)
  }

  if (params.startDate) {
    search.set('startDate', params.startDate)
  }

  if (params.endDate) {
    search.set('endDate', params.endDate)
  }

  if (params.page !== undefined) {
    search.set('page', String(params.page))
  }

  if (params.pageSize !== undefined) {
    search.set('pageSize', String(params.pageSize))
  }

  const query = search.toString()
  return query.length > 0 ? `?${query}` : ''
}

export async function fetchOrderHistory(
  params: OrderHistoryQueryParams = {},
): Promise<OrderHistoryResponse> {
  return apiRequest<OrderHistoryResponse>(`/api/orders/history${buildHistoryQuery(params)}`)
}

export async function fetchOrderDetails(orderId: string): Promise<OrderDetailsDto> {
  return apiRequest<OrderDetailsDto>(`/api/orders/${orderId}/details`)
}
