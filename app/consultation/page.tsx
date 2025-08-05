'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Phone, Calendar, Clock, User, MessageSquare, CheckCircle } from 'lucide-react'

export default function ConsultationPage() {
  const [selectedService, setSelectedService] = useState<string>('')
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    description: '',
    preferredTime: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const consultationServices = [
    {
      id: 'voice-ai',
      title: 'AI Voice Consultation',
      description: 'Instant consultation with Sarah AI for project planning and contractor matching',
      duration: 'Immediate',
      price: 'Free',
      features: ['24/7 Availability', 'Instant Responses', 'Project Planning', 'Contractor Matching'],
      action: 'Talk to Sarah AI',
      link: 'https://elevenlabs.io/convai/conversation/5401k1we1dkbf1mvt22mme8wz82a'
    },
    {
      id: 'phone-human',
      title: 'Human Expert Consultation',
      description: 'Speak directly with renovation experts for detailed project assessment',
      duration: '30-45 minutes',
      price: 'Free',
      features: ['Expert Advice', 'Detailed Assessment', 'Custom Solutions', 'Follow-up Support'],
      action: 'Call (602) 833-7194',
      link: 'tel:+16028337194'
    },
    {
      id: 'scheduled',
      title: 'Scheduled Video Consultation',
      description: 'Book a detailed video consultation with our renovation specialists',
      duration: '60 minutes',
      price: '$99 (Refundable with project)',
      features: ['Video Assessment', 'Detailed Planning', 'Written Report', '3D Visualization'],
      action: 'Schedule Now',
      link: '#schedule'
    }
  ]

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    const service = consultationServices.find(s => s.id === serviceId)
    if (service?.link.startsWith('http') || service?.link.startsWith('tel:')) {
      window.open(service.link, '_blank')
    }
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, you would submit to your API
    console.log('Consultation request:', contactForm)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full mx-4">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Consultation Requested!</h2>
            <p className="text-blue-200 mb-6">
              Thank you for your consultation request. Our team will contact you within 24 hours to schedule your session.
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Return Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Expert Consultation Services
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Get professional guidance for your home renovation project with our consultation options
          </p>
        </div>

        {/* Consultation Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {consultationServices.map((service) => (
            <Card 
              key={service.id}
              className={`bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer ${
                selectedService === service.id ? 'ring-2 ring-blue-400' : ''
              }`}
              onClick={() => handleServiceSelect(service.id)}
            >
              <CardHeader>
                <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                <CardDescription className="text-blue-200">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-blue-300">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                  <Badge 
                    variant="secondary"
                    className="bg-green-500/20 text-green-300 border-green-500/30"
                  >
                    {service.price}
                  </Badge>
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-blue-200 text-sm flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleServiceSelect(service.id)
                  }}
                >
                  {service.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Schedule Form */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">
              Request a Consultation
            </CardTitle>
            <CardDescription className="text-blue-200 text-center">
              Fill out this form to schedule your consultation session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={contactForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-blue-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Phone</label>
                  <Input
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={contactForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder-blue-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={contactForm.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Project Type</label>
                <Input
                  type="text"
                  placeholder="e.g., Kitchen Remodel, Bathroom Renovation"
                  value={contactForm.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-blue-300"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Project Description</label>
                <Textarea
                  placeholder="Describe your project goals, timeline, and any specific requirements..."
                  value={contactForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-blue-300 min-h-[100px]"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">Preferred Time</label>
                <Input
                  type="text"
                  placeholder="e.g., Weekday mornings, Weekend afternoons"
                  value={contactForm.preferredTime}
                  onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-blue-300"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Request Consultation
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Contact */}
        <div className="text-center mt-12">
          <h3 className="text-xl text-white mb-4">Need Immediate Help?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open('https://elevenlabs.io/convai/conversation/5401k1we1dkbf1mvt22mme8wz82a', '_blank')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Talk to AI Sarah
            </Button>
            <Button
              onClick={() => window.open('tel:+16028337194', '_blank')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Phone className="mr-2 h-4 w-4" />
              Call (602) 833-7194
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}