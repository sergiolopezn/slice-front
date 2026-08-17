export type OrderStatus = 'completed' | 'cancelled'

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

export type OrderHistoryListItem = {
  id: string
  orderNumber: string
  dateTimeLabel: string
  customerName: string
  deliveryType: DeliveryType
  itemsSummary: string
  total: number
  status: OrderStatus
}

export type HistoricalOrder = OrderHistoryListItem & {
  lineItems: OrderLineItem[]
  telegramChatId: string
  fulfillmentAddress: string
  timeline: OrderTimelineEvent[]
}

export type OrderHistoryPage = {
  orders: OrderHistoryListItem[]
  totalEntries: number
  totalPages: number
  page: number
  pageSize: number
}

export function formatOrderTotal(total: number): string {
  return `$${total.toFixed(2)}`
}
