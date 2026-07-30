import type { DeliveryType } from '../types/orderHistory'
import { DeliveryIcon, PickupIcon } from './icons'

type DeliveryTypeBadgeProps = {
  type: DeliveryType
}

export function DeliveryTypeBadge({ type }: DeliveryTypeBadgeProps) {
  const isPickup = type === 'pickup'

  return (
    <span
      data-testid={`delivery-type-${type}`}
      className="inline-flex items-center gap-1.5 rounded-lg bg-status-idle-gray px-2.5 py-1 text-xs font-medium text-white"
    >
      <span aria-hidden="true">{isPickup ? '🛍️' : '🛵'}</span>
      {isPickup ? <PickupIcon /> : <DeliveryIcon />}
      {isPickup ? 'Pickup' : 'Delivery'}
    </span>
  )
}
