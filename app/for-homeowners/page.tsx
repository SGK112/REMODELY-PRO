import Link from 'next/link'
import { Crown, Home, Zap, Search, Star, ArrowRight, CheckCircle, Phone, MessageSquare, Calendar, DollarSign } from 'lucide-react'

export default function ForHomeownersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Crown className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-slate-800">Remodely.AI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/signin"
                className="text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-white/60 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20">
              <Home className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-blue-700 font-semibold">For Homeowners</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
              Transform Your Home with
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI-Powered Precision
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
              Connect with Arizona's top-rated stone and surface contractors through our intelligent matching system. 
              Get instant quotes, verified professionals, and seamless project management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/quote"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center group text-lg"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <div className="flex items-center text-slate-600">
                <Phone className="w-5 h-5 mr-2" />
                <span>Call Sarah AI: (555) REMODEL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-24 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">How Remodely.AI Works</h2>
            <p className="text-xl text-slate-600">Simple, smart, and seamless</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Tell Sarah AI Your Needs</h3>
              <p className="text-slate-600">
                Describe your project to our AI assistant. She'll understand your vision, budget, and timeline to find perfect matches.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Get Matched Instantly</h3>
              <p className="text-slate-600">
                Our AI analyzes 1000+ verified contractors to find the best fit for your specific project requirements and location.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Choose with Confidence</h3>
              <p className="text-slate-600">
                Compare verified contractors, read real reviews, and book your project with complete transparency and protection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Remodely.AI?</h2>
            <p className="text-xl text-slate-600">The smartest way to renovate your home</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Verified Contractors</h3>
              <p className="text-slate-600 text-sm">
                All contractors are licensed, insured, and background-checked for your peace of mind.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">AI-Powered Matching</h3>
              <p className="text-slate-600 text-sm">
                Get matched with the perfect contractor based on your specific needs and preferences.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Transparent Pricing</h3>
              <p className="text-slate-600 text-sm">
                Get upfront quotes with no hidden fees. Compare prices and choose what works for you.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Project Management</h3>
              <p className="text-slate-600 text-sm">
                Track progress, communicate with contractors, and manage your project all in one place.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Projects */}
      <div className="py-24 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Popular Projects</h2>
            <p className="text-xl text-slate-600">Transform your space with expert craftsmanship</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Kitchen Countertops',
                description: 'Granite, quartz, and marble installations',
                icon: '🏠'
              },
              {
                title: 'Bathroom Renovation',
                description: 'Complete bathroom surface upgrades',
                icon: '🛁'
              },
              {
                title: 'Outdoor Surfaces',
                description: 'Patios, outdoor kitchens, and more',
                icon: '🌿'
              },
              {
                title: 'Commercial Projects',
                description: 'Office and retail space surfaces',
                icon: '🏢'
              },
              {
                title: 'Natural Stone',
                description: 'Travertine, limestone, and slate',
                icon: '🗻'
              },
              {
                title: 'Engineered Stone',
                description: 'Modern composite materials',
                icon: '⚡'
              }
            ].map((project, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-200">
                <div className="text-4xl mb-4">{project.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <Link
                  href="/quote"
                  className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
                >
                  Get Quote
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join thousands of homeowners who've transformed their spaces with Remodely.AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/quote"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center group text-lg"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <div className="flex items-center text-white">
              <Phone className="w-5 h-5 mr-2" />
              <span>Or call Sarah: (555) REMODEL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center mb-4">
                <Crown className="w-8 h-8 text-blue-400 mr-2" />
                <span className="text-2xl font-bold">Remodely.AI</span>
              </div>
              <p className="text-slate-400 mb-4">
                Arizona's premier AI-powered platform for home renovation projects.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Homeowners</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/quote" className="hover:text-white">Get Quote</Link></li>
                <li><Link href="/contractors" className="hover:text-white">Find Contractors</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/reviews" className="hover:text-white">Reviews</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Remodely.AI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}