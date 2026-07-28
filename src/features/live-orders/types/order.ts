export type OrderPhase = 'URGENT' | 'IN_OVEN' | 'READY' | 'PENDING_REVIEW'

export type OrderLineItem = {
  id: string
  label: string
  modifiers?: string
}

export type OrderMetadata = {
  customerName: string
  distance?: string
  serverName?: string
  pickupRackId?: string
  prepInstructions?: string
  isPrePaid?: boolean
}

export type OrderTicket = {
  id: string
  orderNumber: string
  timer: string
  status: OrderPhase
  metadata: OrderMetadata
  items: OrderLineItem[]
}

export function phaseToHeaderStatus(
  phase: OrderPhase,
): 'rush' | 'prep' | 'ready' | 'pending' {
  switch (phase) {
    case 'URGENT':
      return 'rush'
    case 'IN_OVEN':
      return 'prep'
    case 'READY':
      return 'ready'
    case 'PENDING_REVIEW':
      return 'pending'
  }
}

export function nextPhase(phase: OrderPhase): OrderPhase | null {
  switch (phase) {
    case 'URGENT':
      return 'IN_OVEN'
    case 'IN_OVEN':
      return 'READY'
    case 'READY':
      return null
    case 'PENDING_REVIEW':
      return null
  }
}
