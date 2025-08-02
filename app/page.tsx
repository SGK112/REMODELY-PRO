'use client'

import Link from 'next/link'
import { Search, Users, Star, ArrowRight, Sparkles, Shield, MapPin, CheckCircle, Phone, FileCheck, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [contractorCount, setContractorCount] = useState(750)
  const [verificationRate, setVerificationRate] = useState(95.0)

  // Simple animation for statistics
  useEffect(() => {
    const interval = setInterval(() => {
      setContractorCount(prev => prev < 783 ? prev + 1 : 783)
      setVerificationRate(prev => prev < 97.7 ? +(prev + 0.1).toFixed(1) : 97.7)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      {/* Hero Section with Beautiful Kitchen Background */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/66751c475ecf56262b237e3b_cambria-surprise-granite-brittanicca-warm-quartz-kitchen-scene.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />

        {/* Clean overlay */}
        <div className="absolute inset-0 bg-white/85 z-5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Clean Content */}
            <div className="text-left space-y-8">
              {/* Status Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-emerald-100 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                <span className="text-emerald-700 text-sm font-medium">{contractorCount}+ Verified Contractors</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
                  <span className="block">Remodely</span>
                  <span className="block text-blue-600">.AI</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Connect with verified contractors for your dream kitchen and bathroom remodels.
                </p>
              </div>

              {/* Simple Stats */}
              <div className="flex space-x-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{contractorCount}</div>
                  <div className="text-sm text-gray-600">Contractors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-emerald-600">{verificationRate}%</div>
                  <div className="text-sm text-gray-600">Verified</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">15+</div>
                  <div className="text-sm text-gray-600">States</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contractors"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Find Contractors
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>

                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Quote
                </Link>
              </div>
            </div>

            {/* Right Side - Simple Verification Card */}
            <div className="relative">
              <div className="bg-white/95 rounded-2xl p-6 shadow-xl border backdrop-blur-sm">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Verified Network</h3>
                  <p className="text-gray-600">Every contractor is thoroughly vetted</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-emerald-50 rounded-lg">
                    <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <div className="font-bold text-emerald-600">Licensed</div>
                    <div className="text-sm text-gray-600">State verified</div>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-bold text-blue-600">Local</div>
                    <div className="text-sm text-gray-600">In your area</div>
                  </div>

                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Phone className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-bold text-purple-600">Responsive</div>
                    <div className="text-sm text-gray-600">Quick replies</div>
                  </div>

                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <FileCheck className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <div className="font-bold text-orange-600">Insured</div>
                    <div className="text-sm text-gray-600">Protected work</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beautiful Remodeling Projects</h2>
            <p className="text-xl text-gray-600">See what our verified contractors can create for you</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: 'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/66751c475ecf56262b237e3b_cambria-surprise-granite-brittanicca-warm-quartz-kitchen-scene.webp',
                title: 'Modern Kitchen Remodel',
                description: 'Cambria quartz countertops with warm lighting and premium finishes'
              },
              {
                image: 'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/65335c9d645a5e7646ba6841_Bathroom-Remodel-Silverton.webp',
                title: 'Luxury Bathroom Renovation',
                description: 'Complete bathroom transformation with high-end materials'
              },
              {
                image: 'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/65b2b211fcc652d1e7a881ee_Radianz-quartz-surprise-granite-charcoal-quartz_hotel-bathrooms.webp',
                title: 'Hotel-Style Bathroom',
                description: 'Radianz quartz with sophisticated commercial-grade design'
              },
              {
                image: 'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/6456ce4476abb27db1fbb1fe_kitchen-layout-design-spec.webp',
                title: 'Professional Kitchen Design',
                description: 'Expert layout planning and design consultation services'
              },
              {
                image: 'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/65b2b210c010208397bae8f8_cambria-surprise-granite-chicago-tower-quartz_luxury-brand-retail.webp',
                title: 'Commercial Installation',
                description: 'Cambria Chicago Tower quartz for luxury retail spaces'
              },
              {
                image: 'https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/656fca1d0fb2e670f3befe03_Faucets-add-on-image.jpeg',
                title: 'Premium Fixtures & Add-ons',
                description: 'High-end faucets and custom finishing touches'
              }
            ].map((project, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="aspect-w-16 aspect-h-12">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Remodely.AI Works</h2>
            <p className="text-xl text-gray-600">Simple steps to your dream remodel</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Tell us your needs',
                desc: 'Describe your remodeling project, style preferences, and budget',
                icon: Search
              },
              {
                step: '2',
                title: 'Get matched with contractors',
                desc: 'Our AI connects you with verified local professionals',
                icon: Users
              },
              {
                step: '3',
                title: 'Start your project',
                desc: 'Review quotes, compare options, and begin your transformation',
                icon: Star
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-blue-600 font-bold mb-2">Step {item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Financing Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Flexible Financing Options</h2>
              <p className="text-xl text-gray-600 mb-8">
                Make your dream remodel affordable with our same-as-cash financing and flexible payment plans.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Same-as-cash financing available</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Quick approval process in minutes</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-emerald-600 mr-3" />
                  <span className="text-gray-700">Competitive rates and flexible terms</span>
                </div>
              </div>
              <Link
                href="/quote"
                className="inline-flex items-center mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Learn More About Financing
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div>
              <img
                src="https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/662bfb39387e83adda739fe0_same-as-cash-financing_surprise-granite.jpg"
                alt="Financing Options"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Office Spaces & Commercial Projects */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Commercial & Office Projects</h2>
            <p className="text-xl text-gray-600">Professional installations for businesses and public spaces</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative">
              <img
                src="https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/65b2b2106def21c418b4f233_cambria-surprise-granite-clovelly-office-space-public-area.webp"
                alt="Office Space Installation"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Office Reception Areas</h3>
                <p className="text-sm opacity-90">Cambria Clovelly for professional spaces</p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://cdn.prod.website-files.com/6456ce4476abb25581fbad0c/65b1dfdda64f030acf274511__cambria-surprise-granite-hotel-lobby.webp"
                alt="Hotel Lobby Installation"
                className="rounded-2xl shadow-lg w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Hotel & Hospitality</h3>
                <p className="text-sm opacity-90">Luxury installations for hospitality industry</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
