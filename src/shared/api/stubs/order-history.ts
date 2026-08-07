export type OrderHistoryEntryStub = {
  id: string
  orderNumber: number
}

const NOT_IMPLEMENTED = 'Order history API not implemented — backend route pending.'

export async function fetchOrderHistory(): Promise<OrderHistoryEntryStub[]> {
  throw new Error(NOT_IMPLEMENTED)
}
