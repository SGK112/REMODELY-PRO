'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mic, Phone, MessageSquare, Volume2, Users, Clock } from 'lucide-react'

export default function AIVoiceAssistantsPage() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null)

  const voiceAssistants = [
    {
      id: 'sarah',
      name: 'Sarah AI',
      description: 'Professional renovation consultant specializing in project planning and contractor matching',
      capabilities: [
        'Home renovation consultation',
        'Contractor matching',
        'Project planning',
        'Cost estimation',
        'Material recommendations'
      ],
      availability: '24/7',
      language: 'English',
      specialization: 'General Renovation',
      conversationUrl: 'https://elevenlabs.io/convai/conversation/5401k1we1dkbf1mvt22mme8wz82a',
      status: 'active'
    },
    {
      id: 'david',
      name: 'David AI',
      description: 'Technical construction expert providing detailed building and safety guidance',
      capabilities: [
        'Technical construction advice',
        'Building code compliance',
        'Material specifications',
        'Project troubleshooting',
        'Safety guidelines'
      ],
      availability: '24/7',
      language: 'English',
      specialization: 'Technical Construction',
      conversationUrl: '/voice-consultation?agent=david',
      status: 'active'
    }
  ]

  const handleTalkToAgent = (agent: any) => {
    setActiveAgent(agent.id)
    if (agent.conversationUrl.startsWith('http')) {
      window.open(agent.conversationUrl, '_blank')
    } else {
      window.location.href = agent.conversationUrl
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Voice Assistants
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Get instant expert advice for your home renovation projects with our specialized AI voice assistants
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Users className="mx-auto h-8 w-8 text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-white">2</div>
              <div className="text-blue-200">AI Assistants</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <Clock className="mx-auto h-8 w-8 text-green-400 mb-2" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-blue-200">Availability</div>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-white">10+</div>
              <div className="text-blue-200">Capabilities</div>
            </CardContent>
          </Card>
        </div>

        {/* Voice Assistants */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {voiceAssistants.map((assistant) => (
            <Card 
              key={assistant.id} 
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Mic className="h-6 w-6 text-blue-400" />
                    {assistant.name}
                  </CardTitle>
                  <Badge 
                    variant={assistant.status === 'active' ? 'default' : 'secondary'}
                    className="bg-green-500/20 text-green-300 border-green-500/30"
                  >
                    {assistant.status}
                  </Badge>
                </div>
                <CardDescription className="text-blue-200">
                  {assistant.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Specialization */}
                <div>
                  <h4 className="text-white font-semibold mb-2">Specialization</h4>
                  <Badge variant="outline" className="border-blue-400 text-blue-300">
                    {assistant.specialization}
                  </Badge>
                </div>

                {/* Capabilities */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Capabilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {assistant.capabilities.map((capability, index) => (
                      <Badge 
                        key={index}
                        variant="secondary"
                        className="bg-white/10 text-blue-200 border-white/20"
                      >
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-300">Availability:</span>
                    <div className="text-white font-medium">{assistant.availability}</div>
                  </div>
                  <div>
                    <span className="text-blue-300">Language:</span>
                    <div className="text-white font-medium">{assistant.language}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleTalkToAgent(assistant)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    disabled={activeAgent === assistant.id}
                  >
                    <Volume2 className="mr-2 h-4 w-4" />
                    {activeAgent === assistant.id ? 'Connecting...' : 'Talk Now'}
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => window.location.href = '/voice-consultation'}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="mt-12 bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">How AI Voice Assistants Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mic className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">1. Choose Your Assistant</h3>
                <p className="text-blue-200 text-sm">
                  Select between Sarah for general consultation or David for technical expertise
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">2. Start Conversation</h3>
                <p className="text-blue-200 text-sm">
                  Click "Talk Now" to begin your voice consultation session
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">3. Get Expert Advice</h3>
                <p className="text-blue-200 text-sm">
                  Receive personalized recommendations and project guidance
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Button
            onClick={() => window.location.href = '/voice-consultation'}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
          >
            <Phone className="mr-2 h-5 w-5" />
            Start Voice Consultation
          </Button>
        </div>
      </div>
    </div>
  )
}