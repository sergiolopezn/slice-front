import { useEffect, useState } from 'react'

const LG_MEDIA_QUERY = '(min-width: 1024px)'

export function useIsLgViewport() {
  const [isLg, setIsLg] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(LG_MEDIA_QUERY).matches : true,
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia(LG_MEDIA_QUERY)
    const handleChange = () => setIsLg(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isLg
}
