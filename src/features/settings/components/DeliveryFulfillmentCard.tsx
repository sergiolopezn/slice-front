import { Card } from '@/shared/components/ui'
import type { StoreSettingsSnapshot } from '../types/settings'
import { TruckIcon } from './icons'
import { SettingsToggle } from './SettingsToggle'

type DeliveryFulfillmentCardProps = {
  settings: Pick<
    StoreSettingsSnapshot,
    'deliveryFee' | 'minimumOrderAmount' | 'allowDelivery' | 'allowPickup'
  >
  disabled?: boolean
  onChange: (updates: {
    deliveryFee?: number
    minimumOrderAmount?: number
    allowDelivery?: boolean
    allowPickup?: boolean
  }) => void
}

export function DeliveryFulfillmentCard({
  settings,
  disabled,
  onChange,
}: DeliveryFulfillmentCardProps) {
  return (
    <Card className="p-5" data-testid="delivery-fulfillment-card">
      <div className="flex items-center gap-3">
        <TruckIcon className="text-text-muted" />
        <h2 className="text-base font-bold text-white">Delivery & Fulfillment</h2>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-text-muted">Flat Delivery Fee ($)</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={settings.deliveryFee}
            disabled={disabled}
            data-testid="delivery-fee-input"
            onChange={(event) => onChange({ deliveryFee: Number(event.target.value) })}
            className="mt-2 min-h-12 w-full rounded-xl border border-surface-border bg-bg-app px-4 py-2 font-mono text-sm text-white"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-text-muted">Minimum Order Amount ($)</span>
          <input
            type="number"
            min="0"
            step="0.5"
            value={settings.minimumOrderAmount}
            disabled={disabled}
            data-testid="minimum-order-input"
            onChange={(event) => onChange({ minimumOrderAmount: Number(event.target.value) })}
            className="mt-2 min-h-12 w-full rounded-xl border border-surface-border bg-bg-app px-4 py-2 font-mono text-sm text-white"
          />
        </label>
      </div>

      <div className="mt-5 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <label htmlFor="allow-delivery-toggle" className="text-sm font-medium text-white">
            Allow Delivery
          </label>
          <SettingsToggle
            id="allow-delivery-toggle"
            label="Allow Delivery"
            checked={settings.allowDelivery}
            disabled={disabled}
            onChange={(allowDelivery) => onChange({ allowDelivery })}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label htmlFor="allow-pickup-toggle" className="text-sm font-medium text-white">
            Allow Pickup
          </label>
          <SettingsToggle
            id="allow-pickup-toggle"
            label="Allow Pickup"
            checked={settings.allowPickup}
            disabled={disabled}
            onChange={(allowPickup) => onChange({ allowPickup })}
          />
        </div>
      </div>
    </Card>
  )
}
