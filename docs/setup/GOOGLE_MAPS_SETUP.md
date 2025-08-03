# Google Maps Integration Setup

## Overview
This project now includes comprehensive Google Maps and Apple Maps integration for displaying contractor locations, providing directions, and enhancing the user experience.

## Prerequisites
- Google Cloud Platform account
- Google Maps JavaScript API enabled
- Billing account set up (required for Google Maps API)

## Setup Instructions

### 1. Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API
4. Go to Credentials and create an API key
5. Restrict the API key:
   - Application restrictions: HTTP referrers (websites)
   - Add your domain(s): `localhost:3000/*`, `yourdomain.com/*`
   - API restrictions: Select the APIs you enabled above

### 2. Environment Configuration
1. Copy `.env.example` to `.env.local`
2. Add your Google Maps API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

### 3. Features Included

#### Core Services
- **GoogleMapsService** (`lib/maps.ts`): Core Google Maps integration with geocoding, distance calculation, and places search
- **AppleMapsService** (`lib/apple-maps.ts`): Apple Maps integration using URL schemes for iOS/macOS devices
- **UniversalMapsService**: Intelligent service that chooses between Google/Apple Maps based on device

#### React Components
- **GoogleMap** (`components/ui/GoogleMap.tsx`): Interactive map component with contractor markers
- **MapsAction** (`components/ui/MapsAction.tsx`): Action buttons for directions and map viewing
- **EnhancedLocationProvider** (`components/providers/EnhancedLocationProvider.tsx`): Location services with permissions

#### Integration Points
- **Contractors Page**: Now includes map view mode showing all contractors on an interactive map
- **Contractor Cards**: Each contractor card includes direction buttons and map actions

### 4. Usage Examples

#### Display Map with Contractors
```tsx
import GoogleMap from '@/components/ui/GoogleMap'

const contractorLocations = contractors.map(contractor => ({
  id: contractor.id,
  name: contractor.businessName,
  address: contractor.location,
  coordinates: { lat: 33.4484, lng: -112.0740 }
}))

<GoogleMap 
  contractors={contractorLocations}
  onContractorClick={handleContractorClick}
  center={{ lat: 33.4484, lng: -112.0740 }}
  zoom={10}
/>
```

#### Add Direction Actions
```tsx
import MapsAction from '@/components/ui/MapsAction'

<MapsAction 
  contractor={{
    id: contractor.id,
    name: contractor.businessName,
    businessName: contractor.businessName,
    address: contractor.location,
    coordinates: { lat: 33.4484, lng: -112.0740 },
    phone: contractor.phone,
    website: contractor.website
  }}
  showAllActions={true}
/>
```

### 5. Device-Specific Behavior
- **iOS/macOS**: Automatically uses Apple Maps for directions when available
- **Android/Windows**: Uses Google Maps for directions
- **Web**: Falls back to Google Maps web interface

### 6. Location Services
The integration includes comprehensive location services:
- User location detection with permissions
- Reverse geocoding for address lookup
- Distance calculation between locations
- Location search with autocomplete

### 7. Cost Considerations
Google Maps API usage is billed based on:
- Map loads: $7 per 1,000 loads
- Geocoding requests: $5 per 1,000 requests
- Directions requests: $5 per 1,000 requests

Monitor usage in Google Cloud Console and set up billing alerts.

### 8. Security
- API key is restricted to your domains
- Client-side API key is safe for frontend use
- No server-side API key required for basic functionality

### 9. Testing
1. Start the development server: `npm run dev`
2. Navigate to `/contractors`
3. Click the "Map" view button to see the interactive map
4. Click on contractor markers to see info windows
5. Use direction buttons on contractor cards

### 10. Troubleshooting

#### Map not loading
- Check API key is correctly set in `.env.local`
- Verify Google Maps JavaScript API is enabled
- Check browser console for errors
- Ensure billing is set up in Google Cloud

#### Directions not working
- Check if user is on iOS for Apple Maps integration
- Verify coordinates are valid lat/lng values
- Test with different browsers and devices

## Support
For issues with Google Maps API, refer to [Google Maps Documentation](https://developers.google.com/maps/documentation/javascript).
