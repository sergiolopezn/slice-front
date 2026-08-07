import { describe, expect, it } from 'vitest'
import type { LiveOrder } from '@/shared/api'
import {
  formatElapsedTimer,
  mapLiveOrderToTicket,
} from '@/features/live-orders/api/mapLiveOrderToTicket'

const sampleOrder: LiveOrder = {
  id: 'ord-402',
  orderNumber: 402,
  customerName: 'Marco Rossi',
  customerPhone: '+15550199',
  fulfillmentType: 'Delivery',
  status: 'New',
  totalAmount: 22.5,
  createdAt: '2026-08-05T19:08:00Z',
  items: [
    {
      id: 'item-1',
      menuItemName: 'Buffalo Wings',
      size: 'Large',
      quantity: 12,
      unitPrice: 18,
      modifiers: 'Extra crispy',
    },
  ],
}

describe('mapLiveOrderToTicket', () => {
  it('formats order number, timer, and line items from API payload', () => {
    const nowMs = new Date('2026-08-05T19:20:06Z').getTime()
    const ticket = mapLiveOrderToTicket(sampleOrder, nowMs)

    expect(ticket.orderNumber).toBe('#402')
    expect(ticket.timer).toBe('12:06')
    expect(ticket.status).toBe('New')
    expect(ticket.metadata.customerName).toBe('Marco Rossi')
    expect(ticket.metadata.distance).toBe('Delivery')
    expect(ticket.metadata.serverName).toBe('+15550199')
    expect(ticket.items[0]?.label).toBe('12x Buffalo Wings')
    expect(ticket.items[0]?.modifiers).toBe('Extra crispy')
  })
})

describe('formatElapsedTimer', () => {
  it('never returns negative elapsed time', () => {
    const future = new Date('2030-01-01T00:00:00Z').getTime()
    expect(formatElapsedTimer('2030-01-01T00:01:00Z', future)).toBe('00:00')
  })
})
