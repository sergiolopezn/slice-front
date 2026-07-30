import { Card } from '@/shared/components/ui'
import type { DaySchedule, PauseDuration, StoreSettingsSnapshot } from '../types/settings'
import { PAUSE_DURATION_OPTIONS } from '../types/settings'
import { ClockIcon } from './icons'
import { SettingsToggle } from './SettingsToggle'

type StoreOperationsCardProps = {
  settings: Pick<StoreSettingsSnapshot, 'storePaused' | 'pauseDuration' | 'weeklySchedule'>
  disabled?: boolean
  onPauseChange: (storePaused: boolean, pauseDuration?: PauseDuration) => void
  onScheduleChange: (
    dayId: DaySchedule['id'],
    updates: Partial<Pick<DaySchedule, 'openTime' | 'closeTime' | 'closed'>>,
  ) => void
}

export function StoreOperationsCard({
  settings,
  disabled,
  onPauseChange,
  onScheduleChange,
}: StoreOperationsCardProps) {
  return (
    <Card className="p-5" data-testid="store-operations-card">
      <div className="flex items-center gap-3">
        <ClockIcon className="text-text-muted" />
        <h2 className="text-base font-bold text-white">Store Operations</h2>
      </div>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="master-pause-toggle" className="text-sm font-medium text-white">
          Pause All Telegram Orders
        </label>
        <SettingsToggle
          id="master-pause-toggle"
          label="Pause All Telegram Orders"
          checked={settings.storePaused}
          variant="pause"
          disabled={disabled}
          onChange={(storePaused) => onPauseChange(storePaused, settings.pauseDuration)}
        />
      </div>

      {settings.storePaused ? (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Pause Duration
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {PAUSE_DURATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                data-testid={`pause-duration-${option.value}`}
                disabled={disabled}
                onClick={() => onPauseChange(true, option.value)}
                className={`min-h-10 rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                  settings.pauseDuration === option.value
                    ? 'bg-nav-active text-nav-active-text'
                    : 'bg-status-idle-gray text-text-muted hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text-muted">
          Weekly Schedule
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-sm" data-testid="weekly-schedule-table">
            <thead>
              <tr className="border-b border-surface-border">
                <th className="px-2 py-2 text-xs font-bold uppercase text-text-muted">Day</th>
                <th className="px-2 py-2 text-xs font-bold uppercase text-text-muted">Open</th>
                <th className="px-2 py-2 text-xs font-bold uppercase text-text-muted">Close</th>
                <th className="px-2 py-2 text-xs font-bold uppercase text-text-muted">Closed</th>
              </tr>
            </thead>
            <tbody>
              {settings.weeklySchedule.map((day) => (
                <tr
                  key={day.id}
                  data-testid={`schedule-row-${day.id}`}
                  className={`border-b border-surface-border last:border-b-0 ${day.closed ? 'opacity-60' : ''}`}
                >
                  <td className="px-2 py-3 font-medium text-white">{day.label}</td>
                  <td className="px-2 py-3">
                    <input
                      type="time"
                      aria-label={`${day.label} open time`}
                      data-testid={`schedule-open-${day.id}`}
                      value={day.openTime}
                      disabled={disabled || day.closed}
                      onChange={(event) =>
                        onScheduleChange(day.id, { openTime: event.target.value })
                      }
                      className="rounded-lg border border-surface-border bg-bg-app px-2 py-1 font-mono text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <input
                      type="time"
                      aria-label={`${day.label} close time`}
                      data-testid={`schedule-close-${day.id}`}
                      value={day.closeTime}
                      disabled={disabled || day.closed}
                      onChange={(event) =>
                        onScheduleChange(day.id, { closeTime: event.target.value })
                      }
                      className="rounded-lg border border-surface-border bg-bg-app px-2 py-1 font-mono text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </td>
                  <td className="px-2 py-3">
                    <SettingsToggle
                      id={`schedule-closed-${day.id}`}
                      label={`${day.label} closed`}
                      checked={day.closed}
                      disabled={disabled}
                      onChange={(closed) => onScheduleChange(day.id, { closed })}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  )
}
