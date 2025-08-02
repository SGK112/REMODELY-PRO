'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, MapPin, Leaf, Crown } from 'lucide-react'

export default function CambriaPage() {
  const collections = [
    {
      name: "Brittanicca Collection",
      description: "Bold patterns inspired by British elegance",
      colors: ["Britannica Warm", "Britannica Cool", "Swanbridge", "Summerhill"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Coastal Collection",
      description: "Inspired by America's beautiful coastlines",
      colors: ["Seagrove", "Windermere", "Skara Brae", "Bowland"],
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop"
    },
    {
      name: "Classic Collection",
      description: "Timeless beauty with contemporary appeal",
      colors: ["Torquay", "Berwyn", "Bradshaw", "Ashford"],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop"
    }
  ]

  const features = [
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: "Made in USA",
      description: "Proudly manufactured in Minnesota since 2000"
    },
    {
      icon: <Crown className="w-8 h-8 text-purple-600" />,
      title: "Premium Quality",
      description: "Pure, natural quartz with unmatched beauty"
    },
    {
      icon: <Leaf className="w-8 h-8 text-purple-600" />,
      title: "Sustainable",
      description: "Environmentally responsible manufacturing"
    },
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      title: "Lifetime Warranty",
      description: "Unmatched confidence in our products"
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
            <Link href="/search?brand=cambria" className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Image 
                  src="/brands/cambria-premium.svg" 
                  alt="Cambria Logo" 
                  width={200} 
                  height={60}
                  className="mr-4"
                />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                American Made Quartz Surfaces
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                The only family-owned, American-made producer of natural quartz surfaces. 
                Crafted in Minnesota with uncompromising quality and timeless designs.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/quote" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 font-semibold">
                  Get Quote
                </Link>
                <Link href="#collections" className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-purple-900">
                  View Collections
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=800&h=600&fit=crop" 
                alt="Cambria Kitchen" 
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Cambria Difference</h2>
            <p className="text-lg text-gray-600">What makes Cambria the choice of designers and homeowners across America</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Cambria Collections</h2>
            <p className="text-lg text-gray-600">Discover designs inspired by the world's most beautiful places</p>
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
                    <h4 className="font-medium text-gray-900 mb-2">Featured Designs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {collection.colors.map((color, colorIndex) => (
                        <span key={colorIndex} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link href="/quote" className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 text-center block">
                    Request Samples
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Made in USA Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image 
                src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=800&h=600&fit=crop" 
                alt="Cambria Manufacturing" 
                width={500} 
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Proudly Made in Minnesota</h2>
              <p className="text-lg text-gray-600 mb-6">
                Since 2000, Cambria has been the only family-owned, American-made producer of natural quartz surfaces. 
                Our state-of-the-art facility in Minnesota employs American workers and supports American communities.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Family-owned and operated since 2000</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Over 100 unique designs available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Lifetime limited warranty on all products</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Sustainable manufacturing practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Experience American Quality</h2>
            <p className="text-xl text-purple-100 mb-8">Connect with authorized Cambria dealers and installers</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-white text-purple-600 px-8 py-3 rounded-lg hover:bg-gray-100 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search?brand=cambria" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600">
                Find Dealers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
