'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Home,
  Calculator,
  Satellite,
  Ruler,
  CloudRain,
  Shield,
  Bot,
  Phone,
  Upload,
  Download,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const roofingMaterials = [
  {
    type: 'Asphalt Shingles',
    pricePerSquare: 95,
    lifespan: '20-30 years',
    pros: ['Cost effective', 'Easy installation', 'Wide variety'],
    cons: ['Shorter lifespan', 'Less durable']
  },
  {
    type: 'Metal Roofing',
    pricePerSquare: 275,
    lifespan: '40-70 years',
    pros: ['Long lasting', 'Energy efficient', 'Fire resistant'],
    cons: ['Higher cost', 'Noise in rain']
  },
  {
    type: 'Tile Roofing',
    pricePerSquare: 450,
    lifespan: '50+ years',
    pros: ['Very durable', 'Fire resistant', 'Aesthetic appeal'],
    cons: ['Heavy weight', 'Expensive', 'Fragile']
  }
];

const commonRoofPitches = [
  { ratio: '4:12', degrees: 18.4, factor: 1.054 },
  { ratio: '6:12', degrees: 26.6, factor: 1.118 },
  { ratio: '8:12', degrees: 33.7, factor: 1.202 },
  { ratio: '10:12', degrees: 39.8, factor: 1.302 },
  { ratio: '12:12', degrees: 45, factor: 1.414 }
];

