/**
 * AI-Powered Chat Copilot Integration
 * Provides intelligent assistance throughout the platform
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot, User, Lightbulb, Settings, Minimize2, Maximize2 } from 'lucide-react'
import { useSession } from 'next-auth/react'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  context?: {
    page: string
    userAction?: string
    elementId?: string
    formData?: Record<string, any>
  }
  suggestions?: string[]
  quickActions?: QuickAction[]
}

export interface QuickAction {
  id: string
  label: string
  action: 'navigate' | 'fill_form' | 'trigger_tour' | 'open_modal' | 'scroll_to'
  target?: string
  data?: any
}

export interface CopilotContext {
  currentPage: string
  userType?: string
  projectStatus?: string
  recentActions: string[]
  formFields?: Record<string, any>
  availableFeatures: string[]
}

interface ChatCopilotProps {
  context: CopilotContext
  onAction?: (action: QuickAction) => void
  onTourRequest?: (tourId: string) => void
  position?: 'bottom-right' | 'bottom-left' | 'center'
  theme?: 'light' | 'dark'
}

export const ChatCopilot: React.FC<ChatCopilotProps> = ({
  context,
  onAction,
  onTourRequest,
  position = 'bottom-right',
  theme = 'light'
}) => {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      addWelcomeMessage()
    }
  }, [context.currentPage])

  // Track unread messages
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.role === 'assistant') {
        setUnreadCount(prev => prev + 1)
      }
    } else {
      setUnreadCount(0)
    }
  }, [messages, isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const addWelcomeMessage = () => {
    const welcomeMessage = generateWelcomeMessage()
    setMessages([welcomeMessage])
  }

  const generateWelcomeMessage = (): ChatMessage => {
    const pageSpecificGreeting = getPageSpecificGreeting(context.currentPage)

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: pageSpecificGreeting,
      timestamp: new Date(),
      context: {
        page: context.currentPage
      },
      quickActions: getContextualQuickActions()
    }
  }

  const getPageSpecificGreeting = (page: string): string => {
    const greetings: Record<string, string> = {
      '/': `Hi${session?.user?.name ? ` ${session.user.name}` : ''}! 👋 I'm your Remodely AI assistant. I can help you find contractors, get quotes, or answer questions about our services.`,
      '/quote/request': 'I see you\'re requesting a quote! I can help you provide the right details to get accurate estimates from contractors.',
      '/contractors': 'Looking for contractors? I can help you understand our matching process and what to look for in contractor profiles.',
      '/for-commercial': 'Interested in commercial renovation services? I can explain our enterprise solutions and connect you with specialized contractors.',
      '/for-designers': 'Welcome to our designer platform! I can walk you through our collaboration tools and AI-powered design features.',
      '/pricing': 'Questions about our pricing? I can explain our different plans and help you choose the best option for your needs.',
      '/smart-matching': 'Our AI matching system is pretty cool! Want me to explain how we find the perfect contractors for your specific project?',
      '/test-ai': 'Ready to test our AI capabilities? I can guide you through different features and help you understand what each tool can do.',
      '/reviews': 'Checking out customer reviews? I can help you understand our rating system and what to look for in contractor feedback.',
      '/admin': 'Welcome to the admin dashboard! I can help you navigate analytics, manage users, or explain platform metrics.'
    }

    return greetings[page] || `Hi! I'm here to help you with anything related to Remodely.AI. What can I assist you with today?`
  }

  const getContextualQuickActions = (): QuickAction[] => {
    const baseActions: QuickAction[] = [
      {
        id: 'get-quote',
        label: 'Get a Quote',
        action: 'navigate',
        target: '/quote/request'
      },
      {
        id: 'find-contractors',
        label: 'Find Contractors',
        action: 'navigate',
        target: '/contractors'
      }
    ]

    const pageSpecificActions: Record<string, QuickAction[]> = {
      '/': [
        ...baseActions,
        {
          id: 'take-tour',
          label: 'Take Platform Tour',
          action: 'trigger_tour',
          target: 'welcome-onboarding'
        }
      ],
      '/quote/request': [
        {
          id: 'help-project-details',
          label: 'Help with Project Details',
          action: 'trigger_tour',
          target: 'quote-request-help'
        },
        {
          id: 'upload-tips',
          label: 'Photo Upload Tips',
          action: 'scroll_to',
          target: '#photo-upload'
        }
      ],
      '/contractors': [
        {
          id: 'explain-matching',
          label: 'How Matching Works',
          action: 'navigate',
          target: '/smart-matching'
        },
        {
          id: 'filtering-help',
          label: 'Help with Filters',
          action: 'scroll_to',
          target: '#contractor-filters'
        }
      ]
    }

    return pageSpecificActions[context.currentPage] || baseActions
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
      context: {
        page: context.currentPage,
        formData: context.formFields
      }
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await generateAIResponse(userMessage)
      setMessages(prev => [...prev, response])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, getErrorMessage()])
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = async (userMessage: ChatMessage): Promise<ChatMessage> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

    const responseContent = await getAIResponseContent(userMessage.content)

    return {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responseContent.content,
      timestamp: new Date(),
      context: {
        page: context.currentPage
      },
      suggestions: responseContent.suggestions,
      quickActions: responseContent.quickActions
    }
  }

  const getAIResponseContent = async (userInput: string): Promise<{
    content: string
    suggestions?: string[]
    quickActions?: QuickAction[]
  }> => {
    const input = userInput.toLowerCase()

    // Quote-related queries
    if (input.includes('quote') || input.includes('estimate') || input.includes('price')) {
      return {
        content: 'I can help you get accurate quotes! Our quote system connects you with verified contractors who provide detailed estimates. The more information you provide about your project, the better the quotes will be.',
        suggestions: [
          'How long does it take to get quotes?',
          'What information should I include?',
          'How many quotes will I receive?'
        ],
        quickActions: [
          {
            id: 'start-quote',
            label: 'Start Quote Request',
            action: 'navigate',
            target: '/quote/request'
          }
        ]
      }
    }

    // Contractor-related queries
    if (input.includes('contractor') || input.includes('professional') || input.includes('worker')) {
      return {
        content: 'All our contractors are verified and rated by real customers. We use AI to match you with contractors who specialize in your type of project and are available in your area.',
        suggestions: [
          'How do you verify contractors?',
          'Can I see reviews and ratings?',
          'What if I\'m not satisfied?'
        ],
        quickActions: [
          {
            id: 'browse-contractors',
            label: 'Browse Contractors',
            action: 'navigate',
            target: '/contractors'
          }
        ]
      }
    }

    // AI/Technology queries
    if (input.includes('ai') || input.includes('smart') || input.includes('technology')) {
      return {
        content: 'Our AI analyzes your project requirements, location, timeline, and preferences to match you with the most suitable contractors. We also use AI for voice assistance, image analysis, and project planning.',
        suggestions: [
          'How accurate is the AI matching?',
          'Can I test the AI features?',
          'What AI tools are available?'
        ],
        quickActions: [
          {
            id: 'test-ai',
            label: 'Test AI Features',
            action: 'navigate',
            target: '/test-ai'
          }
        ]
      }
    }

    // Pricing queries
    if (input.includes('cost') || input.includes('pricing') || input.includes('expensive') || input.includes('free')) {
      return {
        content: 'Remodely.AI is free for homeowners! You only pay contractors directly for their services. We offer premium features for frequent users and commercial clients.',
        suggestions: [
          'What premium features are available?',
          'Is there a subscription?',
          'How do contractors get paid?'
        ],
        quickActions: [
          {
            id: 'view-pricing',
            label: 'View Pricing Plans',
            action: 'navigate',
            target: '/pricing'
          }
        ]
      }
    }

    // Help/Support queries
    if (input.includes('help') || input.includes('support') || input.includes('problem') || input.includes('issue')) {
      return {
        content: 'I\'m here to help! You can also access our guided tours, knowledge base, or contact our support team. What specific area do you need help with?',
        suggestions: [
          'Take a platform tour',
          'Contact support team',
          'View help documentation'
        ],
        quickActions: [
          {
            id: 'start-tour',
            label: 'Start Guided Tour',
            action: 'trigger_tour',
            target: 'welcome-onboarding'
          }
        ]
      }
    }

    // Default response
    return {
      content: 'I\'d be happy to help you with that! Can you tell me more about what you\'re looking for? I can assist with finding contractors, requesting quotes, understanding our services, or navigating the platform.',
      suggestions: [
        'Help me find contractors',
        'I want to request a quote',
        'Explain how your platform works',
        'Show me AI features'
      ]
    }
  }

  const getErrorMessage = (): ChatMessage => ({
    id: Date.now().toString(),
    role: 'assistant',
    content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment, or you can contact our support team for immediate assistance.',
    timestamp: new Date(),
    quickActions: [
      {
        id: 'contact-support',
        label: 'Contact Support',
        action: 'navigate',
        target: '/contact'
      }
    ]
  })

  const handleQuickAction = (action: QuickAction) => {
    if (action.action === 'trigger_tour' && onTourRequest) {
      onTourRequest(action.target!)
    } else if (onAction) {
      onAction(action)
    }

    // Add system message about the action
    const actionMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'system',
      content: `Performing action: ${action.label}`,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, actionMessage])
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      setUnreadCount(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'center': 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="relative bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-105"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`${isMinimized ? 'w-80 h-16' : 'w-80 h-96'
          } bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col transition-all duration-300`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-blue-500 text-white rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold">Remodely AI Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : message.role === 'system'
                          ? 'bg-gray-100 text-gray-600 text-sm'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                      <div className="flex items-start space-x-2">
                        {message.role === 'assistant' && <Bot className="w-4 h-4 mt-0.5 text-blue-500" />}
                        {message.role === 'user' && <User className="w-4 h-4 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>

                          {/* Quick Actions */}
                          {message.quickActions && message.quickActions.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.quickActions.map((action) => (
                                <button
                                  key={action.id}
                                  onClick={() => handleQuickAction(action)}
                                  className="block w-full text-left px-2 py-1 text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 rounded transition-colors"
                                >
                                  {action.label}
                                </button>
                              ))}
                            </div>
                          )}

                          {/* Suggestions */}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-500 mb-1">Suggestions:</p>
                              {message.suggestions.map((suggestion, index) => (
                                <button
                                  key={index}
                                  onClick={() => setInputValue(suggestion)}
                                  className="block w-full text-left px-2 py-1 text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 rounded mb-1 transition-colors"
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-4 h-4 text-blue-500" />
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

              {/* Input */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatCopilot
