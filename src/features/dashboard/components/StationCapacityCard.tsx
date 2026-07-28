import { Card } from '@/shared/components/ui'
import { getCapacityColorClass, type StationCapacity } from '../types/dashboard'

type StationCapacityCardProps = {
  station: StationCapacity
}

export function StationCapacityCard({ station }: StationCapacityCardProps) {
  const fillClass = getCapacityColorClass(station.capacityPercent)

  return (
    <div className="space-y-2" data-testid={`station-${station.id}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-white">{station.name}</span>
        <span className="font-mono text-xs text-text-muted">
          {station.ticketCount} Tickets · {station.capacityPercent}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-status-idle-gray">
        <div
          className={`h-full rounded-full transition-all ${fillClass}`}
          style={{ width: `${station.capacityPercent}%` }}
          role="progressbar"
          aria-valuenow={station.capacityPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${station.name} capacity`}
          data-testid={`station-bar-${station.id}`}
        />
      </div>
    </div>
  )
}

type StationCapacitySectionProps = {
  stations: StationCapacity[]
}

export function StationCapacitySection({ stations }: StationCapacitySectionProps) {
  return (
    <Card className="p-5" data-testid="station-capacity-section">
      <h2 className="text-base font-bold text-white">Kitchen Capacity &amp; Station Health</h2>
      <div className="mt-4 space-y-5">
        {stations.map((station) => (
          <StationCapacityCard key={station.id} station={station} />
        ))}
      </div>
    </Card>
  )
}
