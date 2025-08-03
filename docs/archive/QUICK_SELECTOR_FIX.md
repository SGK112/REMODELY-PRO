## 🔧 Quick Selector Update - Practical Example

Let me show you exactly how to update CSS selectors by fixing one scraper:

### Current Issue: 
All scrapers are getting `TimeoutError: Waiting for selector` because websites changed their HTML.

### Solution:
Update selectors based on current website structure.

## 🎯 Example: Updating Yellow Pages Scraper

### Step 1: Current Failing Selectors
```typescript
// In lib/scrapers/local.ts - YellowPagesScraper
await page.waitForSelector('.result, .search-results .business-card, .organic', { timeout: 10000 })
const businessElements = await page.$$('.result, .search-results .business-card, .organic')
```

### Step 2: Updated Selectors (2025)
Yellow Pages now uses different CSS classes. Here's the fix:

```typescript
// UPDATED SELECTORS for Yellow Pages 2025
await page.waitForSelector('.srp-listing, .listing, .search-result, [data-listing-id]', { timeout: 10000 })
const businessElements = await page.$$('.srp-listing, .listing, .search-result, [data-listing-id]')
```

### Step 3: Manual Browser Check
1. Go to: https://www.yellowpages.com/search?search_terms=countertop&geo_location_terms=Denver,CO
2. Right-click on a business listing → "Inspect Element" 
3. Look for the HTML structure:
   ```html
   <div class="srp-listing" data-listing-id="12345">
     <h3 class="business-name">Rocky Mountain Granite</h3>
     <div class="phones">(303) 555-0123</div>
     <div class="street-address">123 Stone Ave</div>
   </div>
   ```
4. Test in browser console: `document.querySelectorAll('.srp-listing').length`

### Step 4: Apply the Fix

Let me create a working version of an updated scraper:
