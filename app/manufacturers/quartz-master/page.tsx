'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Diamond, Zap, Users } from 'lucide-react'

export default function QuartzMasterPage() {
  const collections = [
    {
      name: "Premium Collection",
      description: "Luxury quartz surfaces with exceptional patterns",
      colors: ["Arctic White", "Midnight Black", "Golden Veins", "Silver Mist"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Classic Collection",
      description: "Timeless designs for traditional and modern homes",
      colors: ["Pure White", "Storm Grey", "Beige Elegance", "Charcoal"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Designer Collection",
      description: "Bold patterns for statement-making spaces",
      colors: ["Cosmic Blue", "Ruby Red", "Emerald Green", "Sunset Orange"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Diamond className="w-8 h-8 text-indigo-600" />,
      title: "Premium Quality",
      description: "90%+ natural quartz with superior resins"
    },
    {
      icon: <Zap className="w-8 h-8 text-indigo-600" />,
      title: "Advanced Technology",
      description: "State-of-the-art manufacturing processes"
    },
    {
      icon: <Users className="w-8 h-8 text-indigo-600" />,
      title: "Expert Support",
      description: "Professional fabrication and installation"
    },
    {
      icon: <Star className="w-8 h-8 text-indigo-600" />,
      title: "20-Year Warranty",
      description: "Comprehensive warranty coverage"
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
            <Link href="/search?brand=quartz-master" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Image 
                  src="/brands/quartz-master-premium.svg" 
                  alt="Quartz Master Logo" 
                  width={200} 
                  height={60}
                  className="mr-4"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Masters of Quartz Engineering
              </h1>
              <p className="text-xl text-indigo-100 mb-8">
                Precision-engineered quartz surfaces that combine natural beauty with 
                exceptional durability. Crafted for those who demand the very best.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-indigo-900">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop" 
                alt="Quartz Master Kitchen" 
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Quartz Master Difference</h2>
            <p className="text-lg text-gray-600">Engineered excellence in every surface we create</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quartz Master Collections</h2>
            <p className="text-lg text-gray-600">Discover surfaces that redefine luxury and performance</p>
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
                    <h4 className="font-medium text-gray-900 mb-2">Signature Colors:</h4>
                    <div className="flex flex-wrap gap-2">
                      {collection.colors.map((color, colorIndex) => (
                        <span key={colorIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href="/quote" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 text-center block">
                    Request Samples
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Advanced Engineering</h2>
              <p className="text-lg text-gray-600 mb-6">
                Our proprietary manufacturing process combines the finest natural quartz crystals 
                with advanced polymer resins to create surfaces of unmatched beauty and performance.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">90%+ natural quartz content</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Advanced resin technology</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Non-porous surface finish</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Superior stain and scratch resistance</span>
                </div>
              </div>
            </div>
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop" 
                alt="Quartz Master Technology" 
                width={500} 
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Experience Quartz Mastery</h2>
            <p className="text-xl text-indigo-100 mb-8">Connect with certified Quartz Master professionals</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=quartz-master" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-indigo-600">
                Find Professionals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
