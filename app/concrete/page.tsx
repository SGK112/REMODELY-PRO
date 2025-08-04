'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Layers3,
  Calculator,
  Ruler,
  Truck,
  Timer,
  Thermometer,
  Bot,
  Phone,
  CheckCircle,
  AlertTriangle,
  Download
} from 'lucide-react';

const concreteTypes = [
  {
    type: '3000 PSI',
    price: 115,
    description: 'Standard residential concrete',
    uses: ['Driveways', 'Sidewalks', 'Patios']
  },
  {
    type: '4000 PSI',
    price: 125,
    description: 'High-strength concrete',
    uses: ['Foundations', 'Structural elements', 'Commercial']
  },
  {
    type: '5000 PSI',
    price: 140,
    description: 'Premium high-strength concrete',
    uses: ['Heavy-duty applications', 'Industrial floors']
  }
];

const concreteProjects = [
  {
    name: 'Standard Driveway',
    dimensions: '20x24x4"',
    volume: 5.9,
    cost: '$680-900',
    additionalMaterials: ['Rebar', 'Wire mesh', 'Vapor barrier']
  },
  {
    name: 'Garage Foundation',
    dimensions: '24x24x8"',
    volume: 14.2,
    cost: '$1600-2100',
    additionalMaterials: ['Rebar', 'Forms', 'Anchor bolts']
  },
  {
    name: 'Basement Floor',
    dimensions: '30x40x4"',
    volume: 14.8,
    cost: '$1700-2250',
    additionalMaterials: ['Vapor barrier', 'Insulation', 'Wire mesh']
  }
];

