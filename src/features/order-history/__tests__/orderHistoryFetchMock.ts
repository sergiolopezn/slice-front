import { vi } from 'vitest'
import type { OrderDetailsDto, OrderHistoryItemDto } from '@/shared/api'

const BASE_CREATED_AT = '2026-08-13T14:15:00Z'

type SeedOrder = OrderHistoryItemDto & { details: OrderDetailsDto }

const SEED_ORDERS: SeedOrder[] = [
  {
    id: 'ord-1040',
    orderNumber: 1040,
    customerName: 'Alex P.',
    customerPhone: '+1 555-0100',
    fulfillmentType: 'Pickup',
    status: 'Completed',
    totalAmount: 22.5,
    createdAt: BASE_CREATED_AT,
    itemsSummary: '1x Large Veggie, 1x Garlic Knots',
    details: {
      id: 'ord-1040',
      orderNumber: 1040,
      customerName: 'Alex P.',
      customerPhone: '+1 555-0100',
      telegramChatId: '@tg_89221',
      fulfillmentType: 'Pickup',
      deliveryAddress: 'Counter Pickup — Front Register',
      status: 'Completed',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      totalAmount: 22.5,
      createdAt: BASE_CREATED_AT,
      updatedAt: '2026-08-13T14:15:00Z',
      readyAt: '2026-08-13T14:13:00Z',
      items: [
        {
          id: 'li-1',
          menuItemName: 'Large Veggie',
          size: '',
          quantity: 1,
          unitPrice: 16,
          modifiers: 'Extra Basil',
        },
        {
          id: 'li-2',
          menuItemName: 'Garlic Knots',
          size: '',
          quantity: 1,
          unitPrice: 6.5,
          modifiers: '',
        },
      ],
      timeline: [
        { label: 'Order placed', timestamp: '2026-08-13T14:05:00Z' },
        { label: 'Completed', timestamp: '2026-08-13T14:15:00Z' },
      ],
    },
  },
  {
    id: 'ord-1039',
    orderNumber: 1039,
    customerName: 'Maria Lopez',
    customerPhone: '+1 555-0101',
    fulfillmentType: 'Delivery',
    status: 'Completed',
    totalAmount: 19.5,
    createdAt: '2026-08-13T13:48:00Z',
    itemsSummary: '1x Pepperoni Feast, 1x Craft Soda',
    details: {
      id: 'ord-1039',
      orderNumber: 1039,
      customerName: 'Maria Lopez',
      customerPhone: '+1 555-0101',
      telegramChatId: '@tg_44102',
      fulfillmentType: 'Delivery',
      deliveryAddress: '142 Oak Street, Apt 3B',
      status: 'Completed',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      totalAmount: 19.5,
      createdAt: '2026-08-13T13:48:00Z',
      updatedAt: '2026-08-13T14:02:00Z',
      readyAt: null,
      items: [],
      timeline: [{ label: 'Order placed', timestamp: '2026-08-13T13:48:00Z' }],
    },
  },
  {
    id: 'ord-1038',
    orderNumber: 1038,
    customerName: 'David Chen',
    customerPhone: '+1 555-0102',
    fulfillmentType: 'Pickup',
    status: 'Cancelled',
    totalAmount: 28,
    createdAt: '2026-08-13T12:20:00Z',
    itemsSummary: '2x Margherita',
    details: {
      id: 'ord-1038',
      orderNumber: 1038,
      customerName: 'David Chen',
      customerPhone: '+1 555-0102',
      telegramChatId: '@tg_77331',
      fulfillmentType: 'Pickup',
      deliveryAddress: 'Counter Pickup — Side Window',
      status: 'Cancelled',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      totalAmount: 28,
      createdAt: '2026-08-13T12:20:00Z',
      updatedAt: '2026-08-13T12:18:00Z',
      readyAt: null,
      items: [],
      timeline: [
        { label: 'Order placed', timestamp: '2026-08-13T12:10:00Z' },
        { label: 'Cancelled', timestamp: '2026-08-13T12:18:00Z' },
      ],
    },
  },
  {
    id: 'ord-1037',
    orderNumber: 1037,
    customerName: 'Alex P.',
    customerPhone: '+1 555-0100',
    fulfillmentType: 'Delivery',
    status: 'Completed',
    totalAmount: 27,
    createdAt: '2026-08-12T20:45:00Z',
    itemsSummary: '1x BBQ Chicken, 1x Caesar Salad',
    details: {
      id: 'ord-1037',
      orderNumber: 1037,
      customerName: 'Alex P.',
      customerPhone: '+1 555-0100',
      telegramChatId: '@tg_89221',
      fulfillmentType: 'Delivery',
      deliveryAddress: '88 Pine Avenue',
      status: 'Completed',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      totalAmount: 27,
      createdAt: '2026-08-12T20:45:00Z',
      updatedAt: '2026-08-12T21:00:00Z',
      readyAt: null,
      items: [],
      timeline: [{ label: 'Order placed', timestamp: '2026-08-12T20:45:00Z' }],
    },
  },
  {
    id: 'ord-1034',
    orderNumber: 1034,
    customerName: 'Alex P.',
    customerPhone: '+1 555-0100',
    fulfillmentType: 'Pickup',
    status: 'Completed',
    totalAmount: 24,
    createdAt: '2026-08-11T17:15:00Z',
    itemsSummary: '1x Margherita, 1x Garlic Knots',
    details: {
      id: 'ord-1034',
      orderNumber: 1034,
      customerName: 'Alex P.',
      customerPhone: '+1 555-0100',
      telegramChatId: '@tg_89221',
      fulfillmentType: 'Pickup',
      deliveryAddress: 'Counter Pickup',
      status: 'Completed',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      totalAmount: 24,
      createdAt: '2026-08-11T17:15:00Z',
      updatedAt: '2026-08-11T17:30:00Z',
      readyAt: null,
      items: [],
      timeline: [{ label: 'Order placed', timestamp: '2026-08-11T17:15:00Z' }],
    },
  },
  {
    id: 'ord-1032',
    orderNumber: 1032,
    customerName: 'Alex P.',
    customerPhone: '+1 555-0100',
    fulfillmentType: 'Delivery',
    status: 'Completed',
    totalAmount: 31,
    createdAt: '2026-08-10T16:50:00Z',
    itemsSummary: '1x Pepperoni Feast, 1x Tiramisu',
    details: {
      id: 'ord-1032',
      orderNumber: 1032,
      customerName: 'Alex P.',
      customerPhone: '+1 555-0100',
      telegramChatId: '@tg_89221',
      fulfillmentType: 'Delivery',
      deliveryAddress: '12 Main Street',
      status: 'Completed',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      totalAmount: 31,
      createdAt: '2026-08-10T16:50:00Z',
      updatedAt: '2026-08-10T17:05:00Z',
      readyAt: null,
      items: [],
      timeline: [{ label: 'Order placed', timestamp: '2026-08-10T16:50:00Z' }],
    },
  },
  {
    id: 'ord-1031',
    orderNumber: 1031,
    customerName: 'Emily Carter',
    customerPhone: '+1 555-0103',
    fulfillmentType: 'Delivery',
    status: 'Cancelled',
    totalAmount: 16,
    createdAt: '2026-08-10T15:05:00Z',
    itemsSummary: '1x Pepperoni Feast',
    details: {
      id: 'ord-1031',
      orderNumber: 1031,
      customerName: 'Emily Carter',
      customerPhone: '+1 555-0103',
      telegramChatId: '@tg_99102',
      fulfillmentType: 'Delivery',
      deliveryAddress: '55 Elm Street',
      status: 'Cancelled',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      totalAmount: 16,
      createdAt: '2026-08-10T15:05:00Z',
      updatedAt: '2026-08-10T15:10:00Z',
      readyAt: null,
      items: [],
      timeline: [{ label: 'Cancelled', timestamp: '2026-08-10T15:10:00Z' }],
    },
  },
  {
    id: 'ord-1030',
    orderNumber: 1030,
    customerName: 'Ben Torres',
    customerPhone: '+1 555-0104',
    fulfillmentType: 'Pickup',
    status: 'Cancelled',
    totalAmount: 34,
    createdAt: '2026-08-09T16:50:00Z',
    itemsSummary: '1x Pepperoni Feast, 1x Tiramisu',
    details: {
      id: 'ord-1030',
      orderNumber: 1030,
      customerName: 'Ben Torres',
      customerPhone: '+1 555-0104',
      telegramChatId: '@tg_66102',
      fulfillmentType: 'Pickup',
      deliveryAddress: 'Counter Pickup',
      status: 'Cancelled',
      paymentMethod: 'Cash',
      paymentStatus: 'Paid',
      totalAmount: 34,
      createdAt: '2026-08-09T16:50:00Z',
      updatedAt: '2026-08-09T17:00:00Z',
      readyAt: null,
      items: [],
      timeline: [{ label: 'Cancelled', timestamp: '2026-08-09T17:00:00Z' }],
    },
  },
]

