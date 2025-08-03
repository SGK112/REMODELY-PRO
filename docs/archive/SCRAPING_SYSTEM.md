# Contractor Scraping System Documentation

## Overview

Our expanded contractor scraping system now includes **27 different sources** across 4 categories, providing comprehensive coverage of available countertop and remodeling contractors.

## System Architecture

### Core Components

- **ContractorScraper**: Main orchestration class
- **ManufacturerScraper**: Base class for all scrapers
- **Category-specific scrapers**: Organized by source type
- **Database integration**: Automatic deduplication and storage
- **Admin interface**: Web-based scraping management

### Scraper Categories

#### 1. Manufacturer Websites (12 scrapers)
- **Caesarstone**: Official dealer finder
- **Cambria**: Authorized dealer network
- **Silestone**: Cosentino dealer locator
- **MSI Stone**: Dealer and installer network
- **Quartz Master**: Regional dealer network
- **Hanstone**: Authorized fabricators
- **Corian**: DuPont solid surface dealers
- **Formica**: Laminate contractor network
- **Wilsonart**: Quartz fabricator network
- **LG Viatera**: Premium quartz dealers
- **Samsung Radianz**: Surface specialist network
- **Dekton**: Architectural surface installers

#### 2. General Contractor Directories (6 scrapers)
- **Angi**: Formerly Angie's List, verified contractors
- **HomeAdvisor**: Screened & approved professionals
- **Houzz**: Kitchen & bath professionals
- **Thumbtack**: Local service providers
- **Google Business**: Maps-based local businesses
- **Better Business Bureau**: Accredited businesses

#### 3. Industry-Specific Directories (5 scrapers)
- **NKBA**: National Kitchen & Bath Association members
- **Marble Institute**: Natural stone professionals
- **Natural Stone Institute**: Certified fabricators
- **BuildZoom**: Licensed contractor database
- **Porch**: Home improvement professionals

#### 4. Local Business Directories (4 scrapers)
- **Yellow Pages**: Traditional business directory
- **Yelp**: Review-based local businesses
- **Local Associations**: Regional contractor associations
- **Facebook Business**: Social media business pages

## Usage

### API Endpoints

#### Scrape All Sources
```javascript
POST /api/scrape
{
  "location": "New York, NY",
  "category": "all"
}
```

#### Category-Specific Scraping
```javascript
POST /api/scrape
{
  "location": "Denver, CO",
  "category": "directories" // or "manufacturers", "industry", "local"
}
```

### Admin Interface

Access the admin scraping interface at `/admin/scraping`:
- Select scraper category
- Optional location filtering
- Real-time progress monitoring
- Results summary and database statistics

### Programmatic Usage

```typescript
import { ContractorScraper } from '@/lib/scraper'

const scraper = new ContractorScraper()

// Scrape specific categories
const directoryResults = await scraper.scrapeDirectoryWebsites('Miami, FL')
const industryResults = await scraper.scrapeIndustryWebsites('Miami, FL')
const localResults = await scraper.scrapeLocalDirectories('Miami, FL')

// Scrape all sources
const allResults = await scraper.scrapeAllManufacturers('Miami, FL')

// Auto-save to database
await scraper.saveContractorsToDatabase(allResults)
```

## Data Structure

### ScrapedContractor Interface
```typescript
interface ScrapedContractor {
  name: string
  businessName: string
  phone?: string
  email?: string
  website?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  latitude?: number
  longitude?: number
  specialties: string[]
  certifications: string[]
  manufacturers: string[]
  description?: string
  yearsInBusiness?: number
  licenseNumber?: string
}
```

### Database Integration

- **Automatic deduplication**: Prevents duplicate contractors
- **Data enrichment**: Merges information from multiple sources
- **Validation**: Zod schema validation for data quality
- **Geocoding**: Address-to-coordinates conversion
- **Phone parsing**: Standardized phone number formatting

## Features

### Rate Limiting
- **Manufacturer sites**: 2-second delays
- **Directory sites**: 3-second delays
- **Industry sites**: 2.5-second delays
- **Local directories**: 4-second delays

### Error Handling
- Individual scraper error isolation
- Comprehensive logging
- Timeout protection (15-second page loads)
- Graceful failure recovery

### Data Quality
- Phone number standardization
- Address parsing and geocoding
- Business name normalization
- Specialty categorization
- Certification tracking

## Performance Expectations

### Typical Results per Location
- **Manufacturer sites**: 0-5 contractors (requires selector updates)
- **Directory sites**: 5-15 contractors each (30-90 total)
- **Industry sites**: 3-10 contractors each (15-50 total)
- **Local directories**: 10-20 contractors each (40-80 total)

### Total Expected Yield
- **Per location**: 50-200+ unique contractors
- **Execution time**: 2-5 minutes for all sources
- **Success rate**: 80-90% of sources operational

## Maintenance

### Regular Updates Required
1. **CSS Selectors**: Websites change their HTML structure
2. **URL Patterns**: Sites may update their URL schemes
3. **Rate Limits**: Adjust delays based on site responsiveness
4. **New Sources**: Add emerging contractor directories

### Monitoring
- Check scraper success rates monthly
- Update selectors for failing scrapers
- Monitor database for data quality issues
- Track new contractor acquisition rates

## Security & Ethics

### Respectful Scraping
- Rate limiting to avoid overwhelming servers
- User-agent identification as legitimate browser
- Robots.txt compliance where applicable
- No aggressive concurrent requests

### Data Privacy
- Only public business information collected
- No personal consumer data scraped
- GDPR/CCPA compliant data handling
- Opt-out mechanisms for businesses

## Troubleshooting

### Common Issues

1. **Zero results from scraper**
   - Check if website structure changed
   - Update CSS selectors
   - Verify URL patterns still work

2. **Timeout errors**
   - Increase timeout values
   - Check network connectivity
   - Verify site is accessible

3. **Database errors**
   - Check Prisma schema compatibility
   - Verify required fields are populated
   - Review data validation errors

### Debugging Tools

- Browser inspection: `npm run inspect-site`
- Individual scraper testing: Category-specific API calls
- Database verification: Check admin dashboard
- Logs: Monitor console output during scraping

## Future Enhancements

### Planned Features
- **Real-time scraping**: Background job scheduling
- **AI enhancement**: LLM-powered data extraction
- **Image scraping**: Portfolio and project photos
- **Review aggregation**: Customer satisfaction data
- **Social media**: Instagram and LinkedIn profiles

### Scalability
- **Distributed scraping**: Multiple server deployment
- **Queue management**: Redis-based job processing
- **Caching**: Store results for faster access
- **API optimization**: Bulk operations and pagination

## Success Metrics

### Key Performance Indicators
- **Contractor discovery rate**: New contractors per week
- **Data accuracy**: Percentage of valid contact information
- **Coverage area**: Geographic distribution of contractors
- **Source diversity**: Contractors from multiple sources
- **Update frequency**: Fresh data acquisition rate

This comprehensive scraping system provides your marketplace with a robust foundation for discovering and cataloging countertop contractors across multiple channels, ensuring maximum coverage and data quality.
