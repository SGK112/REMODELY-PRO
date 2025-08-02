'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Globe, Zap, Heart, Shield, Flame } from 'lucide-react'

export default function DektonPage() {
  const collections = [
    {
      name: "Industrial Collection",
      description: "Urban-inspired surfaces with industrial aesthetics",
      colors: ["Trilium", "Olimpo", "Laos", "Keon"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Natural Collection",
      description: "Stone-inspired designs with ultra-compact technology",
      colors: ["Laurent", "Aura", "Danae", "Kelya"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Solid Collection",
      description: "Pure colors with exceptional performance",
      colors: ["Solid White", "Solid Black", "Solid Grey", "Solid Beige"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Flame className="w-8 h-8 text-orange-600" />,
      title: "Ultra-Compact Surface",
      description: "Revolutionary TSP technology for superior performance"
    },
    {
      icon: <Shield className="w-8 h-8 text-orange-600" />,
      title: "UV Resistant",
      description: "Won't fade or deteriorate under UV exposure"
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-600" />,
      title: "Thermal Shock Resistant",
      description: "Withstands extreme temperature changes"
    },
    {
      icon: <Star className="w-8 h-8 text-orange-600" />,
      title: "25-Year Warranty",
      description: "Comprehensive warranty for residential use"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/manufacturers" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Manufacturers
            </Link>
            <Link href="/search?brand=dekton" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-800 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <h1 className="text-5xl font-bold text-white">Dekton</h1>
                <span className="text-2xl ml-4 text-orange-200">by Cosentino</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                The Ultra-Compact Surface
              </h2>
              <p className="text-xl text-orange-100 mb-8">
                Revolutionary TSP (Technology of Sinterized Particles) creates the most advanced
                surface material. Infinite possibilities for indoor and outdoor applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-orange-800">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&h=400&fit=crop"
                alt="Dekton Ultra-Compact Surface"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Dekton?</h2>
            <p className="text-xl text-gray-600">Ultra-compact technology for unlimited applications</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collections Section */}
      <div id="collections" className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Collections</h2>
            <p className="text-xl text-gray-600">Revolutionary surfaces for every application</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{collection.name}</h3>
                  <p className="text-gray-600 mb-4">{collection.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Popular Colors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {collection.colors.map((color, colorIndex) => (
                        <span key={colorIndex} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href="/quote" className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 text-center block">
                    Request Samples
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Website Embed */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Dekton</h2>
            <p className="text-xl text-gray-600">Visit the official Dekton website for complete specifications</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <iframe
              src="https://www.dekton.com/"
              className="w-full h-96 border-0 rounded"
              title="Dekton Official Website"
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Experience Ultra-Compact Technology</h2>
            <p className="text-xl text-orange-100 mb-8">Connect with certified Dekton professionals near you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=dekton" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-orange-600">
                Find Professionals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
