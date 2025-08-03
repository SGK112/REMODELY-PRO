import Link from 'next/link'
import { Crown, Building2, Zap, Users, DollarSign, Clock, Star, ArrowRight, CheckCircle, Phone, Mail, MapPin } from 'lucide-react'

export default function ForContractorsPage() {
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
                Join Now
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
              <Building2 className="w-5 h-5 text-indigo-600 mr-2" />
              <span className="text-indigo-700 font-semibold">For Stone & Surface Contractors</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
              Grow Your Business with
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI-Powered Leads
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
              Join Arizona's premier AI-driven marketplace connecting homeowners with qualified stone and surface contractors. 
              Get verified leads, AI-powered matching, and automated business growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/signup"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center group text-lg"
              >
                Start Free Trial
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

      {/* Benefits Section */}
      <div className="py-24 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose Remodely.AI?</h2>
            <p className="text-xl text-slate-600">The future of contractor marketing is here</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">AI-Powered Matching</h3>
              <p className="text-slate-600">
                Our Sarah AI assistant qualifies leads and matches you with ideal customers based on project requirements, location, and your expertise.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Verified Leads</h3>
              <p className="text-slate-600">
                Every lead is pre-qualified through our AI system and phone verification process. No more wasted time on unqualified prospects.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Competitive Pricing</h3>
              <p className="text-slate-600">
                Pay only for qualified leads that match your service area and specialties. No monthly fees, no contracts - just results.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">24/7 Lead Generation</h3>
              <p className="text-slate-600">
                Our AI works around the clock, capturing leads from multiple channels and connecting customers with you instantly.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Reputation Management</h3>
              <p className="text-slate-600">
                Build your online presence with our integrated review system and showcase your best work to attract premium clients.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Business Growth Tools</h3>
              <p className="text-slate-600">
                Access analytics, customer management tools, and AI insights to scale your contracting business efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Specialties Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Specialties We Support</h2>
            <p className="text-xl text-slate-600">Premium stone and surface contractors across Arizona</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Granite Countertops',
              'Quartz Surfaces', 
              'Marble Installation',
              'Natural Stone',
              'Engineered Stone',
              'Kitchen Remodeling',
              'Bathroom Renovation',
              'Commercial Projects'
            ].map((specialty, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800">{specialty}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-12">
            Join hundreds of contractors already growing with Remodely.AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/signup"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200 flex items-center group text-lg"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <div className="flex items-center text-white">
              <div className="flex items-center mr-6">
                <Phone className="w-5 h-5 mr-2" />
                <span>(555) REMODEL</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>contractors@remodely.ai</span>
              </div>
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
                Arizona's premier AI-powered marketplace for stone and surface contractors.
              </p>
              <div className="flex items-center text-slate-400">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Serving contractors across Arizona</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Contractors</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/signup" className="hover:text-white">Join Platform</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/success-stories" className="hover:text-white">Success Stories</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
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