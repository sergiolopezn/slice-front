export type HistoryOrderStatus = 'Completed' | 'Cancelled'

export type HistoryFulfillmentType = 'Delivery' | 'Pickup'

export type OrderHistoryStatusFilter = 'all' | 'completed' | 'cancelled'

export type OrderHistoryQueryParams = {
  searchTerm?: string
  status?: OrderHistoryStatusFilter
  startDate?: string
  endDate?: string
  page?: number
  pageSize?: number
}

export type OrderHistoryItemDto = {
  id: string
  orderNumber: number
  customerName: string
  customerPhone: string
  fulfillmentType: HistoryFulfillmentType
  status: HistoryOrderStatus
  totalAmount: number
  createdAt: string
  itemsSummary: string
}

export type OrderHistoryResponse = {
  items: OrderHistoryItemDto[]
  totalEntries: number
  totalPages: number
  page: number
  pageSize: number
}

export type OrderDetailsItemDto = {
  id: string
  menuItemName: string
  size: string
  quantity: number
  unitPrice: number
  modifiers: string
}

export type OrderTimelineEntryDto = {
  label: string
  timestamp: string
}

export type OrderDetailsDto = {
  id: string
  orderNumber: number
  customerName: string
  customerPhone: string
  telegramChatId: string
  fulfillmentType: HistoryFulfillmentType
  deliveryAddress: string
  status: HistoryOrderStatus
  paymentMethod: string
  paymentStatus: string
  totalAmount: number
  createdAt: string
  updatedAt: string
  readyAt: string | null
  items: OrderDetailsItemDto[]
  timeline: OrderTimelineEntryDto[]
}
