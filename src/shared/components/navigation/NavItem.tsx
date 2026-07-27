import { NavLink } from 'react-router-dom'
import type { NavItemConfig } from './navItems'

type NavItemProps = {
  item: NavItemConfig
}

export function NavItem({ item }: NavItemProps) {
  const Icon = item.icon

  return (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      discover="none"
      className={({ isActive }) =>
        [
          'flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors',
          isActive
            ? 'bg-nav-active font-bold text-nav-active-text'
            : 'font-medium text-zinc-400 hover:bg-status-idle-gray hover:text-white',
        ].join(' ')
      }
    >
      <Icon />
      <span>{item.label}</span>
    </NavLink>
  )
}
