import type { LiveOrder } from '@/shared/api'
import type { OrderLineItem, OrderMetadata, OrderTicket } from '../types/order'

export function formatElapsedTimer(createdAt: string, nowMs = Date.now()): string {
  const start = new Date(createdAt).getTime()
  const elapsedSec = Math.max(0, Math.floor((nowMs - start) / 1000))
  const mins = Math.floor(elapsedSec / 60)
  const secs = elapsedSec % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

function formatLineItemLabel(item: LiveOrder['items'][number]): string {
  const prefix = item.quantity > 1 ? `${item.quantity}x ` : '1x '
  return `${prefix}${item.menuItemName}`
}

function mapMetadata(order: LiveOrder): OrderMetadata {
  const metadata: OrderMetadata = {
    customerName: order.customerName,
    distance: order.fulfillmentType,
  }

  if (order.customerPhone) {
    metadata.serverName = order.customerPhone
  } else if (order.telegramChatId) {
    metadata.serverName = order.telegramChatId
  }

  return metadata
}

function mapLineItems(items: LiveOrder['items']): OrderLineItem[] {
  return items.map((item) => ({
    id: item.id,
    label: formatLineItemLabel(item),
    modifiers: item.modifiers,
  }))
}

export function mapLiveOrderToTicket(order: LiveOrder, nowMs = Date.now()): OrderTicket {
  return {
    id: order.id,
    orderNumber: `#${order.orderNumber}`,
    timer: formatElapsedTimer(order.createdAt, nowMs),
    status: order.status,
    createdAt: order.createdAt,
    metadata: mapMetadata(order),
    items: mapLineItems(order.items),
  }
}

export function mapLiveOrdersToTickets(orders: LiveOrder[], nowMs = Date.now()): OrderTicket[] {
  return orders.map((order) => mapLiveOrderToTicket(order, nowMs))
}
