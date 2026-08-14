import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  sendTestNotification,
  updateAdminTelegramHandle,
  updateDaySchedule,
  updateDeliverySettings,
  updateKitchenAlerts,
  updateStorePause,
} from '../api/mockSettingsApi'
import type { ChimeOption, PauseDuration, StoreSettingsSnapshot, Weekday } from '../types/settings'
import { SETTINGS_QUERY_KEY } from './useSettingsQuery'

function useSettingsMutation<TVariables>(
  mutationFn: (variables: TVariables) => Promise<StoreSettingsSnapshot>,
  optimisticUpdate: (
    previous: StoreSettingsSnapshot,
    variables: TVariables,
  ) => StoreSettingsSnapshot,
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: SETTINGS_QUERY_KEY })

      const previous = queryClient.getQueryData<StoreSettingsSnapshot>(SETTINGS_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<StoreSettingsSnapshot>(
          SETTINGS_QUERY_KEY,
          optimisticUpdate(previous, variables),
        )
      }

      return { previous }
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(SETTINGS_QUERY_KEY, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_QUERY_KEY })
    },
  })
}

export function useStorePauseMutation() {
  return useSettingsMutation(
    ({ storePaused, pauseDuration }: { storePaused: boolean; pauseDuration?: PauseDuration }) =>
      updateStorePause(storePaused, pauseDuration),
    (previous, { storePaused, pauseDuration }) => ({
      ...previous,
      storePaused,
      pauseDuration: pauseDuration ?? previous.pauseDuration,
    }),
  )
}

export function useDayScheduleMutation() {
  return useSettingsMutation(
    ({
      dayId,
      updates,
    }: {
      dayId: Weekday
      updates: Partial<{ openTime: string; closeTime: string; closed: boolean }>
    }) => updateDaySchedule(dayId, updates),
    (previous, { dayId, updates }) => ({
      ...previous,
      weeklySchedule: previous.weeklySchedule.map((day) =>
        day.id === dayId ? { ...day, ...updates } : day,
      ),
    }),
  )
}

export function useDeliverySettingsMutation() {
  return useSettingsMutation(
    (updates: {
      deliveryFee?: number
      minimumOrderAmount?: number
      allowDelivery?: boolean
      allowPickup?: boolean
    }) => updateDeliverySettings(updates),
    (previous, updates) => ({ ...previous, ...updates }),
  )
}

export function useAdminTelegramHandleMutation() {
  return useSettingsMutation(
    (handle: string) => updateAdminTelegramHandle(handle),
    (previous, handle) => ({
      ...previous,
      adminTelegramHandle: handle,
    }),
  )
}

export function useSendTestNotificationMutation() {
  return useSettingsMutation(
    () => sendTestNotification(),
    (previous) => ({
      ...previous,
      lastTestNotificationAt: 'Just now',
    }),
  )
}

export function useKitchenAlertsMutation() {
  return useSettingsMutation(
    (updates: { chime?: ChimeOption; delayAlertMinutes?: number }) =>
      updateKitchenAlerts(updates),
    (previous, updates) => ({ ...previous, ...updates }),
  )
}
