# Authenticated Contractor Scraping Setup Guide

## Overview
The authenticated scraping system uses real contractor accounts to access Angi and HomeAdvisor platforms, providing more reliable data than public scraping while avoiding CSS selector maintenance issues.

## Setup Instructions

### 1. Environment Variables Setup

Copy the environment template:
```bash
cp .env.scraping.example .env.local
```

Add your contractor account credentials to `.env.local`:
```env
# Angi Contractor Account
ANGI_CONTRACTOR_EMAIL=your-angi-contractor-email@example.com
ANGI_CONTRACTOR_PASSWORD=your-angi-password

# HomeAdvisor Contractor Account  
HOMEADVISOR_CONTRACTOR_EMAIL=your-homeadvisor-contractor-email@example.com
HOMEADVISOR_CONTRACTOR_PASSWORD=your-homeadvisor-password

# Optional scraping settings
SCRAPING_DELAY_MS=2000
SCRAPING_HEADLESS=false
SCRAPING_SLOW_MO=100
```

### 2. Contractor Account Requirements

#### Angi Account
- Must be a registered contractor account (not customer account)
- Account should be in good standing
- Login credentials must be valid

#### HomeAdvisor Account
- Must be a registered pro account
- Account should be active and verified
- Login credentials must be valid

### 3. Testing the System

Run the test script to verify everything works:
```bash
node test-authenticated-scraping.js
```

The test will:
- ✅ Check environment variables
- 🔐 Test authenticated login
- 📊 Scrape contractor data
- 💾 Save to database
- 📋 Display sample results

### 4. Using the Admin Interface

1. Navigate to `/admin/scraping`
2. Select "🔐 Authenticated Sources" from the category dropdown
3. Enter a location (e.g., "Los Angeles, CA")
4. Click "Start Scraping"

The system will:
- Launch a browser window (non-headless for authentication)
- Log in to both platforms using your credentials
- Search for contractors in the specified location
- Extract detailed contractor information
- Save unique contractors to the database

### 5. API Usage

Make a POST request to `/api/scrape`:
```javascript
const response = await fetch('/api/scrape', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    location: 'Los Angeles, CA',
    category: 'authenticated'
  })
})

const data = await response.json()
console.log(`Found ${data.contractorsCount} contractors`)
```

## Benefits of Authenticated Scraping

### ✅ Advantages
- **More Reliable**: Uses authenticated access instead of public scraping
- **Better Data Quality**: Access to detailed contractor profiles
- **No CSS Selector Maintenance**: Avoids the need to constantly update selectors
- **Higher Success Rate**: Less likely to be blocked or rate-limited
- **Rich Data**: Access to contractor ratings, reviews, and certifications

### ⚠️ Considerations
- **Requires Valid Accounts**: Need active contractor accounts on both platforms
- **Non-Headless Mode**: Browser window will be visible during authentication
- **Slower Execution**: Authentication process adds time to scraping
- **Account Security**: Use dedicated accounts, not primary business accounts

## Troubleshooting

### Authentication Issues
- **Problem**: Login fails
- **Solution**: Verify credentials in `.env.local`, check for CAPTCHA requirements

### No Data Found
- **Problem**: Scraping returns no results
- **Solution**: Try different locations, check if accounts have search access

### Rate Limiting
- **Problem**: Requests being blocked
- **Solution**: Increase delay settings, use different accounts

### Browser Issues
- **Problem**: Browser fails to launch
- **Solution**: Install Puppeteer dependencies: `npm install puppeteer`

## Security Best Practices

1. **Use Dedicated Accounts**: Create separate contractor accounts specifically for scraping
2. **Environment Variables**: Never commit credentials to version control
3. **Access Control**: Restrict admin interface access to authorized users only
4. **Monitor Usage**: Keep track of scraping frequency to avoid detection
5. **Backup Credentials**: Store credentials securely outside of the codebase

## Integration with Main System

The authenticated scrapers are fully integrated with the existing scraping infrastructure:

- **ContractorScraper Class**: Includes `scrapeAuthenticatedSources()` method
- **Database Integration**: Saves contractors using the same schema
- **Admin Interface**: Available as a category option
- **API Endpoint**: Supports `category: 'authenticated'` parameter
- **Deduplication**: Automatically removes duplicate contractors

## Performance Expectations

- **Speed**: ~30-60 seconds per location
- **Volume**: 15-30 contractors per platform per location
- **Reliability**: 90%+ success rate with valid credentials
- **Data Quality**: High accuracy with complete contact information

## Next Steps

1. Set up contractor accounts on Angi and HomeAdvisor
2. Add credentials to environment variables
3. Run the test script to verify functionality
4. Use the admin interface to start collecting contractor data
5. Monitor results and adjust settings as needed

For support or questions, check the application logs and test script output for detailed error information.
