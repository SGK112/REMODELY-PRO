'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Award, Shield, Sparkles } from 'lucide-react'

export default function CaesarstonePage() {
  const collections = [
    {
      name: "Classico Collection",
      description: "Timeless designs inspired by natural stone",
      colors: ["Pure White", "Oyster", "Ginger", "Raw Concrete"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Supernatural Collection",
      description: "Large format slabs with dramatic veining",
      colors: ["Calacatta Nuvo", "Statuario Nuvo", "Taj Royale"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Motivo Collection",
      description: "Contemporary patterns and textures",
      colors: ["Crocodile", "Linen", "Nougat", "Sleek Concrete"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Non-Porous Surface",
      description: "Resists stains and bacteria without sealing"
    },
    {
      icon: <Award className="w-8 h-8 text-blue-600" />,
      title: "Industry Leader",
      description: "Pioneer in engineered quartz technology since 1987"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      title: "Premium Quality",
      description: "93% natural quartz with advanced polymer resins"
    },
    {
      icon: <Star className="w-8 h-8 text-blue-600" />,
      title: "Design Excellence",
      description: "Award-winning designs recognized worldwide"
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
            <Link href="/search?brand=caesarstone" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Image 
                  src="/brands/caesarstone-premium.svg" 
                  alt="Caesarstone Logo" 
                  width={200} 
                  height={60}
                  className="mr-4"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                The Original Quartz Surface
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Since 1987, Caesarstone has been the pioneer in engineered quartz surfaces, 
                combining natural beauty with superior performance for kitchens and bathrooms worldwide.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-900">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop" 
                alt="Caesarstone Kitchen" 
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Caesarstone?</h2>
            <p className="text-lg text-gray-600">The benefits that make Caesarstone the preferred choice for designers and homeowners</p>
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
      <div id="collections" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Caesarstone Collections</h2>
            <p className="text-lg text-gray-600">Discover our diverse range of engineered quartz surfaces</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
                    <h4 className="font-medium text-gray-900 mb-2">Popular Colors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {collection.colors.map((color, colorIndex) => (
                        <span key={colorIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href="/quote" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-center block">
                    Request Samples
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Technical Excellence</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-900">Composition:</span>
                  <span className="text-gray-600">93% Natural Quartz</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-900">Thickness:</span>
                  <span className="text-gray-600">12mm, 20mm, 30mm</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-900">Warranty:</span>
                  <span className="text-gray-600">15 Years Limited</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-900">Maintenance:</span>
                  <span className="text-gray-600">No Sealing Required</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="font-medium text-gray-900">Heat Resistance:</span>
                  <span className="text-gray-600">Up to 150°C (300°F)</span>
                </div>
              </div>
            </div>
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop" 
                alt="Caesarstone Technical" 
                width={500} 
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Choose Caesarstone?</h2>
            <p className="text-xl text-blue-100 mb-8">Connect with certified Caesarstone installers in your area</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=caesarstone" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600">
                Find Installers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
