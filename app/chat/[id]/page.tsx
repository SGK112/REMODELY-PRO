'use client'

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft, Send, Phone, Video, MoreVertical, Star, MapPin, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'

interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  isFromUser: boolean
}

interface ContractorInfo {
  id: string
  name: string
  businessName: string
  profileImage: string
  rating: number
  location: string
  isOnline: boolean
  lastSeen: string
}

const MOCK_CONTRACTOR: ContractorInfo = {
  id: '7',
  name: 'Carlos Rivera',
  businessName: 'Desert Stone Works',
  profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  rating: 4.9,
  location: 'Phoenix, AZ',
  isOnline: true,
  lastSeen: 'Online now'
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    senderId: '7',
    content: 'Hi! Thanks for the match. I saw your project details and I\'d love to help with your kitchen renovation. I specialize in granite countertops and have worked on many similar projects in Phoenix.',
    timestamp: '2024-01-15T09:30:00Z',
    isFromUser: false
  },
  {
    id: '2',
    senderId: 'user',
    content: 'Hi Carlos! Thanks for reaching out. I\'m looking to upgrade my kitchen countertops to granite. Can you tell me more about your process and timeline?',
    timestamp: '2024-01-15T10:15:00Z',
    isFromUser: true
  },
  {
    id: '3',
    senderId: '7',
    content: 'Absolutely! My typical process includes: 1) Initial consultation and measurements 2) Slab selection 3) Template creation 4) Fabrication 5) Installation. The whole process usually takes 2-3 weeks from start to finish.',
    timestamp: '2024-01-15T10:20:00Z',
    isFromUser: false
  },
  {
    id: '4',
    senderId: '7',
    content: 'I\'d love to schedule a free consultation at your home to discuss your vision and provide an accurate quote. When would be convenient for you?',
    timestamp: '2024-01-15T10:22:00Z',
    isFromUser: false
  },
  {
    id: '5',
    senderId: 'user',
    content: 'That sounds great! I\'m available this weekend or next week evenings. What\'s your typical price range for granite countertops?',
    timestamp: '2024-01-15T11:00:00Z',
    isFromUser: true
  },
  {
    id: '6',
    senderId: '7',
    content: 'Perfect! For granite, pricing typically ranges from $50-80 per square foot installed, depending on the slab you choose. I can bring samples to show you the options. How about Saturday at 2 PM?',
    timestamp: '2024-01-15T11:15:00Z',
    isFromUser: false
  }
]

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: 'user',
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isFromUser: true
      }
      
      setMessages(prev => [...prev, message])
      setNewMessage('')

      // Simulate contractor typing
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const response: Message = {
          id: (Date.now() + 1).toString(),
          senderId: params.id,
          content: 'Thanks for your message! I\'ll get back to you shortly with more details.',
          timestamp: new Date().toISOString(),
          isFromUser: false
        }
        setMessages(prev => [...prev, response])
      }, 2000)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/matches/liked" className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src={MOCK_CONTRACTOR.profileImage}
                alt={MOCK_CONTRACTOR.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {MOCK_CONTRACTOR.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h1 className="font-semibold text-gray-900">{MOCK_CONTRACTOR.name}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{MOCK_CONTRACTOR.businessName}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Star className="w-3 h-3 fill-current text-yellow-400 mr-1" />
                  {MOCK_CONTRACTOR.rating}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border-b px-4 py-2">
        <div className="flex space-x-2 overflow-x-auto">
          <button className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
            <Calendar className="w-4 h-4 mr-1" />
            Schedule Visit
          </button>
          <button className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm whitespace-nowrap">
            <MapPin className="w-4 h-4 mr-1" />
            View Location
          </button>
          <Link
            href={`/contractors/${params.id}`}
            className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm whitespace-nowrap"
          >
            View Portfolio
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message, index) => {
          const showDate = index === 0 || 
            formatDate(messages[index - 1].timestamp) !== formatDate(message.timestamp)
          
          return (
            <div key={message.id}>
              {showDate && (
                <div className="text-center mb-4">
                  <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                    {formatDate(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${message.isFromUser ? 'order-2' : 'order-1'}`}>
                  {!message.isFromUser && (
                    <div className="flex items-center mb-1">
                      <img
                        src={MOCK_CONTRACTOR.profileImage}
                        alt={MOCK_CONTRACTOR.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-xs text-gray-500">{MOCK_CONTRACTOR.name}</span>
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      message.isFromUser
                        ? 'bg-blue-500 text-white rounded-br-md'
                        : 'bg-white text-gray-900 border rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${
                    message.isFromUser ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-xs">
              <div className="flex items-center mb-1">
                <img
                  src={MOCK_CONTRACTOR.profileImage}
                  alt={MOCK_CONTRACTOR.name}
                  className="w-6 h-6 rounded-full mr-2"
                />
                <span className="text-xs text-gray-500">{MOCK_CONTRACTOR.name}</span>
              </div>
              <div className="bg-white border px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t px-4 py-3">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:border-blue-500 max-h-32"
              rows={1}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
