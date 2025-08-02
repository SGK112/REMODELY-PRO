'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Mountain, Truck, Award } from 'lucide-react'

export default function MSIStonePage() {
  const collections = [
    {
      name: "Q Premium Natural Quartz",
      description: "Premium quartz surfaces with stunning natural patterns",
      colors: ["Calacatta Nuvo", "Carrara White", "Pietra Grey", "Stellar Snow"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Natural Stone Collection",
      description: "Authentic granite, marble, and travertine",
      colors: ["Absolute Black", "Kashmir White", "Santa Cecilia", "Ubatuba"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Porcelain Slabs",
      description: "Large format porcelain for modern applications",
      colors: ["Concrete Look", "Wood Look", "Marble Look", "Metal Look"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <Mountain className="w-8 h-8 text-orange-600" />,
      title: "Direct Sourcing",
      description: "We source directly from quarries worldwide"
    },
    {
      icon: <Truck className="w-8 h-8 text-orange-600" />,
      title: "Coast-to-Coast",
      description: "Distribution centers across North America"
    },
    {
      icon: <Award className="w-8 h-8 text-orange-600" />,
      title: "Quality Assurance",
      description: "Rigorous quality control and testing"
    },
    {
      icon: <Star className="w-8 h-8 text-orange-600" />,
      title: "Design Support",
      description: "Expert design consultation and support"
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
            <Link href="/search?brand=msi" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-900 to-orange-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Image 
                  src="/brands/msi-stone-premium.svg" 
                  alt="MSI Stone Logo" 
                  width={200} 
                  height={60}
                  className="mr-4"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Leading Stone & Surface Distributor
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                For over 25 years, MSI has been North America's leading distributor and fabricator 
                of premium natural stone, quartz, porcelain, and hardscaping products.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-orange-900">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop" 
                alt="MSI Stone Kitchen" 
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The MSI Advantage</h2>
            <p className="text-lg text-gray-600">Why professionals choose MSI for their stone and surface needs</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">MSI Collections</h2>
            <p className="text-lg text-gray-600">Comprehensive selection of premium surfaces for every project</p>
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
                    <h4 className="font-medium text-gray-900 mb-2">Popular Selections:</h4>
                    <div className="flex flex-wrap gap-2">
                      {collection.colors.map((color, colorIndex) => (
                        <span key={colorIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
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

      {/* Quality & Service Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop" 
                alt="MSI Quality Control" 
                width={500} 
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Uncompromising Quality</h2>
              <p className="text-lg text-gray-600 mb-6">
                MSI maintains the highest standards through direct relationships with quarries 
                and state-of-the-art processing facilities worldwide.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Over 100 distribution centers</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Direct quarry relationships worldwide</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Comprehensive quality testing</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Expert technical support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Partner with MSI</h2>
            <p className="text-xl text-orange-100 mb-8">Connect with MSI-certified contractors and fabricators</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=msi" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-orange-600">
                Find Partners
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
