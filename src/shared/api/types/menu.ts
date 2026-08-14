export type MenuItemSizePrice = {
  size: string
  price: number
}

export type MenuItemDto = {
  id: string
  name: string
  category: string
  price: number
  available: boolean
  imageUrl: string
  sizes: MenuItemSizePrice[]
}

export type TelegramSyncStatus = 'Synced' | 'Paused'

export type ToppingDto = {
  id: string
  name: string
  category: string
  extraPrice: number
  inStock: boolean
  telegramSync: TelegramSyncStatus
}

export type Quick86Entry = {
  id: string
  name: string
  inStock: boolean
}

export type MenuOverview = {
  quick86List: Quick86Entry[]
  items: MenuItemDto[]
  toppings: ToppingDto[]
  lastSyncedAt: string | null
}

export type Quick86ListResponse = {
  quick86List: Quick86Entry[]
}

export type PatchItemAvailabilityRequest = {
  isAvailable: boolean
}

export type PatchToppingStockRequest = {
  inStock: boolean
}
