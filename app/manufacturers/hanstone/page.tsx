'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Leaf, Globe, Shield } from 'lucide-react'

export default function HanstonePage() {
  const collections = [
    {
      name: "Calacatta Collection",
      description: "Inspired by the famous Italian marble",
      colors: ["Calacatta Elite", "Calacatta Classique", "Calacatta Nuvo", "Calacatta Vagli"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Solid Collection",
      description: "Clean, consistent colors for modern design",
      colors: ["Arctic White", "Pure Black", "Cool Grey", "Warm Beige"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Speckled Collection",
      description: "Natural granite-inspired patterns",
      colors: ["Galaxy", "Granite Look", "Pepper", "Salt & Pepper"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Globe className="w-8 h-8 text-teal-600" />,
      title: "Korean Innovation",
      description: "Advanced technology from South Korea"
    },
    {
      icon: <Leaf className="w-8 h-8 text-teal-600" />,
      title: "Eco-Friendly",
      description: "Sustainable manufacturing processes"
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-600" />,
      title: "Superior Durability",
      description: "Exceptional strength and longevity"
    },
    {
      icon: <Star className="w-8 h-8 text-teal-600" />,
      title: "Design Excellence",
      description: "Award-winning patterns and colors"
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
            <Link href="/search?brand=hanstone" className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Image 
                  src="/brands/hanstone-logo.svg" 
                  alt="Hanstone Logo" 
                  width={200} 
                  height={60}
                  className="mr-4"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Korean Innovation in Quartz
              </h1>
              <p className="text-xl text-teal-100 mb-8">
                Hanstone Quartz combines advanced Korean technology with timeless design 
                to create surfaces that are both beautiful and exceptionally durable.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-teal-900">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop" 
                alt="Hanstone Kitchen" 
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Hanstone?</h2>
            <p className="text-lg text-gray-600">Advanced technology meets timeless design</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Hanstone Collections</h2>
            <p className="text-lg text-gray-600">Discover the perfect surface for your space</p>
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
                    <h4 className="font-medium text-gray-900 mb-2">Featured Options:</h4>
                    <div className="flex flex-wrap gap-2">
                      {collection.colors.map((color, colorIndex) => (
                        <span key={colorIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href="/quote" className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 text-center block">
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
              <Image 
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop" 
                alt="Hanstone Innovation" 
                width={500} 
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Korean Technology Leadership</h2>
              <p className="text-lg text-gray-600 mb-6">
                From our state-of-the-art facilities in South Korea, Hanstone continues to 
                push the boundaries of quartz surface technology and design.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">93% natural quartz composition</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Advanced resin technology</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Eco-friendly manufacturing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">15-year limited warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Experience Hanstone Quality</h2>
            <p className="text-xl text-teal-100 mb-8">Connect with authorized Hanstone dealers and installers</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-teal-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=hanstone" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-teal-600">
                Find Dealers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
