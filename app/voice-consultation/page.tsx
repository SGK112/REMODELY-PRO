import Link from 'next/link'
import { Crown, Phone, MessageSquare, Zap, Clock, Star, ArrowRight, CheckCircle, Mic, Bot, Calendar } from 'lucide-react'

export default function VoiceConsultationPage() {
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
              <Mic className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-purple-700 font-semibold">Meet Sarah AI</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">
              Get Expert Advice with
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Voice AI Consultation
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto">
              Talk to Sarah, our intelligent AI assistant, about your stone and surface project. 
              Get instant answers, personalized recommendations, and connect with the right contractors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => window.location.href = 'tel:+15551234567'}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center group text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Sarah Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <div className="flex items-center text-slate-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How Sarah Works */}
      <div className="py-24 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">How Sarah AI Works</h2>
            <p className="text-xl text-slate-600">Natural conversation, intelligent solutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Call and Connect</h3>
              <p className="text-slate-600">
                Simply call (555) REMODEL and Sarah will answer immediately. No waiting, no menu options - just start talking.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Natural Conversation</h3>
              <p className="text-slate-600">
                Describe your project in your own words. Sarah understands context, asks clarifying questions, and remembers everything.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Get Matched & Booked</h3>
              <p className="text-slate-600">
                Sarah finds the perfect contractors, schedules appointments, and follows up to ensure your project succeeds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sarah's Capabilities */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Sarah Can Help With</h2>
            <p className="text-xl text-slate-600">Your AI renovation consultant</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Project Planning</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Material recommendations</li>
                <li>• Budget estimation</li>
                <li>• Timeline planning</li>
                <li>• Design suggestions</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Contractor Matching</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Skill-based matching</li>
                <li>• Location optimization</li>
                <li>• Availability checking</li>
                <li>• Reputation verification</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Appointment Scheduling</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Instant booking</li>
                <li>• Calendar coordination</li>
                <li>• Reminder notifications</li>
                <li>• Rescheduling assistance</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Technical Support</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Material specifications</li>
                <li>• Installation guidance</li>
                <li>• Maintenance tips</li>
                <li>• Troubleshooting help</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Quality Assurance</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Progress monitoring</li>
                <li>• Quality checkpoints</li>
                <li>• Issue resolution</li>
                <li>• Satisfaction follow-up</li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Project Communication</h3>
              <ul className="text-slate-600 space-y-2">
                <li>• Contractor coordination</li>
                <li>• Update notifications</li>
                <li>• Issue escalation</li>
                <li>• Final walkthrough</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-slate-600">Real experiences with Sarah AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "Sarah understood exactly what I wanted for my kitchen remodel. She found the perfect contractor and my granite countertops are stunning!"
              </p>
              <div className="font-semibold text-slate-800">- Maria Rodriguez, Phoenix</div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "Calling Sarah was so easy - no forms to fill out, just a natural conversation. The contractor she recommended was perfect for our bathroom renovation."
              </p>
              <div className="font-semibold text-slate-800">- John Chen, Scottsdale</div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mb-4">
                "Sarah saved me hours of research. She explained different quartz options and helped me choose the best one for my budget and style."
              </p>
              <div className="font-semibold text-slate-800">- Amanda Thompson, Tempe</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Talk to Sarah?
          </h2>
          <p className="text-xl text-purple-100 mb-12">
            Your AI renovation consultant is standing by to help with your project
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => window.location.href = 'tel:+15551234567'}
              className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 flex items-center group text-lg"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Sarah: (555) REMODEL
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <div className="text-white text-lg">
              <div className="flex items-center justify-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>24/7 • No wait time • Free consultation</span>
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
                Experience the future of home renovation with Sarah AI.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Voice Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => window.location.href = 'tel:+15551234567'} className="hover:text-white">Call Sarah</button></li>
                <li><Link href="/quote" className="hover:text-white">Get Quote</Link></li>
                <li><Link href="/contractors" className="hover:text-white">Find Contractors</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
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