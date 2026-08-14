import type {
  ChimeOption,
  DaySchedule,
  PauseDuration,
  StoreSettingsSnapshot,
  Weekday,
} from '../types/settings'

const LATENCY_MS = 120

const SEED_WEEKLY_SCHEDULE: DaySchedule[] = [
  { id: 'monday', label: 'Monday', openTime: '11:00', closeTime: '22:00', closed: false },
  { id: 'tuesday', label: 'Tuesday', openTime: '11:00', closeTime: '22:00', closed: false },
  { id: 'wednesday', label: 'Wednesday', openTime: '11:00', closeTime: '22:00', closed: false },
  { id: 'thursday', label: 'Thursday', openTime: '11:00', closeTime: '23:00', closed: false },
  { id: 'friday', label: 'Friday', openTime: '11:00', closeTime: '23:30', closed: false },
  { id: 'saturday', label: 'Saturday', openTime: '12:00', closeTime: '23:30', closed: false },
  { id: 'sunday', label: 'Sunday', openTime: '12:00', closeTime: '21:00', closed: true },
]

const SEED_SETTINGS: StoreSettingsSnapshot = {
  storePaused: false,
  pauseDuration: '30m',
  weeklySchedule: SEED_WEEKLY_SCHEDULE,
  deliveryFee: 4.5,
  minimumOrderAmount: 15,
  allowDelivery: true,
  allowPickup: true,
  botHandle: '@SliceOS_PizzaBot',
  botConnected: true,
  webhookUrl: 'https://api.sliceos.local/webhooks/telegram',
  webhookLatencyMs: 42,
  adminTelegramHandle: '@MarioPizzaOwner',
  adminTelegramChatId: '987654321',
  lastTestNotificationAt: null,
  chime: 'loud-chime',
  delayAlertMinutes: 12,
}

let settings = structuredClone(SEED_SETTINGS)

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function cloneSnapshot(): StoreSettingsSnapshot {
  return {
    ...settings,
    weeklySchedule: settings.weeklySchedule.map((day) => ({ ...day })),
  }
}

export async function fetchSettingsSnapshot(): Promise<StoreSettingsSnapshot> {
  await delay(LATENCY_MS)
  return cloneSnapshot()
}

export async function updateStorePause(
  storePaused: boolean,
  pauseDuration?: PauseDuration,
): Promise<StoreSettingsSnapshot> {
  await delay(LATENCY_MS)
  settings.storePaused = storePaused
  if (pauseDuration) {
    settings.pauseDuration = pauseDuration
  }
  return cloneSnapshot()
}

export async function updateDaySchedule(
  dayId: Weekday,
  updates: Partial<Pick<DaySchedule, 'openTime' | 'closeTime' | 'closed'>>,
): Promise<StoreSettingsSnapshot> {
  await delay(LATENCY_MS)
  settings.weeklySchedule = settings.weeklySchedule.map((day) =>
    day.id === dayId ? { ...day, ...updates } : day,
  )
  return cloneSnapshot()
}

export async function updateDeliverySettings(updates: {
  deliveryFee?: number
  minimumOrderAmount?: number
  allowDelivery?: boolean
  allowPickup?: boolean
}): Promise<StoreSettingsSnapshot> {
  await delay(LATENCY_MS)
  settings = { ...settings, ...updates }
  return cloneSnapshot()
}

export async function updateAdminTelegramHandle(
  handle: string,
): Promise<StoreSettingsSnapshot> {
  await delay(LATENCY_MS)

  if (settings.adminTelegramChatId !== null) {
    return cloneSnapshot()
  }

  settings.adminTelegramHandle = handle
  return cloneSnapshot()
}

export async function sendTestNotification(): Promise<StoreSettingsSnapshot> {
  await delay(LATENCY_MS)
  settings.lastTestNotificationAt = 'Just now'
  return cloneSnapshot()
}

export async function updateKitchenAlerts(updates: {
  chime?: ChimeOption
  delayAlertMinutes?: number
}): Promise<StoreSettingsSnapshot> {
  await delay(LATENCY_MS)
  settings = { ...settings, ...updates }
  return cloneSnapshot()
}

export function resetSettingsForTests() {
  settings = structuredClone(SEED_SETTINGS)
}

export function setAdminUnlinkedForTests() {
  settings.adminTelegramChatId = null
  settings.adminTelegramHandle = ''
}

export { SEED_SETTINGS }
