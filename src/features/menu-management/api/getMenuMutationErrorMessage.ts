import { ApiError } from '@/shared/api'

export function getMenuMutationErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  return 'Failed to update menu. Tap to retry.'
}
