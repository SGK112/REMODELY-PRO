'use client'

// Force dynamic rendering for authentication
export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Phone,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Building
} from 'lucide-react'
import SMSNotificationPanel from '@/components/ui/SMSNotificationPanel'

interface Quote {
  id: string
  projectType: string
  customer: {
    firstName: string
    lastName: string
  }
  location: string
  budget: string
  status: string
  createdAt: string
  squareFootage?: number
  materials?: string[]
  description?: string
}

export default function ContractorDashboard() {
  const { data: session } = useSession()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)

  // Mock stats data
  const stats = {
    totalQuotes: 24,
    activeProjects: 3,
    monthlyRevenue: 12500,
    responseRate: 95
  }

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/quotes?userType=contractor')
        if (response.ok) {
          const data = await response.json()
          setQuotes(data)
        }
      } catch (error) {
        console.error('Error fetching quotes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchQuotes()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to access the professional dashboard.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">REMODELY.AI Professional Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {session.user?.name || 'Professional'} - Grow your business with AI-powered leads</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Quotes</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalQuotes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.activeProjects}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.responseRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dashboard/contractor/manage"
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Manage Profile</h3>
                <p className="text-gray-600">Update images, content & business details</p>
              </div>
            </div>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Schedule</h3>
                <p className="text-gray-600">Manage your availability</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Messages</h3>
                <p className="text-gray-600">Customer communications</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote Requests */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Recent Quote Requests</h2>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading quotes...</p>
                  </div>
                ) : quotes.length > 0 ? (
                  <div className="space-y-4">
                    {quotes.map((quote) => (
                      <div key={quote.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{quote.projectType}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {quote.customer.firstName} {quote.customer.lastName} • {quote.location}
                            </p>
                            {quote.description && (
                              <p className="text-sm text-gray-700 mt-2">{quote.description}</p>
                            )}
                            <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                              <span>Budget: {quote.budget}</span>
                              {quote.squareFootage && <span>{quote.squareFootage} sq ft</span>}
                              <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="ml-4 flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quote.status)}`}>
                              {quote.status}
                            </span>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No quote requests yet</p>
                    <p className="text-sm text-gray-500 mt-1">New requests will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Notification Test Panel */}
          <div className="lg:col-span-1">
            <SMSNotificationPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
