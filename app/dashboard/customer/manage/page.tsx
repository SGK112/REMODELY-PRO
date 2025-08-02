'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Upload, Camera, X, Edit2, Save, User, Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CustomerProfile {
    id: string
    firstName: string
    lastName: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    user: {
        name: string
        email: string
        image: string
    }
}

export default function CustomerProfileManage() {
    const { data: session } = useSession()
    const router = useRouter()
    const [customer, setCustomer] = useState<CustomerProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editedProfile, setEditedProfile] = useState<Partial<CustomerProfile>>({})

    // Load customer profile
    useEffect(() => {
        if (session?.user?.id) {
            loadCustomerProfile()
        }
    }, [session])

    const loadCustomerProfile = async () => {
        try {
            const response = await fetch('/api/customer/profile')
            if (response.ok) {
                const data = await response.json()
                setCustomer(data.customer)
                setEditedProfile(data.customer)
            } else if (response.status === 404) {
                // No customer profile exists
                console.log('No customer profile found')
            }
        } catch (error) {
            console.error('Failed to load customer profile:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleProfileImageUpload = async (file: File) => {
        if (!file || !customer) return

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('type', 'profile')

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const result = await response.json()
                setCustomer(prev => prev ? {
                    ...prev,
                    user: { ...prev.user, image: result.url }
                } : null)
            } else {
                const error = await response.json()
                alert(`Upload failed: ${error.error}`)
            }
        } catch (error) {
            console.error('Upload failed:', error)
            alert('Upload failed')
        } finally {
            setUploading(false)
        }
    }

    const saveProfile = async () => {
        if (!customer || !editedProfile) return

        try {
            const response = await fetch('/api/customer/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedProfile),
            })

            if (response.ok) {
                const updated = await response.json()
                setCustomer(updated)
                setEditMode(false)
            }
        } catch (error) {
            console.error('Failed to save profile:', error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your profile...</p>
                </div>
            </div>
        )
    }

    if (!customer) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Customer Profile Found</h2>
                    <p className="text-gray-600 mb-6">You need to have a customer profile to access this page.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-6">
                            {/* Profile Image */}
                            <div className="relative">
                                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                                    {customer.user.image ? (
                                        <img
                                            src={customer.user.image}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <Camera size={32} />
                                        </div>
                                    )}
                                </div>
                                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                                    <Upload size={16} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => e.target.files?.[0] && handleProfileImageUpload(e.target.files[0])}
                                        disabled={uploading}
                                    />
                                </label>
                                {uploading && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                    </div>
                                )}
                            </div>

                            {/* Basic Info */}
                            <div className="flex-1">
                                {editMode ? (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                value={editedProfile.firstName || ''}
                                                onChange={(e) => setEditedProfile(prev => ({ ...prev, firstName: e.target.value }))}
                                                className="text-xl font-bold border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                                                placeholder="First Name"
                                            />
                                            <input
                                                type="text"
                                                value={editedProfile.lastName || ''}
                                                onChange={(e) => setEditedProfile(prev => ({ ...prev, lastName: e.target.value }))}
                                                className="text-xl font-bold border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent"
                                                placeholder="Last Name"
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            value={editedProfile.phone || ''}
                                            onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            placeholder="Phone Number"
                                        />
                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                value={editedProfile.address || ''}
                                                onChange={(e) => setEditedProfile(prev => ({ ...prev, address: e.target.value }))}
                                                className="col-span-3 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="Street Address"
                                            />
                                            <input
                                                type="text"
                                                value={editedProfile.city || ''}
                                                onChange={(e) => setEditedProfile(prev => ({ ...prev, city: e.target.value }))}
                                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="City"
                                            />
                                            <input
                                                type="text"
                                                value={editedProfile.state || ''}
                                                onChange={(e) => setEditedProfile(prev => ({ ...prev, state: e.target.value }))}
                                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="State"
                                            />
                                            <input
                                                type="text"
                                                value={editedProfile.zipCode || ''}
                                                onChange={(e) => setEditedProfile(prev => ({ ...prev, zipCode: e.target.value }))}
                                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="ZIP Code"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">
                                            {customer.firstName} {customer.lastName}
                                        </h1>
                                        <p className="text-gray-600 mt-2">{customer.user.email}</p>
                                        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                                            {customer.phone && <span>📞 {customer.phone}</span>}
                                            {customer.address && (
                                                <span>🏠 {customer.address}, {customer.city}, {customer.state} {customer.zipCode}</span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Edit Controls */}
                        <div className="flex space-x-2">
                            {editMode ? (
                                <>
                                    <button
                                        onClick={saveProfile}
                                        className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                    >
                                        <Save size={16} />
                                        <span>Save</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setEditMode(false)
                                            setEditedProfile(customer)
                                        }}
                                        className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                                    >
                                        <X size={16} />
                                        <span>Cancel</span>
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    <Edit2 size={16} />
                                    <span>Edit Profile</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Additional Information */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Account Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <p className="text-gray-900">{customer.user.email}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                            <p className="text-gray-900">Customer</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                            <p className="text-gray-900">Recently joined</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Completeness</label>
                            <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{
                                            width: `${[customer.firstName, customer.lastName, customer.phone, customer.address].filter(Boolean).length * 25
                                                }%`
                                        }}
                                    ></div>
                                </div>
                                <span className="text-sm text-gray-600">
                                    {[customer.firstName, customer.lastName, customer.phone, customer.address].filter(Boolean).length * 25}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
