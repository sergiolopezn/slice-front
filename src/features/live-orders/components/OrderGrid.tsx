import type { OrderTicket } from '../types/order'
import { TicketCard } from './TicketCard'

type OrderGridProps = {
  orders: OrderTicket[]
  onAdvance: (orderId: string) => void
  advancingOrderId?: string | null
  showPendingPlaceholder?: boolean
}

export function OrderGrid({
  orders,
  onAdvance,
  advancingOrderId,
  showPendingPlaceholder = true,
}: OrderGridProps) {
  const pendingPlaceholder: OrderTicket = {
    id: 'pending-placeholder',
    orderNumber: '—',
    timer: '—',
    status: 'PENDING_REVIEW',
    metadata: { customerName: '' },
    items: [],
  }

  const tickets = showPendingPlaceholder
    ? [...orders, pendingPlaceholder]
    : orders

  return (
    <div
      className="flex gap-6 overflow-x-auto pb-2"
      data-testid="order-grid"
    >
      {tickets.map((order) => (
        <TicketCard
          key={order.id}
          order={order}
          onAdvance={onAdvance}
          isAdvancing={advancingOrderId === order.id}
        />
      ))}
    </div>
  )
}
