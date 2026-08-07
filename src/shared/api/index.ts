export { apiRequest, getBaseUrl } from './client'
export { ApiError, type ErrorResponse } from './types/errors'
export {
  createOrder,
  fetchLiveOrders,
  patchOrderStatus,
} from './orders'
export { fetchActivity, fetchMetrics, postStoreStatus } from './dashboard'
export type {
  ActivityFeedEntry,
  ActivityFeedResponse,
  DashboardMetrics,
  DashboardStation,
  StoreStatusRequest,
  StoreStatusResponse,
} from './types/dashboard'
export type {
  CreateOrderRequest,
  LiveOrder,
  LiveOrderLineItem,
  LiveOrdersResponse,
  OrderStatus,
  PatchOrderStatusRequest,
} from './types/orders'
