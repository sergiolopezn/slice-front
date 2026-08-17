import type { OrderDetailsDto, OrderHistoryItemDto, OrderHistoryResponse } from '@/shared/api'
import type {
  DeliveryType,
  HistoricalOrder,
  OrderHistoryListItem,
  OrderHistoryPage,
  OrderLineItem,
  OrderStatus,
  OrderTimelineEvent,
} from '../types/orderHistory'

function mapDeliveryType(fulfillmentType: OrderHistoryItemDto['fulfillmentType']): DeliveryType {
  return fulfillmentType === 'Delivery' ? 'delivery' : 'pickup'
}

function mapStatus(status: OrderHistoryItemDto['status']): OrderStatus {
  return status === 'Completed' ? 'completed' : 'cancelled'
}

export function formatOrderDateTime(iso: string, nowMs = Date.now()): string {
  const date = new Date(iso)
  const now = new Date(nowMs)
  const timeLabel = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })

  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const startOfOrderDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const dayDiff = Math.floor((startOfToday - startOfOrderDay) / 86_400_000)

  if (dayDiff === 0) return `Today, ${timeLabel}`
  if (dayDiff === 1) return `Yesterday, ${timeLabel}`

  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function mapListItem(item: OrderHistoryItemDto, nowMs = Date.now()): OrderHistoryListItem {
  return {
    id: item.id,
    orderNumber: `#${item.orderNumber}`,
    dateTimeLabel: formatOrderDateTime(item.createdAt, nowMs),
    customerName: item.customerName,
    deliveryType: mapDeliveryType(item.fulfillmentType),
    itemsSummary: item.itemsSummary,
    total: item.totalAmount,
    status: mapStatus(item.status),
  }
}

export function mapOrderHistoryPage(response: OrderHistoryResponse, nowMs = Date.now()): OrderHistoryPage {
  return {
    orders: response.items.map((item) => mapListItem(item, nowMs)),
    totalEntries: response.totalEntries,
    totalPages: response.totalPages,
    page: response.page,
    pageSize: response.pageSize,
  }
}

function parseModifiers(modifiers: string): string[] | undefined {
  const parts = modifiers
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  return parts.length > 0 ? parts : undefined
}

function mapLineItem(item: OrderDetailsDto['items'][number]): OrderLineItem {
  const name = item.size.trim()
    ? `${item.size} ${item.menuItemName}`.trim()
    : item.menuItemName

  return {
    id: item.id,
    name,
    quantity: item.quantity,
    modifiers: parseModifiers(item.modifiers),
    price: item.unitPrice * item.quantity,
  }
}

function mapTimelineEntry(
  entry: OrderDetailsDto['timeline'][number],
  index: number,
  nowMs = Date.now(),
): OrderTimelineEvent {
  return {
    id: `${entry.label}-${entry.timestamp}-${index}`,
    label: entry.label,
    timestamp: formatOrderDateTime(entry.timestamp, nowMs),
  }
}

export function mapOrderDetails(details: OrderDetailsDto, nowMs = Date.now()): HistoricalOrder {
  return {
    id: details.id,
    orderNumber: `#${details.orderNumber}`,
    dateTimeLabel: formatOrderDateTime(details.createdAt, nowMs),
    customerName: details.customerName,
    deliveryType: mapDeliveryType(details.fulfillmentType),
    itemsSummary: details.items
      .map((item) => `${item.quantity}x ${item.menuItemName}`)
      .join(', '),
    total: details.totalAmount,
    status: mapStatus(details.status),
    telegramChatId: details.telegramChatId,
    fulfillmentAddress:
      details.fulfillmentType === 'Pickup'
        ? 'Counter Pickup'
        : details.deliveryAddress || '—',
    lineItems: details.items.map(mapLineItem),
    timeline: details.timeline.map((entry, index) => mapTimelineEntry(entry, index, nowMs)),
  }
}
