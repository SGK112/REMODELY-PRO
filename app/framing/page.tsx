'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calculator,
  Ruler,
  Building2,
  TreePine,
  Scissors,
  Target,
  CheckCircle,
  Bot,
  Phone,
  Download,
  FileText
} from 'lucide-react';

const framingProjects = [
  {
    name: 'Single Room Addition',
    dimensions: '12x16 feet',
    lumber: {
      studs: 45,
      plates: 8,
      headers: 4,
      blocks: 12
    },
    cost: '$850-1200',
    time: '2-3 days'
  },
  {
    name: 'Garage Addition',
    dimensions: '20x24 feet',
    lumber: {
      studs: 78,
      plates: 14,
      headers: 8,
      blocks: 20
    },
    cost: '$1400-2000',
    time: '3-5 days'
  },
  {
    name: 'Second Story Addition',
    dimensions: '24x32 feet',
    lumber: {
      studs: 120,
      plates: 22,
      headers: 12,
      blocks: 35
    },
    cost: '$2200-3200',
    time: '5-8 days'
  }
];

const lumberPrices = {
  '2x4x8': 4.50,
  '2x4x10': 5.75,
  '2x6x8': 6.25,
  '2x6x10': 8.50,
  '2x8x8': 9.75,
  '2x8x10': 12.25,
  '2x10x8': 15.50,
  '2x10x10': 19.25
};

export default function FramingPage() {
  const [projectDimensions, setProjectDimensions] = useState({
    length: 16,
    width: 12,
    height: 8
  });
  const [studSpacing, setStudSpacing] = useState(16);
  const [calculation, setCalculation] = useState<{
    materials: {
      studs: number;
      plates: number;
      headers: number;
      plywood: number;
      blocks: number;
    };
    cost: {
      studs: number;
      plates: number;
      headers: number;
      plywood: number;
      blocks: number;
      hardware: number;
    };
    total: number;
    laborHours: number;
    waste: number;
  } | null>(null);

  const calculateMaterials = () => {
    const { length, width, height } = projectDimensions;
    const perimeter = 2 * (length + width);
    const studCount = Math.ceil(perimeter / (studSpacing / 12)) + 8; // Extra for corners/doors
    const plateLength = perimeter * 2; // Top and bottom plates
    const headerCount = 6; // Estimated doors/windows

    const materials = {
      studs: studCount,
      plates: Math.ceil(plateLength / 8),
      headers: headerCount,
      plywood: Math.ceil((length * width) / 32), // Sheathing
      blocks: Math.ceil(studCount / 4)
    };

    const cost = {
      studs: materials.studs * lumberPrices['2x4x8'],
      plates: materials.plates * lumberPrices['2x4x8'],
      headers: materials.headers * lumberPrices['2x8x8'],
      plywood: materials.plywood * 45, // $45 per sheet
      blocks: materials.blocks * lumberPrices['2x4x10'],
      hardware: 150
    };

    const total = Object.values(cost).reduce((sum, value) => sum + value, 0);

    setCalculation({
      materials,
      cost,
      total,
      laborHours: Math.ceil(total / 50), // Rough estimate
      waste: Math.ceil(total * 0.1) // 10% waste factor
    });
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
                <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Framing Layout AI</h1>
                  <p className="text-sm text-amber-300">Lumber calculations & cut optimization</p>
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
              Optimize Your Framing Materials
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Calculate exact lumber needs, optimize cuts, and reduce waste by up to 25%.
              Our AI considers local building codes and standard framing practices.
            </p>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Calculator className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Precise Calculations</h3>
                <p className="text-white/70 text-sm">Account for every stud, plate, and header</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Scissors className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Cut Optimization</h3>
                <p className="text-white/70 text-sm">Minimize waste with smart cut planning</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Target className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Code Compliance</h3>
                <p className="text-white/70 text-sm">Follows local building codes automatically</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <TreePine className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Material Costs</h3>
                <p className="text-white/70 text-sm">Real-time lumber pricing updates</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Section */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Ruler className="h-6 w-6 mr-3 text-amber-400" />
                Project Calculator
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Length (ft)</label>
                    <input
                      type="number"
                      value={projectDimensions.length}
                      onChange={(e) => setProjectDimensions(prev => ({ ...prev, length: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Width (ft)</label>
                    <input
                      type="number"
                      value={projectDimensions.width}
                      onChange={(e) => setProjectDimensions(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Height (ft)</label>
                    <input
                      type="number"
                      value={projectDimensions.height}
                      onChange={(e) => setProjectDimensions(prev => ({ ...prev, height: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 text-sm mb-2">Stud Spacing</label>
                  <select
                    value={studSpacing}
                    onChange={(e) => setStudSpacing(parseInt(e.target.value))}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value={16}>16" O.C. (Standard)</option>
                    <option value={24}>24" O.C. (Economy)</option>
                    <option value={12}>12" O.C. (Load Bearing)</option>
                  </select>
                </div>

                <button
                  onClick={calculateMaterials}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Calculate Materials
                </button>

                {calculation && (
                  <div className="bg-white/10 rounded-lg p-6 space-y-4">
                    <h4 className="text-lg font-semibold text-white mb-4">Material List</h4>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">2x4 Studs:</span>
                          <span className="text-white">{calculation.materials.studs}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">2x4 Plates:</span>
                          <span className="text-white">{calculation.materials.plates}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">2x8 Headers:</span>
                          <span className="text-white">{calculation.materials.headers}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Plywood Sheets:</span>
                          <span className="text-white">{calculation.materials.plywood}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Blocking:</span>
                          <span className="text-white">{calculation.materials.blocks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Labor Hours:</span>
                          <span className="text-white">{calculation.laborHours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-white font-semibold">Total Cost:</span>
                        <span className="text-amber-400 font-bold">${Math.round(calculation.total + calculation.waste)}</span>
                      </div>
                      <p className="text-white/60 text-sm mt-1">Includes 10% waste factor</p>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-white/10 text-white py-2 rounded-lg text-sm hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Export PDF</span>
                      </button>
                      <button className="flex-1 bg-white/10 text-white py-2 rounded-lg text-sm hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>Cut List</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Common Projects */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Building2 className="h-6 w-6 mr-3 text-amber-400" />
                Common Framing Projects
              </h3>

              {framingProjects.map((project, index) => (
                <div key={index} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                      <p className="text-white/60">{project.dimensions}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-amber-400 font-semibold">{project.cost}</div>
                      <div className="text-white/60 text-sm">{project.time}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/70">Studs:</span>
                        <span className="text-white">{project.lumber.studs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Plates:</span>
                        <span className="text-white">{project.lumber.plates}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-white/70">Headers:</span>
                        <span className="text-white">{project.lumber.headers}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Blocks:</span>
                        <span className="text-white">{project.lumber.blocks}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-amber-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-amber-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Framing Pro Tips</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Order 10% extra lumber for waste and mistakes</li>
                      <li>• Pre-cut studs save time but cost more</li>
                      <li>• Check local codes for spacing requirements</li>
                      <li>• Consider engineered lumber for longer spans</li>
                      <li>• Plan electrical/plumbing routes before framing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Optimize Your Framing?
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Join framers who reduce material waste by 25% and save 3+ hours per project with precise calculations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="bg-white text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                  Start Free Trial
                </Link>
                <Link href="/chat" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-amber-600 transition-all">
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