let missingDetailsOrderId: string | null = null

function parseHistoryQuery(url: URL) {
  return {
    searchTerm: url.searchParams.get('searchTerm')?.toLowerCase() ?? '',
    status: url.searchParams.get('status')?.toLowerCase() ?? 'all',
    startDate: url.searchParams.get('startDate') ?? '',
    endDate: url.searchParams.get('endDate') ?? '',
    page: Number(url.searchParams.get('page') ?? '1'),
    pageSize: Number(url.searchParams.get('pageSize') ?? '10'),
  }
}

function filterOrders(query: ReturnType<typeof parseHistoryQuery>) {
  return SEED_ORDERS.filter((order) => {
    if (query.status === 'completed' && order.status !== 'Completed') return false
    if (query.status === 'cancelled' && order.status !== 'Cancelled') return false

    if (query.searchTerm) {
      const haystack = `${order.customerName} ${order.orderNumber}`.toLowerCase()
      if (!haystack.includes(query.searchTerm)) return false
    }

    if (query.startDate) {
      const start = new Date(`${query.startDate}T00:00:00Z`).getTime()
      if (new Date(order.createdAt).getTime() < start) return false
    }

    if (query.endDate) {
      const end = new Date(`${query.endDate}T23:59:59.999Z`).getTime()
      if (new Date(order.createdAt).getTime() > end) return false
    }

    return true
  }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

function buildHistoryResponse(url: URL) {
  const query = parseHistoryQuery(url)
  const filtered = filterOrders(query)
  const totalEntries = filtered.length
  const totalPages = totalEntries === 0 ? 0 : Math.ceil(totalEntries / query.pageSize)
  const start = (query.page - 1) * query.pageSize
  const items = filtered.slice(start, start + query.pageSize).map(({ details: _details, ...item }) => item)

  return {
    items,
    totalEntries,
    totalPages,
    page: query.page,
    pageSize: query.pageSize,
  }
}

export function resetOrderHistoryForTests() {
  missingDetailsOrderId = null
}

export function installOrderHistoryFetchMock(options?: { missingDetailsOrderId?: string }) {
  missingDetailsOrderId = options?.missingDetailsOrderId ?? null

  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL) => {
      const url = new URL(typeof input === 'string' ? input : input.toString())

      if (url.pathname.endsWith('/api/orders/history')) {
        return new Response(JSON.stringify(buildHistoryResponse(url)), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const detailsMatch = url.pathname.match(/\/api\/orders\/([^/]+)\/details$/)
      if (detailsMatch) {
        const orderId = detailsMatch[1]

        if (missingDetailsOrderId === orderId) {
          return new Response(
            JSON.stringify({
              code: 'ORDER_NOT_FOUND',
              message: `Order '${orderId}' was not found.`,
            }),
            { status: 404, headers: { 'Content-Type': 'application/json' } },
          )
        }

        const order = SEED_ORDERS.find((entry) => entry.id === orderId)
        if (!order) {
          return new Response(
            JSON.stringify({
              code: 'ORDER_NOT_FOUND',
              message: `Order '${orderId}' was not found.`,
            }),
            { status: 404, headers: { 'Content-Type': 'application/json' } },
          )
        }

        return new Response(JSON.stringify(order.details), {
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
