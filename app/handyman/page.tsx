'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calculator,
  Camera,
  Clock,
  DollarSign,
  Hammer,
  Wrench,
  Zap,
  Droplets,
  PaintBucket,
  Home,
  CheckCircle,
  Upload,
  Bot,
  Phone
} from 'lucide-react';

const handymanServices = [
  {
    category: 'Electrical Repairs',
    icon: Zap,
    services: [
      { name: 'Outlet Installation', basePrice: 125, timeRange: '1-2 hours' },
      { name: 'Light Fixture Replace', basePrice: 175, timeRange: '1-3 hours' },
      { name: 'Ceiling Fan Install', basePrice: 225, timeRange: '2-4 hours' },
      { name: 'Switch Replacement', basePrice: 85, timeRange: '0.5-1 hours' }
    ]
  },
  {
    category: 'Plumbing Fixes',
    icon: Droplets,
    services: [
      { name: 'Faucet Replacement', basePrice: 185, timeRange: '1-2 hours' },
      { name: 'Toilet Repair', basePrice: 150, timeRange: '1-2 hours' },
      { name: 'Garbage Disposal Install', basePrice: 225, timeRange: '2-3 hours' },
      { name: 'Pipe Leak Repair', basePrice: 165, timeRange: '1-3 hours' }
    ]
  },
  {
    category: 'Drywall & Painting',
    icon: PaintBucket,
    services: [
      { name: 'Drywall Patch (small)', basePrice: 75, timeRange: '1-2 hours' },
      { name: 'Drywall Patch (large)', basePrice: 145, timeRange: '2-4 hours' },
      { name: 'Interior Painting (room)', basePrice: 350, timeRange: '4-8 hours' },
      { name: 'Touch-up Painting', basePrice: 125, timeRange: '1-2 hours' }
    ]
  },
  {
    category: 'General Repairs',
    icon: Wrench,
    services: [
      { name: 'Door Installation', basePrice: 285, timeRange: '2-4 hours' },
      { name: 'Window Repair', basePrice: 175, timeRange: '1-3 hours' },
      { name: 'Deck Repair', basePrice: 225, timeRange: '2-6 hours' },
      { name: 'Furniture Assembly', basePrice: 95, timeRange: '1-2 hours' }
    ]
  }
];

export default function HandymanPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [estimate, setEstimate] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      // Simulate AI analysis
      setTimeout(() => {
        setEstimate({
          service: 'Drywall Patch (medium)',
          price: '$125 - $165',
          time: '2-3 hours',
          materials: ['Drywall compound', 'Sandpaper', 'Primer', 'Paint'],
          confidence: '94%'
        });
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
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                  <Hammer className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Handyman Services AI</h1>
                  <p className="text-sm text-orange-300">Instant pricing for repair jobs</p>
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
              Get Instant Pricing for Any Repair Job
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
              Upload a photo or select from common repairs to get accurate pricing instantly.
              Our AI analyzes the job and provides competitive rates based on your local market.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Camera className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Photo Analysis</h3>
                <p className="text-white/70 text-sm">Upload photos for instant AI-powered estimates</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Calculator className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Accurate Pricing</h3>
                <p className="text-white/70 text-sm">Competitive rates based on local market data</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <Clock className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Time Estimates</h3>
                <p className="text-white/70 text-sm">Know exactly how long each job will take</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Photo Upload Section */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Camera className="h-6 w-6 mr-3 text-orange-400" />
                AI Photo Analysis
              </h3>

              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center mb-6">
                {uploadedImage ? (
                  <div className="space-y-4">
                    <img
                      src={uploadedImage}
                      alt="Uploaded repair"
                      className="max-w-full h-48 object-cover mx-auto rounded-lg"
                    />
                    {estimate ? (
                      <div className="bg-white/10 rounded-lg p-4 text-left">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-white">{estimate.service}</h4>
                          <span className="text-green-400 text-sm">✓ {estimate.confidence} confident</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Estimated Price:</span>
                            <span className="text-orange-400 font-semibold">{estimate.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Time Required:</span>
                            <span className="text-white">{estimate.time}</span>
                          </div>
                          <div className="pt-2">
                            <span className="text-white/70 text-xs">Materials needed:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {estimate.materials.map((material: string, index: number) => (
                                <span key={index} className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs">
                                  {material}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-white/60">
                        <div className="animate-spin w-6 h-6 border-2 border-orange-400 border-t-transparent rounded-full mx-auto mb-2"></div>
                        Analyzing image...
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60 mb-4">Upload a photo of the repair job</p>
                    <label className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all cursor-pointer inline-block">
                      Choose Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              <p className="text-white/50 text-sm text-center">
                Supports JPG, PNG, HEIC. Our AI can identify 200+ common repair types.
              </p>
            </div>

            {/* Service Categories */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <DollarSign className="h-6 w-6 mr-3 text-orange-400" />
                Common Repair Pricing
              </h3>

              {handymanServices.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white">{category.category}</h4>
                  </div>

                  <div className="space-y-3">
                    {category.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex justify-between items-center py-2 border-b border-white/10 last:border-0">
                        <div>
                          <div className="text-white font-medium">{service.name}</div>
                          <div className="text-white/60 text-sm">{service.timeRange}</div>
                        </div>
                        <div className="text-orange-400 font-semibold">
                          ${service.basePrice}+
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Pro Tips for Pricing</h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• Add 20-30% for emergency/after-hours calls</li>
                      <li>• Include material costs separately</li>
                      <li>• Consider travel time for distant jobs</li>
                      <li>• Offer package deals for multiple repairs</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Start Using Handyman AI?
              </h3>
              <p className="text-white/90 mb-6 text-lg">
                Join thousands of handyman professionals who save 2+ hours per day with accurate, instant pricing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/register" className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                  Start Free Trial
                </Link>
                <Link href="/chat" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all">
                  Talk to AI Sarah
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