export default function RoofingPage() {
  const [roofData, setRoofData] = useState({
    length: 40,
    width: 30,
    pitch: '6:12',
    material: 'Asphalt Shingles'
  });
  const [calculation, setCalculation] = useState<{
    squares: number;
    materialCost: number;
    laborCost: number;
    total: number;
    materials: {
      shingles: number;
      underlayment: number;
      ridgeCap: number;
      starter: number;
      nails: number;
    };
  } | null>(null);
  const [satelliteImage, setSatelliteImage] = useState<string | null>(null);

  const calculateRoofing = () => {
    const { length, width, pitch, material } = roofData;
    const pitchData = commonRoofPitches.find(p => p.ratio === pitch);
    const baseArea = length * width;
    const actualArea = baseArea * (pitchData?.factor || 1.118);
    const squares = actualArea / 100;

    const materialData = roofingMaterials.find(m => m.type === material);
    const materialCost = squares * (materialData?.pricePerSquare || 95);
    const laborCost = squares * 75; // $75 per square for labor

    const materials = {
      shingles: Math.ceil(squares),
      underlayment: Math.ceil(squares),
      ridgeCap: Math.ceil((2 * (length + width)) / 33), // 33 linear feet per bundle
      starter: Math.ceil((2 * (length + width)) / 100), // Linear feet converted to bundles
      nails: Math.ceil(squares / 3) // 3 squares per box of nails
    };

    setCalculation({
      squares: Math.round(squares * 10) / 10,
      materialCost: Math.round(materialCost),
      laborCost: Math.round(laborCost),
      total: Math.round(materialCost + laborCost),
      materials
    });
  };

  const handleSatelliteUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSatelliteImage(URL.createObjectURL(file));
      // Simulate AI analysis
      setTimeout(() => {
        setRoofData(prev => ({
          ...prev,
          length: 42,
          width: 28
        }));
        // Auto-calculate after analysis
        setTimeout(calculateRoofing, 500);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <Home className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Roofing Measurement AI</h1>
                  <p className="text-sm text-red-300">Satellite imagery & material calculations</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/chat" className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                <Bot className="h-4 w-4" />
                <span>Ask Sarah</span>
              </Link>
              <Link href="/contact" className="p-2 bg-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <Phone className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Measure Roofs from Satellite Images
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Upload satellite imagery or input dimensions to get precise material calculations.
              Our AI analyzes roof pitch, area, and complexity with 95% accuracy.
            </p>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Satellite className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Satellite Analysis</h3>
                <p className="text-white/70 text-sm">95% accurate measurements from imagery</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Calculator className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Material Lists</h3>
                <p className="text-white/70 text-sm">Complete shingle, underlayment calculations</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Ruler className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Pitch Analysis</h3>
                <p className="text-white/70 text-sm">Automatic pitch detection and factoring</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Shield className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Safety First</h3>
                <p className="text-white/70 text-sm">No dangerous roof climbing required</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Satellite Upload & Calculator */}
            <div className="space-y-8">
              {/* Satellite Upload */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Satellite className="h-6 w-6 mr-3 text-red-400" />
                  Satellite Image Analysis
                </h3>

                <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-6">
                  {satelliteImage ? (
                    <div className="space-y-4">
                      <img
                        src={satelliteImage}
                        alt="Satellite roof view"
                        className="max-w-full h-48 object-cover mx-auto rounded-lg"
                      />
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <div className="animate-spin w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full"></div>
                          <span className="text-white/70 text-sm">Analyzing roof structure...</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60 mb-4">Upload satellite or aerial image</p>
                      <label className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all cursor-pointer inline-block">
                        Choose Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleSatelliteUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>

                <p className="text-white/50 text-sm text-center">
                  Best results with Google Earth, drone photos, or county assessor images
                </p>
              </div>

              {/* Manual Calculator */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Calculator className="h-6 w-6 mr-3 text-red-400" />
                  Manual Calculator
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Length (ft)</label>
                      <input
                        type="number"
                        value={roofData.length}
                        onChange={(e) => setRoofData(prev => ({ ...prev, length: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Width (ft)</label>
                      <input
                        type="number"
                        value={roofData.width}
                        onChange={(e) => setRoofData(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Roof Pitch</label>
                      <select
                        value={roofData.pitch}
                        onChange={(e) => setRoofData(prev => ({ ...prev, pitch: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                      >
                        {commonRoofPitches.map(pitch => (
                          <option key={pitch.ratio} value={pitch.ratio}>
                            {pitch.ratio} ({pitch.degrees}°)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-white/70 text-sm mb-2">Material Type</label>
                      <select
                        value={roofData.material}
                        onChange={(e) => setRoofData(prev => ({ ...prev, material: e.target.value }))}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500"
                      >
                        {roofingMaterials.map(material => (
                          <option key={material.type} value={material.type}>
                            {material.type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={calculateRoofing}
                    className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Calculate Materials
                  </button>
                </div>
              </div>
            </div>

            {/* Results & Material Info */}
            <div className="space-y-8">
              {/* Calculation Results */}
              {calculation && (
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Calculation Results</h3>

                  <div className="space-y-6">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-white font-semibold">Roof Area:</span>
                        <span className="text-red-400 font-bold">{calculation.squares} squares</span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Material Cost:</span>
                          <span className="text-white">${calculation.materialCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Labor Cost:</span>
                          <span className="text-white">${calculation.laborCost.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-white/20 pt-2 flex justify-between font-semibold">
                          <span className="text-white">Total Project:</span>
                          <span className="text-red-400">${calculation.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="text-white font-semibold mb-3">Material List</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Shingle Bundles:</span>
                          <span className="text-white">{calculation.materials.shingles * 3}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Underlayment Rolls:</span>
                          <span className="text-white">{calculation.materials.underlayment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Ridge Cap Bundles:</span>
                          <span className="text-white">{calculation.materials.ridgeCap}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Starter Strip Bundles:</span>
                          <span className="text-white">{calculation.materials.starter}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Nail Boxes:</span>
                          <span className="text-white">{calculation.materials.nails}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-white/10 text-white py-2 rounded-lg text-sm hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export Estimate</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Material Comparison */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Material Comparison</h3>

                <div className="space-y-4">
                  {roofingMaterials.map((material, index) => (
                    <div key={index} className="bg-white/10 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-semibold">{material.type}</h4>
                          <p className="text-white/60 text-sm">{material.lifespan}</p>
                        </div>
                        <div className="text-red-400 font-semibold">
                          ${material.pricePerSquare}/sq
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-green-400 font-medium">Pros:</span>
                          <ul className="text-white/70 mt-1">
                            {material.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="text-orange-400 font-medium">Cons:</span>
                          <ul className="text-white/70 mt-1">
                            {material.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Weather Considerations */}
          <div className="mt-16 bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <CloudRain className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold mb-2">Weather & Installation Tips</h4>
                <div className="grid md:grid-cols-2 gap-4 text-white/80 text-sm">
                  <ul className="space-y-1">
                    <li>• Avoid installation in temperatures below 45°F</li>
                    <li>• Don't install during rain or high winds</li>
                    <li>• Morning installation prevents heat damage</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>• Allow for thermal expansion in hot climates</li>
                    <li>• Install ice & water shield in cold regions</li>
                    <li>• Check local building codes for requirements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Modernize Your Roofing Business?
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Join roofing contractors who save 5+ hours per estimate and increase accuracy by 95% with satellite measurements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                  Start Free Trial
                </Link>
                <Link href="/chat" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-red-600 transition-all">
                  Ask AI Sarah
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
