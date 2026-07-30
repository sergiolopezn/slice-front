import { Button } from '@/shared/components/ui'
import type { HistoricalOrder } from '../types/orderHistory'
import { formatOrderTotal } from '../types/orderHistory'
import { DeliveryTypeBadge } from './DeliveryTypeBadge'
import { CloseIcon } from './icons'
import { OrderStatusBadge } from './OrderStatusBadge'

type OrderDetailDrawerProps = {
  order: HistoricalOrder
  onClose: () => void
}

export function OrderDetailDrawer({ order, onClose }: OrderDetailDrawerProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close order details"
        data-testid="order-drawer-backdrop"
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`Order details for ${order.orderNumber}`}
        data-testid="order-detail-drawer"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-surface-border bg-surface-card shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-surface-border p-6">
          <div>
            <p className="font-mono text-lg font-bold text-white">{order.orderNumber}</p>
            <h2 className="mt-1 text-xl font-bold text-white">{order.customerName}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <DeliveryTypeBadge type={order.deliveryType} />
              <OrderStatusBadge status={order.status} />
            </div>
          </div>

          <button
            type="button"
            aria-label="Close drawer"
            data-testid="order-drawer-close"
            onClick={onClose}
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-status-idle-gray hover:text-white"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <section aria-label="Customer metadata" className="space-y-2 text-sm">
            <p className="text-text-muted">
              <span className="font-bold text-white">Fulfillment:</span>{' '}
              {order.deliveryType === 'pickup' ? 'Pickup' : 'Delivery'}
            </p>
            <p className="text-text-muted">
              <span className="font-bold text-white">Telegram Chat ID:</span>{' '}
              <span data-testid="order-drawer-telegram-id">{order.telegramChatId}</span>
            </p>
            <p className="text-text-muted">
              <span className="font-bold text-white">Address:</span> {order.fulfillmentAddress}
            </p>
          </section>

          <section aria-label="Item breakdown" className="mt-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
              Item Breakdown
            </h3>
            <ul className="mt-3 space-y-3">
              {order.lineItems.map((item) => (
                <li
                  key={item.id}
                  data-testid={`drawer-line-item-${item.id}`}
                  className="rounded-xl border border-surface-border bg-bg-app p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium text-white">
                        {item.quantity}x {item.name}
                      </p>
                      {item.modifiers?.length ? (
                        <p className="mt-1 font-mono text-xs text-text-muted">
                          {item.modifiers.join(', ')}
                        </p>
                      ) : null}
                    </div>
                    <p className="font-mono text-sm text-status-prep-amber">
                      {formatOrderTotal(item.price)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-right font-mono text-lg font-bold text-white">
              Total {formatOrderTotal(order.total)}
            </p>
          </section>

          <section aria-label="Order timeline" className="mt-6" data-testid="order-drawer-timeline">
            <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
              Order Timeline
            </h3>
            <ol className="mt-3 space-y-3 border-l-2 border-status-ready-mint pl-4">
              {order.timeline.map((event) => (
                <li key={event.id} className="relative">
                  <span className="absolute -left-[1.35rem] top-1 size-2 rounded-full bg-status-ready-mint" />
                  <p className="font-medium text-white">{event.label}</p>
                  <p className="font-mono text-xs text-text-muted">{event.timestamp}</p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="flex gap-3 border-t border-surface-border p-6">
          <button
            type="button"
            data-testid="reprint-receipt"
            className="min-h-12 flex-1 rounded-xl border border-surface-border px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-status-idle-gray"
          >
            Re-print Receipt
          </button>
          <Button variant="bump" data-testid="refund-order" className="flex-1">
            Refund Order
          </Button>
        </div>
      </aside>
    </>
  )
}
