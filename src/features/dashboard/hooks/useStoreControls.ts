import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateStoreControl } from '../api/mockDashboardApi'
import type { DashboardSnapshot, StoreControlChannel } from '../types/dashboard'
import { DASHBOARD_QUERY_KEY } from './useDashboardQuery'

export function useStoreControlToggle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ channel, enabled }: { channel: StoreControlChannel; enabled: boolean }) =>
      updateStoreControl(channel, enabled),
    onMutate: async ({ channel, enabled }) => {
      await queryClient.cancelQueries({ queryKey: DASHBOARD_QUERY_KEY })

      const previous = queryClient.getQueryData<DashboardSnapshot>(DASHBOARD_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<DashboardSnapshot>(DASHBOARD_QUERY_KEY, {
          ...previous,
          storeControls: previous.storeControls.map((control) =>
            control.id === channel ? { ...control, enabled } : control,
          ),
        })
      }

      return { previous }
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(DASHBOARD_QUERY_KEY, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY })
    },
  })
}
