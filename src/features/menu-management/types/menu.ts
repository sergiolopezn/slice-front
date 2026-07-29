export type MenuCategoryTab = 'pizzas' | 'sides-drinks' | 'toppings'

export type MenuItemCategory = 'pizzas' | 'sides-drinks'

export type SyncStatus = 'synced' | 'paused'

export type Quick86Ingredient = {
  id: string
  name: string
  inStock: boolean
  syncStatus: SyncStatus
}

export type MenuItem = {
  id: string
  category: MenuItemCategory
  name: string
  price: number
  categoryPill: string
  available: boolean
}

export type Topping = {
  id: string
  name: string
  category: string
  extraPrice: number
  inStock: boolean
  syncStatus: SyncStatus
}

export type MenuSnapshot = {
  quick86: Quick86Ingredient[]
  items: MenuItem[]
  toppings: Topping[]
  lastSyncLabel: string
}

export function formatMenuPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

export function getSyncStatus(inStock: boolean): SyncStatus {
  return inStock ? 'synced' : 'paused'
}
