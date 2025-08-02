'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * ScrollToTop component ensures that when users navigate between pages,
 * they always start at the top of the page (seeing the header first).
 * This improves UX on both mobile and desktop.
 */
export default function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top immediately when pathname changes
    window.scrollTo(0, 0)
    
    // Also scroll to top after a short delay to handle any dynamic content loading
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)

    return () => clearTimeout(timeoutId)
  }, [pathname])

  return null
}
