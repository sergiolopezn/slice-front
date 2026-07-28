import type { DashboardSnapshot, StoreControlChannel } from '../types/dashboard'

const LATENCY_MS = 120

let storeControls: Record<StoreControlChannel, boolean> = {
  telegram: false,
  'dine-in': true,
  delivery: true,
}

const dashboardSnapshot: Omit<DashboardSnapshot, 'storeControls'> & {
  storeControlLabels: Record<StoreControlChannel, string>
} = {
  kpis: [
    {
      id: 'revenue',
      label: "Today's Revenue",
      value: '$3,850.50',
      trend: { label: '+12% vs Yesterday', variant: 'positive' },
    },
    {
      id: 'orders',
      label: 'Total Orders',
      value: '114',
      subtitle: '88 Telegram, 26 Direct',
    },
    {
      id: 'prep-time',
      label: 'Avg. Prep Time',
      value: '11.4 mins',
      warning: '⚠️ Rising vs Lunch avg',
    },
    {
      id: 'rush',
      label: 'Active Rush Status',
      value: 'High Load',
      isRush: true,
      actionLabel: 'Review Capacity',
    },
  ],
  stations: [
    { id: 'kitchen-a', name: 'Kitchen-A', ticketCount: 14, capacityPercent: 80 },
    { id: 'kitchen-b', name: 'Kitchen-B', ticketCount: 9, capacityPercent: 65 },
    { id: 'beverage', name: 'Beverage', ticketCount: 4, capacityPercent: 40 },
  ],
  storeControlLabels: {
    telegram: 'Pause Telegram Orders',
    'dine-in': 'Dine-In Orders',
    delivery: 'Delivery Zones',
  },
  activity: [
    {
      id: 'act-1',
      type: 'order',
      message: 'Order #402 bumped from Kitchen-A',
      timestamp: '2 min ago',
      metadata: 'Marco Rossi · Priority delivery',
    },
    {
      id: 'act-2',
      type: 'alert',
      message: 'Kitchen-A capacity reached 80%',
      timestamp: '5 min ago',
      metadata: 'Station health threshold crossed',
    },
    {
      id: 'act-3',
      type: 'system',
      message: 'Telegram ordering channel paused',
      timestamp: '12 min ago',
      metadata: 'Manual override by Kitchen Admin',
    },
    {
      id: 'act-4',
      type: 'refund',
      message: 'Refund issued for Order #388',
      timestamp: '18 min ago',
      metadata: '$24.50 · Wrong item',
    },
  ],
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildStoreControls() {
  return (Object.keys(storeControls) as StoreControlChannel[]).map((id) => ({
    id,
    label: dashboardSnapshot.storeControlLabels[id],
    enabled: storeControls[id],
  }))
}

export async function fetchDashboardSnapshot(): Promise<DashboardSnapshot> {
  await delay(LATENCY_MS)

  return {
    kpis: dashboardSnapshot.kpis.map((kpi) => ({ ...kpi, trend: kpi.trend ? { ...kpi.trend } : undefined })),
    stations: dashboardSnapshot.stations.map((station) => ({ ...station })),
    storeControls: buildStoreControls(),
    activity: dashboardSnapshot.activity.map((event) => ({ ...event })),
  }
}

export async function updateStoreControl(
  channel: StoreControlChannel,
  enabled: boolean,
): Promise<DashboardSnapshot> {
  await delay(LATENCY_MS)
  storeControls[channel] = enabled
  return fetchDashboardSnapshot()
}

export function resetStoreControlsForTests() {
  storeControls = {
    telegram: false,
    'dine-in': true,
    delivery: true,
  }
}
