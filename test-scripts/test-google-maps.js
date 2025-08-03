// Quick test script to verify Google Maps API is working
// Run this after adding your API key to .env.local

const { GoogleMapsService } = require('./lib/maps.ts');

async function testGoogleMaps() {
    console.log('🗺️  Testing Google Maps API...\n');

    try {
        // Test address geocoding
        const testAddress = "1600 Amphitheatre Parkway, Mountain View, CA";
        console.log(`📍 Testing address: ${testAddress}`);

        const coordinates = await GoogleMapsService.geocodeAddress(testAddress);

        if (coordinates) {
            console.log('✅ Geocoding successful!');
            console.log(`   Latitude: ${coordinates.lat}`);
            console.log(`   Longitude: ${coordinates.lng}`);

            // Test distance calculation
            const distance = GoogleMapsService.calculateDistance(
                coordinates,
                { lat: 37.4419, lng: -122.1430 } // Stanford University
            );

            console.log(`📏 Distance to Stanford: ${distance.toFixed(2)} miles`);
            console.log('\n🎉 Google Maps integration is working perfectly!');

        } else {
            console.log('❌ Geocoding failed - check your API key');
        }

    } catch (error) {
        console.error('❌ Google Maps API Error:', error.message);

        if (error.message.includes('API key')) {
            console.log('\n💡 Fix: Add valid API key to .env.local');
        }

        if (error.message.includes('quota')) {
            console.log('\n💡 Fix: Enable billing in Google Cloud Console');
        }
    }
}

// Run the test
testGoogleMaps();
