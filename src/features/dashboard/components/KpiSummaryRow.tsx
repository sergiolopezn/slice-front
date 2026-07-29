import { Badge } from '@/shared/components/ui'
import type { KpiMetric } from '../types/dashboard'
import { KpiCard } from './KpiCard'
import { TrendUpIcon } from './icons'

type KpiSummaryRowProps = {
  kpis: KpiMetric[]
  onReviewCapacity?: () => void
}

export function KpiSummaryRow({ kpis, onReviewCapacity }: KpiSummaryRowProps) {
  return (
    <section aria-label="KPI summary" data-testid="kpi-summary-row">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.id} label={kpi.label} isRush={kpi.isRush}>
            <p
              className={`font-mono text-2xl font-bold ${kpi.isRush ? 'text-status-urgent-red' : 'text-white'}`}
            >
              {kpi.value}
            </p>

            {kpi.subtitle ? (
              <p className="mt-2 text-sm text-text-muted">{kpi.subtitle}</p>
            ) : null}

            {kpi.trend ? (
              <div className="mt-3">
                <Badge
                  variant={kpi.trend.variant === 'positive' ? 'ready' : 'cod'}
                  className="inline-flex items-center gap-1"
                >
                  {kpi.trend.variant === 'positive' ? <TrendUpIcon /> : null}
                  {kpi.trend.label}
                </Badge>
              </div>
            ) : null}

            {kpi.warning ? (
              <p className="mt-2 text-sm font-medium text-status-prep-amber">{kpi.warning}</p>
            ) : null}

            {kpi.actionLabel ? (
              <button
                type="button"
                onClick={onReviewCapacity}
                className="mt-4 min-h-12 w-full rounded-xl border-2 border-status-urgent-red px-4 py-2 text-sm font-bold uppercase tracking-wider text-status-urgent-red transition-colors hover:bg-status-urgent-red hover:text-white"
              >
                {kpi.actionLabel}
              </button>
            ) : null}
          </KpiCard>
        ))}
      </div>
    </section>
  )
}
