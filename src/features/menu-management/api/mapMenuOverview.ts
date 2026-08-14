import type { MenuOverview, TelegramSyncStatus, ToppingDto } from '@/shared/api/types/menu'
import { formatRelativeTime } from '@/features/dashboard/api/mapDashboardSnapshot'
import type {
  MenuItem,
  MenuItemCategory,
  MenuSnapshot,
  Quick86Ingredient,
  SyncStatus,
  Topping,
} from '../types/menu'
import { getSyncStatus } from '../types/menu'

export const DEFAULT_ITEM_IMAGE =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591'

function mapItemCategory(category: string): MenuItemCategory {
  if (category.toLowerCase() === 'pizzas') return 'pizzas'
  return 'sides-drinks'
}

export function mapTelegramSync(sync: TelegramSyncStatus): SyncStatus {
  return sync === 'Synced' ? 'synced' : 'paused'
}

export function formatMenuSyncLabel(lastSyncedAt: string | null, nowMs = Date.now()): string {
  if (!lastSyncedAt) return 'NEVER'

  const relative = formatRelativeTime(lastSyncedAt, nowMs)
  if (relative === 'Just now') return 'JUST NOW'

  return relative.toUpperCase()
}

function mapMenuItem(item: MenuOverview['items'][number]): MenuItem {
  return {
    id: item.id,
    category: mapItemCategory(item.category),
    name: item.name,
    price: item.price,
    categoryPill: item.category.toUpperCase(),
    available: item.available,
    imageUrl: item.imageUrl?.trim() ? item.imageUrl : DEFAULT_ITEM_IMAGE,
  }
}

function mapQuick86Entry(entry: MenuOverview['quick86List'][number]): Quick86Ingredient {
  return {
    id: entry.id,
    name: entry.name,
    inStock: entry.inStock,
    syncStatus: getSyncStatus(entry.inStock),
  }
}

function mapTopping(topping: ToppingDto): Topping {
  return {
    id: topping.id,
    name: topping.name,
    category: topping.category,
    extraPrice: topping.extraPrice,
    inStock: topping.inStock,
    syncStatus: mapTelegramSync(topping.telegramSync),
  }
}

export function mapMenuOverview(overview: MenuOverview, nowMs = Date.now()): MenuSnapshot {
  return {
    quick86: overview.quick86List.map(mapQuick86Entry),
    items: overview.items.map(mapMenuItem),
    toppings: overview.toppings.map(mapTopping),
    lastSyncLabel: formatMenuSyncLabel(overview.lastSyncedAt, nowMs),
  }
}
