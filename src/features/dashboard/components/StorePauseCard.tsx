import { useState } from 'react'
import { Card } from '@/shared/components/ui'
import { PauseIcon } from './icons'

type StorePauseCardProps = {
  isPaused: boolean
  onSubmit: (isPaused: boolean, reason: string) => void
  disabled?: boolean
}

export function StorePauseCard({ isPaused, onSubmit, disabled }: StorePauseCardProps) {
  const [reason, setReason] = useState('')
  const nextPaused = !isPaused
  const actionLabel = nextPaused ? 'Pause Store' : 'Resume Store'

  return (
    <section aria-label="Store pause control" data-testid="store-pause-panel">
      <h2 className="mb-3 text-base font-bold text-white">Quick Store Controls</h2>
      <Card className="gap-4 p-4">
        <div className="flex items-center gap-3">
          <span className="text-text-muted">
            <PauseIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-medium text-white">
              {isPaused ? 'Store is paused' : 'Store is accepting orders'}
            </p>
            <p className="text-xs text-text-muted">
              Pausing blocks new order intake across all channels.
            </p>
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-muted">
            Reason
          </span>
          <input
            type="text"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Kitchen overload, staffing, etc."
            className="w-full rounded-xl border border-surface-border bg-bg-app px-3 py-2 text-sm text-white"
            data-testid="store-pause-reason"
          />
        </label>

        <button
          type="button"
          disabled={disabled || reason.trim().length === 0}
          onClick={() => onSubmit(nextPaused, reason.trim())}
          className={`min-h-12 w-full rounded-xl px-4 py-2 text-sm font-bold uppercase tracking-wider transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
            nextPaused
              ? 'bg-status-urgent-red text-white hover:bg-red-600'
              : 'bg-status-ready-mint text-black hover:bg-emerald-300'
          }`}
          data-testid="store-pause-submit"
        >
          {actionLabel}
        </button>
      </Card>
    </section>
  )
}