export default function ConcretePage() {
  const [projectData, setProjectData] = useState({
    length: 20,
    width: 15,
    thickness: 4,
    concreteType: '3000 PSI',
    projectType: 'driveway'
  });
  const [calculation, setCalculation] = useState<{
    volume: number;
    cubicYards: number;
    bags: number;
    readyMixCost: number;
    bagCost: number;
    materials: {
      rebar: number;
      wireMesh: number;
      forms: number;
    };
    laborHours: number;
    totalCost: number;
  } | null>(null);

  const calculateConcrete = () => {
    const { length, width, thickness, concreteType } = projectData;
    const volume = (length * width * (thickness / 12)); // cubic feet
    const cubicYards = volume / 27;

    const concreteData = concreteTypes.find(c => c.type === concreteType);
    const pricePerYard = concreteData?.price || 115;

    const readyMixCost = cubicYards * pricePerYard;
    const bags = Math.ceil(cubicYards * 45); // 45 bags per cubic yard
    const bagCost = bags * 4.50; // $4.50 per 80lb bag

    const materials = {
      rebar: Math.ceil((length + width) / 20) * 20, // Linear feet of rebar
      wireMesh: Math.ceil(volume / 32), // Rolls of wire mesh
      forms: Math.ceil((2 * (length + width)) / 8) // 8ft form boards needed
    };

    const laborHours = Math.ceil(cubicYards * 2.5); // 2.5 hours per cubic yard
    const materialsCost = (materials.rebar * 0.65) + (materials.wireMesh * 45) + (materials.forms * 35);
    const laborCost = laborHours * 45; // $45/hour

    setCalculation({
      volume: Math.round(volume * 10) / 10,
      cubicYards: Math.round(cubicYards * 10) / 10,
      bags,
      readyMixCost: Math.round(readyMixCost),
      bagCost: Math.round(bagCost),
      materials,
      laborHours,
      totalCost: Math.round(readyMixCost + materialsCost + laborCost)
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
                <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-slate-600 rounded-xl flex items-center justify-center">
                  <Layers3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Concrete Volume AI</h1>
                  <p className="text-sm text-gray-300">Calculate materials & costs precisely</p>
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
              Never Order Wrong Amount of Concrete Again
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Calculate exact concrete volumes, rebar requirements, and total project costs.
              Avoid costly overages and delays with precise material calculations.
            </p>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Volume Calculator</h3>
                <p className="text-white/70 text-sm">Precise cubic yard calculations</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ready Mix vs Bags</h3>
                <p className="text-white/70 text-sm">Compare delivery options and costs</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Ruler className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Rebar Planning</h3>
                <p className="text-white/70 text-sm">Reinforcement requirements included</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Timer className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Labor Estimates</h3>
                <p className="text-white/70 text-sm">Time and crew requirements</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Section */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calculator className="h-6 w-6 mr-3 text-gray-400" />
                Concrete Calculator
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Length (ft)</label>
                    <input
                      type="number"
                      value={projectData.length}
                      onChange={(e) => setProjectData(prev => ({ ...prev, length: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Width (ft)</label>
                    <input
                      type="number"
                      value={projectData.width}
                      onChange={(e) => setProjectData(prev => ({ ...prev, width: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gray-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Thickness (in)</label>
                    <input
                      type="number"
                      value={projectData.thickness}
                      onChange={(e) => setProjectData(prev => ({ ...prev, thickness: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gray-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Concrete Strength</label>
                    <select
                      value={projectData.concreteType}
                      onChange={(e) => setProjectData(prev => ({ ...prev, concreteType: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gray-500"
                    >
                      {concreteTypes.map(type => (
                        <option key={type.type} value={type.type}>
                          {type.type} - ${type.price}/yd³
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Project Type</label>
                    <select
                      value={projectData.projectType}
                      onChange={(e) => setProjectData(prev => ({ ...prev, projectType: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-gray-500"
                    >
                      <option value="driveway">Driveway</option>
                      <option value="patio">Patio</option>
                      <option value="foundation">Foundation</option>
                      <option value="sidewalk">Sidewalk</option>
                      <option value="floor">Floor</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculateConcrete}
                  className="w-full bg-gradient-to-r from-gray-500 to-slate-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Calculate Materials
                </button>

                {calculation && (
                  <div className="bg-white/10 rounded-lg p-6 space-y-4">
                    <h4 className="text-lg font-semibold text-white mb-4">Calculation Results</h4>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Volume:</span>
                          <span className="text-white">{calculation.volume} ft³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Cubic Yards:</span>
                          <span className="text-white">{calculation.cubicYards} yd³</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">80lb Bags:</span>
                          <span className="text-white">{calculation.bags}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Ready Mix:</span>
                          <span className="text-white">${calculation.readyMixCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Bagged Cost:</span>
                          <span className="text-white">${calculation.bagCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Labor Hours:</span>
                          <span className="text-white">{calculation.laborHours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <h5 className="text-white font-semibold mb-2">Additional Materials:</h5>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Rebar:</span>
                          <span className="text-white">{calculation.materials.rebar} ft</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Wire Mesh:</span>
                          <span className="text-white">{calculation.materials.wireMesh} rolls</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Forms:</span>
                          <span className="text-white">{calculation.materials.forms} boards</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center text-lg">
                        <span className="text-white font-semibold">Total Project Cost:</span>
                        <span className="text-gray-400 font-bold">${calculation.totalCost.toLocaleString()}</span>
                      </div>
                    </div>

                    <button className="w-full bg-white/10 text-white py-2 rounded-lg text-sm hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Export Estimate</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Common Projects & Tips */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Layers3 className="h-6 w-6 mr-3 text-gray-400" />
                Common Concrete Projects
              </h3>

              {concreteProjects.map((project, index) => (
                <div key={index} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{project.name}</h4>
                      <p className="text-white/60">{project.dimensions}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 font-semibold">{project.cost}</div>
                      <div className="text-white/60 text-sm">{project.volume} yd³</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-white/50 text-xs font-medium mb-2">Additional Materials:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.additionalMaterials.map((material, i) => (
                        <span key={i} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Weather Considerations */}
              <div className="bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <Thermometer className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Weather & Curing Tips</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Don't pour when temp is below 40°F or above 90°F</li>
                      <li>• Avoid pouring during rain or freezing conditions</li>
                      <li>• Keep concrete moist for 7 days for proper curing</li>
                      <li>• Use blankets or heating in cold weather</li>
                      <li>• Plan for 28 days to reach full strength</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Concrete Types Info */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4">Concrete Strength Guide</h4>
                <div className="space-y-3">
                  {concreteTypes.map((concrete, index) => (
                    <div key={index} className="border-b border-white/10 last:border-0 pb-3 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="text-white font-medium">{concrete.type}</h5>
                        <span className="text-gray-400">${concrete.price}/yd³</span>
                      </div>
                      <p className="text-white/70 text-sm mb-2">{concrete.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {concrete.uses.map((use, i) => (
                          <span key={i} className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-gray-500 to-slate-600 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Perfect Your Concrete Projects
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Join concrete contractors who eliminate waste and avoid costly mistakes with precise volume calculations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="bg-white text-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                  Start Free Trial
                </Link>
                <Link href="/chat" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-gray-600 transition-all">
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
