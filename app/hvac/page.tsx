'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Zap,
  Calculator,
  Thermometer,
  Wind,
  Home,
  Snowflake,
  Flame,
  Bot,
  Phone,
  CheckCircle,
  AlertTriangle,
  Download,
  TrendingUp
} from 'lucide-react';

const hvacSystems = [
  {
    type: 'Central Air & Heat Pump',
    efficiency: '16-20 SEER',
    cost: '$4,000-8,000',
    pros: ['Energy efficient', 'Heats and cools', 'Long lifespan'],
    cons: ['Higher upfront cost', 'Complex installation']
  },
  {
    type: 'Gas Furnace + AC',
    efficiency: '90-98% AFUE',
    cost: '$3,500-7,000',
    pros: ['Lower operating cost', 'Reliable heating', 'Fast heating'],
    cons: ['Requires gas line', 'Separate cooling system']
  },
  {
    type: 'Ductless Mini-Split',
    efficiency: '18-28 SEER',
    cost: '$2,000-5,000',
    pros: ['No ductwork needed', 'Zone control', 'Very efficient'],
    cons: ['Limited coverage', 'Indoor units visible']
  }
];

const loadFactors = {
  insulation: {
    poor: 1.3,
    average: 1.0,
    good: 0.8,
    excellent: 0.6
  },
  windows: {
    single: 1.2,
    double: 1.0,
    triple: 0.8,
    lowE: 0.7
  },
  orientation: {
    north: 0.9,
    east: 1.0,
    south: 1.1,
    west: 1.2
  }
};

