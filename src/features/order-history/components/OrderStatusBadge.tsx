import { Badge } from '@/shared/components/ui'
import type { OrderStatus } from '../types/orderHistory'

const statusConfig: Record<OrderStatus, { label: string; variant: 'ready' | 'rush' }> = {
  completed: { label: 'COMPLETED', variant: 'ready' },
  cancelled: { label: 'CANCELLED', variant: 'rush' },
}

type OrderStatusBadgeProps = {
  status: OrderStatus
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} data-testid={`order-status-${status}`}>
      {config.label}
    </Badge>
  )
}
