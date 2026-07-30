export type PauseDuration = '15m' | '30m' | '1h' | 'manual'

export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type DaySchedule = {
  id: Weekday
  label: string
  openTime: string
  closeTime: string
  closed: boolean
}

export type ChimeOption = 'loud-chime' | 'buzzer' | 'bell' | 'mute'

export type NotificationTrigger = 'order-accepted' | 'in-oven' | 'ready'

export type NotificationTriggers = Record<NotificationTrigger, boolean>

export type StoreSettingsSnapshot = {
  storePaused: boolean
  pauseDuration: PauseDuration
  weeklySchedule: DaySchedule[]
  deliveryFee: number
  minimumOrderAmount: number
  allowDelivery: boolean
  allowPickup: boolean
  botHandle: string
  botConnected: boolean
  webhookUrl: string
  webhookLatencyMs: number
  notificationTriggers: NotificationTriggers
  lastTestNotificationAt: string | null
  chime: ChimeOption
  delayAlertMinutes: number
}

export const PAUSE_DURATION_OPTIONS: { value: PauseDuration; label: string }[] = [
  { value: '15m', label: '15m' },
  { value: '30m', label: '30m' },
  { value: '1h', label: '1h' },
  { value: 'manual', label: 'Manual' },
]

export const CHIME_OPTIONS: { value: ChimeOption; label: string }[] = [
  { value: 'loud-chime', label: 'Loud Chime' },
  { value: 'buzzer', label: 'Buzzer' },
  { value: 'bell', label: 'Bell' },
  { value: 'mute', label: 'Mute' },
]

export const NOTIFICATION_TRIGGER_LABELS: Record<NotificationTrigger, string> = {
  'order-accepted': 'Order Accepted',
  'in-oven': 'In Oven',
  ready: 'Ready',
}
