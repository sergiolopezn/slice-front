import { Button, type ButtonVariant } from '@/shared/components/ui'
import type { OrderPhase } from '../types/order'

type StatusActionButtonProps = {
  status: OrderPhase
  onAction: () => void
  disabled?: boolean
}

const actionConfig: Record<
  Exclude<OrderPhase, 'PENDING_REVIEW'>,
  { label: string; variant: ButtonVariant }
> = {
  URGENT: { label: 'Bump Order', variant: 'bump' },
  IN_OVEN: { label: 'Check Temp', variant: 'check-temp' },
  READY: { label: 'Complete', variant: 'complete' },
}

export function StatusActionButton({ status, onAction, disabled }: StatusActionButtonProps) {
  if (status === 'PENDING_REVIEW') return null

  const config = actionConfig[status]

  return (
    <Button variant={config.variant} onClick={onAction} disabled={disabled}>
      {config.label}
    </Button>
  )
}
