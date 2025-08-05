const fs = require('fs')

const emptyFiles = [
  'app/page-new.tsx',
  'app/white-label/page-broken.tsx', 
  'app/marketplace/page-redirect.tsx',
  'app/apps/voice-translation/page.tsx',
  'app/apps/handyman-assistant/demo/page.tsx',
  'app/apps/handyman-assistant/page.tsx',
  'app/apps/roofing-measurement/page.tsx',
  'app/contractors/page-new.tsx',
  'app/page-mobile.tsx'
]

const redirectTemplate = (redirectTo, title) => `'use client'

export default function RedirectPage() {
  if (typeof window !== 'undefined') {
    window.location.href = '${redirectTo}'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl text-white mb-4">${title}</h1>
        <p className="text-blue-200">If you are not redirected automatically, <a href="${redirectTo}" className="text-blue-400 underline">click here</a>.</p>
      </div>
    </div>
  )
}
`

const comingSoonTemplate = (title, description) => `'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Wrench } from 'lucide-react'

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ${title}
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            ${description}
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Wrench className="mx-auto h-16 w-16 text-blue-400 mb-4" />
            <CardTitle className="text-2xl text-white">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-blue-200">
              This feature is currently under development and will be available soon.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
`

const fileConfigs = {
  'app/page-new.tsx': { type: 'redirect', to: '/', title: 'Redirecting to Home...' },
  'app/white-label/page-broken.tsx': { type: 'redirect', to: '/white-label', title: 'Redirecting to White Label...' },
  'app/marketplace/page-redirect.tsx': { type: 'redirect', to: '/marketplace', title: 'Redirecting to Marketplace...' },
  'app/apps/voice-translation/page.tsx': { type: 'comingSoon', title: 'AI Voice Translation', description: 'Real-time voice translation for multilingual home consultations' },
  'app/apps/handyman-assistant/demo/page.tsx': { type: 'redirect', to: '/apps/handyman-assistant', title: 'Redirecting to Handyman Assistant...' },
  'app/apps/handyman-assistant/page.tsx': { type: 'comingSoon', title: 'AI Handyman Assistant', description: 'Get expert handyman advice and project guidance from our AI assistant' },
  'app/apps/roofing-measurement/page.tsx': { type: 'comingSoon', title: 'AI Roofing Measurement', description: 'Calculate roofing materials and measurements with AI precision' },
  'app/contractors/page-new.tsx': { type: 'redirect', to: '/contractors', title: 'Redirecting to Contractors...' },
  'app/page-mobile.tsx': { type: 'redirect', to: '/', title: 'Redirecting to Mobile Home...' }
}

emptyFiles.forEach(file => {
  const config = fileConfigs[file]
  let content = ''
  
  if (config.type === 'redirect') {
    content = redirectTemplate(config.to, config.title)
  } else if (config.type === 'comingSoon') {
    content = comingSoonTemplate(config.title, config.description)
  }
  
  try {
    fs.writeFileSync(file, content)
    console.log(`✅ Fixed: ${file}`)
  } catch (error) {
    console.log(`❌ Error fixing ${file}:`, error.message)
  }
})

console.log('✅ All empty pages fixed!')
