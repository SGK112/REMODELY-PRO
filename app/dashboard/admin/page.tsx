"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TwoFactorAuthSettings } from "@/components/auth/TwoFactorAuthSettings"
import { PasswordChange } from "@/components/auth/PasswordChange"
import {
  Home,
  Settings,
  Shield,
  User,
  Users,
  Database,
  Activity,
  FileText,
  Star,
  LogOut,
  AlertTriangle,
  TrendingUp,
  DollarSign,
  UserCheck,
  Briefcase,
  BarChart3
} from "lucide-react"

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalContractors: 0,
    activeProjects: 0,
    monthlyRevenue: 0,
    pendingVerifications: 0
  })

  // Mock data - in a real app, this would come from your API
  useEffect(() => {
    setStats({
      totalUsers: 1247,
      totalCustomers: 856,
      totalContractors: 391,
      activeProjects: 127,
      monthlyRevenue: 142580,
      pendingVerifications: 23
    })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Platform Management & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                <Shield className="h-3 w-3 mr-1" />
                Administrator
              </Badge>
              <Button
                variant="outline"
                onClick={() => signOut({ callbackUrl: '/' })}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger value="contractors" className="flex items-center space-x-2">
              <Briefcase className="h-4 w-4" />
              <span>Contractors</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="text-green-600">↗ +12%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Contractors</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalContractors}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="text-green-600">↗ +8%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span className="text-green-600">↗ +23%</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.activeProjects}</div>
                  <p className="text-xs text-muted-foreground">Projects in progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{stats.pendingVerifications}</div>
                  <p className="text-xs text-muted-foreground">Require admin review</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">99.8%</div>
                  <p className="text-xs text-muted-foreground">Uptime this month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <UserCheck className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New contractor verified</p>
                        <p className="text-sm text-gray-600">ABC Construction - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Payment processed</p>
                        <p className="text-sm text-gray-600">$2,450 project payment - 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Dispute reported</p>
                        <p className="text-sm text-gray-600">Project #1247 - 6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <UserCheck className="h-6 w-6" />
                      <span>Verify Contractors</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <BarChart3 className="h-6 w-6" />
                      <span>View Analytics</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <AlertTriangle className="h-6 w-6" />
                      <span>Handle Disputes</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Settings className="h-6 w-6" />
                      <span>System Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and their accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Button variant="outline">All Users</Button>
                      <Button variant="outline">Customers</Button>
                      <Button variant="outline">Contractors</Button>
                      <Button variant="outline">Suspended</Button>
                    </div>
                    <Button>Export Data</Button>
                  </div>
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">User Management Interface</h3>
                    <p className="text-gray-600">Advanced user management features would be implemented here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contractors">
            <Card>
              <CardHeader>
                <CardTitle>Contractor Management</CardTitle>
                <CardDescription>Verify and manage contractor accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <Button variant="outline">Pending Verification</Button>
                      <Button variant="outline">Active</Button>
                      <Button variant="outline">Suspended</Button>
                    </div>
                    <Button>New Verification</Button>
                  </div>
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Contractor Verification System</h3>
                    <p className="text-gray-600">Contractor verification and management tools would be here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>Comprehensive platform performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-600">Advanced analytics and reporting tools would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Monitor platform performance and status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold text-green-600">Online</div>
                      <p className="text-sm text-gray-600">API Status</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold text-green-600">Normal</div>
                      <p className="text-sm text-gray-600">Database</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-2xl font-bold text-green-600">Stable</div>
                      <p className="text-sm text-gray-600">File Storage</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Configuration</CardTitle>
                  <CardDescription>Platform settings and configuration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Maintenance Mode</p>
                        <p className="text-sm text-gray-600">Enable platform maintenance mode</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Settings</p>
                        <p className="text-sm text-gray-600">Configure email notifications</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Payment Settings</p>
                        <p className="text-sm text-gray-600">Configure payment processing</p>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Admin Profile</CardTitle>
                <CardDescription>Your administrator account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-gray-900">{session?.user?.name || 'Administrator'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-gray-900">{session?.user?.email || 'admin@remodely.com'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Role</label>
                    <p className="text-gray-900">System Administrator</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Login</label>
                    <p className="text-gray-900">Today at 9:30 AM</p>
                  </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <TwoFactorAuthSettings />

              <PasswordChange />

              <Card>
                <CardHeader>
                  <CardTitle>Admin Security</CardTitle>
                  <CardDescription>Enhanced security settings for administrators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password Policy</p>
                      <p className="text-sm text-gray-600">Configure platform password requirements</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Management</p>
                      <p className="text-sm text-gray-600">Manage active admin sessions</p>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Audit Logs</p>
                      <p className="text-sm text-gray-600">View administrator activity logs</p>
                    </div>
                    <Button variant="outline" size="sm">View Logs</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
