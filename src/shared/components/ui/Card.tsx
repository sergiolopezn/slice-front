import type { HTMLAttributes, ReactNode } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`flex flex-col justify-between overflow-hidden rounded-2xl border border-surface-border bg-surface-card shadow-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
