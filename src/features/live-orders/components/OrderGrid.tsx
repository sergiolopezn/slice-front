import type { OrderTicket } from '../types/order'
import { TicketCard } from './TicketCard'

type OrderGridProps = {
  orders: OrderTicket[]
  onAdvance: (orderId: string) => void
  advancingOrderId?: string | null
}

export function OrderGrid({ orders, onAdvance, advancingOrderId }: OrderGridProps) {
  return (
    <div
      className="flex gap-6 overflow-x-auto pb-2"
      data-testid="order-grid"
    >
      {orders.map((order) => (
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
