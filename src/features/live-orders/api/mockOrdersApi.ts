import type { OrderPhase, OrderTicket } from '../types/order'

const LATENCY_MS = 150

const SEED_ORDERS: OrderTicket[] = [
  {
    id: 'ord-402',
    orderNumber: '#402',
    timer: '12:06',
    status: 'URGENT',
    metadata: {
      customerName: 'Marco Rossi',
      distance: '2.4 mi',
      serverName: 'Alex',
      prepInstructions: 'Extra crispy',
      isPrePaid: true,
    },
    items: [
      { id: 'item-1', label: '12x Buffalo Wings' },
      { id: 'item-2', label: '1x Caesar Salad', modifiers: 'No croutons' },
    ],
  },
  {
    id: 'ord-398',
    orderNumber: '#398',
    timer: '08:14',
    status: 'IN_OVEN',
    metadata: {
      customerName: 'David Chen',
      distance: 'Dine-in',
      serverName: 'Jordan',
      pickupRackId: 'R-12',
    },
    items: [
      { id: 'item-3', label: '1x Large Pepperoni' },
      { id: 'item-4', label: '2x Garlic Knots' },
    ],
  },
  {
    id: 'ord-395',
    orderNumber: '#395',
    timer: '04:52',
    status: 'IN_OVEN',
    metadata: {
      customerName: 'Sarah Kim',
      distance: '1.1 mi',
      pickupRackId: 'R-08',
      isPrePaid: true,
    },
    items: [{ id: 'item-5', label: '1x Margherita Pizza' }],
  },
  {
    id: 'ord-390',
    orderNumber: '#390',
    timer: '02:30',
    status: 'READY',
    metadata: {
      customerName: 'Takeout Guest',
      distance: 'Pickup',
      pickupRackId: 'R-03',
      isPrePaid: true,
    },
    items: [{ id: 'item-6', label: '1x Veggie Supreme' }],
  },
]

let orders: OrderTicket[] = SEED_ORDERS.map((order) => ({
  ...order,
  metadata: { ...order.metadata },
  items: order.items.map((item) => ({ ...item })),
}))

function cloneOrders(source: OrderTicket[]): OrderTicket[] {
  return source.map((order) => ({
    ...order,
    metadata: { ...order.metadata },
    items: order.items.map((item) => ({ ...item })),
  }))
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchOrders(): Promise<OrderTicket[]> {
  await delay(LATENCY_MS)
  return orders.map((order) => ({
    ...order,
    metadata: { ...order.metadata },
    items: order.items.map((item) => ({ ...item })),
  }))
}

export async function advanceOrderStatus(orderId: string): Promise<OrderTicket | null> {
  await delay(LATENCY_MS)

  const index = orders.findIndex((order) => order.id === orderId)
  if (index === -1) return null

  const current = orders[index]
  const next = getNextStatus(current.status)
  if (!next) return null

  if (next === 'REMOVED') {
    orders = orders.filter((order) => order.id !== orderId)
    return null
  }

  const updated: OrderTicket = { ...current, status: next }
  orders[index] = updated
  return { ...updated, metadata: { ...updated.metadata }, items: updated.items.map((i) => ({ ...i })) }
}

function getNextStatus(status: OrderPhase): OrderPhase | 'REMOVED' | null {
  switch (status) {
    case 'URGENT':
      return 'IN_OVEN'
    case 'IN_OVEN':
      return 'READY'
    case 'READY':
      return 'REMOVED'
    default:
      return null
  }
}

export function countByPhase(ordersList: OrderTicket[], phase: OrderPhase): number {
  return ordersList.filter((order) => order.status === phase).length
}

export function resetOrdersForTests() {
  orders = cloneOrders(SEED_ORDERS)
}
