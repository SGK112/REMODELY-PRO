'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Ruler, Calculator, Palette, Download, Share2, RotateCcw } from 'lucide-react'

export default function CabinetDesignerPage() {
  const [dimensions, setDimensions] = useState({
    width: '',
    height: '',
    depth: ''
  })
  const [selectedStyle, setSelectedStyle] = useState('modern')
  const [selectedFinish, setSelectedFinish] = useState('white')
  const [calculatedData, setCalculatedData] = useState<any>(null)

  const cabinetStyles = [
    { id: 'modern', name: 'Modern', description: 'Clean lines, minimalist design' },
    { id: 'traditional', name: 'Traditional', description: 'Classic raised panel doors' },
    { id: 'shaker', name: 'Shaker', description: 'Simple, functional design' },
    { id: 'farmhouse', name: 'Farmhouse', description: 'Rustic, country style' }
  ]

  const finishOptions = [
    { id: 'white', name: 'White', color: '#FFFFFF' },
    { id: 'gray', name: 'Gray', color: '#9CA3AF' },
    { id: 'espresso', name: 'Espresso', color: '#3C2415' },
    { id: 'oak', name: 'Natural Oak', color: '#DEB887' },
    { id: 'cherry', name: 'Cherry', color: '#8B4513' }
  ]

  const calculateCabinet = () => {
    const width = parseFloat(dimensions.width)
    const height = parseFloat(dimensions.height)
    const depth = parseFloat(dimensions.depth)

    if (!width || !height || !depth) {
      alert('Please enter valid dimensions')
      return
    }

    // Mock calculation - in a real app, this would be more sophisticated
    const volume = width * height * depth
    const surfaceArea = 2 * (width * height + height * depth + width * depth)
    const estimatedCost = volume * 15 + surfaceArea * 5 // $15 per cubic foot + $5 per square foot
    const materialNeeded = Math.ceil(surfaceArea / 32) // 4x8 sheets needed

    setCalculatedData({
      volume: Math.round(volume * 100) / 100,
      surfaceArea: Math.round(surfaceArea * 100) / 100,
      estimatedCost: Math.round(estimatedCost),
      materialSheets: materialNeeded,
      style: selectedStyle,
      finish: selectedFinish
    })
  }

  const resetCalculator = () => {
    setDimensions({ width: '', height: '', depth: '' })
    setCalculatedData(null)
    setSelectedStyle('modern')
    setSelectedFinish('white')
  }

  const handleDimensionChange = (field: string, value: string) => {
    setDimensions(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Cabinet Designer
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Design and calculate materials for your custom kitchen cabinets with AI-powered precision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="space-y-6">
            {/* Dimensions */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Ruler className="h-5 w-5 text-blue-400" />
                  Cabinet Dimensions
                </CardTitle>
                <CardDescription className="text-blue-200">
                  Enter the dimensions for your cabinet in inches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Width (in)</label>
                    <Input
                      type="number"
                      placeholder="36"
                      value={dimensions.width}
                      onChange={(e) => handleDimensionChange('width', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-blue-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Height (in)</label>
                    <Input
                      type="number"
                      placeholder="30"
                      value={dimensions.height}
                      onChange={(e) => handleDimensionChange('height', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-blue-300"
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Depth (in)</label>
                    <Input
                      type="number"
                      placeholder="12"
                      value={dimensions.depth}
                      onChange={(e) => handleDimensionChange('depth', e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-blue-300"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Style Selection */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="h-5 w-5 text-purple-400" />
                  Cabinet Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {cabinetStyles.map((style) => (
                    <Button
                      key={style.id}
                      variant={selectedStyle === style.id ? 'default' : 'outline'}
                      className={`p-4 h-auto flex flex-col items-start ${
                        selectedStyle === style.id
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                      }`}
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      <div className="font-medium">{style.name}</div>
                      <div className="text-xs opacity-80">{style.description}</div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Finish Selection */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Finish Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {finishOptions.map((finish) => (
                    <Button
                      key={finish.id}
                      variant={selectedFinish === finish.id ? 'default' : 'outline'}
                      className={`p-3 h-auto flex flex-col items-center gap-2 ${
                        selectedFinish === finish.id
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-white/10 border-white/20 text-white hover:bg-white/15'
                      }`}
                      onClick={() => setSelectedFinish(finish.id)}
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white/30"
                        style={{ backgroundColor: finish.color }}
                      />
                      <div className="text-xs">{finish.name}</div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={calculateCabinet}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Design
              </Button>
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>

          {/* Results Panel */}
          <div>
            {calculatedData ? (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-green-400" />
                    Design Results
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Your custom cabinet specifications and material calculations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Specifications */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Specifications</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-blue-300">Style:</span>
                        <div className="text-white font-medium capitalize">{calculatedData.style}</div>
                      </div>
                      <div>
                        <span className="text-blue-300">Finish:</span>
                        <div className="text-white font-medium capitalize">{calculatedData.finish}</div>
                      </div>
                      <div>
                        <span className="text-blue-300">Volume:</span>
                        <div className="text-white font-medium">{calculatedData.volume} cu ft</div>
                      </div>
                      <div>
                        <span className="text-blue-300">Surface Area:</span>
                        <div className="text-white font-medium">{calculatedData.surfaceArea} sq ft</div>
                      </div>
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <h4 className="text-white font-semibold mb-3">Material Requirements</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-300">Plywood Sheets (4x8):</span>
                        <span className="text-white font-medium">{calculatedData.materialSheets} sheets</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Hardware Kit:</span>
                        <span className="text-white font-medium">1 set</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-300">Door Hardware:</span>
                        <span className="text-white font-medium">2 hinges + 1 handle</span>
                      </div>
                    </div>
                  </div>

                  {/* Cost Estimate */}
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-white font-semibold">Estimated Cost:</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-lg px-3 py-1">
                        ${calculatedData.estimatedCost}
                      </Badge>
                    </div>
                    <p className="text-blue-200 text-sm mt-2">
                      *Estimate includes materials only. Labor costs not included.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Plan
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-12 text-center">
                  <Calculator className="mx-auto h-16 w-16 text-blue-400 mb-4 opacity-50" />
                  <h3 className="text-xl text-white mb-2">Ready to Design</h3>
                  <p className="text-blue-200">
                    Enter your cabinet dimensions and preferences to get started with your custom design.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Features */}
        <Card className="mt-12 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">AI Cabinet Designer Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ruler className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Precise Measurements</h3>
                <p className="text-blue-200 text-sm">
                  Calculate exact dimensions and material requirements for your custom cabinets
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Style Options</h3>
                <p className="text-blue-200 text-sm">
                  Choose from popular cabinet styles and finish options to match your kitchen
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">Cost Estimation</h3>
                <p className="text-blue-200 text-sm">
                  Get accurate material costs and quantity estimates for your cabinet project
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}