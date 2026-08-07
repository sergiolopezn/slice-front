import { vi } from 'vitest'
import type { LiveOrder, OrderStatus } from '@/shared/api'

const BASE_TIME = '2026-08-05T19:00:00Z'

export const SEED_LIVE_ORDERS: LiveOrder[] = [
  {
    id: 'ord-402',
    orderNumber: 402,
    customerName: 'Marco Rossi',
    customerPhone: '+15550199',
    fulfillmentType: 'Delivery',
    status: 'New',
    totalAmount: 22.5,
    createdAt: BASE_TIME,
    items: [
      {
        id: 'item-1',
        menuItemName: 'Buffalo Wings',
        size: 'Large',
        quantity: 12,
        unitPrice: 18,
        modifiers: 'Extra crispy',
      },
      {
        id: 'item-2',
        menuItemName: 'Caesar Salad',
        size: 'Regular',
        quantity: 1,
        unitPrice: 8,
        modifiers: 'No croutons',
      },
    ],
  },
  {
    id: 'ord-398',
    orderNumber: 398,
    customerName: 'David Chen',
    fulfillmentType: 'Pickup',
    status: 'InOven',
    totalAmount: 24,
    createdAt: BASE_TIME,
    items: [
      {
        id: 'item-3',
        menuItemName: 'Large Pepperoni',
        size: 'Large',
        quantity: 1,
        unitPrice: 16,
      },
      {
        id: 'item-4',
        menuItemName: 'Garlic Knots',
        size: 'Regular',
        quantity: 2,
        unitPrice: 4,
      },
    ],
  },
  {
    id: 'ord-395',
    orderNumber: 395,
    customerName: 'Sarah Kim',
    fulfillmentType: 'Delivery',
    status: 'InOven',
    totalAmount: 18,
    createdAt: BASE_TIME,
    items: [
      {
        id: 'item-5',
        menuItemName: 'Margherita Pizza',
        size: 'Large',
        quantity: 1,
        unitPrice: 18,
      },
    ],
  },
  {
    id: 'ord-390',
    orderNumber: 390,
    customerName: 'Takeout Guest',
    fulfillmentType: 'Pickup',
    status: 'Ready',
    totalAmount: 15,
    createdAt: BASE_TIME,
    items: [
      {
        id: 'item-6',
        menuItemName: 'Veggie Supreme',
        size: 'Large',
        quantity: 1,
        unitPrice: 15,
      },
    ],
  },
]

function cloneOrders(source: LiveOrder[]): LiveOrder[] {
  return source.map((order) => ({
    ...order,
    items: order.items.map((item) => ({ ...item })),
  }))
}

let orders = cloneOrders(SEED_LIVE_ORDERS)

export function resetLiveOrdersForTests() {
  orders = cloneOrders(SEED_LIVE_ORDERS)
}

export function installLiveOrdersFetchMock(options?: {
  patchHandler?: (orderId: string, status: OrderStatus) => Response | Promise<Response>
}) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString()
      const method = init?.method ?? 'GET'

      if (url.endsWith('/api/orders/live') && method === 'GET') {
        return new Response(JSON.stringify({ orders }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const statusMatch = url.match(/\/api\/orders\/([^/]+)\/status$/)
      if (statusMatch && method === 'PATCH') {
        if (options?.patchHandler) {
          return options.patchHandler(statusMatch[1], JSON.parse(String(init?.body)).status)
        }

        const orderId = statusMatch[1]
        const body = JSON.parse(String(init?.body)) as { status: OrderStatus }
        const index = orders.findIndex((order) => order.id === orderId)

        if (index === -1) {
          return new Response(
            JSON.stringify({
              code: 'ORDER_NOT_FOUND',
              message: `Order '${orderId}' was not found.`,
            }),
            { status: 404, headers: { 'Content-Type': 'application/json' } },
          )
        }

        const updated: LiveOrder = { ...orders[index], status: body.status }
        if (body.status === 'Completed') {
          orders = orders.filter((order) => order.id !== orderId)
        } else {
          orders[index] = updated
        }

        return new Response(JSON.stringify(updated), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      return new Response(JSON.stringify({ code: 'NOT_FOUND', message: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }),
  )
}
