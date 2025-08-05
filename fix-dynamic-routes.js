const fs = require('fs')
const path = require('path')

// Routes that need dynamic export based on the error log
const dynamicRoutes = [
  'app/api/admin/quotes/route.ts',
  'app/api/admin/users/route.ts', 
  'app/api/admin/stats/route.ts',
  'app/api/admin/bookings/route.ts',
  'app/api/customer/profile/route.ts',
  'app/api/customers/profile/route.ts',
  'app/api/contractor/profile/route.ts',
  'app/api/contractors/profile/route.ts',
  'app/api/voice-translation/audio/route.ts'
]

const dynamicExport = "export const dynamic = 'force-dynamic'\n\n"

dynamicRoutes.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8')
    
    // Check if dynamic export already exists
    if (!content.includes("export const dynamic")) {
      // Add dynamic export at the top, after imports
      const lines = content.split('\n')
      let insertIndex = 0
      
      // Find the last import line
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith('import') || lines[i].trim().startsWith('//')) {
          insertIndex = i + 1
        } else if (lines[i].trim() === '') {
          continue
        } else {
          break
        }
      }
      
      lines.splice(insertIndex, 0, dynamicExport.trim())
      content = lines.join('\n')
      
      fs.writeFileSync(filePath, content)
      console.log(`✅ Added dynamic export to: ${filePath}`)
    } else {
      console.log(`⚠️  Dynamic export already exists in: ${filePath}`)
    }
  } else {
    console.log(`❌ File not found: ${filePath}`)
  }
})

console.log('✅ Dynamic route fixes complete!')
