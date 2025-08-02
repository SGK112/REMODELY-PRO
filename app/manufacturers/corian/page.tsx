'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Recycle, Brush, Wrench } from 'lucide-react'

export default function CorianPage() {
  const collections = [
    {
      name: "Solid Surface Collection",
      description: "The original solid surface material with endless possibilities",
      colors: ["Glacier White", "Designer White", "Deep Nocturne", "Rain Cloud"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Quartz Collection",
      description: "Natural quartz beauty with Corian innovation",
      colors: ["Arrowroot", "Silverite", "Concrete", "Pietra"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Design Collection",
      description: "Bold patterns and contemporary aesthetics",
      colors: ["Lava Rock", "Blue Pebble", "Sagebrush", "Witch Hazel"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Brush className="w-8 h-8 text-green-600" />,
      title: "Seamless Design",
      description: "Create continuous surfaces with invisible joints"
    },
    {
      icon: <Wrench className="w-8 h-8 text-green-600" />,
      title: "Repairable",
      description: "Minor scratches and damages can be easily repaired"
    },
    {
      icon: <Recycle className="w-8 h-8 text-green-600" />,
      title: "Renewable",
      description: "Can be renewed and refinished like wood"
    },
    {
      icon: <Star className="w-8 h-8 text-green-600" />,
      title: "50+ Years",
      description: "Over 5 decades of innovation and reliability"
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
            <Link href="/search?brand=corian" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Image 
                  src="/brands/corian-logo.svg" 
                  alt="Corian Logo" 
                  width={200} 
                  height={60}
                  className="mr-4"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                The Original Solid Surface
              </h1>
              <p className="text-xl text-green-100 mb-8">
                Since 1967, Corian has been pioneering solid surface technology. 
                Create seamless designs with unmatched versatility and renewable beauty.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-green-900">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop" 
                alt="Corian Kitchen" 
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Corian?</h2>
            <p className="text-lg text-gray-600">Unique benefits that only the original solid surface can provide</p>
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

      {/* Innovation Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">50+ Years of Innovation</h2>
              <p className="text-lg text-gray-600 mb-6">
                From the original solid surface to today's advanced quartz formulations, 
                Corian continues to push the boundaries of what's possible in surface design.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Thermoformable for curved applications</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Invisible seaming technology</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Integrated sinks and bowls possible</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Renewable surface - can be refinished</span>
                </div>
              </div>
            </div>
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop" 
                alt="Corian Innovation" 
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Corian Collections</h2>
            <p className="text-lg text-gray-600">From solid surfaces to quartz, discover endless design possibilities</p>
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
                  <Link href="/quote" className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 text-center block">
                    Request Samples
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Experience Corian Innovation</h2>
            <p className="text-xl text-green-100 mb-8">Connect with certified Corian fabricators and designers</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-green-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=corian" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-green-600">
                Find Fabricators
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
