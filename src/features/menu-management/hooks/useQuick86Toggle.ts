import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchToppingStock } from '@/shared/api'
import type { MenuSnapshot } from '../types/menu'
import { getSyncStatus } from '../types/menu'
import { MENU_QUERY_KEY } from './useMenuQuery'

function updateToppingStockInSnapshot(
  snapshot: MenuSnapshot,
  toppingId: string,
  inStock: boolean,
): MenuSnapshot {
  const syncStatus = getSyncStatus(inStock)

  return {
    ...snapshot,
    quick86: snapshot.quick86.map((ingredient) =>
      ingredient.id === toppingId
        ? { ...ingredient, inStock, syncStatus }
        : ingredient,
    ),
    toppings: snapshot.toppings.map((topping) =>
      topping.id === toppingId ? { ...topping, inStock, syncStatus } : topping,
    ),
  }
}

export function useQuick86Toggle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ingredientId, inStock }: { ingredientId: string; inStock: boolean }) =>
      patchToppingStock(ingredientId, { inStock }),
    onMutate: async ({ ingredientId, inStock }) => {
      await queryClient.cancelQueries({ queryKey: MENU_QUERY_KEY })

      const previous = queryClient.getQueryData<MenuSnapshot>(MENU_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<MenuSnapshot>(
          MENU_QUERY_KEY,
          updateToppingStockInSnapshot(previous, ingredientId, inStock),
        )
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
