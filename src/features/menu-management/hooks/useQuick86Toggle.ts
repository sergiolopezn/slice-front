import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateQuick86Ingredient } from '../api/mockMenuApi'
import type { MenuSnapshot } from '../types/menu'
import { getSyncStatus } from '../types/menu'
import { MENU_QUERY_KEY } from './useMenuQuery'

export function useQuick86Toggle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ ingredientId, inStock }: { ingredientId: string; inStock: boolean }) =>
      updateQuick86Ingredient(ingredientId, inStock),
    onMutate: async ({ ingredientId, inStock }) => {
      await queryClient.cancelQueries({ queryKey: MENU_QUERY_KEY })

      const previous = queryClient.getQueryData<MenuSnapshot>(MENU_QUERY_KEY)

      if (previous) {
        queryClient.setQueryData<MenuSnapshot>(MENU_QUERY_KEY, {
          ...previous,
          quick86: previous.quick86.map((ingredient) =>
            ingredient.id === ingredientId
              ? { ...ingredient, inStock, syncStatus: getSyncStatus(inStock) }
              : ingredient,
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
