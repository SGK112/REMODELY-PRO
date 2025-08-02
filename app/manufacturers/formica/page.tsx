'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Palette, Clock, Wrench } from 'lucide-react'

export default function FormicaPage() {
  const collections = [
    {
      name: "Laminate Collection",
      description: "High-pressure laminate in hundreds of patterns",
      colors: ["Calacatta Marble", "Carrara Bianco", "Concrete", "Wood Grains"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Solid Surface Collection",
      description: "Seamless, repairable solid surface materials",
      colors: ["Designer White", "Bone", "Sage", "Pewter"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Metal Collection",
      description: "Real metal laminates for unique applications",
      colors: ["Brushed Aluminum", "Stainless Steel", "Copper", "Bronze"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-pink-600" />,
      title: "110+ Years",
      description: "Over a century of innovation and quality"
    },
    {
      icon: <Palette className="w-8 h-8 text-pink-600" />,
      title: "Endless Options",
      description: "Hundreds of colors, patterns, and textures"
    },
    {
      icon: <Wrench className="w-8 h-8 text-pink-600" />,
      title: "Easy Installation",
      description: "Professional installation with proven methods"
    },
    {
      icon: <Star className="w-8 h-8 text-pink-600" />,
      title: "Value Leader",
      description: "Premium quality at affordable prices"
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
            <Link href="/search?brand=formica" className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-900 to-pink-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Image 
                  src="/brands/formica-logo.svg" 
                  alt="Formica Logo" 
                  width={200} 
                  height={60}
                  className="mr-4"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                The Original Laminate Brand
              </h1>
              <p className="text-xl text-pink-100 mb-8">
                For over 110 years, Formica has been the trusted name in surfacing solutions. 
                From iconic laminates to innovative solid surfaces, we make the extraordinary possible.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-pink-900">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop" 
                alt="Formica Kitchen" 
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Formica Advantage</h2>
            <p className="text-lg text-gray-600">More than a century of innovation and trusted quality</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Formica Collections</h2>
            <p className="text-lg text-gray-600">Discover surfaces that inspire creativity and deliver performance</p>
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
                    <h4 className="font-medium text-gray-900 mb-2">Popular Options:</h4>
                    <div className="flex flex-wrap gap-2">
                      {collection.colors.map((color, colorIndex) => (
                        <span key={colorIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href="/quote" className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 text-center block">
                    Request Samples
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Innovation Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">110+ Years of Innovation</h2>
              <p className="text-lg text-gray-600 mb-6">
                Since 1913, Formica has been at the forefront of surface innovation. 
                From the original laminate to today's advanced surfacing solutions, 
                we continue to push boundaries and exceed expectations.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Hundreds of designs and colors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Multiple surface textures available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Sustainable manufacturing practices</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-pink-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Professional installation network</span>
                </div>
              </div>
            </div>
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop" 
                alt="Formica Innovation" 
                width={500} 
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Choose the Original</h2>
            <p className="text-xl text-pink-100 mb-8">Connect with certified Formica professionals near you</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-pink-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=formica" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-pink-600">
                Find Professionals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
