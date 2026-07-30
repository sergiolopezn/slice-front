import type { HistoricalOrder, OrderHistorySnapshot } from '../types/orderHistory'

const LATENCY_MS = 120
const DISPLAY_TOTAL_COUNT = 1284

const SEED_ORDERS: HistoricalOrder[] = [
  {
    id: 'ord-1040',
    orderNumber: '#1040',
    dateTimeLabel: 'Today, 2:15 PM',
    customerName: 'Alex P.',
    deliveryType: 'pickup',
    itemsSummary: '1x Large Veggie, 1x Garlic Knots',
    lineItems: [
      { id: 'li-1', name: 'Large Veggie', quantity: 1, modifiers: ['Extra Basil'], price: 16 },
      { id: 'li-2', name: 'Garlic Knots', quantity: 1, price: 6.5 },
    ],
    total: 22.5,
    paymentLabel: 'Paid via Bot',
    status: 'completed',
    telegramChatId: '@tg_89221',
    fulfillmentAddress: 'Counter Pickup — Front Register',
    timeline: [
      { id: 't1', label: 'Order Accepted', timestamp: '2:05 PM' },
      { id: 't2', label: 'Cooking Started', timestamp: '2:08 PM' },
      { id: 't3', label: 'Ready for Pickup', timestamp: '2:13 PM' },
      { id: 't4', label: 'Order Completed', timestamp: '2:15 PM' },
    ],
  },
  {
    id: 'ord-1039',
    orderNumber: '#1039',
    dateTimeLabel: 'Today, 1:48 PM',
    customerName: 'Maria Lopez',
    deliveryType: 'delivery',
    itemsSummary: '1x Pepperoni Feast, 1x Craft Soda',
    lineItems: [
      { id: 'li-3', name: 'Pepperoni Feast', quantity: 1, price: 16 },
      { id: 'li-4', name: 'Craft Soda', quantity: 1, price: 3.5 },
    ],
    total: 19.5,
    paymentLabel: 'COD',
    status: 'completed',
    telegramChatId: '@tg_44102',
    fulfillmentAddress: '142 Oak Street, Apt 3B',
    timeline: [
      { id: 't5', label: 'Order Accepted', timestamp: '1:32 PM' },
      { id: 't6', label: 'Cooking Started', timestamp: '1:36 PM' },
      { id: 't7', label: 'Out for Delivery', timestamp: '1:50 PM' },
      { id: 't8', label: 'Order Completed', timestamp: '2:02 PM' },
    ],
  },
  {
    id: 'ord-1038',
    orderNumber: '#1038',
    dateTimeLabel: 'Today, 12:20 PM',
    customerName: 'David Chen',
    deliveryType: 'pickup',
    itemsSummary: '2x Margherita',
    lineItems: [{ id: 'li-5', name: 'Margherita', quantity: 2, price: 28 }],
    total: 28,
    paymentLabel: 'Paid via Bot',
    status: 'cancelled',
    telegramChatId: '@tg_77331',
    fulfillmentAddress: 'Counter Pickup — Side Window',
    timeline: [
      { id: 't9', label: 'Order Accepted', timestamp: '12:10 PM' },
      { id: 't10', label: 'Order Cancelled', timestamp: '12:18 PM' },
    ],
  },
  {
    id: 'ord-1037',
    orderNumber: '#1037',
    dateTimeLabel: 'Yesterday, 8:45 PM',
    customerName: 'Alex P.',
    deliveryType: 'delivery',
    itemsSummary: '1x BBQ Chicken, 1x Caesar Salad',
    lineItems: [
      { id: 'li-6', name: 'BBQ Chicken', quantity: 1, price: 18.5 },
      { id: 'li-7', name: 'Caesar Salad', quantity: 1, price: 8.5 },
    ],
    total: 27,
    paymentLabel: 'Paid via Bot',
    status: 'refunded',
    telegramChatId: '@tg_89221',
    fulfillmentAddress: '88 Pine Avenue',
    timeline: [
      { id: 't11', label: 'Order Accepted', timestamp: '8:20 PM' },
      { id: 't12', label: 'Cooking Started', timestamp: '8:25 PM' },
      { id: 't13', label: 'Refund Issued', timestamp: '8:50 PM' },
    ],
  },
  {
    id: 'ord-1036',
    orderNumber: '#1036',
    dateTimeLabel: 'Yesterday, 7:10 PM',
    customerName: 'Sofia Rivera',
    deliveryType: 'pickup',
    itemsSummary: '1x Truffle Funghi',
    lineItems: [{ id: 'li-8', name: 'Truffle Funghi', quantity: 1, price: 22 }],
    total: 22,
    paymentLabel: 'COD',
    status: 'completed',
    telegramChatId: '@tg_55201',
    fulfillmentAddress: 'Counter Pickup — Front Register',
    timeline: [
      { id: 't14', label: 'Order Accepted', timestamp: '6:55 PM' },
      { id: 't15', label: 'Cooking Started', timestamp: '7:00 PM' },
      { id: 't16', label: 'Ready for Pickup', timestamp: '7:08 PM' },
      { id: 't17', label: 'Order Completed', timestamp: '7:10 PM' },
    ],
  },
  {
    id: 'ord-1035',
    orderNumber: '#1035',
    dateTimeLabel: 'Yesterday, 5:30 PM',
    customerName: 'James Wu',
    deliveryType: 'delivery',
    itemsSummary: '1x Large Veggie, 2x Tiramisu',
    lineItems: [
      { id: 'li-9', name: 'Large Veggie', quantity: 1, price: 16 },
      { id: 'li-10', name: 'Tiramisu', quantity: 2, price: 14 },
    ],
    total: 30,
    paymentLabel: 'Paid via Bot',
    status: 'completed',
    telegramChatId: '@tg_99102',
    fulfillmentAddress: '501 River Road',
    timeline: [
      { id: 't18', label: 'Order Accepted', timestamp: '5:10 PM' },
      { id: 't19', label: 'Cooking Started', timestamp: '5:15 PM' },
      { id: 't20', label: 'Out for Delivery', timestamp: '5:28 PM' },
      { id: 't21', label: 'Order Completed', timestamp: '5:45 PM' },
    ],
  },
  {
    id: 'ord-1034',
    orderNumber: '#1034',
    dateTimeLabel: 'Yesterday, 3:05 PM',
    customerName: 'Emily Carter',
    deliveryType: 'pickup',
    itemsSummary: '1x Pepperoni Feast',
    lineItems: [{ id: 'li-11', name: 'Pepperoni Feast', quantity: 1, price: 16 }],
    total: 16,
    paymentLabel: 'Paid via Bot',
    status: 'cancelled',
    telegramChatId: '@tg_66119',
    fulfillmentAddress: 'Counter Pickup — Side Window',
    timeline: [
      { id: 't22', label: 'Order Accepted', timestamp: '2:50 PM' },
      { id: 't23', label: 'Order Cancelled', timestamp: '3:00 PM' },
    ],
  },
  {
    id: 'ord-1033',
    orderNumber: '#1033',
    dateTimeLabel: 'Jul 28, 1:15 PM',
    customerName: 'Alex P.',
    deliveryType: 'delivery',
    itemsSummary: '1x Margherita, 1x Garlic Knots',
    lineItems: [
      { id: 'li-12', name: 'Margherita', quantity: 1, price: 14 },
      { id: 'li-13', name: 'Garlic Knots', quantity: 1, price: 6.5 },
    ],
    total: 20.5,
    paymentLabel: 'COD',
    status: 'completed',
    telegramChatId: '@tg_89221',
    fulfillmentAddress: '210 Maple Court',
    timeline: [
      { id: 't24', label: 'Order Accepted', timestamp: '1:00 PM' },
      { id: 't25', label: 'Cooking Started', timestamp: '1:05 PM' },
      { id: 't26', label: 'Out for Delivery', timestamp: '1:12 PM' },
      { id: 't27', label: 'Order Completed', timestamp: '1:28 PM' },
    ],
  },
  {
    id: 'ord-1032',
    orderNumber: '#1032',
    dateTimeLabel: 'Jul 28, 11:40 AM',
    customerName: 'Noah Patel',
    deliveryType: 'pickup',
    itemsSummary: '1x BBQ Chicken',
    lineItems: [{ id: 'li-14', name: 'BBQ Chicken', quantity: 1, price: 18.5 }],
    total: 18.5,
    paymentLabel: 'Paid via Bot',
    status: 'refunded',
    telegramChatId: '@tg_11882',
    fulfillmentAddress: 'Counter Pickup — Front Register',
    timeline: [
      { id: 't28', label: 'Order Accepted', timestamp: '11:20 AM' },
      { id: 't29', label: 'Refund Issued', timestamp: '11:45 AM' },
    ],
  },
  {
    id: 'ord-1031',
    orderNumber: '#1031',
    dateTimeLabel: 'Jul 27, 9:05 PM',
    customerName: 'Olivia Grant',
    deliveryType: 'delivery',
    itemsSummary: '2x Craft Soda, 1x Caesar Salad',
    lineItems: [
      { id: 'li-15', name: 'Craft Soda', quantity: 2, price: 7 },
      { id: 'li-16', name: 'Caesar Salad', quantity: 1, price: 8.5 },
    ],
    total: 15.5,
    paymentLabel: 'Paid via Bot',
    status: 'completed',
    telegramChatId: '@tg_33441',
    fulfillmentAddress: '19 Cedar Lane',
    timeline: [
      { id: 't30', label: 'Order Accepted', timestamp: '8:50 PM' },
      { id: 't31', label: 'Out for Delivery', timestamp: '9:00 PM' },
      { id: 't32', label: 'Order Completed', timestamp: '9:18 PM' },
    ],
  },
  {
    id: 'ord-1030',
    orderNumber: '#1030',
    dateTimeLabel: 'Jul 27, 6:22 PM',
    customerName: 'Alex P.',
    deliveryType: 'pickup',
    itemsSummary: '1x Large Veggie',
    lineItems: [{ id: 'li-17', name: 'Large Veggie', quantity: 1, price: 16 }],
    total: 16,
    paymentLabel: 'Paid via Bot',
    status: 'completed',
    telegramChatId: '@tg_89221',
    fulfillmentAddress: 'Counter Pickup — Front Register',
    timeline: [
      { id: 't33', label: 'Order Accepted', timestamp: '6:10 PM' },
      { id: 't34', label: 'Ready for Pickup', timestamp: '6:18 PM' },
      { id: 't35', label: 'Order Completed', timestamp: '6:22 PM' },
    ],
  },
  {
    id: 'ord-1029',
    orderNumber: '#1029',
    dateTimeLabel: 'Jul 27, 4:50 PM',
    customerName: 'Ben Torres',
    deliveryType: 'delivery',
    itemsSummary: '1x Pepperoni Feast, 1x Tiramisu',
    lineItems: [
      { id: 'li-18', name: 'Pepperoni Feast', quantity: 1, price: 16 },
      { id: 'li-19', name: 'Tiramisu', quantity: 1, price: 7 },
    ],
    total: 23,
    paymentLabel: 'COD',
    status: 'cancelled',
    telegramChatId: '@tg_77220',
    fulfillmentAddress: '330 Lakeview Blvd',
    timeline: [
      { id: 't36', label: 'Order Accepted', timestamp: '4:35 PM' },
      { id: 't37', label: 'Order Cancelled', timestamp: '4:48 PM' },
    ],
  },
]

let orders = structuredClone(SEED_ORDERS)

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchOrderHistory(): Promise<OrderHistorySnapshot> {
  await delay(LATENCY_MS)

  return {
    orders: orders.map((order) => ({
      ...order,
      lineItems: order.lineItems.map((item) => ({ ...item, modifiers: item.modifiers ? [...item.modifiers] : undefined })),
      timeline: order.timeline.map((event) => ({ ...event })),
    })),
    displayTotalCount: DISPLAY_TOTAL_COUNT,
  }
}

export function resetOrderHistoryForTests() {
  orders = structuredClone(SEED_ORDERS)
}

export { SEED_ORDERS, DISPLAY_TOTAL_COUNT }
