import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeVariant = 'rush' | 'prep' | 'ready' | 'cod'

const variantClasses: Record<BadgeVariant, string> = {
  rush: 'bg-status-urgent-red text-white',
  prep: 'bg-status-prep-amber text-black',
  ready: 'bg-status-ready-mint text-black',
  cod: 'bg-status-idle-gray text-text-muted',
}

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant: BadgeVariant
  children: ReactNode
}

export function Badge({ variant, children, className = '', ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
