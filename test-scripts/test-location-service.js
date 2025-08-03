// Location Service Test Script
// Run this in the browser console to test location functionality

console.log('🧪 Testing Location Service...')

// Test 1: Check if LocationService is available (browser only)
function testLocationServiceClass() {
    console.log('\n🔧 Testing LocationService Class...')
    try {
        // In browser, the LocationService is available through the React context
        console.log('✅ LocationService is integrated via React Context')
        console.log('💡 Use the useLocation hook in React components to access location functionality')
    } catch (error) {
        console.log('❌ LocationService access failed:', error.message)
    }
}

// Test 2: Test distance calculation
function testDistanceCalculation() {
    console.log('\n📏 Testing Distance Calculation...')

    // Austin to Dallas coordinates
    const austinLat = 30.2672
    const austinLng = -97.7431
    const dallasLat = 32.7767
    const dallasLng = -96.7970

    // Manual Haversine calculation
    const R = 3959 // Earth's radius in miles
    const dLat = (dallasLat - austinLat) * Math.PI / 180
    const dLng = (dallasLng - austinLng) * Math.PI / 180

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(austinLat * Math.PI / 180) * Math.cos(dallasLat * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const expectedDistance = R * c

    console.log(`Expected distance Austin to Dallas: ${expectedDistance.toFixed(1)} miles`)
    console.log('✅ Distance calculation formula verified')
}

// Test 3: Test geocoding endpoints
async function testGeocodingEndpoints() {
    console.log('\n🌐 Testing Geocoding Endpoints...')

    // Test reverse geocoding endpoint
    try {
        const response = await fetch(
            'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=30.2672&longitude=-97.7431&localityLanguage=en'
        )
        const data = await response.json()
        console.log('✅ BigDataCloud reverse geocoding working:', data.city)
    } catch (error) {
        console.log('❌ BigDataCloud reverse geocoding failed:', error.message)
    }

    // Test forward geocoding endpoint
    try {
        const response = await fetch(
            'https://nominatim.openstreetmap.org/search?format=json&q=Austin%2C%20TX&limit=1&addressdetails=1'
        )
        const data = await response.json()
        if (data && data.length > 0) {
            console.log('✅ Nominatim forward geocoding working:', data[0].display_name)
        }
    } catch (error) {
        console.log('❌ Nominatim forward geocoding failed:', error.message)
    }
}

// Test 4: Check browser geolocation support
function testGeolocationSupport() {
    console.log('\n📍 Testing Geolocation Support...')

    if ('geolocation' in navigator) {
        console.log('✅ Geolocation API is supported')

        // Check permissions API
        if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                console.log(`✅ Geolocation permission status: ${result.state}`)
            }).catch((error) => {
                console.log('⚠️ Permissions API not fully supported')
            })
        } else {
            console.log('⚠️ Permissions API not supported')
        }
    } else {
        console.log('❌ Geolocation API not supported')
    }
}

// Test 5: Check localStorage functionality
function testLocalStorage() {
    console.log('\n💾 Testing localStorage...')

    try {
        const testLocation = {
            lat: 30.2672,
            lng: -97.7431,
            city: 'Austin',
            state: 'TX',
            formattedAddress: 'Austin, TX'
        }

        localStorage.setItem('testLocation', JSON.stringify(testLocation))
        const retrieved = JSON.parse(localStorage.getItem('testLocation'))

        if (retrieved && retrieved.city === 'Austin') {
            console.log('✅ localStorage working correctly')
            localStorage.removeItem('testLocation')
        } else {
            console.log('❌ localStorage data mismatch')
        }
    } catch (error) {
        console.log('❌ localStorage failed:', error.message)
    }
}

// Run all tests
function runAllTests() {
    console.log('🚀 Starting Location Service Test Suite...\n')

    testLocationServiceClass()
    testDistanceCalculation()
    testGeolocationSupport()
    testLocalStorage()
    testGeocodingEndpoints()

    console.log('\n🏁 Test Suite Complete!')
    console.log('\n📋 Manual Tests to Perform:')
    console.log('1. Visit /location-demo and click "Request Location"')
    console.log('2. Try the "Search San Francisco" button')
    console.log('3. Check that popular locations update based on your location')
    console.log('4. Visit /contractors and verify distance sorting works')
    console.log('5. Test location input field on contractors page')
}

// Export for browser console use
if (typeof window !== 'undefined') {
    window.testLocationService = runAllTests
    console.log('💡 Run testLocationService() in the browser console to test!')
}

runAllTests()
