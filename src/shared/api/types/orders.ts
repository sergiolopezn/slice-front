export type OrderStatus =
  | 'New'
  | 'InPrep'
  | 'InOven'
  | 'Ready'
  | 'Completed'
  | 'Cancelled'

export type FulfillmentType = 'Pickup' | 'Delivery'

export type PaymentMethod = 'Card' | 'Cash'

export type LiveOrderLineItem = {
  id: string
  menuItemName: string
  size: string
  quantity: number
  unitPrice: number
  modifiers?: string
}

export type LiveOrder = {
  id: string
  orderNumber: number
  customerName: string
  customerPhone?: string
  telegramChatId?: string
  fulfillmentType: FulfillmentType
  status: OrderStatus
  totalAmount: number
  createdAt: string
  items: LiveOrderLineItem[]
}

export type LiveOrdersResponse = {
  orders: LiveOrder[]
}

export type PatchOrderStatusRequest = {
  status: OrderStatus
}

export type CreateOrderLineItem = {
  menuItemId: string
  size: string
  quantity: number
  modifiers?: string
}

export type CreateOrderRequest = {
  customerName: string
  customerPhone?: string
  telegramChatId?: string
  fulfillmentType: FulfillmentType
  deliveryAddress?: string
  paymentMethod: PaymentMethod
  items: CreateOrderLineItem[]
}
