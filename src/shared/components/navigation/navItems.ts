import {
  ClockHistoryIcon,
  CrossUtensilsIcon,
  GearIcon,
  LayoutGridIcon,
  UtensilsIcon,
  type NavIconComponent,
} from './icons'

export type NavItemConfig = {
  label: string
  path: string
  icon: NavIconComponent
}

export const NAV_ITEMS: NavItemConfig[] = [
  { label: 'Dashboard', path: '/', icon: LayoutGridIcon },
  { label: 'Live orders', path: '/live-orders', icon: UtensilsIcon },
  { label: 'Menu management', path: '/menu', icon: CrossUtensilsIcon },
  { label: 'Order history', path: '/order-history', icon: ClockHistoryIcon },
  { label: 'Settings', path: '/settings', icon: GearIcon },
]
