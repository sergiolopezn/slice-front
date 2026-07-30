import { Card } from '@/shared/components/ui'
import type { ChimeOption, StoreSettingsSnapshot } from '../types/settings'
import { CHIME_OPTIONS } from '../types/settings'
import { BellIcon } from './icons'

type KitchenAlertsCardProps = {
  settings: Pick<StoreSettingsSnapshot, 'chime' | 'delayAlertMinutes'>
  disabled?: boolean
  onChange: (updates: { chime?: ChimeOption; delayAlertMinutes?: number }) => void
}

export function KitchenAlertsCard({ settings, disabled, onChange }: KitchenAlertsCardProps) {
  return (
    <Card className="p-5" data-testid="kitchen-alerts-card">
      <div className="flex items-center gap-3">
        <BellIcon className="text-text-muted" />
        <h2 className="text-base font-bold text-white">Kitchen Display & Alerts</h2>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-text-muted">New Order Audio Chime</span>
        <select
          value={settings.chime}
          disabled={disabled}
          data-testid="chime-select"
          onChange={(event) => onChange({ chime: event.target.value as ChimeOption })}
          className="mt-2 min-h-12 w-full rounded-xl border border-surface-border bg-bg-app px-4 py-2 text-sm text-white"
        >
          {CHIME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-text-muted">
          Highlight Delayed Orders After (Minutes)
        </span>
        <input
          type="number"
          min="1"
          step="1"
          value={settings.delayAlertMinutes}
          disabled={disabled}
          data-testid="delay-alert-input"
          onChange={(event) => onChange({ delayAlertMinutes: Number(event.target.value) })}
          className="mt-2 min-h-12 w-full rounded-xl border border-surface-border bg-bg-app px-4 py-2 font-mono text-sm text-white"
        />
      </label>
    </Card>
  )
}
