import { useState } from 'react'
import {
  useDayScheduleMutation,
  useDeliverySettingsMutation,
  useKitchenAlertsMutation,
  useNotificationTriggerMutation,
  useSendTestNotificationMutation,
  useStorePauseMutation,
} from '../hooks/useSettingsMutations'
import { useSettingsQuery } from '../hooks/useSettingsQuery'
import { DeliveryFulfillmentCard } from './DeliveryFulfillmentCard'
import { KitchenAlertsCard } from './KitchenAlertsCard'
import { StoreOperationsCard } from './StoreOperationsCard'
import { TelegramBotConfigCard } from './TelegramBotConfigCard'

export function SettingsView() {
  const { data, isLoading, isError, refetch } = useSettingsQuery()
  const storePause = useStorePauseMutation()
  const daySchedule = useDayScheduleMutation()
  const deliverySettings = useDeliverySettingsMutation()
  const notificationTrigger = useNotificationTriggerMutation()
  const sendTestNotification = useSendTestNotificationMutation()
  const kitchenAlerts = useKitchenAlertsMutation()
  const [testSuccessMessage, setTestSuccessMessage] = useState<string | null>(null)

  const isMutating =
    storePause.isPending ||
    daySchedule.isPending ||
    deliverySettings.isPending ||
    notificationTrigger.isPending ||
    sendTestNotification.isPending ||
    kitchenAlerts.isPending

  if (isLoading) {
    return (
      <main aria-label="Settings page" className="min-h-screen bg-bg-app p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-4 text-text-muted">Loading settings…</p>
      </main>
    )
  }

  if (isError || !data) {
    return (
      <main aria-label="Settings page" className="min-h-screen bg-bg-app p-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-4 text-status-urgent-red">Unable to load settings.</p>
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
    <main aria-label="Settings page" className="min-h-screen bg-bg-app p-6">
      <h1 className="text-2xl font-bold tracking-tight text-white">Settings</h1>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <StoreOperationsCard
            settings={{
              storePaused: data.storePaused,
              pauseDuration: data.pauseDuration,
              weeklySchedule: data.weeklySchedule,
            }}
            disabled={isMutating}
            onPauseChange={(storePaused, pauseDuration) =>
              storePause.mutate({ storePaused, pauseDuration })
            }
            onScheduleChange={(dayId, updates) => daySchedule.mutate({ dayId, updates })}
          />

          <DeliveryFulfillmentCard
            settings={{
              deliveryFee: data.deliveryFee,
              minimumOrderAmount: data.minimumOrderAmount,
              allowDelivery: data.allowDelivery,
              allowPickup: data.allowPickup,
            }}
            disabled={isMutating}
            onChange={(updates) => deliverySettings.mutate(updates)}
          />
        </div>

        <div className="space-y-6">
          <TelegramBotConfigCard
            settings={{
              botHandle: data.botHandle,
              botConnected: data.botConnected,
              webhookUrl: data.webhookUrl,
              webhookLatencyMs: data.webhookLatencyMs,
              notificationTriggers: data.notificationTriggers,
              lastTestNotificationAt: data.lastTestNotificationAt,
            }}
            disabled={isMutating}
            testSuccessMessage={testSuccessMessage}
            onTriggerChange={(trigger, enabled) =>
              notificationTrigger.mutate({ trigger, enabled })
            }
            onSendTest={() => {
              setTestSuccessMessage(null)
              sendTestNotification.mutate(undefined, {
                onSuccess: () => {
                  setTestSuccessMessage('Test notification sent successfully.')
                },
              })
            }}
          />

          <KitchenAlertsCard
            settings={{
              chime: data.chime,
              delayAlertMinutes: data.delayAlertMinutes,
            }}
            disabled={isMutating}
            onChange={(updates) => kitchenAlerts.mutate(updates)}
          />
        </div>
      </div>
    </main>
  )
}