export default function HVACPage() {
  const [houseData, setHouseData] = useState({
    sqft: 2000,
    ceilingHeight: 8,
    insulation: 'average',
    windows: 'double',
    orientation: 'south',
    climate: 'mixed',
    occupants: 4
  });
  const [calculation, setCalculation] = useState<{
    heatingLoad: number;
    coolingLoad: number;
    recommendedCapacity: {
      heating: number;
      cooling: number;
    };
    systemRecommendation: string;
    energyCost: {
      heating: number;
      cooling: number;
      annual: number;
    };
    ductwork: {
      supplies: number;
      returns: number;
      mainTrunk: number;
    };
  } | null>(null);

  const calculateLoad = () => {
    const { sqft, ceilingHeight, insulation, windows, orientation, climate, occupants } = houseData;

    // Base load calculation (simplified Manual J)
    const volume = sqft * ceilingHeight;
    const baseHeatingBtu = sqft * 25; // Base 25 BTU per sq ft
    const baseCoolingBtu = sqft * 30; // Base 30 BTU per sq ft

    // Apply factors
    const insulationFactor = loadFactors.insulation[insulation as keyof typeof loadFactors.insulation];
    const windowFactor = loadFactors.windows[windows as keyof typeof loadFactors.windows];
    const orientationFactor = loadFactors.orientation[orientation as keyof typeof loadFactors.orientation];

    const climateFactor = climate === 'hot' ? 1.2 : climate === 'cold' ? 1.3 : 1.0;
    const occupantLoad = occupants * 400; // 400 BTU per person

    const heatingLoad = Math.round((baseHeatingBtu * insulationFactor * windowFactor * orientationFactor * climateFactor) + occupantLoad);
    const coolingLoad = Math.round((baseCoolingBtu * insulationFactor * windowFactor * orientationFactor * climateFactor) + occupantLoad);

    // Convert to tons (12,000 BTU = 1 ton)
    const heatingTons = Math.round((heatingLoad / 12000) * 10) / 10;
    const coolingTons = Math.round((coolingLoad / 12000) * 10) / 10;

    // System recommendation
    let systemRecommendation = '';
    if (coolingTons <= 2.5) {
      systemRecommendation = 'Ductless Mini-Split';
    } else if (sqft < 1500) {
      systemRecommendation = 'Gas Furnace + AC';
    } else {
      systemRecommendation = 'Central Air & Heat Pump';
    }

    // Energy cost estimates (annual)
    const heatingCost = Math.round((heatingLoad * 2000) / 100000 * 1.2 * 100); // Rough estimate
    const coolingCost = Math.round((coolingLoad * 1000) / 12000 * 0.12 * 300); // Rough estimate

    // Ductwork calculations
    const supplies = Math.ceil(sqft / 150); // One supply per 150 sq ft
    const returns = Math.ceil(supplies / 3); // Typically 1 return per 3 supplies
    const mainTrunk = Math.ceil(Math.sqrt(coolingTons) * 20); // Duct size in inches

    setCalculation({
      heatingLoad,
      coolingLoad,
      recommendedCapacity: {
        heating: heatingTons,
        cooling: coolingTons
      },
      systemRecommendation,
      energyCost: {
        heating: heatingCost,
        cooling: coolingCost,
        annual: heatingCost + coolingCost
      },
      ductwork: {
        supplies,
        returns,
        mainTrunk
      }
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">HVAC Load Calculator AI</h1>
                  <p className="text-sm text-blue-300">Precise heating & cooling calculations</p>
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
              Size HVAC Systems Correctly Every Time
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Prevent callbacks and comfort issues with accurate load calculations. Our AI follows Manual J standards
              and considers all factors affecting heating and cooling requirements.
            </p>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Calculator className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Manual J Compliance</h3>
                <p className="text-white/70 text-sm">Industry-standard load calculations</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Thermometer className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Precise Sizing</h3>
                <p className="text-white/70 text-sm">Avoid over/undersized equipment</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Energy Efficiency</h3>
                <p className="text-white/70 text-sm">Optimize for lowest operating costs</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Wind className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Ductwork Design</h3>
                <p className="text-white/70 text-sm">Proper airflow and distribution</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Load Calculator */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calculator className="h-6 w-6 mr-3 text-blue-400" />
                Load Calculation
              </h3>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Square Footage</label>
                    <input
                      type="number"
                      value={houseData.sqft}
                      onChange={(e) => setHouseData(prev => ({ ...prev, sqft: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Ceiling Height (ft)</label>
                    <input
                      type="number"
                      value={houseData.ceilingHeight}
                      onChange={(e) => setHouseData(prev => ({ ...prev, ceilingHeight: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Insulation Level</label>
                    <select
                      value={houseData.insulation}
                      onChange={(e) => setHouseData(prev => ({ ...prev, insulation: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="poor">Poor (R-11 or less)</option>
                      <option value="average">Average (R-13 to R-19)</option>
                      <option value="good">Good (R-20 to R-30)</option>
                      <option value="excellent">Excellent (R-30+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Window Type</label>
                    <select
                      value={houseData.windows}
                      onChange={(e) => setHouseData(prev => ({ ...prev, windows: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="single">Single Pane</option>
                      <option value="double">Double Pane</option>
                      <option value="triple">Triple Pane</option>
                      <option value="lowE">Low-E Coated</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Orientation</label>
                    <select
                      value={houseData.orientation}
                      onChange={(e) => setHouseData(prev => ({ ...prev, orientation: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="north">North Facing</option>
                      <option value="east">East Facing</option>
                      <option value="south">South Facing</option>
                      <option value="west">West Facing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Climate</label>
                    <select
                      value={houseData.climate}
                      onChange={(e) => setHouseData(prev => ({ ...prev, climate: e.target.value }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="cold">Cold Climate</option>
                      <option value="mixed">Mixed Climate</option>
                      <option value="hot">Hot Climate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-white/70 text-sm mb-2">Occupants</label>
                    <input
                      type="number"
                      value={houseData.occupants}
                      onChange={(e) => setHouseData(prev => ({ ...prev, occupants: parseInt(e.target.value) || 0 }))}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  onClick={calculateLoad}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Calculate Load
                </button>

                {calculation && (
                  <div className="bg-white/10 rounded-lg p-6 space-y-4">
                    <h4 className="text-lg font-semibold text-white mb-4">Load Calculation Results</h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-red-500/20 rounded-lg">
                        <Flame className="h-8 w-8 text-red-400 mx-auto mb-2" />
                        <div className="text-red-400 font-bold text-lg">{calculation.recommendedCapacity.heating} tons</div>
                        <div className="text-white/70 text-sm">Heating Capacity</div>
                        <div className="text-white/60 text-xs">{calculation.heatingLoad.toLocaleString()} BTU/hr</div>
                      </div>
                      <div className="text-center p-4 bg-blue-500/20 rounded-lg">
                        <Snowflake className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-blue-400 font-bold text-lg">{calculation.recommendedCapacity.cooling} tons</div>
                        <div className="text-white/70 text-sm">Cooling Capacity</div>
                        <div className="text-white/60 text-xs">{calculation.coolingLoad.toLocaleString()} BTU/hr</div>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-semibold">Recommended System:</span>
                        <span className="text-blue-400 font-bold">{calculation.systemRecommendation}</span>
                      </div>

                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-white/70">Annual Heating Cost:</span>
                          <span className="text-white">${calculation.energyCost.heating}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Annual Cooling Cost:</span>
                          <span className="text-white">${calculation.energyCost.cooling}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span className="text-white">Total Annual Cost:</span>
                          <span className="text-blue-400">${calculation.energyCost.annual}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/20 pt-4">
                      <h5 className="text-white font-semibold mb-2">Ductwork Requirements:</h5>
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/70">Supply Vents:</span>
                          <span className="text-white">{calculation.ductwork.supplies}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Return Vents:</span>
                          <span className="text-white">{calculation.ductwork.returns}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Main Trunk:</span>
                          <span className="text-white">{calculation.ductwork.mainTrunk}"</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full bg-white/10 text-white py-2 rounded-lg text-sm hover:bg-white/20 transition-all flex items-center justify-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Export Load Calculation</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* System Comparison & Tips */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Home className="h-6 w-6 mr-3 text-blue-400" />
                HVAC System Comparison
              </h3>

              {hvacSystems.map((system, index) => (
                <div key={index} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-white">{system.type}</h4>
                      <p className="text-white/60">{system.efficiency}</p>
                    </div>
                    <div className="text-blue-400 font-semibold">{system.cost}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-400 font-medium">Pros:</span>
                      <ul className="text-white/70 mt-1">
                        {system.pros.map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-orange-400 font-medium">Cons:</span>
                      <ul className="text-white/70 mt-1">
                        {system.cons.map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}

              {/* Installation Tips */}
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">HVAC Installation Tips</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Properly sized equipment lasts longer and costs less to operate</li>
                      <li>• Seal all ductwork - 20% loss is common in leaky systems</li>
                      <li>• Install programmable thermostats for 10% energy savings</li>
                      <li>• Change filters every 1-3 months for optimal performance</li>
                      <li>• Annual maintenance prevents 95% of major breakdowns</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Energy Efficiency */}
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                  Energy Efficiency Ratings
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">SEER (Cooling Efficiency):</span>
                    <span className="text-white">Higher = Better (16+ recommended)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">HSPF (Heat Pump Efficiency):</span>
                    <span className="text-white">9.0+ for cold climates</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">AFUE (Furnace Efficiency):</span>
                    <span className="text-white">90%+ recommended</span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <p className="text-white/60 text-xs">
                      Higher efficiency equipment costs more upfront but saves significantly on utility bills over 15-20 year lifespan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Eliminate HVAC Comfort Complaints
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Join HVAC contractors who prevent callbacks and increase customer satisfaction with properly sized systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                  Start Free Trial
                </Link>
                <Link href="/chat" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
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
