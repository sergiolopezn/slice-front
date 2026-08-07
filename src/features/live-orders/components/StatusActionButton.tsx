import { Button, type ButtonVariant } from '@/shared/components/ui'
import type { OrderStatus } from '../types/order'

type StatusActionButtonProps = {
  status: OrderStatus
  onAction: () => void
  disabled?: boolean
}

const actionConfig: Record<
  Exclude<OrderStatus, 'Completed' | 'Cancelled'>,
  { label: string; variant: ButtonVariant }
> = {
  New: { label: 'Bump Order', variant: 'bump' },
  InPrep: { label: 'To Oven', variant: 'check-temp' },
  InOven: { label: 'Check Temp', variant: 'check-temp' },
  Ready: { label: 'Complete', variant: 'complete' },
}

export function StatusActionButton({ status, onAction, disabled }: StatusActionButtonProps) {
  if (status === 'Completed' || status === 'Cancelled') return null

  const config = actionConfig[status]

  return (
    <Button variant={config.variant} onClick={onAction} disabled={disabled}>
      {config.label}
    </Button>
  )
}
