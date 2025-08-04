'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  Sparkles,
  ArrowLeft,
  Phone,
  MessageSquare,
  Zap,
  Brain,
  Calculator,
  Hammer,
  Building2,
  Home
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  typing?: boolean;
}

const quickPrompts = [
  {
    icon: Calculator,
    title: "Estimate Kitchen Remodel",
    prompt: "Help me estimate costs for a kitchen remodel project"
  },
  {
    icon: Hammer,
    title: "Handyman Pricing",
    prompt: "What should I charge for common handyman repairs?"
  },
  {
    icon: Building2,
    title: "Framing Calculations",
    prompt: "Calculate lumber needs for a 12x16 room addition"
  },
  {
    icon: Home,
    title: "Roofing Materials",
    prompt: "How much material do I need for a 2,400 sq ft roof?"
  }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm Sarah, your AI assistant for construction and remodeling. I can help with estimates, material calculations, project planning, customer communication, and more. What can I help you with today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputMessage.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Add typing indicator
    const typingMessage: Message = {
      id: `${Date.now()}-typing`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));

      const assistantMessage: Message = {
        id: `${Date.now()}-response`,
        role: 'assistant',
        content: getAIResponse(messageContent),
        timestamp: new Date()
      };

      setMessages(prev => prev.filter(m => !m.typing).concat(assistantMessage));
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `${Date.now()}-error`,
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => prev.filter(m => !m.typing).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  };

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    if (message.includes('kitchen') && message.includes('remodel')) {
      return "For a typical kitchen remodel, here's what you should consider:\n\n💰 **Budget Range**: $15,000 - $50,000+\n🏗️ **Key Components**:\n- Cabinets: 35-40% of budget\n- Labor: 20-25%\n- Countertops: 10-15%\n- Flooring: 7-10%\n- Appliances: 15-20%\n\n📏 **Next Steps**: Upload photos or measurements and I can give you precise estimates using our AI tools!";
    }

    if (message.includes('handyman') && message.includes('pricing')) {
      return "Here are competitive handyman rates by service:\n\n🔧 **Common Repairs**:\n- Drywall patch: $75-150\n- Faucet replacement: $150-250\n- Electrical outlet: $125-200\n- Door installation: $200-400\n- Tile repair: $100-300\n\n💡 **Pro Tip**: Use our Handyman Service AI to get instant pricing from photos. It covers 200+ repair types and helps you quote consistently!";
    }

    if (message.includes('framing') || message.includes('lumber')) {
      return "For a 12x16 room addition, you'll need:\n\n🏗️ **Framing Materials**:\n- 2x4 studs: ~45 pieces\n- 2x6 plates: ~8 pieces\n- 2x8 joists: ~12 pieces\n- Plywood: ~20 sheets\n- Hardware: $150-200\n\n📐 **Total Cost**: $800-1,200 in materials\n\nWant precise calculations? Our Framing Layout AI can optimize your cuts and reduce waste by 25%!";
    }

    if (message.includes('roof') || message.includes('shingle')) {
      return "For a 2,400 sq ft roof, you'll typically need:\n\n🏠 **Materials**:\n- Shingles: 26-28 squares\n- Underlayment: 26 squares\n- Ridge cap: 80-100 linear feet\n- Starter strip: 200 linear feet\n- Nails: 8-10 boxes\n\n💰 **Material Cost**: $3,600-6,000\n\nOur Roofing Measurement AI uses satellite imagery for 95% accuracy - no more dangerous roof climbs for measurements!";
    }

    return "I'd be happy to help with that! I specialize in:\n\n🔨 **Construction Estimates & Pricing**\n📏 **Material Calculations**\n👥 **Customer Communication**\n📱 **Project Management**\n🗣️ **Multi-language Support**\n\nCould you be more specific about what you're working on? Or try one of the quick prompts below to get started!";
  };

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    // Voice recognition logic would go here
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">AI Sarah</h1>
                  <p className="text-sm text-emerald-300">Construction AI Assistant</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 bg-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <Phone className="h-5 w-5" />
              </button>
              <button className="p-2 bg-white/10 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <MessageSquare className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div className={`flex max-w-[70%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'} space-x-3`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.role === 'user'
                      ? 'bg-indigo-500'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                    }`}>
                    {message.role === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>

                  <div className={`rounded-2xl px-4 py-3 ${message.role === 'user'
                      ? 'bg-indigo-500 text-white ml-3'
                      : 'bg-white/10 backdrop-blur text-white mr-3'
                    }`}>
                    {message.typing ? (
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce delay-200"></div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="mt-8">
                <p className="text-white/60 text-sm mb-4 text-center">Try these quick prompts:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quickPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(prompt.prompt)}
                      className="flex items-center space-x-3 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 text-left"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <prompt.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{prompt.title}</div>
                        <div className="text-white/60 text-xs">{prompt.prompt}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-xl p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-4">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Sarah about estimates, materials, pricing, or project planning..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  disabled={isLoading}
                />
              </div>

              <button
                onClick={handleVoiceToggle}
                className={`p-3 rounded-xl transition-all ${isListening
                    ? 'bg-red-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
              >
                {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>

            <div className="flex items-center justify-center mt-4 space-x-6 text-xs text-white/40">
              <div className="flex items-center space-x-1">
                <Zap className="h-3 w-3" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-1">
                <Brain className="h-3 w-3" />
                <span>Construction Expert</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sparkles className="h-3 w-3" />
                <span>Always Learning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
