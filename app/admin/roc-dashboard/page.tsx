'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Download, RefreshCw, MapPin, Phone, Globe, Calendar, Shield } from 'lucide-react'

interface ROCContractor {
  id: string
  businessName: string
  dbaName?: string
  rocLicenseNumber: string
  licenseClass: string
  licenseType: string
  licenseStatus: string
  city: string
  state: string
  specialties: string[]
  yearsInBusiness: number
  phone?: string
  email?: string
  website?: string
  licenseExpiration: string
  qualifyingParty?: string
}

export default function ROCDashboard() {
  const [contractors, setContractors] = useState<ROCContractor[]>([])
  const [filteredContractors, setFilteredContractors] = useState<ROCContractor[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    withContact: 0,
    byClass: {} as Record<string, number>,
    byCities: {} as Record<string, number>
  })

  useEffect(() => {
    fetchContractors()
  }, [])

  useEffect(() => {
    const filtered = contractors.filter(contractor =>
      contractor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.licenseClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contractor.rocLicenseNumber.includes(searchTerm)
    )
    setFilteredContractors(filtered)
  }, [searchTerm, contractors])

  const fetchContractors = async () => {
    try {
      const response = await fetch('/api/roc/contractors')
      const data = await response.json()

      if (data.success) {
        setContractors(data.contractors)
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching contractors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImportROC = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/roc/import', { method: 'POST' })
      const result = await response.json()

      if (result.success) {
        alert(`Import complete! Processed: ${result.summary.totalProcessed}, New: ${result.summary.newContractors}`)
        fetchContractors()
      } else {
        alert('Import failed: ' + result.error)
      }
    } catch (error) {
      alert('Import error: ' + error)
    } finally {
      setLoading(false)
    }
  }

  const getLicenseStatusBadge = (status: string) => {
    const variant = status === 'Active' ? 'default' : 'secondary'
    return <Badge variant={variant}>{status}</Badge>
  }

  const getLicenseClassBadge = (licenseClass: string) => {
    const colors = {
      'B': 'bg-blue-100 text-blue-800',
      'R-11': 'bg-yellow-100 text-yellow-800',
      'CR-42': 'bg-green-100 text-green-800',
      'R-39R': 'bg-purple-100 text-purple-800',
      'CR-14': 'bg-red-100 text-red-800'
    }
    const colorClass = colors[licenseClass as keyof typeof colors] || 'bg-gray-100 text-gray-800'

    return <Badge className={colorClass}>{licenseClass}</Badge>
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading ROC contractors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AZ ROC Contractor Database
          </h1>
          <p className="text-gray-600">
            Live data from Arizona Registrar of Contractors
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contractors</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">With Contact Info</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.withContact.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((stats.withContact / stats.total) * 100).toFixed(1)}% completion
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">License Classes</CardTitle>
              <Badge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.byClass).length}</div>
              <p className="text-xs text-muted-foreground">
                Different license types
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cities Covered</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.byCities).length}</div>
              <p className="text-xs text-muted-foreground">
                Across Arizona
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search contractors, cities, or license numbers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={handleImportROC} disabled={loading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Import Latest ROC Data
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">
              {filteredContractors.length.toLocaleString()} Contractors Found
            </h2>
          </div>

          <div className="divide-y">
            {filteredContractors.map((contractor) => (
              <div key={contractor.id} className="p-6 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {contractor.businessName}
                    </h3>
                    {contractor.dbaName && (
                      <p className="text-sm text-gray-600">
                        DBA: {contractor.dbaName}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {getLicenseStatusBadge(contractor.licenseStatus)}
                    {getLicenseClassBadge(contractor.licenseClass)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Shield className="h-4 w-4 mr-2" />
                    License: {contractor.rocLicenseNumber}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {contractor.city}, {contractor.state}
                  </div>

                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {contractor.yearsInBusiness} years in business
                  </div>

                  {contractor.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {contractor.phone}
                    </div>
                  )}
                </div>

                {contractor.specialties && contractor.specialties.length > 0 && (
                  <div className="mt-3">
                    <div className="flex flex-wrap gap-1">
                      {contractor.specialties.slice(0, 5).map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {contractor.specialties.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{contractor.specialties.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    License Type: {contractor.licenseType}
                    {contractor.qualifyingParty && (
                      <span> • QP: {contractor.qualifyingParty}</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {contractor.website && (
                      <Button size="sm" variant="outline">
                        <Globe className="h-3 w-3 mr-1" />
                        Website
                      </Button>
                    )}
                    <Button size="sm">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredContractors.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500">No contractors found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
