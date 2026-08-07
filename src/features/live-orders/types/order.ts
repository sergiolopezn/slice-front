import type { OrderStatus } from '@/shared/api'

export type { OrderStatus }

export type OrderLineItem = {
  id: string
  label: string
  modifiers?: string
}

export type OrderMetadata = {
  customerName: string
  distance?: string
  serverName?: string
  pickupRackId?: string
  prepInstructions?: string
  isPrePaid?: boolean
}

export type OrderTicket = {
  id: string
  orderNumber: string
  timer: string
  status: OrderStatus
  createdAt: string
  metadata: OrderMetadata
  items: OrderLineItem[]
}

export function statusToHeaderStatus(
  status: OrderStatus,
): 'rush' | 'prep' | 'ready' | 'pending' {
  switch (status) {
    case 'New':
      return 'rush'
    case 'InPrep':
    case 'InOven':
      return 'prep'
    case 'Ready':
      return 'ready'
    case 'Completed':
    case 'Cancelled':
      return 'pending'
  }
}

export function nextOrderStatus(status: OrderStatus): OrderStatus | null {
  switch (status) {
    case 'New':
      return 'InPrep'
    case 'InPrep':
      return 'InOven'
    case 'InOven':
      return 'Ready'
    case 'Ready':
      return 'Completed'
    case 'Completed':
    case 'Cancelled':
      return null
  }
}

export function countByStatus(orders: OrderTicket[], status: OrderStatus): number {
  return orders.filter((order) => order.status === status).length
}
