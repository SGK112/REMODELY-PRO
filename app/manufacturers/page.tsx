'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, ArrowRight, Star, Award } from 'lucide-react'

export default function ManufacturersPage() {
  const manufacturers = [
    {
      name: "Caesarstone",
      slug: "caesarstone",
      description: "The original quartz surface pioneer since 1987",
      logo: "/brands/caesarstone-premium.svg",
      specialties: ["Engineered Quartz", "Premium Surfaces", "Innovative Designs"],
      established: "1987",
      color: "blue",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&h=400&fit=crop"
    },
    {
      name: "Cambria",
      slug: "cambria",
      description: "American-made quartz surfaces crafted in Minnesota",
      logo: "/brands/cambria-premium.svg",
      specialties: ["Made in USA", "Family Owned", "Natural Quartz"],
      established: "2000",
      color: "purple",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&h=400&fit=crop"
    },
    {
      name: "Silestone",
      slug: "silestone",
      description: "World's leading quartz surface with HybriQ+ technology",
      logo: "/brands/silestone-premium.svg",
      specialties: ["HybriQ+ Technology", "Global Leader", "Antibacterial"],
      established: "1990",
      color: "red",
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=600&h=400&fit=crop"
    },
    {
      name: "Corian",
      slug: "corian",
      description: "The original solid surface material for 50+ years",
      logo: "/brands/corian-logo.svg",
      specialties: ["Solid Surface", "Seamless Design", "Renewable"],
      established: "1967",
      color: "green",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&h=400&fit=crop"
    },
    {
      name: "MSI Stone",
      slug: "msi-stone",
      description: "Leading distributor of premium natural stone and surfaces",
      logo: "/brands/msi-stone-premium.svg",
      specialties: ["Natural Stone", "Quartz", "Porcelain Slabs"],
      established: "1995",
      color: "orange",
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=600&h=400&fit=crop"
    },
    {
      name: "Quartz Master",
      slug: "quartz-master",
      description: "Masters of precision-engineered quartz surfaces",
      logo: "/brands/quartz-master-premium.svg",
      specialties: ["Premium Quality", "Advanced Technology", "Design Excellence"],
      established: "2005",
      color: "indigo",
      image: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=600&h=400&fit=crop"
    },
    {
      name: "Hanstone",
      slug: "hanstone",
      description: "Korean innovation in quartz surface technology",
      logo: "/brands/hanstone-logo.svg",
      specialties: ["Korean Technology", "Eco-Friendly", "Durability"],
      established: "2003",
      color: "teal",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&h=400&fit=crop"
    },
    {
      name: "Formica",
      slug: "formica",
      description: "The original laminate brand with 110+ years of innovation",
      logo: "/brands/formica-logo.svg",
      specialties: ["Laminate", "Solid Surface", "110+ Years"],
      established: "1913",
      color: "pink",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=600&h=400&fit=crop"
    }
  ]

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "border-blue-200 hover:border-blue-400 hover:shadow-blue-100",
      purple: "border-purple-200 hover:border-purple-400 hover:shadow-purple-100",
      red: "border-red-200 hover:border-red-400 hover:shadow-red-100",
      green: "border-green-200 hover:border-green-400 hover:shadow-green-100",
      orange: "border-orange-200 hover:border-orange-400 hover:shadow-orange-100",
      indigo: "border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100",
      teal: "border-teal-200 hover:border-teal-400 hover:shadow-teal-100",
      pink: "border-pink-200 hover:border-pink-400 hover:shadow-pink-100"
    }
    return colors[color] || "border-gray-200 hover:border-gray-400"
  }

  const getButtonClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-600 hover:bg-blue-700",
      purple: "bg-purple-600 hover:bg-purple-700",
      red: "bg-red-600 hover:bg-red-700",
      green: "bg-green-600 hover:bg-green-700",
      orange: "bg-orange-600 hover:bg-orange-700",
      indigo: "bg-indigo-600 hover:bg-indigo-700",
      teal: "bg-teal-600 hover:bg-teal-700",
      pink: "bg-pink-600 hover:bg-pink-700"
    }
    return colors[color] || "bg-gray-600 hover:bg-gray-700"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
              Back to Home
            </Link>
            <Link href="/search" className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800">
              Find Contractors
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Premium Surface Manufacturers
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the world's leading brands in countertop surfaces. From engineered quartz to natural stone,
              find the perfect surface for your kitchen or bathroom project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                Get Free Quote
              </Link>
              <Link href="/search" className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900">
                Find Contractors
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search manufacturers..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Manufacturers Grid */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {manufacturers.map((manufacturer) => (
              <Link
                key={manufacturer.slug}
                href={`/manufacturers/${manufacturer.slug}`}
                className={`bg-white rounded-lg shadow-lg overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${getColorClasses(manufacturer.color)}`}
              >
                <div className="relative">
                  <Image
                    src={manufacturer.image}
                    alt={`${manufacturer.name} surfaces`}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-lg p-2 shadow-md">
                    <Image
                      src={manufacturer.logo}
                      alt={`${manufacturer.name} logo`}
                      width={80}
                      height={30}
                      className="h-6 w-auto"
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{manufacturer.name}</h3>
                    <span className="text-sm text-gray-500">Est. {manufacturer.established}</span>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {manufacturer.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {manufacturer.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={`${getButtonClasses(manufacturer.color)} text-white py-2 px-4 rounded-lg text-center block font-medium transition-colors`}>
                    View Products
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Premium Manufacturers?</h2>
            <p className="text-lg text-gray-600">The benefits of working with established surface manufacturers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600">
                Rigorous quality control and testing ensure every surface meets the highest standards.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Star className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Warranty Protection</h3>
              <p className="text-gray-600">
                Comprehensive warranties provide peace of mind for your investment.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <ArrowRight className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Network</h3>
              <p className="text-gray-600">
                Access to certified contractors and fabricators for expert installation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Connect with certified contractors who work with these premium manufacturers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Get Free Quote
            </Link>
            <Link href="/search" className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-gray-900">
              Browse Contractors
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
