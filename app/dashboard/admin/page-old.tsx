'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Users,
  TrendingUp,
  DollarSign,
  CheckCircle,
  Search,
  Filter,
  Trash2,
  UserCheck,
  Settings,
  BarChart3,
  Shield,
  Database,
  Edit,
  Mail,
  UserPlus,
  Key
} from 'lucide-react'

interface AdminStats {
  totalUsers: number
  totalContractors: number
  totalCustomers: number
  pendingApprovals: number
  activeQuotes: number
  monthlyRevenue: number
}

interface User {
  id: string
  name: string
  email: string
  userType: 'CUSTOMER' | 'CONTRACTOR' | 'ADMIN'
  createdAt: string
  contractor?: {
    businessName: string
    isVerified: boolean
  }
  customer?: {
    firstName: string
    lastName: string
  }
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [userTypeFilter, setUserTypeFilter] = useState<string>('')
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showPhoneTestModal, setShowPhoneTestModal] = useState(false)
  const [phoneTestNumber, setPhoneTestNumber] = useState('480-255-5887')
  const [phoneTestCode, setPhoneTestCode] = useState('')
  const [phoneTestStep, setPhoneTestStep] = useState<'input' | 'verify'>('input')
  const [phoneTestLoading, setPhoneTestLoading] = useState(false)

  // Redirect if not admin
  useEffect(() => {
    if (status === 'loading') return

    if (!session || session.user.userType !== 'ADMIN') {
      router.push('/dashboard')
      return
    }
  }, [session, status, router])

  // Fetch admin statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users')
        if (response.ok) {
          const data = await response.json()
          setUsers(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    if (session?.user.userType === 'ADMIN') {
      Promise.all([fetchStats(), fetchUsers()]).finally(() => {
        setLoading(false)
      })
    }
  }, [session])

  const handleVerifyContractor = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/verify-contractor/${userId}`, {
        method: 'PATCH'
      })

      if (response.ok) {
        // Refresh users list
        const usersResponse = await fetch('/api/admin/users')
        if (usersResponse.ok) {
          const data = await usersResponse.json()
          setUsers(Array.isArray(data) ? data : [])
        }
      }
    } catch (error) {
      console.error('Error verifying contractor:', error)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        // Refresh users list
        const usersResponse = await fetch('/api/admin/users')
        if (usersResponse.ok) {
          const data = await usersResponse.json()
          setUsers(Array.isArray(data) ? data : [])
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleSendPasswordReset = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/edit`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'send-reset-password'
        })
      })

      if (response.ok) {
        const data = await response.json()
        alert(`Password reset email sent successfully!`)
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error sending password reset:', error)
      alert('Network error occurred')
    }
  }

  const handleSendInvite = async (email: string, userType: string, message?: string) => {
    try {
      const response = await fetch('/api/admin/invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          userType,
          message
        })
      })

      if (response.ok) {
        const data = await response.json()
        alert(`Invitation email sent successfully to ${email}!`)
        setShowInviteModal(false)
      } else {
        const errorData = await response.json()
        alert(`Error: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error sending invitation:', error)
      alert('Network error occurred')
    }
  }

  const handlePhoneTest = async (action: 'send' | 'verify') => {
    setPhoneTestLoading(true)
    try {
      const response = await fetch('/api/verify-phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action,
          phoneNumber: phoneTestNumber,
          code: action === 'verify' ? phoneTestCode : undefined
        })
      })

      const data = await response.json()

      if (response.ok) {
        if (action === 'send') {
          alert(`Verification code sent to ${phoneTestNumber}!\nSID: ${data.sid || 'N/A'}`)
          setPhoneTestStep('verify')
        } else {
          alert(`Phone verification successful! Status: ${data.status}`)
          setShowPhoneTestModal(false)
          setPhoneTestStep('input')
          setPhoneTestCode('')
        }
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Error with phone verification:', error)
      alert('Network error occurred')
    } finally {
      setPhoneTestLoading(false)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = !userTypeFilter || user.userType === userTypeFilter
    return matchesSearch && matchesType
  })

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session || session.user.userType !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage users, contractors, and system settings</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'users', name: 'Users', icon: Users },
              { id: 'system', name: 'System', icon: Settings }
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats?.totalUsers || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Contractors</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats?.totalContractors || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Customers</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats?.totalCustomers || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                    <p className="text-2xl font-semibold text-gray-900">
                      {stats?.pendingApprovals || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab('users')}
                  className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="font-medium">Manage Users</span>
                </button>
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Database className="h-6 w-6 text-green-600 mr-3" />
                  <span className="font-medium">System Backup</span>
                </button>
                <button className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="h-6 w-6 text-purple-600 mr-3" />
                  <span className="font-medium">Site Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    <option value="CUSTOMER">Customers</option>
                    <option value="CONTRACTOR">Contractors</option>
                    <option value="ADMIN">Admins</option>
                  </select>
                  <button
                    onClick={() => setShowInviteModal(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Invite User
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.userType === 'ADMIN' ? 'bg-red-100 text-red-800' :
                              user.userType === 'CONTRACTOR' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                            }`}>
                            {user.userType}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {user.contractor ? (
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${user.contractor.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                              {user.contractor.isVerified ? 'Verified' : 'Pending'}
                            </span>
                          ) : (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedUser(user)
                                setShowEditModal(true)
                              }}
                              className="text-blue-600 hover:text-blue-900 flex items-center"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleSendPasswordReset(user.id)}
                              className="text-purple-600 hover:text-purple-900 flex items-center"
                            >
                              <Key className="w-4 h-4 mr-1" />
                              Reset
                            </button>
                            {user.userType === 'CONTRACTOR' && user.contractor && !user.contractor.isVerified && (
                              <button
                                onClick={() => handleVerifyContractor(user.id)}
                                className="text-green-600 hover:text-green-900 flex items-center"
                              >
                                <UserCheck className="w-4 h-4 mr-1" />
                                Verify
                              </button>
                            )}
                            {user.userType !== 'ADMIN' && (
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">System Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Site Settings</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Enable user registration</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Require email verification</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                      <span className="ml-2 text-sm text-gray-700">Enable contractor verification</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Maintenance</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Export user data
                    </button>
                    <button className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      Clear system cache
                    </button>
                    <button className="w-full text-left px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50">
                      Enable maintenance mode
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Testing Tools</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => setShowPhoneTestModal(true)}
                      className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Test Phone Verification
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Invite New User</h3>
              <form onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target as HTMLFormElement)
                handleSendInvite(
                  formData.get('email') as string,
                  formData.get('userType') as string,
                  formData.get('message') as string
                )
              }}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="user@example.com"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Type
                  </label>
                  <select
                    name="userType"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="CONTRACTOR">Contractor</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Welcome message..."
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Phone Test Modal */}
      {showPhoneTestModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Test Phone Verification</h3>

              {phoneTestStep === 'input' && (
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phoneTestNumber}
                      onChange={(e) => setPhoneTestNumber(e.target.value)}
                      placeholder="Enter phone number (e.g., +14802555887)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPhoneTestModal(false)
                        setPhoneTestStep('input')
                        setPhoneTestNumber('480-255-5887')
                        setPhoneTestCode('')
                      }}
                      className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handlePhoneTest('send')}
                      disabled={!phoneTestNumber || phoneTestLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {phoneTestLoading ? 'Sending...' : 'Send Code'}
                    </button>
                  </div>
                </div>
              )}

              {phoneTestStep === 'verify' && (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Verification code sent to {phoneTestNumber}
                  </p>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Code
                    </label>
                    <input
                      type="text"
                      value={phoneTestCode}
                      onChange={(e) => setPhoneTestCode(e.target.value)}
                      placeholder="Enter 6-digit code"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      maxLength={6}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setPhoneTestStep('input')}
                      className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handlePhoneTest('verify')}
                      disabled={!phoneTestCode || phoneTestLoading}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {phoneTestLoading ? 'Verifying...' : 'Verify Code'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  )
}
