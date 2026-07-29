import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateToppingStock } from '../api/mockMenuApi'
import type { MenuSnapshot } from '../types/menu'
import { getSyncStatus } from '../types/menu'
import { MENU_QUERY_KEY } from './useMenuQuery'

export function useToppingStockToggle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ toppingId, inStock }: { toppingId: string; inStock: boolean }) =>
      updateToppingStock(toppingId, inStock),
    onMutate: async ({ toppingId, inStock }) => {
      await queryClient.cancelQueries({ queryKey: MENU_QUERY_KEY })

      const previous = queryClient.getQueryData<MenuSnapshot>(MENU_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<MenuSnapshot>(MENU_QUERY_KEY, {
          ...previous,
          toppings: previous.toppings.map((topping) =>
            topping.id === toppingId
              ? { ...topping, inStock, syncStatus: getSyncStatus(inStock) }
              : topping,
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
