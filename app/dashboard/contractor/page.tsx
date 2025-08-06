"use client"

import { useState } from "react"
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
  DollarSign,
  Phone,
  MessageSquare,
  Calendar,
  FileText,
  Star,
  LogOut,
  Wrench,
  TrendingUp,
  Users,
  Award
} from "lucide-react"

export default function ContractorDashboard() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState("overview")

  const contractor = session?.user?.contractor

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contractor Dashboard</h1>
                <p className="text-gray-600">Welcome back, {session?.user?.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {contractor?.businessName || 'Professional'}
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
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Leads</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Clients</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center space-x-2">
              <Star className="h-4 w-4" />
              <span>Reviews</span>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$28,750</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">5 pending response</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Based on 24 reviews</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Your latest contractor work</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Wrench className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Kitchen Renovation - Johnson Family</p>
                        <p className="text-sm text-gray-600">In Progress • Started March 15</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Wrench className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Bathroom Remodel - Smith Residence</p>
                        <p className="text-sm text-gray-600">Completed • March 1</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Wrench className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Deck Installation - Brown Home</p>
                        <p className="text-sm text-gray-600">Quoted • March 20</p>
                      </div>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common contractor tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <FileText className="h-6 w-6" />
                      <span>Create Quote</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Calendar className="h-6 w-6" />
                      <span>Schedule</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Users className="h-6 w-6" />
                      <span>View Leads</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col space-y-2">
                      <Award className="h-6 w-6" />
                      <span>Get Certified</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest business activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New lead from kitchen renovation project</p>
                      <p className="text-xs text-gray-600">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Payment received from Johnson Family project</p>
                      <p className="text-xs text-gray-600">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New review posted: 5 stars</p>
                      <p className="text-xs text-gray-600">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
                <CardDescription>Manage your ongoing and completed projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No active projects</h3>
                  <p className="text-gray-600 mb-4">Start tracking your contractor projects</p>
                  <Button>Add New Project</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <CardTitle>Lead Management</CardTitle>
                <CardDescription>Track and respond to potential clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No leads yet</h3>
                  <p className="text-gray-600 mb-4">New leads will appear here</p>
                  <Button>Update Profile to Get Leads</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Client Management</CardTitle>
                <CardDescription>Manage your customer relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
                  <p className="text-gray-600">Your client list will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Reviews & Ratings</CardTitle>
                <CardDescription>Manage your customer feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-600 mb-4">Complete projects to receive reviews</p>
                  <Button>Request Review</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                  <CardDescription>Update your business profile</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Business Name</label>
                      <p className="text-gray-900">{contractor?.businessName || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Contact Email</label>
                      <p className="text-gray-900">{session?.user?.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-gray-900">{contractor?.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">License Number</label>
                      <p className="text-gray-900">{contractor?.licenseNumber || 'Not provided'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium">Service Areas</label>
                      <p className="text-gray-900">
                        {contractor?.serviceAreas?.length
                          ? contractor.serviceAreas.join(', ')
                          : 'Not specified'
                        }
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium">Specializations</label>
                      <p className="text-gray-900">
                        {contractor?.specializations?.length
                          ? contractor.specializations.join(', ')
                          : 'Not specified'
                        }
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certifications & Insurance</CardTitle>
                  <CardDescription>Professional credentials and coverage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Insurance Status</label>
                      <div className="flex items-center space-x-2 mt-1">
                        {contractor?.insuranceVerified ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">License Status</label>
                      <div className="flex items-center space-x-2 mt-1">
                        {contractor?.licenseVerified ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button variant="outline">Update Credentials</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <TwoFactorAuthSettings />

              <PasswordChange />

              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Additional security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Business Verification</p>
                      <p className="text-sm text-gray-600">Verify your business credentials</p>
                    </div>
                    <Button variant="outline" size="sm">Verify</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Login History</p>
                      <p className="text-sm text-gray-600">View your recent login activity</p>
                    </div>
                    <Button variant="outline" size="sm">View History</Button>
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
