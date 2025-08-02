'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Globe, Zap, Heart, Shield } from 'lucide-react'

export default function NeolithPage() {
  const collections = [
    {
      name: "Classtone Collection",
      description: "Classic stone looks with sintered stone technology",
      colors: ["Bianco Calacatta", "Nero Marquina", "Pietra Grey", "Iron Moss"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Iron Collection",
      description: "Industrial metal aesthetics in sintered stone",
      colors: ["Iron Grey", "Iron Copper", "Iron Frost", "Iron Black"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Phedra Collection",
      description: "Concrete textures with exceptional durability",
      colors: ["Phedra Grigio", "Phedra Bianco", "Phedra Antracite", "Phedra Bone"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-gray-700" />,
      title: "Sintered Stone Leader",
      description: "Pioneer in sintered stone technology"
    },
    {
      icon: <Shield className="w-8 h-8 text-gray-700" />,
      title: "100% Natural",
      description: "Made from natural raw materials"
    },
    {
      icon: <Zap className="w-8 h-8 text-gray-700" />,
      title: "Extreme Durability",
      description: "Exceptional resistance to wear and impact"
    },
    {
      icon: <Star className="w-8 h-8 text-gray-700" />,
      title: "Large Format",
      description: "Available in large slabs up to 320x144cm"
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
            <Link href="/search?brand=neolith" className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
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
                <h1 className="text-5xl font-bold text-white">Neolith</h1>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Sintered Stone Revolution
              </h2>
              <p className="text-xl text-gray-100 mb-8">
                Pioneering sintered stone technology since 2009. Neolith surfaces offer
                unlimited design possibilities with exceptional performance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-gray-900">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&h=400&fit=crop"
                alt="Neolith Sintered Stone"
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Neolith?</h2>
            <p className="text-xl text-gray-600">Leading sintered stone technology</p>
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
            <p className="text-xl text-gray-600">Sintered stone innovation</p>
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
                  <Link href="/quote" className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 text-center block">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Neolith</h2>
            <p className="text-xl text-gray-600">Visit the official Neolith website</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <iframe
              src="https://www.neolith.com/"
              className="w-full h-96 border-0 rounded"
              title="Neolith Official Website"
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Experience Sintered Stone Innovation</h2>
            <p className="text-xl text-gray-100 mb-8">Connect with certified Neolith professionals</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=neolith" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-700">
                Find Professionals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
