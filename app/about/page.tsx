import Link from 'next/link'
import { Shield, Award, Users, Clock, CheckCircle, Star, Heart, MapPin } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 to-stone-100 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connecting Dreams to <span className="text-blue-600">Reality</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              NewCountertops.com is the premier platform connecting homeowners with certified stone and surface contractors nationwide. We make premium countertop installations accessible, reliable, and stress-free.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Every homeowner deserves access to skilled, trustworthy contractors for their countertop projects. We bridge the gap between homeowners with vision and certified professionals with expertise.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Since our founding, we've facilitated over $50 million in premium stone installations, connecting thousands of families with their dream kitchens and bathrooms.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                alt="Beautiful granite countertop installation"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">Verified Contractors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from contractor vetting to customer service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust & Safety</h3>
              <p className="text-gray-600">
                Every contractor is thoroughly vetted, licensed, and insured for your peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                We partner only with contractors who demonstrate exceptional craftsmanship and service.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Building lasting relationships between homeowners and local craftsmen in every community.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600">
                Consistent, dependable service from initial quote to project completion and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Real numbers from real projects across America
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">25,000+</div>
              <div className="text-gray-600 font-medium">Projects Completed</div>
              <div className="text-sm text-gray-500 mt-1">Since 2020</div>
            </div>

            <div className="text-center bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600 font-medium">Customer Satisfaction</div>
              <div className="text-sm text-gray-500 mt-1">5-Star Average Rating</div>
            </div>

            <div className="text-center bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">$50M+</div>
              <div className="text-gray-600 font-medium">Project Value</div>
              <div className="text-sm text-gray-500 mt-1">Total Installations</div>
            </div>

            <div className="text-center bg-white rounded-lg shadow-md p-6">
              <div className="text-4xl font-bold text-orange-600 mb-2">48hrs</div>
              <div className="text-gray-600 font-medium">Average Response</div>
              <div className="text-sm text-gray-500 mt-1">Quote Turnaround</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How NewCountertops.com Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes finding the perfect contractor simple and stress-free
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Tell Us Your Needs</h3>
              <p className="text-gray-600">
                Share your project details, preferred materials, timeline, and budget. Our smart matching system learns your preferences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Matched</h3>
              <p className="text-gray-600">
                We connect you with 3-5 pre-qualified contractors in your area who specialize in your specific project type and materials.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose & Install</h3>
              <p className="text-gray-600">
                Compare quotes, read reviews, and select your contractor. We support you through the entire installation process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Experienced professionals dedicated to transforming the home improvement industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">Michael Chen</h3>
              <p className="text-blue-600 font-medium mb-2">CEO & Founder</p>
              <p className="text-gray-600 text-sm">
                Former construction industry veteran with 20+ years experience in residential remodeling.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b612b367?w=200&h=200&fit=crop&crop=face"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">Sarah Rodriguez</h3>
              <p className="text-blue-600 font-medium mb-2">CTO</p>
              <p className="text-gray-600 text-sm">
                Technology leader specializing in marketplace platforms and customer experience optimization.
              </p>
            </div>

            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                alt="COO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">David Thompson</h3>
              <p className="text-blue-600 font-medium mb-2">COO</p>
              <p className="text-gray-600 text-sm">
                Operations expert focused on contractor partnerships and quality assurance programs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied homeowners who have found their perfect contractor through NewCountertops.com
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Quotes
            </Link>
            <Link
              href="/contractors"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Browse Contractors
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
