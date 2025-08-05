'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Zap, Users, DollarSign, TrendingUp } from 'lucide-react'

export default function BusinessModelPage() {
  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for homeowners exploring renovation ideas',
      features: [
        'Basic AI consultation with Sarah',
        '5 AI tool uses per month',
        'Basic contractor matching',
        'Project planning templates',
        'Community forum access'
      ],
      limitations: [
        'Limited AI interactions',
        'Basic support only',
        'Standard contractor network'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For serious renovators and DIY enthusiasts',
      features: [
        'Unlimited AI consultations',
        'All AI tools included',
        'Priority contractor matching',
        'Advanced project planning',
        '3D visualization tools',
        'Material cost tracking',
        'Progress photos & reports',
        'Email & chat support'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      description: 'For contractors, builders, and real estate professionals',
      features: [
        'Everything in Pro',
        'White-label platform',
        'Custom AI training',
        'Lead generation tools',
        'Advanced analytics',
        'Multi-project management',
        'Team collaboration',
        'API access',
        'Dedicated account manager',
        'Custom integrations'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ]

  const businessMetrics = [
    {
      icon: Users,
      title: 'Active Users',
      value: '50K+',
      description: 'Homeowners and contractors'
    },
    {
      icon: DollarSign,
      title: 'Projects Completed',
      value: '$12M+',
      description: 'Total renovation value'
    },
    {
      icon: TrendingUp,
      title: 'Success Rate',
      value: '94%',
      description: 'Projects completed on time'
    },
    {
      icon: Star,
      title: 'Satisfaction',
      value: '4.8/5',
      description: 'Average customer rating'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Remodely.AI Business Model
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            Transforming home renovation with AI-powered consultation, smart contractor matching, 
            and comprehensive project management tools.
          </p>
        </div>

        {/* Business Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {businessMetrics.map((metric, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
              <CardContent className="p-6">
                <metric.icon className="mx-auto h-8 w-8 text-blue-400 mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                <div className="text-blue-200 font-medium mb-1">{metric.title}</div>
                <div className="text-blue-300 text-sm">{metric.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Value Proposition */}
        <Card className="mb-16 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-white mb-4">Our Value Proposition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">AI-Powered Efficiency</h3>
                <p className="text-blue-200">
                  Reduce project planning time by 70% with our intelligent AI assistants that understand 
                  construction, building codes, and local regulations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Smart Matching</h3>
                <p className="text-blue-200">
                  Connect with pre-vetted contractors using our advanced matching algorithm that considers 
                  location, specialty, reviews, and availability.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">End-to-End Solution</h3>
                <p className="text-blue-200">
                  From initial consultation to project completion, manage everything in one platform 
                  with integrated payments, progress tracking, and quality assurance.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Plans */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
          <p className="text-blue-200 text-lg">Start free, upgrade when you need more power</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`bg-white/10 backdrop-blur-sm border-white/20 relative ${
                plan.popular ? 'ring-2 ring-blue-400' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-blue-200">/{plan.period}</span>
                </div>
                <CardDescription className="text-blue-200 mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Features:</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-blue-200 text-sm">
                        <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-white/10 hover:bg-white/20 border border-white/30'
                  } text-white`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Streams */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Revenue Streams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h4 className="text-white font-semibold mb-2">Subscription Plans</h4>
                <p className="text-blue-200 text-sm">
                  Monthly and annual subscriptions for AI tools and premium features
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold mb-2">Transaction Fees</h4>
                <p className="text-blue-200 text-sm">
                  Small percentage on successful contractor bookings and payments
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold mb-2">Enterprise Licensing</h4>
                <p className="text-blue-200 text-sm">
                  White-label platform licensing for contractors and real estate firms
                </p>
              </div>
              <div className="text-center">
                <h4 className="text-white font-semibold mb-2">Data Insights</h4>
                <p className="text-blue-200 text-sm">
                  Market intelligence and trend reports for industry professionals
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4"
            >
              Start Free Trial
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-4"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}