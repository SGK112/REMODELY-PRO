'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calculator } from 'lucide-react'

export default function FramingCalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Framing Calculator
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Calculate framing materials and costs for your construction project
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <Calculator className="mx-auto h-16 w-16 text-blue-400 mb-4" />
            <CardTitle className="text-2xl text-white">Coming Soon</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-blue-200">
              Our AI-powered framing calculator is currently under development. 
              It will help you calculate lumber requirements, spacing, and costs for your framing project.
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