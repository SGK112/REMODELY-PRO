'use client'

import { useState } from 'react'
import {
  Building2,
  Users,
  Calculator,
  Shield,
  Clock,
  CheckCircle2,
  Star,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Award,
  Settings,
  BarChart3,
  FileText,
  Camera,
  Zap
} from 'lucide-react'

export default function CommercialPage() {
  const [selectedPlan, setSelectedPlan] = useState('enterprise')
  const [contactForm, setContactForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // API call to submit commercial inquiry
    console.log('Commercial inquiry submitted:', contactForm)
    // Reset form and show success message
  }

  return (
    <div className="min-h-screen bg-gradient-from-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Commercial Renovation Solutions
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Transform your business spaces with our network of certified commercial contractors, 
              project management tools, and enterprise-grade solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Commercial Quote
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Commercial Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Specialized contractors and tools for every type of commercial project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building2,
                title: "Office Renovation",
                description: "Modern office spaces that enhance productivity and company culture",
                features: ["Open floor plans", "Private offices", "Conference rooms", "Break areas"]
              },
              {
                icon: Users,
                title: "Retail Spaces",
                description: "Customer-focused retail environments that drive sales and engagement",
                features: ["Storefront design", "Display areas", "Checkout zones", "Storage solutions"]
              },
              {
                icon: Shield,
                title: "Healthcare Facilities",
                description: "Compliant medical spaces built to healthcare industry standards",
                features: ["ADA compliance", "Medical equipment installation", "Sterile environments", "Patient comfort"]
              },
              {
                icon: Calculator,
                title: "Restaurant & Hospitality",
                description: "Food service and hospitality spaces designed for efficiency and ambiance",
                features: ["Commercial kitchens", "Dining areas", "Bar design", "Outdoor seating"]
              },
              {
                icon: Settings,
                title: "Manufacturing",
                description: "Industrial spaces optimized for production and workflow efficiency",
                features: ["Production lines", "Warehouse optimization", "Safety compliance", "Equipment integration"]
              },
              {
                icon: TrendingUp,
                title: "Multi-Unit Properties",
                description: "Apartment complexes, condos, and property management solutions",
                features: ["Unit renovations", "Common areas", "Exterior improvements", "Property management tools"]
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Tools & Features</h2>
            <p className="text-lg text-gray-600">
              Advanced project management and contractor coordination tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Project Analytics",
                description: "Real-time dashboards and performance metrics"
              },
              {
                icon: FileText,
                title: "Contract Management",
                description: "Digital contracts, approvals, and documentation"
              },
              {
                icon: Camera,
                title: "Progress Tracking",
                description: "Photo documentation and milestone tracking"
              },
              {
                icon: Zap,
                title: "API Integration",
                description: "Connect with your existing business systems"
              },
              {
                icon: Shield,
                title: "Compliance Monitoring",
                description: "Ensure all work meets industry standards"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Multi-user access and role-based permissions"
              },
              {
                icon: Clock,
                title: "Scheduling Tools",
                description: "Coordinate multiple contractors and timelines"
              },
              {
                icon: Award,
                title: "Quality Assurance",
                description: "Built-in QA processes and contractor ratings"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <feature.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Commercial Plans</h2>
            <p className="text-lg text-gray-600">Choose the right plan for your business needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Professional',
                price: '$299',
                period: '/month',
                description: 'Perfect for small businesses and single locations',
                features: [
                  'Up to 5 active projects',
                  'Basic contractor network',
                  'Standard reporting',
                  'Email support',
                  'Mobile app access'
                ]
              },
              {
                name: 'Enterprise',
                price: '$799',
                period: '/month',
                description: 'Ideal for growing businesses with multiple locations',
                features: [
                  'Unlimited projects',
                  'Premium contractor network',
                  'Advanced analytics',
                  'Priority support',
                  'API access',
                  'Custom integrations',
                  'Dedicated account manager'
                ],
                popular: true
              },
              {
                name: 'Enterprise Plus',
                price: 'Custom',
                period: '',
                description: 'For large organizations with complex needs',
                features: [
                  'Everything in Enterprise',
                  'White-label solution',
                  'Custom development',
                  'On-premise deployment',
                  'Advanced security',
                  'SLA guarantees',
                  '24/7 phone support'
                ]
              }
            ].map((plan, index) => (
              <div key={index} className={`rounded-xl p-8 ${plan.popular ? 'bg-blue-600 text-white transform scale-105' : 'bg-gray-50'}`}>
                {plan.popular && (
                  <div className="bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>{plan.period}</span>
                </div>
                <p className={`mb-6 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle2 className={`w-5 h-5 mr-3 ${plan.popular ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Started Today</h2>
            <p className="text-lg text-gray-600">
              Tell us about your commercial project and we'll connect you with the right contractors
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={contactForm.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                <input
                  type="text"
                  name="contactName"
                  value={contactForm.contactName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={contactForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                <select
                  name="projectType"
                  value={contactForm.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Project Type</option>
                  <option value="office">Office Renovation</option>
                  <option value="retail">Retail Space</option>
                  <option value="healthcare">Healthcare Facility</option>
                  <option value="restaurant">Restaurant/Hospitality</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="multi-unit">Multi-Unit Property</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                <select
                  name="budget"
                  value={contactForm.budget}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Budget Range</option>
                  <option value="50k-100k">$50,000 - $100,000</option>
                  <option value="100k-250k">$100,000 - $250,000</option>
                  <option value="250k-500k">$250,000 - $500,000</option>
                  <option value="500k-1m">$500,000 - $1,000,000</option>
                  <option value="1m+">$1,000,000+</option>
                </select>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Timeline</label>
              <input
                type="text"
                name="timeline"
                value={contactForm.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 6-12 months, ASAP, Q2 2025"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Details</label>
              <textarea
                name="message"
                value={contactForm.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your project requirements, square footage, special considerations, etc."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Submit Commercial Inquiry
            </button>
          </form>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">See how businesses have transformed with Remodely.AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: "TechStart Inc.",
                project: "Modern Office Renovation",
                result: "40% increase in employee satisfaction",
                image: "🏢",
                testimonial: "Remodely.AI helped us find the perfect contractors for our office renovation. The project management tools made everything seamless."
              },
              {
                company: "Metro Medical Center",
                project: "Healthcare Facility Upgrade",
                result: "100% compliance with health standards",
                image: "🏥",
                testimonial: "The healthcare-specialized contractors understood our unique requirements. The compliance tracking was invaluable."
              },
              {
                company: "Artisan Coffee Chain",
                project: "5 Location Buildouts",
                result: "Completed 3 weeks ahead of schedule",
                image: "☕",
                testimonial: "Managing multiple locations was a breeze with Remodely.AI's enterprise tools. Highly recommend for multi-site projects."
              }
            ].map((story, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="text-4xl mb-4">{story.image}</div>
                <h3 className="text-xl font-semibold mb-2">{story.company}</h3>
                <p className="text-blue-600 font-medium mb-2">{story.project}</p>
                <p className="text-green-600 font-semibold mb-4">{story.result}</p>
                <p className="text-gray-600 italic">"{story.testimonial}"</p>
                <div className="flex items-center mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}