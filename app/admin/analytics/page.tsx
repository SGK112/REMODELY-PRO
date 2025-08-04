'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  MapPin,
  Star,
  Activity,
  Calendar,
  Target,
  Zap,
  Award,
  Filter,
  Download,
  RefreshCw,
  Eye,
  MousePointer,
  Phone,
  MessageSquare
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalUsers: number
    totalContractors: number
    totalCustomers: number
    totalRevenue: number
    monthlyGrowth: number
    conversionRate: number
  }
  userActivity: {
    dailyActiveUsers: number[]
    monthlyActiveUsers: number[]
    userRetention: number
    avgSessionDuration: number
  }
  contractorMetrics: {
    topPerformers: Array<{
      name: string
      rating: number
      completedProjects: number
      revenue: number
    }>
    averageResponseTime: number
    completionRate: number
  }
  geographicData: {
    topCities: Array<{
      city: string
      userCount: number
      revenue: number
    }>
    stateDistribution: Record<string, number>
  }
  revenueAnalytics: {
    monthlyRevenue: number[]
    revenueByService: Record<string, number>
    averageProjectValue: number
  }
  aiPerformance: {
    apiCalls: number
    successRate: number
    averageResponseTime: number
    topServices: Array<{
      service: string
      usage: number
      satisfaction: number
    }>
  }
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('users')

  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user?.userType !== 'ADMIN') {
      router.push('/auth/login')
      return
    }

    fetchAnalyticsData()
  }, [session, status, router, selectedPeriod])

  const fetchAnalyticsData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/analytics?period=${selectedPeriod}`)
      const data = await response.json()
      setAnalyticsData(data.analytics || mockAnalyticsData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setAnalyticsData(mockAnalyticsData)
    } finally {
      setIsLoading(false)
    }
  }

  // Mock data for demonstration
  const mockAnalyticsData: AnalyticsData = {
    overview: {
      totalUsers: 15847,
      totalContractors: 2341,
      totalCustomers: 13506,
      totalRevenue: 2847392,
      monthlyGrowth: 12.5,
      conversionRate: 3.8
    },
    userActivity: {
      dailyActiveUsers: [1234, 1456, 1678, 1892, 2103, 1987, 1765],
      monthlyActiveUsers: [8900, 9200, 9800, 10300, 11200, 12100, 13500],
      userRetention: 67.3,
      avgSessionDuration: 847
    },
    contractorMetrics: {
      topPerformers: [
        { name: 'Phoenix Premium Renovations', rating: 4.9, completedProjects: 156, revenue: 185000 },
        { name: 'Elite Stone & Surface', rating: 4.8, completedProjects: 203, revenue: 167000 },
        { name: 'Modern Home Solutions', rating: 4.7, completedProjects: 89, revenue: 145000 }
      ],
      averageResponseTime: 4.2,
      completionRate: 94.6
    },
    geographicData: {
      topCities: [
        { city: 'Phoenix, AZ', userCount: 3241, revenue: 567890 },
        { city: 'Scottsdale, AZ', userCount: 2156, revenue: 432100 },
        { city: 'Tempe, AZ', userCount: 1834, revenue: 298340 },
        { city: 'Mesa, AZ', userCount: 1567, revenue: 267890 },
        { city: 'Chandler, AZ', userCount: 1289, revenue: 234560 }
      ],
      stateDistribution: {
        'Arizona': 85,
        'California': 8,
        'Nevada': 4,
        'New Mexico': 2,
        'Other': 1
      }
    },
    revenueAnalytics: {
      monthlyRevenue: [156000, 178000, 203000, 187000, 234000, 267000, 298000],
      revenueByService: {
        'Kitchen Renovation': 45,
        'Bathroom Remodel': 28,
        'Countertop Installation': 15,
        'Full Home Renovation': 8,
        'Other': 4
      },
      averageProjectValue: 18500
    },
    aiPerformance: {
      apiCalls: 156789,
      successRate: 99.2,
      averageResponseTime: 245,
      topServices: [
        { service: 'Smart Matching', usage: 45678, satisfaction: 4.7 },
        { service: 'Quote Generation', usage: 32145, satisfaction: 4.5 },
        { service: 'Image Recognition', usage: 28934, satisfaction: 4.6 },
        { service: 'Voice Consultation', usage: 21567, satisfaction: 4.8 },
        { service: 'Design Assistant', usage: 15234, satisfaction: 4.4 }
      ]
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!analyticsData) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-2">Comprehensive insights into platform performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={fetchAnalyticsData}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalUsers)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +{analyticsData.overview.monthlyGrowth}% this month
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.overview.totalRevenue)}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15.3% this month
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Contractors</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(analyticsData.overview.totalContractors)}</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Activity className="w-3 h-3 mr-1" />
                  {analyticsData.contractorMetrics.completionRate}% completion rate
                </p>
              </div>
              <Award className="w-8 h-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.conversionRate}%</p>
                <p className="text-sm text-orange-600 flex items-center mt-1">
                  <Target className="w-3 h-3 mr-1" />
                  Industry average: 2.1%
                </p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">User Activity Trends</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedMetric('users')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${selectedMetric === 'users'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  Users
                </button>
                <button
                  onClick={() => setSelectedMetric('revenue')}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${selectedMetric === 'revenue'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  Revenue
                </button>
              </div>
            </div>

            {/* Simple chart representation */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {(selectedMetric === 'users'
                ? analyticsData.userActivity.dailyActiveUsers
                : analyticsData.revenueAnalytics.monthlyRevenue.slice(-7)
              ).map((value, index) => {
                const maxValue = Math.max(...(selectedMetric === 'users'
                  ? analyticsData.userActivity.dailyActiveUsers
                  : analyticsData.revenueAnalytics.monthlyRevenue.slice(-7)))
                const height = (value / maxValue) * 200

                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="bg-blue-600 rounded-t w-full mb-2 hover:bg-blue-700 transition-colors cursor-pointer"
                      style={{ height: `${height}px` }}
                      title={selectedMetric === 'users' ? formatNumber(value) : formatCurrency(value)}
                    />
                    <span className="text-xs text-gray-500">
                      {new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Contractors */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6">Top Performing Contractors</h3>
            <div className="space-y-4">
              {analyticsData.contractorMetrics.topPerformers.map((contractor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{contractor.name}</p>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs text-gray-600">{contractor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(contractor.revenue)}</p>
                    <p className="text-xs text-gray-600">{contractor.completedProjects} projects</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Geographic and AI Performance */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Geographic Distribution */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Geographic Distribution
            </h3>
            <div className="space-y-4">
              {analyticsData.geographicData.topCities.map((city, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{city.city}</p>
                    <p className="text-sm text-gray-600">{formatNumber(city.userCount)} users</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(city.revenue)}</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${(city.userCount / analyticsData.geographicData.topCities[0].userCount) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-600" />
              AI Performance Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{formatNumber(analyticsData.aiPerformance.apiCalls)}</p>
                <p className="text-sm text-gray-600">API Calls</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{analyticsData.aiPerformance.successRate}%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
            <div className="space-y-3">
              {analyticsData.aiPerformance.topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{service.service}</p>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                      <span className="text-xs text-gray-600">{service.satisfaction}</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{formatNumber(service.usage)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold mb-6">Revenue Breakdown</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-medium mb-4">Revenue by Service Type</h4>
              <div className="space-y-3">
                {Object.entries(analyticsData.revenueAnalytics.revenueByService).map(([service, percentage]) => (
                  <div key={service} className="flex items-center justify-between">
                    <span className="text-sm">{service}</span>
                    <div className="flex items-center">
                      <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Key Metrics</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Project Value</span>
                  <span className="font-semibold">{formatCurrency(analyticsData.revenueAnalytics.averageProjectValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">User Retention Rate</span>
                  <span className="font-semibold">{analyticsData.userActivity.userRetention}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Session Duration</span>
                  <span className="font-semibold">{Math.floor(analyticsData.userActivity.avgSessionDuration / 60)}m {analyticsData.userActivity.avgSessionDuration % 60}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contractor Response Time</span>
                  <span className="font-semibold">{analyticsData.contractorMetrics.averageResponseTime}h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
