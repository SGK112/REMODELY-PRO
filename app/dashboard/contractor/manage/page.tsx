'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Upload, Camera, X, Plus, Edit2, Save, Image as ImageIcon, Building } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ContractorProfile {
    id: string
    businessName: string
    description: string
    phone: string
    website: string
    address: string
    city: string
    state: string
    zipCode: string
    specialties: string[]
    yearsExperience: number
    licenseNumber: string
    portfolioImages: string[]
    user: {
        name: string
        email: string
        image: string
    }
}

export default function ContractorDashboardProfile() {
    const { data: session } = useSession()
    const router = useRouter()
    const [contractor, setContractor] = useState<ContractorProfile | null>(null)
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [editedProfile, setEditedProfile] = useState<Partial<ContractorProfile>>({})

    // Load contractor profile
    useEffect(() => {
        if (session?.user?.id) {
            loadContractorProfile()
        }
    }, [session])

    const loadContractorProfile = async () => {
        try {
            const response = await fetch('/api/contractor/profile')
            if (response.ok) {
                const data = await response.json()
                setContractor(data.contractor)
                setEditedProfile(data.contractor)
            } else if (response.status === 404) {
                // No contractor profile exists
                console.log('No contractor profile found')
            }
        } catch (error) {
            console.error('Failed to load contractor profile:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleProfileImageUpload = async (file: File) => {
        if (!file || !contractor) return

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
                setContractor(prev => prev ? {
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

    const handlePortfolioImageUpload = async (file: File) => {
        if (!file || !contractor) return

        setUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('type', 'portfolio')
            formData.append('contractorId', contractor.id)

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const result = await response.json()
                setContractor(prev => prev ? {
                    ...prev,
                    portfolioImages: [...prev.portfolioImages, result.url]
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
        if (!contractor || !editedProfile) return

        try {
            const response = await fetch('/api/contractor/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedProfile),
            })

            if (response.ok) {
                const updated = await response.json()
                setContractor(updated)
                setEditMode(false)
            }
        } catch (error) {
            console.error('Failed to save profile:', error)
        }
    }

    const removePortfolioImage = async (imageUrl: string) => {
        if (!contractor) return

        try {
            const updatedImages = contractor.portfolioImages.filter(img => img !== imageUrl)
            const response = await fetch('/api/contractor/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ portfolioImages: updatedImages }),
            })

            if (response.ok) {
                setContractor(prev => prev ? {
                    ...prev,
                    portfolioImages: updatedImages
                } : null)
            }
        } catch (error) {
            console.error('Failed to remove image:', error)
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

    if (!contractor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Building className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Contractor Profile Found</h2>
                    <p className="text-gray-600 mb-6">You need to have a contractor profile to access this dashboard.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-6">
                            {/* Profile Image */}
                            <div className="relative">
                                <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden">
                                    {contractor.user.image ? (
                                        <img
                                            src={contractor.user.image}
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
                                        <input
                                            type="text"
                                            value={editedProfile.businessName || ''}
                                            onChange={(e) => setEditedProfile(prev => ({ ...prev, businessName: e.target.value }))}
                                            className="text-2xl font-bold border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent w-full"
                                            placeholder="Business Name"
                                        />
                                        <textarea
                                            value={editedProfile.description || ''}
                                            onChange={(e) => setEditedProfile(prev => ({ ...prev, description: e.target.value }))}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            rows={3}
                                            placeholder="Describe your business and services..."
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                value={editedProfile.phone || ''}
                                                onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="Phone Number"
                                            />
                                            <input
                                                type="text"
                                                value={editedProfile.website || ''}
                                                onChange={(e) => setEditedProfile(prev => ({ ...prev, website: e.target.value }))}
                                                className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                placeholder="Website"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-900">{contractor.businessName}</h1>
                                        <p className="text-gray-600 mt-2">{contractor.description}</p>
                                        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
                                            {contractor.phone && <span>📞 {contractor.phone}</span>}
                                            {contractor.website && <span>🌐 {contractor.website}</span>}
                                            {contractor.licenseNumber && <span>🆔 {contractor.licenseNumber}</span>}
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {contractor.specialties.map((specialty, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                                >
                                                    {specialty}
                                                </span>
                                            ))}
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
                                            setEditedProfile(contractor)
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

                {/* Portfolio Section */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Portfolio Images</h2>
                        <label className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700">
                            <Plus size={16} />
                            <span>Add Image</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handlePortfolioImageUpload(e.target.files[0])}
                                disabled={uploading}
                            />
                        </label>
                    </div>

                    {uploading && (
                        <div className="text-center py-4 mb-4">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            <p className="mt-2 text-gray-600">Uploading...</p>
                        </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {contractor.portfolioImages.map((image, index) => (
                            <div key={index} className="relative group">
                                <img
                                    src={image}
                                    alt={`Portfolio ${index + 1}`}
                                    className="w-full h-48 object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => removePortfolioImage(image)}
                                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {contractor.portfolioImages.length === 0 && (
                            <div className="col-span-full text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No portfolio images</h3>
                                <p className="mt-1 text-sm text-gray-500">Upload images to showcase your work</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
