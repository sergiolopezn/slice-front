import type { ReactNode } from 'react'
import { Card } from '@/shared/components/ui'

type KpiCardProps = {
  label: string
  children: ReactNode
  isRush?: boolean
  className?: string
}

export function KpiCard({ label, children, isRush, className = '' }: KpiCardProps) {
  return (
    <Card
      className={`p-5 ${isRush ? 'border-l-4 border-l-status-urgent-red' : ''} ${className}`}
      data-testid={`kpi-card-${label.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</p>
      <div className="mt-3">{children}</div>
    </Card>
  )
}
