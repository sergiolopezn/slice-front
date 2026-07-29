import { useDashboardQuery } from '../hooks/useDashboardQuery'
import { useStoreControlToggle } from '../hooks/useStoreControls'
import { ActivityFeed } from './ActivityFeed'
import { KpiSummaryRow } from './KpiSummaryRow'
import { StationCapacitySection } from './StationCapacityCard'
import { StoreControlsPanel } from './StoreControlToggleCard'

function scrollToStationCapacity() {
  document.getElementById('station-capacity-section')?.scrollIntoView({ behavior: 'smooth' })
}

export function DashboardView() {
  const { data, isLoading, isError, refetch } = useDashboardQuery()
  const toggleControl = useStoreControlToggle()

  if (isLoading) {
    return (
      <main aria-label="Dashboard page" className="min-h-screen bg-bg-app p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="mt-4 text-text-muted">Loading dashboard…</p>
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main aria-label="Dashboard page" className="min-h-screen bg-bg-app p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="mt-4 text-status-urgent-red">Unable to load dashboard.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 min-h-12 rounded-xl bg-status-prep-amber px-4 py-2 text-sm font-bold text-black"
        >
          Retry
        </button>
      </main>
    )
  }

  return (
    <main aria-label="Dashboard page" className="min-h-screen bg-bg-app p-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>

      <div className="mt-6 space-y-6">
        <KpiSummaryRow kpis={data.kpis} onReviewCapacity={scrollToStationCapacity} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <StationCapacitySection stations={data.stations} />
            <StoreControlsPanel
              controls={data.storeControls}
              onToggle={(channel, enabled) =>
                toggleControl.mutate({ channel, enabled })
              }
              isUpdating={toggleControl.isPending}
            />
          </div>

          <ActivityFeed events={data.activity} />
        </div>
      </div>
    </main>
  )
}
