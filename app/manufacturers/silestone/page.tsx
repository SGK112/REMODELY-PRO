'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Globe, Zap, Heart } from 'lucide-react'

export default function SilestonePage() {
  const collections = [
    {
      name: "Eternal Collection",
      description: "Inspired by the most exclusive natural marbles",
      colors: ["Eternal Calacatta Gold", "Eternal Statuario", "Eternal Marquina", "Eternal Noir"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "N-Boost Collection",
      description: "Revolutionary HybriQ+ technology with superior performance",
      colors: ["Iconic White", "Pearl Jasmine", "Poblenou", "Desert Silver"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Classic Collection",
      description: "Time-tested designs with modern technology",
      colors: ["White Storm", "Blanco Norte", "Marengo", "Negro Tebas"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-red-600" />,
      title: "Global Leader",
      description: "World's leading quartz surface company since 1990"
    },
    {
      icon: <Zap className="w-8 h-8 text-red-600" />,
      title: "HybriQ+ Technology",
      description: "Revolutionary technology with premium minerals"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-600" />,
      title: "Bacteria Resistant",
      description: "Built-in protection against harmful bacteria"
    },
    {
      icon: <Star className="w-8 h-8 text-red-600" />,
      title: "25-Year Warranty",
      description: "Comprehensive warranty coverage worldwide"
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
            <Link href="/search?brand=silestone" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-900 to-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Image 
                  src="/brands/silestone-premium.svg" 
                  alt="Silestone Logo" 
                  width={200} 
                  height={60}
                  className="mr-4"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                The World's Leading Quartz Surface
              </h1>
              <p className="text-xl text-red-100 mb-8">
                For over 30 years, Silestone has been setting the standard for quartz surfaces worldwide. 
                Experience unmatched quality, innovation, and design possibilities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-red-900">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop" 
                alt="Silestone Kitchen" 
                width={600} 
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Silestone Advantage</h2>
            <p className="text-lg text-gray-600">Innovation and quality that has made us the world's leading quartz surface</p>
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

      {/* HybriQ+ Technology Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Revolutionary HybriQ+ Technology</h2>
              <p className="text-lg text-gray-600 mb-6">
                Silestone's exclusive HybriQ+ technology incorporates premium mineral components, 
                creating surfaces with unparalleled beauty and performance characteristics.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Enhanced stain resistance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Superior scratch resistance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Built-in antibacterial protection</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">UV resistance for outdoor use</span>
                </div>
              </div>
            </div>
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop" 
                alt="HybriQ+ Technology" 
                width={500} 
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Collections Section */}
      <div id="collections" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Silestone Collections</h2>
            <p className="text-lg text-gray-600">Discover our innovative collections designed for modern living</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border">
                <Image 
                  src={collection.image} 
                  alt={collection.name} 
                  width={400} 
                  height={300}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{collection.name}</h3>
                  <p className="text-gray-600 mb-4">{collection.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Featured Colors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {collection.colors.map((color, colorIndex) => (
                        <span key={colorIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href="/quote" className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 text-center block">
                    Request Samples
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Choose the World's Leading Quartz</h2>
            <p className="text-xl text-red-100 mb-8">Connect with certified Silestone professionals near you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-red-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=silestone" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-red-600">
                Find Professionals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
