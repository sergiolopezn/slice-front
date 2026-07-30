type IconProps = {
  className?: string
}

export function CloseIcon({ className = 'h-5 w-5' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PickupIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 10V7a5 5 0 0 1 10 0v3M6 10h12l1 10H5L6 10z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DeliveryIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 7h11v8H3V7zm11 2h4l3 3v3h-7V9zM7 17a1.5 1.5 0 1 0 0 .01M17 17a1.5 1.5 0 1 0 0 .01"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"   
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function SearchIcon({ className = '' }: IconProps) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
