import { Card, OrderCardHeader } from '@/shared/components/ui'
import { statusToHeaderStatus, type OrderTicket } from '../types/order'
import { OrderItemRow } from './OrderItemRow'
import { StatusActionButton } from './StatusActionButton'

type TicketCardProps = {
  order: OrderTicket
  onAdvance: (orderId: string) => void
  isAdvancing?: boolean
}

export function TicketCard({ order, onAdvance, isAdvancing }: TicketCardProps) {
  const { metadata } = order

  return (
    <Card className="w-80 shrink-0" data-testid={`ticket-${order.id}`}>
      <OrderCardHeader
        orderNumber={order.orderNumber}
        timer={order.timer}
        status={statusToHeaderStatus(order.status)}
      />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="text-base font-bold text-white">{metadata.customerName}</h3>
          <dl className="mt-2 space-y-1 font-mono text-xs text-text-muted">
            {metadata.distance ? (
              <div className="flex justify-between gap-2">
                <dt>Fulfillment</dt>
                <dd>{metadata.distance}</dd>
              </div>
            ) : null}
            {metadata.serverName ? (
              <div className="flex justify-between gap-2">
                <dt>Contact</dt>
                <dd>{metadata.serverName}</dd>
              </div>
            ) : null}
            {metadata.pickupRackId ? (
              <div className="flex justify-between gap-2">
                <dt>Rack</dt>
                <dd>{metadata.pickupRackId}</dd>
              </div>
            ) : null}
            {metadata.prepInstructions ? (
              <div>
                <dt>Prep</dt>
                <dd className="text-zinc-300">{metadata.prepInstructions}</dd>
              </div>
            ) : null}
            {metadata.isPrePaid ? (
              <div className="text-status-ready-mint">Pre-paid</div>
            ) : null}
          </dl>
        </div>

        <div className="border-t border-surface-border pt-3">
          {order.items.map((item) => (
            <OrderItemRow key={item.id} orderId={order.id} item={item} />
          ))}
        </div>
      </div>

      <div className="p-4 pt-0">
        <StatusActionButton
          status={order.status}
          onAction={() => onAdvance(order.id)}
          disabled={isAdvancing}
        />
      </div>
    </Card>
  )
}
