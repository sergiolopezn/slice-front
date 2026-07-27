import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'bump' | 'check-temp' | 'complete'

const variantClasses: Record<ButtonVariant, string> = {
  bump: 'bg-status-urgent-red text-white hover:bg-[#e0203f]',
  'check-temp': 'bg-status-prep-amber text-black hover:bg-[#e5951d]',
  complete: 'bg-status-ready-mint text-black hover:bg-[#00c784]',
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: ButtonVariant
  children: ReactNode
}

export function Button({
  variant,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`min-h-12 w-full rounded-xl px-4 py-3 text-center text-sm font-bold uppercase tracking-wider transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
