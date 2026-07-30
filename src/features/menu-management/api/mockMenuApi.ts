import type {
  MenuItem,
  MenuSnapshot,
  Quick86Ingredient,
  Topping,
} from '../types/menu'
import { getSyncStatus } from '../types/menu'

const LATENCY_MS = 120

const DEFAULT_ITEM_IMAGE =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591'

const SEED_QUICK86: Quick86Ingredient[] = [
  { id: '86-pepperoni', name: 'Pepperoni', inStock: true, syncStatus: 'synced' },
  { id: '86-basil', name: 'Fresh Basil', inStock: false, syncStatus: 'paused' },
  { id: '86-mushrooms', name: 'Mushrooms', inStock: true, syncStatus: 'synced' },
  { id: '86-gf-crust', name: 'GF Crust', inStock: true, syncStatus: 'synced' },
]

const SEED_ITEMS: MenuItem[] = [
  {
    id: 'item-margherita',
    category: 'pizzas',
    name: 'Margherita',
    price: 14,
    categoryPill: 'CLASSIC',
    available: true,
    imageUrl: DEFAULT_ITEM_IMAGE,
  },
  {
    id: 'item-pepperoni-feast',
    category: 'pizzas',
    name: 'Pepperoni Feast',
    price: 16,
    categoryPill: 'CLASSIC',
    available: true,
    imageUrl: DEFAULT_ITEM_IMAGE,
  },
  {
    id: 'item-truffle-funghi',
    category: 'pizzas',
    name: 'Truffle Funghi',
    price: 22,
    categoryPill: 'SIGNATURE',
    available: false,
    imageUrl: DEFAULT_ITEM_IMAGE,
  },
  {
    id: 'item-bbq-chicken',
    category: 'pizzas',
    name: 'BBQ Chicken',
    price: 18.5,
    categoryPill: 'SPECIALTY',
    available: true,
    imageUrl: DEFAULT_ITEM_IMAGE,
  },
  {
    id: 'item-garlic-knots',
    category: 'sides-drinks',
    name: 'Garlic Knots',
    price: 6,
    categoryPill: 'SIDES',
    available: true,
    imageUrl: DEFAULT_ITEM_IMAGE,
  },
  {
    id: 'item-caesar-salad',
    category: 'sides-drinks',
    name: 'Caesar Salad',
    price: 8.5,
    categoryPill: 'SIDES',
    available: true,
    imageUrl: DEFAULT_ITEM_IMAGE,
  },
  {
    id: 'item-craft-soda',
    category: 'sides-drinks',
    name: 'Craft Soda',
    price: 3.5,
    categoryPill: 'DRINKS',
    available: false,
    imageUrl: DEFAULT_ITEM_IMAGE,
  },
  {
    id: 'item-tiramisu',
    category: 'sides-drinks',
    name: 'Tiramisu',
    price: 7,
    categoryPill: 'DESSERT',
    available: true,
    imageUrl: DEFAULT_ITEM_IMAGE,
  },
]

const SEED_TOPPINGS: Topping[] = [
  {
    id: 'top-pepperoni',
    name: 'Extra Pepperoni',
    category: 'MEAT',
    extraPrice: 2.5,
    inStock: true,
    syncStatus: 'synced',
  },
  {
    id: 'top-basil',
    name: 'Fresh Basil',
    category: 'VEG',
    extraPrice: 1.5,
    inStock: false,
    syncStatus: 'paused',
  },
  {
    id: 'top-mushrooms',
    name: 'Mushrooms',
    category: 'VEG',
    extraPrice: 1,
    inStock: true,
    syncStatus: 'synced',
  },
  {
    id: 'top-gf-crust',
    name: 'GF Crust',
    category: 'BASE',
    extraPrice: 4,
    inStock: true,
    syncStatus: 'synced',
  },
  {
    id: 'top-hot-honey',
    name: 'Hot Honey',
    category: 'SAUCE',
    extraPrice: 1.5,
    inStock: true,
    syncStatus: 'synced',
  },
  {
    id: 'top-anchovies',
    name: 'Anchovies',
    category: 'MEAT',
    extraPrice: 3,
    inStock: false,
    syncStatus: 'paused',
  },
]

let quick86 = structuredClone(SEED_QUICK86)
let items = structuredClone(SEED_ITEMS)
let toppings = structuredClone(SEED_TOPPINGS)

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildSnapshot(): MenuSnapshot {
  return {
    quick86: quick86.map((ingredient) => ({ ...ingredient })),
    items: items.map((item) => ({ ...item })),
    toppings: toppings.map((topping) => ({ ...topping })),
    lastSyncLabel: '2 MIN AGO',
  }
}

export async function fetchMenuSnapshot(): Promise<MenuSnapshot> {
  await delay(LATENCY_MS)
  return buildSnapshot()
}

export async function updateQuick86Ingredient(
  ingredientId: string,
  inStock: boolean,
): Promise<MenuSnapshot> {
  await delay(LATENCY_MS)

  quick86 = quick86.map((ingredient) =>
    ingredient.id === ingredientId
      ? { ...ingredient, inStock, syncStatus: getSyncStatus(inStock) }
      : ingredient,
  )

  return buildSnapshot()
}

export async function updateMenuItemAvailability(
  itemId: string,
  available: boolean,
): Promise<MenuSnapshot> {
  await delay(LATENCY_MS)

  items = items.map((item) =>
    item.id === itemId ? { ...item, available } : item,
  )

  return buildSnapshot()
}

export async function updateToppingStock(
  toppingId: string,
  inStock: boolean,
): Promise<MenuSnapshot> {
  await delay(LATENCY_MS)

  toppings = toppings.map((topping) =>
    topping.id === toppingId
      ? { ...topping, inStock, syncStatus: getSyncStatus(inStock) }
      : topping,
  )

  return buildSnapshot()
}

export function resetMenuForTests() {
  quick86 = structuredClone(SEED_QUICK86)
  items = structuredClone(SEED_ITEMS)
  toppings = structuredClone(SEED_TOPPINGS)
}

export { SEED_ITEMS, SEED_QUICK86, SEED_TOPPINGS }
