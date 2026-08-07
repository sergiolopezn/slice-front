import { apiRequest } from './client'
import type {
  ActivityFeedResponse,
  DashboardMetrics,
  StoreStatusRequest,
  StoreStatusResponse,
} from './types/dashboard'

export async function fetchMetrics(): Promise<DashboardMetrics> {
  return apiRequest<DashboardMetrics>('/api/dashboard/metrics')
}

export async function fetchActivity(): Promise<ActivityFeedResponse['entries']> {
  const response = await apiRequest<ActivityFeedResponse>('/api/dashboard/activity')
  return response.entries
}

export async function postStoreStatus(
  payload: StoreStatusRequest,
): Promise<StoreStatusResponse> {
  return apiRequest<StoreStatusResponse>('/api/dashboard/store-status', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
