import type { HistoricalOrder } from '../types/orderHistory'
import { formatOrderTotal } from '../types/orderHistory'
import { DeliveryTypeBadge } from './DeliveryTypeBadge'
import { OrderStatusBadge } from './OrderStatusBadge'

type OrderHistoryTableProps = {
  orders: HistoricalOrder[]
  onViewDetails: (orderId: string) => void
}

export function OrderHistoryTable({ orders, onViewDetails }: OrderHistoryTableProps) {
  if (orders.length === 0) {
    return (
      <p className="rounded-2xl border border-surface-border bg-surface-card p-6 text-text-muted" data-testid="order-history-empty">
        No orders match your search or filters.
      </p>
    )
  }

  return (
    <div
      className="overflow-x-auto rounded-2xl border border-surface-border bg-surface-card"
      data-testid="order-history-table"
    >
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-surface-border bg-bg-app">
          <tr>
            {[
              'ORDER ID',
              'DATE & TIME',
              'CUSTOMER',
              'DELIVERY TYPE',
              'ITEMS SUMMARY',
              'TOTAL',
              'PAYMENT',
              'STATUS',
              'ACTIONS',
            ].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-text-muted"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              data-testid={`order-row-${order.id}`}
              className="border-b border-surface-border last:border-b-0"
            >
              <td className="px-4 py-4 font-mono font-bold text-white">{order.orderNumber}</td>
              <td className="px-4 py-4 text-text-muted">{order.dateTimeLabel}</td>
              <td className="px-4 py-4 font-medium text-white">{order.customerName}</td>
              <td className="px-4 py-4">
                <DeliveryTypeBadge type={order.deliveryType} />
              </td>
              <td className="px-4 py-4 text-text-muted">{order.itemsSummary}</td>
              <td className="px-4 py-4 font-mono font-bold text-status-prep-amber">
                {formatOrderTotal(order.total)}
              </td>
              <td className="px-4 py-4 text-text-muted">{order.paymentLabel}</td>
              <td className="px-4 py-4">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-4 py-4">
                <button
                  type="button"
                  data-testid={`view-details-${order.id}`}
                  onClick={() => onViewDetails(order.id)}
                  className="min-h-12 rounded-xl border border-surface-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-status-idle-gray"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
