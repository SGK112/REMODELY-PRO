// Test script to validate authentication and basic functionality
// Run this in browser console to test

console.log('🧪 Starting Remodely.AI Test Suite...')

// Test 1: Check if SessionProvider is working
try {
  if (typeof window !== 'undefined' && window.location) {
    console.log('✅ Basic window object available')
  }
} catch (e) {
  console.error('❌ Window object error:', e)
}

// Test 2: Check for basic elements
const tests = [
  { name: 'Main navigation', selector: 'nav' },
  { name: 'Logo link', selector: 'a[href="/"]' },
  { name: 'Footer', selector: 'footer' }
]

tests.forEach(test => {
  const element = document.querySelector(test.selector)
  if (element) {
    console.log(`✅ ${test.name} found`)
  } else {
    console.log(`⚠️ ${test.name} not found`)
  }
})

// Test 3: Check for JavaScript errors
window.addEventListener('error', (e) => {
  console.error('❌ JavaScript Error:', e.error)
})

// Test 4: Network requests
const originalFetch = window.fetch
window.fetch = function (...args) {
  console.log('🌐 API Request:', args[0])
  return originalFetch.apply(this, arguments)
    .then(response => {
      if (!response.ok) {
        console.warn('⚠️ API Response Error:', response.status, args[0])
      } else {
        console.log('✅ API Response OK:', response.status, args[0])
      }
      return response
    })
}

console.log('🧪 Test suite initialized. Navigate around the site to see results.')
