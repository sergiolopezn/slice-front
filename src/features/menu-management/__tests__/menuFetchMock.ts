import { vi } from 'vitest'
import type { MenuOverview, MenuItemDto, ToppingDto } from '@/shared/api'

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591'

const BASE_SYNC_TIME = '2026-08-13T16:50:00Z'

const SEED_ITEMS: MenuItemDto[] = [
  {
    id: 'item-margherita',
    name: 'Margherita',
    category: 'Pizzas',
    price: 14,
    available: true,
    imageUrl: DEFAULT_IMAGE,
    sizes: [{ size: 'Medium', price: 14 }],
  },
  {
    id: 'item-pepperoni-feast',
    name: 'Pepperoni Feast',
    category: 'Pizzas',
    price: 16,
    available: true,
    imageUrl: DEFAULT_IMAGE,
    sizes: [{ size: 'Medium', price: 16 }],
  },
  {
    id: 'item-truffle-funghi',
    name: 'Truffle Funghi',
    category: 'Pizzas',
    price: 22,
    available: false,
    imageUrl: DEFAULT_IMAGE,
    sizes: [{ size: 'Medium', price: 22 }],
  },
  {
    id: 'item-garlic-knots',
    name: 'Garlic Knots',
    category: 'Sides',
    price: 6,
    available: true,
    imageUrl: DEFAULT_IMAGE,
    sizes: [{ size: 'Regular', price: 6 }],
  },
]

const SEED_TOPPINGS: ToppingDto[] = [
  {
    id: 'top-pepperoni',
    name: 'Extra Pepperoni',
    category: 'MEAT',
    extraPrice: 2.5,
    inStock: true,
    telegramSync: 'Synced',
  },
  {
    id: 'top-basil',
    name: 'Fresh Basil',
    category: 'VEG',
    extraPrice: 1.5,
    inStock: false,
    telegramSync: 'Paused',
  },
]

let items = structuredClone(SEED_ITEMS)
let toppings = structuredClone(SEED_TOPPINGS)
let quick86List = [
  { id: '86-pepperoni', name: 'Pepperoni', inStock: true },
  { id: '86-basil', name: 'Fresh Basil', inStock: false },
]

function buildOverview(): MenuOverview {
  return {
    quick86List: quick86List.map((entry) => ({ ...entry })),
    items: items.map((item) => ({ ...item })),
    toppings: toppings.map((topping) => ({ ...topping })),
    lastSyncedAt: BASE_SYNC_TIME,
  }
}

export function resetMenuForTests() {
  items = structuredClone(SEED_ITEMS)
  toppings = structuredClone(SEED_TOPPINGS)
  quick86List = [
    { id: '86-pepperoni', name: 'Pepperoni', inStock: true },
    { id: '86-basil', name: 'Fresh Basil', inStock: false },
  ]
}

export function installMenuFetchMock(options?: {
  itemAvailabilityHandler?: (itemId: string, body: { isAvailable: boolean }) => Response | Promise<Response>
  toppingStockHandler?: (toppingId: string, body: { inStock: boolean }) => Response | Promise<Response>
}) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.toString()
      const method = init?.method ?? 'GET'

      if (url.endsWith('/api/menu') && method === 'GET') {
        return new Response(JSON.stringify(buildOverview()), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      if (url.endsWith('/api/menu/quick-86') && method === 'GET') {
        return new Response(
          JSON.stringify({ quick86List: buildOverview().quick86List }),
          { status: 200, headers: { 'Content-Type': 'application/json' } },
        )
      }

      const itemMatch = url.match(/\/api\/menu\/items\/([^/]+)\/availability$/)
      if (itemMatch && method === 'PATCH') {
        const itemId = itemMatch[1]
        const body = JSON.parse(String(init?.body)) as { isAvailable: boolean }

        if (options?.itemAvailabilityHandler) {
          return options.itemAvailabilityHandler(itemId, body)
        }

        const itemIndex = items.findIndex((item) => item.id === itemId)
        if (itemIndex === -1) {
          return new Response(
            JSON.stringify({
              code: 'MENU_ITEM_NOT_FOUND',
              message: `Menu item '${itemId}' was not found.`,
            }),
            { status: 404, headers: { 'Content-Type': 'application/json' } },
          )
        }

        if (typeof body.isAvailable !== 'boolean') {
          return new Response(
            JSON.stringify({
              code: 'INVALID_REQUEST',
              message: "'isAvailable' is required.",
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } },
          )
        }

        items[itemIndex] = { ...items[itemIndex], available: body.isAvailable }

        return new Response(JSON.stringify(items[itemIndex]), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      const toppingMatch = url.match(/\/api\/menu\/toppings\/([^/]+)\/stock$/)
      if (toppingMatch && method === 'PATCH') {
        const toppingId = toppingMatch[1]
        const body = JSON.parse(String(init?.body)) as { inStock: boolean }

        if (options?.toppingStockHandler) {
          return options.toppingStockHandler(toppingId, body)
        }

        const toppingIndex = toppings.findIndex((topping) => topping.id === toppingId)
        const quick86Index = quick86List.findIndex((entry) => entry.id === toppingId)

        if (toppingIndex === -1 && quick86Index === -1) {
          return new Response(
            JSON.stringify({
              code: 'TOPPING_NOT_FOUND',
              message: `Topping '${toppingId}' was not found.`,
            }),
            { status: 404, headers: { 'Content-Type': 'application/json' } },
          )
        }

        if (typeof body.inStock !== 'boolean') {
          return new Response(
            JSON.stringify({
              code: 'INVALID_REQUEST',
              message: "'inStock' is required.",
            }),
            { status: 400, headers: { 'Content-Type': 'application/json' } },
          )
        }

        const telegramSync = body.inStock ? 'Synced' : 'Paused'

        if (toppingIndex !== -1) {
          toppings[toppingIndex] = {
            ...toppings[toppingIndex],
            inStock: body.inStock,
            telegramSync,
          }
        }

        if (quick86Index !== -1) {
          quick86List[quick86Index] = {
            ...quick86List[quick86Index],
            inStock: body.inStock,
          }
        }

        const topping =
          toppingIndex !== -1
            ? toppings[toppingIndex]
            : {
                id: toppingId,
                name: quick86List[quick86Index]?.name ?? toppingId,
                category: 'VEG',
                extraPrice: 1.5,
                inStock: body.inStock,
                telegramSync,
              }

        return new Response(JSON.stringify(topping), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        })
      }

      return new Response(JSON.stringify({ code: 'NOT_FOUND', message: 'Not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }),
  )
}
