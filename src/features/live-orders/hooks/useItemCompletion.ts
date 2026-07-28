import { create } from 'zustand'

type ItemCompletionState = {
  completed: Record<string, boolean>
  toggleItem: (orderId: string, itemId: string) => void
  isComplete: (orderId: string, itemId: string) => boolean
}

function itemKey(orderId: string, itemId: string) {
  return `${orderId}:${itemId}`
}

export const useItemCompletion = create<ItemCompletionState>((set, get) => ({
  completed: {},
  toggleItem: (orderId, itemId) => {
    const key = itemKey(orderId, itemId)
    set((state) => ({
      completed: {
        ...state.completed,
        [key]: !state.completed[key],
      },
    }))
  },
  isComplete: (orderId, itemId) => {
    return Boolean(get().completed[itemKey(orderId, itemId)])
  },
}))
