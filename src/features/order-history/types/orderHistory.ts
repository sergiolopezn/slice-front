export type OrderStatus = 'completed' | 'cancelled' | 'refunded'

export type OrderStatusFilter = 'all' | OrderStatus

export type DeliveryType = 'pickup' | 'delivery'

export type OrderLineItem = {
  id: string
  name: string
  quantity: number
  modifiers?: string[]
  price: number
}

export type OrderTimelineEvent = {
  id: string
  label: string
  timestamp: string
}

export type HistoricalOrder = {
  id: string
  orderNumber: string
  dateTimeLabel: string
  customerName: string
  deliveryType: DeliveryType
  itemsSummary: string
  lineItems: OrderLineItem[]
  total: number
  paymentLabel: string
  status: OrderStatus
  telegramChatId: string
  fulfillmentAddress: string
  timeline: OrderTimelineEvent[]
}

export type OrderHistorySnapshot = {
  orders: HistoricalOrder[]
  displayTotalCount: number
}

export function formatOrderTotal(total: number): string {
  return `$${total.toFixed(2)}`
}

export function getStatusCounts(orders: HistoricalOrder[]) {
  return {
    all: orders.length,
    completed: orders.filter((order) => order.status === 'completed').length,
    cancelled: orders.filter((order) => order.status === 'cancelled').length,
    refunded: orders.filter((order) => order.status === 'refunded').length,
  }
}

export function filterOrders(
  orders: HistoricalOrder[],
  searchQuery: string,
  statusFilter: OrderStatusFilter,
): HistoricalOrder[] {
  const normalizedQuery = searchQuery.trim().toLowerCase()

  return orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesSearch =
      normalizedQuery.length === 0 ||
      order.orderNumber.toLowerCase().includes(normalizedQuery) ||
      order.customerName.toLowerCase().includes(normalizedQuery)

    return matchesStatus && matchesSearch
  })
}

export function paginateOrders<T>(items: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize
  return items.slice(start, start + pageSize)
}
