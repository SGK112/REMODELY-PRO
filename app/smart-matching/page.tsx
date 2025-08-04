'use client'

import { useState, useEffect } from 'react'
import {
  Brain,
  Target,
  Zap,
  Clock,
  MapPin,
  DollarSign,
  Star,
  CheckCircle2,
  TrendingUp,
  Users,
  Shield,
  Award,
  ArrowRight,
  Search,
  Filter,
  Sparkles,
  BarChart3,
  MessageSquare,
  Phone,
  Calendar
} from 'lucide-react'

interface ContractorMatch {
  id: number
  name: string
  rating: number
  completedProjects: number
  specialties: string[]
  matchScore: number
  distance: string
  avgCost: string
  timeline: string
  image: string
  verified: boolean
  certifications: string[]
}

export default function SmartMatchingPage() {
  const [matchingStep, setMatchingStep] = useState(1)
  const [projectData, setProjectData] = useState({
    projectType: '',
    budget: '',
    timeline: '',
    location: '',
    style: '',
    experience: ''
  })
  const [matchResults, setMatchResults] = useState<ContractorMatch[]>([])
  const [isMatching, setIsMatching] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const startMatching = async () => {
    setIsMatching(true)
    // Simulate AI matching process
    setTimeout(() => {
      setMatchResults([
        {
          id: 1,
          name: "Phoenix Premium Renovations",
          rating: 4.9,
          completedProjects: 156,
          specialties: ["Kitchen Remodeling", "Bathroom Renovation", "Custom Countertops"],
          matchScore: 98,
          distance: "2.3 miles",
          avgCost: "$65,000",
          timeline: "6-8 weeks",
          image: "🏗️",
          verified: true,
          certifications: ["ROC Licensed", "Insured", "Bonded"]
        },
        {
          id: 2,
          name: "Elite Stone & Surface Co.",
          rating: 4.8,
          completedProjects: 203,
          specialties: ["Countertop Installation", "Natural Stone", "Quartz Surfaces"],
          matchScore: 95,
          distance: "4.1 miles",
          avgCost: "$58,000",
          timeline: "5-7 weeks",
          image: "💎",
          verified: true,
          certifications: ["ROC Licensed", "Manufacturer Certified", "Insured"]
        },
        {
          id: 3,
          name: "Modern Home Solutions",
          rating: 4.7,
          completedProjects: 89,
          specialties: ["Full Kitchen Remodel", "Design Consultation", "Project Management"],
          matchScore: 92,
          distance: "6.8 miles",
          avgCost: "$72,000",
          timeline: "7-9 weeks",
          image: "🏡",
          verified: true,
          certifications: ["ROC Licensed", "Design Certified", "Insured"]
        }
      ])
      setIsMatching(false)
      setMatchingStep(3)
    }, 3000)
  }

  const matchingAlgorithmFeatures = [
    {
      icon: Brain,
      title: "Advanced AI Analysis",
      description: "Our neural network analyzes 50+ data points to find your perfect contractor match",
      details: ["Project complexity assessment", "Style compatibility analysis", "Budget optimization", "Timeline feasibility"]
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "99.2% accuracy rate in contractor-customer compatibility",
      details: ["Skill-specific matching", "Experience level alignment", "Geographic optimization", "Availability synchronization"]
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "Our AI gets smarter with every successful project completion",
      details: ["Success pattern recognition", "Quality prediction models", "Risk assessment algorithms", "Performance optimization"]
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Built-in verification and quality checks ensure reliable matches",
      details: ["License verification", "Insurance validation", "Reference checking", "Performance tracking"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 rounded-full p-4">
                <Brain className="w-12 h-12 text-blue-200" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              AI-Powered Smart Matching
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Revolutionary AI technology that matches you with the perfect contractors 
              based on your unique project needs, preferences, and requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setMatchingStep(2)}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Start Smart Matching
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                See How It Works
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Smart Matching Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our advanced AI analyzes your project requirements and matches you with the most qualified contractors
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                icon: MessageSquare,
                title: "Tell Us About Your Project",
                description: "Describe your renovation goals, budget, timeline, and preferences"
              },
              {
                step: 2,
                icon: Brain,
                title: "AI Analysis",
                description: "Our algorithms analyze 50+ factors to identify the best contractor matches"
              },
              {
                step: 3,
                icon: Target,
                title: "Get Matched",
                description: "Receive 3-5 pre-qualified contractors ranked by compatibility score"
              },
              {
                step: 4,
                icon: Phone,
                title: "Connect & Choose",
                description: "Review profiles, get quotes, and select your perfect contractor"
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Matching Interface */}
      {matchingStep === 2 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-8">Find Your Perfect Contractor Match</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <select 
                    value={projectData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Project Type</option>
                    <option value="kitchen">Kitchen Renovation</option>
                    <option value="bathroom">Bathroom Remodel</option>
                    <option value="countertops">Countertop Installation</option>
                    <option value="full-home">Full Home Renovation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                  <select 
                    value={projectData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Budget</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-75k">$50,000 - $75,000</option>
                    <option value="75k-100k">$75,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                  <select 
                    value={projectData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Timeline</option>
                    <option value="asap">ASAP (1-2 weeks)</option>
                    <option value="month">Within a month</option>
                    <option value="3months">1-3 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input 
                    type="text"
                    value={projectData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State or ZIP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Style Preference</label>
                  <select 
                    value={projectData.style}
                    onChange={(e) => handleInputChange('style', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Style</option>
                    <option value="modern">Modern</option>
                    <option value="traditional">Traditional</option>
                    <option value="transitional">Transitional</option>
                    <option value="farmhouse">Farmhouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select 
                    value={projectData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Any Experience Level</option>
                    <option value="premium">Premium (10+ years)</option>
                    <option value="experienced">Experienced (5-10 years)</option>
                    <option value="established">Established (2-5 years)</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={startMatching}
                disabled={!projectData.projectType || !projectData.budget}
                className="w-full mt-8 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Brain className="w-5 h-5 mr-2" />
                Find My Perfect Match
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Matching Process */}
      {isMatching && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-xl shadow-lg p-12">
              <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold mb-4">AI Matching in Progress...</h2>
              <p className="text-gray-600 mb-6">
                Our advanced algorithms are analyzing thousands of contractors to find your perfect matches
              </p>
              <div className="space-y-2 text-left max-w-md mx-auto">
                {[
                  "Analyzing project requirements...",
                  "Checking contractor availability...",
                  "Verifying licenses and insurance...",
                  "Calculating compatibility scores...",
                  "Ranking top matches..."
                ].map((step, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Match Results */}
      {matchingStep === 3 && matchResults.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Perfect Matches</h2>
              <p className="text-lg text-gray-600">
                Based on your requirements, here are your top contractor matches
              </p>
            </div>

            <div className="grid gap-8">
              {matchResults.map((contractor, index) => (
                <div key={contractor.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-4xl mr-4">{contractor.image}</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{contractor.name}</h3>
                        <div className="flex items-center mb-2">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium mr-2">{contractor.rating}</span>
                          <span className="text-gray-600">({contractor.completedProjects} projects)</span>
                          {contractor.verified && <Shield className="w-4 h-4 text-green-500 ml-2" />}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {contractor.specialties.map((specialty, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                        {contractor.matchScore}% Match
                      </div>
                      <p className="text-sm text-gray-600">{contractor.distance}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <DollarSign className="w-5 h-5 text-green-600 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Avg. Project Cost</p>
                      <p className="font-semibold">{contractor.avgCost}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Timeline</p>
                      <p className="font-semibold">{contractor.timeline}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <Award className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Certifications</p>
                      <p className="font-semibold">{contractor.certifications.length}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {contractor.certifications.map((cert, idx) => (
                      <span key={idx} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {cert}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Get Quote
                    </button>
                    <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </button>
                    <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Calendar className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Algorithm Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Matching Technology</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proprietary AI algorithms ensure you get the most compatible contractor matches
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {matchingAlgorithmFeatures.map((feature, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 rounded-lg p-3 mr-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proven Results</h2>
            <p className="text-xl text-blue-100">Our smart matching technology delivers exceptional outcomes</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "99.2%", label: "Match Accuracy", icon: Target },
              { number: "4.9/5", label: "Customer Satisfaction", icon: Star },
              { number: "3.2x", label: "Faster Matching", icon: Zap },
              { number: "15,000+", label: "Successful Matches", icon: Users }
            ].map((stat, index) => (
              <div key={index}>
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-200" />
                <div className="text-3xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Contractor?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Experience the power of AI-driven contractor matching today
          </p>
          <button 
            onClick={() => setMatchingStep(2)}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center mx-auto"
          >
            Start Smart Matching Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  )
}