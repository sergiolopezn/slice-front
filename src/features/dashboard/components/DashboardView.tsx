import { useDashboardQuery } from '../hooks/useDashboardQuery'
import { useStoreControlToggle } from '../hooks/useStoreControls'
import { ActivityFeed } from './ActivityFeed'
import { KpiSummaryRow } from './KpiSummaryRow'
import { StationCapacitySection } from './StationCapacityCard'
import { StoreControlsPanel } from './StoreControlToggleCard'

export function DashboardView() {
  const { data, isLoading, isError } = useDashboardQuery()
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
      </main>
    )
  }

  return (
    <main aria-label="Dashboard page" className="min-h-screen bg-bg-app p-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>

      <div className="mt-6 space-y-6">
        <KpiSummaryRow kpis={data.kpis} />

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
