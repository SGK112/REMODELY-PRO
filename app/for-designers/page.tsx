'use client'

import { useState } from 'react'
import {
  Palette,
  Camera,
  Ruler,
  Lightbulb,
  Users,
  Star,
  Download,
  Eye,
  Share2,
  Heart,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Image,
  PaintBucket,
  Layers,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react'

export default function DesignersPage() {
  const [activeTab, setActiveTab] = useState('tools')
  const [selectedDesign, setSelectedDesign] = useState(null)

  const designTools = [
    {
      icon: Palette,
      name: "AI Color Palette Generator",
      description: "Generate harmonious color schemes based on room type, lighting, and style preferences",
      features: ["Smart color matching", "Lighting-aware palettes", "Accessibility compliance", "Export to design software"]
    },
    {
      icon: Camera,
      name: "Space Visualization AI",
      description: "Transform photos into 3D renderings with different design options",
      features: ["Photo-to-3D conversion", "Material swapping", "Lighting simulation", "Before/after comparisons"]
    },
    {
      icon: Ruler,
      name: "Smart Space Planner",
      description: "AI-powered layout optimization for maximum functionality and flow",
      features: ["Optimal furniture placement", "Traffic flow analysis", "Space utilization metrics", "Building code compliance"]
    },
    {
      icon: Lightbulb,
      name: "Design Inspiration Engine",
      description: "Curated design ideas based on client preferences and current trends",
      features: ["Trend analysis", "Style matching", "Client preference learning", "Mood board generation"]
    },
    {
      icon: PaintBucket,
      name: "Material Selector Pro",
      description: "Advanced material selection with cost analysis and contractor availability",
      features: ["Cost comparison", "Durability ratings", "Supplier network", "Sustainability metrics"]
    },
    {
      icon: Layers,
      name: "Project Collaboration Hub",
      description: "Seamless collaboration between designers, contractors, and clients",
      features: ["Real-time updates", "Comment threads", "Version control", "Client approval workflow"]
    }
  ]

  const designCategories = [
    {
      name: "Modern Minimalist",
      count: 1247,
      image: "🏠",
      trending: true
    },
    {
      name: "Scandinavian",
      count: 892,
      image: "🌿",
      trending: true
    },
    {
      name: "Industrial Chic",
      count: 654,
      image: "🏭",
      trending: false
    },
    {
      name: "Mid-Century Modern",
      count: 543,
      image: "🛋️",
      trending: true
    },
    {
      name: "Rustic Farmhouse",
      count: 432,
      image: "🌾",
      trending: false
    },
    {
      name: "Contemporary Luxury",
      count: 321,
      image: "✨",
      trending: true
    }
  ]

  const featuredProjects = [
    {
      title: "Downtown Loft Transformation",
      designer: "Sarah Chen Design",
      style: "Industrial Modern",
      budget: "$85K",
      timeline: "8 weeks",
      rating: 4.9,
      likes: 234,
      views: 12500,
      image: "🏙️"
    },
    {
      title: "Family Kitchen Renovation",
      designer: "Home & Heart Studios",
      style: "Modern Farmhouse",
      budget: "$65K",
      timeline: "6 weeks",
      rating: 4.8,
      likes: 187,
      views: 9800,
      image: "👨‍👩‍👧‍👦"
    },
    {
      title: "Luxury Master Suite",
      designer: "Elite Interiors",
      style: "Contemporary",
      budget: "$120K",
      timeline: "10 weeks",
      rating: 5.0,
      likes: 312,
      views: 15600,
      image: "🛏️"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-16 h-16 text-yellow-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Design Tools for Professionals
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">
              Powerful AI-driven design tools, contractor collaboration, and project management 
              built specifically for interior designers and design professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'tools', label: 'Design Tools', icon: Palette },
              { id: 'gallery', label: 'Inspiration Gallery', icon: Image },
              { id: 'collaboration', label: 'Collaboration', icon: Users },
              { id: 'pricing', label: 'Pricing', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Design Tools Tab */}
      {activeTab === 'tools' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Professional Design Tools</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                AI-powered tools designed to enhance your creative workflow and streamline project delivery
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designTools.map((tool, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 rounded-lg p-3 mr-4">
                      <tool.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <ul className="space-y-2 mb-6">
                    {tool.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                    Try Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inspiration Gallery Tab */}
      {activeTab === 'gallery' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Design Inspiration Gallery</h2>
              <p className="text-lg text-gray-600">
                Curated designs from top professionals in our network
              </p>
            </div>

            {/* Design Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
              {designCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-lg p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                  <div className="text-3xl mb-2">{category.image}</div>
                  <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.count} designs</p>
                  {category.trending && (
                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mt-2">
                      Trending
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Featured Projects */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-gradient-to-br from-purple-400 to-pink-400 h-48 flex items-center justify-center text-6xl">
                    {project.image}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-purple-600 font-medium mb-2">{project.designer}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">{project.style}</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">{project.budget}</span>
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">{project.timeline}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{project.rating}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <Heart className="w-4 h-4 text-red-500 mr-1" />
                          <span className="text-sm text-gray-600">{project.likes}</span>
                        </div>
                        <div className="flex items-center">
                          <Eye className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-sm text-gray-600">{project.views}</span>
                        </div>
                      </div>
                      <button className="text-purple-600 hover:text-purple-700">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Collaboration Tab */}
      {activeTab === 'collaboration' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Seamless Collaboration</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Connect with contractors, manage projects, and deliver exceptional results with our collaboration platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6">Designer-Contractor Network</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "Verified Contractors",
                      description: "Work with pre-screened, licensed contractors who understand design requirements"
                    },
                    {
                      title: "Real-time Communication",
                      description: "Instant messaging, file sharing, and progress updates keep everyone aligned"
                    },
                    {
                      title: "Project Management",
                      description: "Track timelines, budgets, and deliverables all in one collaborative workspace"
                    },
                    {
                      title: "Client Approval Workflow",
                      description: "Streamlined approval process with digital signatures and change order management"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h4 className="text-xl font-semibold mb-4">Collaboration Stats</h4>
                <div className="space-y-4">
                  {[
                    { label: "Active Design Projects", value: "2,847", trend: "+12%" },
                    { label: "Verified Contractors", value: "1,234", trend: "+8%" },
                    { label: "Project Completion Rate", value: "98.5%", trend: "+2%" },
                    { label: "Client Satisfaction", value: "4.9/5", trend: "+0.1" }
                  ].map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{stat.label}</span>
                      <div className="text-right">
                        <span className="font-semibold text-lg">{stat.value}</span>
                        <span className="text-green-600 text-sm ml-2">{stat.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Tab */}
      {activeTab === 'pricing' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Designer Plans</h2>
              <p className="text-lg text-gray-600">Choose the perfect plan for your design practice</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Freelancer',
                  price: '$49',
                  period: '/month',
                  description: 'Perfect for independent designers',
                  features: [
                    'Up to 10 active projects',
                    'Basic design tools',
                    'Contractor network access',
                    'Client collaboration',
                    'Mobile app',
                    'Email support'
                  ]
                },
                {
                  name: 'Studio',
                  price: '$149',
                  period: '/month',
                  description: 'Ideal for design studios and teams',
                  features: [
                    'Unlimited projects',
                    'Advanced AI tools',
                    'Team collaboration',
                    'Priority contractor matching',
                    'Custom branding',
                    'Analytics dashboard',
                    'Phone support'
                  ],
                  popular: true
                },
                {
                  name: 'Enterprise',
                  price: '$399',
                  period: '/month',
                  description: 'For large design firms',
                  features: [
                    'Everything in Studio',
                    'White-label solution',
                    'API access',
                    'Custom integrations',
                    'Dedicated support',
                    'Training sessions',
                    'SLA guarantees'
                  ]
                }
              ].map((plan, index) => (
                <div key={index} className={`rounded-xl p-8 ${plan.popular ? 'bg-purple-600 text-white transform scale-105' : 'bg-white shadow-lg'}`}>
                  {plan.popular && (
                    <div className="bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={plan.popular ? 'text-purple-100' : 'text-gray-600'}>{plan.period}</span>
                  </div>
                  <p className={`mb-6 ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle2 className={`w-5 h-5 mr-3 ${plan.popular ? 'text-purple-200' : 'text-green-500'}`} />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'bg-white text-purple-600 hover:bg-gray-100'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}>
                    Start Free Trial
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Design Practice?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join over 5,000 designers using Remodely.AI to create stunning spaces and grow their business
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}