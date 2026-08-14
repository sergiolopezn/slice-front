import { apiRequest } from './client'
import type {
  MenuItemDto,
  MenuOverview,
  PatchItemAvailabilityRequest,
  PatchToppingStockRequest,
  Quick86ListResponse,
  ToppingDto,
} from './types/menu'

export async function fetchMenuOverview(): Promise<MenuOverview> {
  return apiRequest<MenuOverview>('/api/menu')
}

export async function fetchQuick86List(): Promise<Quick86ListResponse['quick86List']> {
  const response = await apiRequest<Quick86ListResponse>('/api/menu/quick-86')
  return response.quick86List
}

export async function patchItemAvailability(
  itemId: string,
  payload: PatchItemAvailabilityRequest,
): Promise<MenuItemDto> {
  return apiRequest<MenuItemDto>(`/api/menu/items/${itemId}/availability`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}

export async function patchToppingStock(
  toppingId: string,
  payload: PatchToppingStockRequest,
): Promise<ToppingDto> {
  return apiRequest<ToppingDto>(`/api/menu/toppings/${toppingId}/stock`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  })
}
