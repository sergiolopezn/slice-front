export type MenuItemStub = {
  id: string
  name: string
}

const NOT_IMPLEMENTED = 'Menu API not implemented — backend route pending.'

export async function fetchMenuItems(): Promise<MenuItemStub[]> {
  throw new Error(NOT_IMPLEMENTED)
}
