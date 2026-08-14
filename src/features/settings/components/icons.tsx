type IconProps = {
  className?: string
}

const iconBaseClass = 'h-5 w-5 shrink-0'

export function BotIcon({ className = '' }: IconProps) {
  return (
    <svg className={`${iconBaseClass} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="8" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="13" r="1" fill="currentColor" />
      <circle cx="14" cy="13" r="1" fill="currentColor" />
    </svg>
  )
}

export function BellIcon({ className = '' }: IconProps) {
  return (
    <svg className={`${iconBaseClass} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 4a4 4 0 0 0-4 4v3l-2 3h12l-2-3V8a4 4 0 0 0-4-4zM10 18a2 2 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ClockIcon({ className = '' }: IconProps) {
  return (
    <svg className={`${iconBaseClass} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function TruckIcon({ className = '' }: IconProps) {
  return (
    <svg className={`${iconBaseClass} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

export function LinkIcon({ className = '' }: IconProps) {
  return (
    <svg className={`${iconBaseClass} ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 13a3 3 0 0 0 4.24 0l2.12-2.12a3 3 0 1 0-4.24-4.24L10.6 8.36M14 11a3 3 0 0 0-4.24 0L7.64 13.12a3 3 0 1 0 4.24 4.24L13.4 15.64"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
