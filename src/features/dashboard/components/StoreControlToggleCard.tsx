import { Card } from '@/shared/components/ui'
import type { ReactNode } from 'react'
import type { StoreControl, StoreControlChannel } from '../types/dashboard'
import { PauseIcon, TruckIcon, UtensilsIcon } from './icons'

const iconMap: Record<StoreControlChannel, ReactNode> = {
  telegram: <PauseIcon className="h-5 w-5" />,
  'dine-in': <UtensilsIcon className="h-5 w-5" />,
  delivery: <TruckIcon className="h-5 w-5" />,
}

type StoreControlToggleCardProps = {
  control: StoreControl
  onToggle: (channel: StoreControlChannel, enabled: boolean) => void
  disabled?: boolean
}

export function StoreControlToggleCard({
  control,
  onToggle,
  disabled,
}: StoreControlToggleCardProps) {
  const switchId = `store-control-${control.id}`

  return (
    <Card
      className="flex-row items-center justify-between gap-4 p-4"
      data-testid={`store-control-${control.id}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-text-muted">{iconMap[control.id]}</span>
        <label htmlFor={switchId} className="text-sm font-medium text-white">
          {control.label}
        </label>
      </div>

      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={control.enabled}
        aria-label={control.label}
        disabled={disabled}
        onClick={() => onToggle(control.id, !control.enabled)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:opacity-50 ${
          control.enabled ? 'bg-status-ready-mint' : 'bg-status-idle-gray'
        }`}
      >
        <span
          className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition-transform ${
            control.enabled ? 'left-5' : 'left-0.5'
          }`}
        />
      </button>
    </Card>
  )
}

type StoreControlsPanelProps = {
  controls: StoreControl[]
  onToggle: (channel: StoreControlChannel, enabled: boolean) => void
  isUpdating?: boolean
}

export function StoreControlsPanel({ controls, onToggle, isUpdating }: StoreControlsPanelProps) {
  return (
    <section aria-label="Quick store controls" data-testid="store-controls-panel">
      <h2 className="mb-3 text-base font-bold text-white">Quick Store Controls</h2>
      <div className="space-y-3">
        {controls.map((control) => (
          <StoreControlToggleCard
            key={control.id}
            control={control}
            onToggle={onToggle}
            disabled={isUpdating}
          />
        ))}
      </div>
    </section>
  )
}
