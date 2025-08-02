'use client'

import { useRouter } from 'next/navigation'

/**
 * Custom navigation hook that ensures scroll to top on navigation.
 * Use this instead of router.push() to guarantee users see the header first.
 */
export function useScrollNavigation() {
  const router = useRouter()

  const navigateTo = (path: string) => {
    // Scroll to top first
    window.scrollTo(0, 0)
    
    // Then navigate
    router.push(path)
    
    // Ensure scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  const navigateAndReplace = (path: string) => {
    // Scroll to top first
    window.scrollTo(0, 0)
    
    // Then navigate with replace
    router.replace(path)
    
    // Ensure scroll to top after navigation
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 100)
  }

  return {
    navigateTo,
    navigateAndReplace,
    router // Still provide access to original router if needed
  }
}

/**
 * Utility function to handle scroll-to-top navigation for Link components
 */
export const handleScrollNavigation = (callback?: () => void) => {
  window.scrollTo(0, 0)
  if (callback) {
    setTimeout(callback, 10)
  }
}
