import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApiError, postStoreStatus } from '@/shared/api'
import type { DashboardSnapshot } from '../types/dashboard'
import { DASHBOARD_QUERY_KEY } from './useDashboardQuery'

export type StorePauseVariables = {
  isPaused: boolean
  reason: string
}

export function useStorePause() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ isPaused, reason }: StorePauseVariables) =>
      postStoreStatus({ isPaused, reason }),
    onMutate: async ({ isPaused }: StorePauseVariables) => {
      await queryClient.cancelQueries({ queryKey: DASHBOARD_QUERY_KEY })

      const previous = queryClient.getQueryData<DashboardSnapshot>(DASHBOARD_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<DashboardSnapshot>(DASHBOARD_QUERY_KEY, {
          ...previous,
          isPaused,
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

export function getStorePauseErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  return 'Failed to update store status. Tap to retry.'
}
