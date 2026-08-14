import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchItemAvailability } from '@/shared/api'
import type { MenuSnapshot } from '../types/menu'
import { MENU_QUERY_KEY } from './useMenuQuery'

export function useMenuItemAvailability() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ itemId, available }: { itemId: string; available: boolean }) =>
      patchItemAvailability(itemId, { isAvailable: available }),
    onMutate: async ({ itemId, available }) => {
      await queryClient.cancelQueries({ queryKey: MENU_QUERY_KEY })

      const previous = queryClient.getQueryData<MenuSnapshot>(MENU_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<MenuSnapshot>(MENU_QUERY_KEY, {
          ...previous,
          items: previous.items.map((item) =>
            item.id === itemId ? { ...item, available } : item,
          ),
        })
      }

      return { previous }
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(MENU_QUERY_KEY, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: MENU_QUERY_KEY })
    },
  })
}
