'use client'

import { useState, useEffect } from 'react'
import { Star, MapPin, Phone, Globe, Calendar, Award, Shield, Image as ImageIcon, ChevronLeft, ChevronRight, Map, Navigation, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import GoogleMap from '@/components/ui/GoogleMap'
import { ImageService } from '@/lib/imageService'

interface Contractor {
    id: number
    name: string
    businessName: string
    email: string
    phone: string
    location: string
    coordinates?: {
        lat: number
        lng: number
    }
    specialties: string[]
    yearsExperience: number
    rating: number
    reviewCount: number
    priceRange: string
    description: string
    fullDescription: string
    website?: string
    profileImage: string
    portfolioImages: string[]
    services: string[]
    serviceArea?: string[]
    verified: boolean
    certification?: string
    insurance?: string
    bonded?: boolean
}

// Mock data - in production this would come from your database
const contractorData: Contractor = {
    id: 1,
    name: "Michael Rodriguez",
    businessName: "Premium Stone Solutions",
    email: "michael@premiumstone.com",
    phone: "(480) 555-0123",
    location: "Phoenix, AZ",
    coordinates: { lat: 33.4484, lng: -112.0740 },
    specialties: ["Granite Countertops", "Quartz Installation", "Marble Work", "Kitchen Remodeling", "Bathroom Renovation"],
    yearsExperience: 15,
    rating: 4.9,
    reviewCount: 127,
    priceRange: "Premium",
    description: "Premium Stone Solutions has been Phoenix's trusted partner for luxury stone installation and renovation projects for over 15 years. We specialize in high-end granite, quartz, and marble installations with a focus on precision craftsmanship and exceptional customer service.",
    fullDescription: `Premium Stone Solutions stands as Phoenix's premier destination for luxury stone installations and comprehensive renovation services. With over 15 years of dedicated experience in the industry, we have built an unparalleled reputation for delivering exceptional craftsmanship and personalized service to homeowners and businesses throughout the greater Phoenix area.

Our team of certified stone fabrication specialists brings decades of combined expertise to every project, ensuring that each installation meets the highest standards of quality and durability. We work exclusively with premium materials sourced from the world's finest quarries, including exotic granites from Brazil, precision-engineered quartz from leading manufacturers, and stunning marble selections from Italy and Greece.

What sets us apart is our commitment to the complete customer experience. From initial consultation and design planning to final installation and ongoing maintenance support, we guide our clients through every step of their renovation journey. Our state-of-the-art fabrication facility utilizes the latest CNC technology and water jet cutting systems to ensure perfect fits and flawless finishes.

We understand that your home is your most important investment, which is why we back all of our work with comprehensive warranties and provide ongoing support long after project completion. Our dedication to excellence has earned us recognition as Phoenix's top-rated stone contractor and preferred partner for luxury home builders and interior designers throughout Arizona.`,
    website: "premiumstone.com",
    profileImage: "/api/placeholder/400/400",
    portfolioImages: [
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600",
        "/api/placeholder/800/600"
    ],
    services: [
        "Custom Granite Countertops",
        "Quartz Island Installation",
        "Marble Bathroom Vanities",
        "Outdoor Kitchen Surfaces",
        "Fireplace Surrounds",
        "Commercial Stone Work"
    ],
    serviceArea: ["Phoenix", "Scottsdale", "Tempe", "Mesa", "Chandler", "Glendale", "Peoria"],
    verified: true,
    certification: "Arizona ROC Licensed",
    insurance: "Fully Insured & Bonded",
    bonded: true
}

export default function ContractorDetailPage({ params }: { params: { id: string } }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [contractor, setContractor] = useState<Contractor | null>(null)

    useEffect(() => {
        // In production, fetch contractor data based on params.id
        setContractor(contractorData)

        // Use existing image URLs - they're already placeholder URLs
    }, [params.id])

    const nextImage = () => {
        if (contractor) {
            setSelectedImageIndex((prev) =>
                prev === contractor.portfolioImages.length - 1 ? 0 : prev + 1
            )
        }
    }

    const prevImage = () => {
        if (contractor) {
            setSelectedImageIndex((prev) =>
                prev === 0 ? contractor.portfolioImages.length - 1 : prev - 1
            )
        }
    }

    if (!contractor) {
        return <div className="min-h-screen bg-gradient-construction-hero flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 mx-auto"></div>
                <p className="mt-4 text-stone-600">Loading contractor details...</p>
            </div>
        </div>
    }

    return (
        <div className="min-h-screen bg-gradient-construction-hero">
            {/* Navigation Breadcrumb */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="text-stone-600 hover:text-amber-600">Home</Link>
                        <span className="text-stone-400">/</span>
                        <Link href="/contractors" className="text-stone-600 hover:text-amber-600">Contractors</Link>
                        <span className="text-stone-400">/</span>
                        <span className="text-stone-900 font-medium">{contractor.businessName}</span>
                    </nav>
                </div>
            </div>

            {/* Enhanced Header */}
            <div className="bg-white shadow-lg border-b-2 border-amber-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Image & Basic Info */}
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="relative mb-6">
                                <img
                                    src={contractor.profileImage}
                                    alt={contractor.name}
                                    className="w-48 h-48 rounded-2xl object-cover shadow-construction border-4 border-white"
                                />
                                {contractor.verified && (
                                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-2 shadow-lg">
                                        <Shield size={20} />
                                    </div>
                                )}
                            </div>

                            {/* Contact Actions */}
                            <div className="space-y-3 w-full max-w-sm">
                                <button className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2">
                                    <DollarSign size={20} />
                                    <span>Get Free Quote</span>
                                </button>
                                <a
                                    href={`tel:${contractor.phone}`}
                                    className="w-full btn-outline text-lg py-4 flex items-center justify-center space-x-2"
                                >
                                    <Phone size={20} />
                                    <span>{contractor.phone}</span>
                                </a>
                                {contractor.website && (
                                    <a
                                        href={`https://${contractor.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full btn-outline py-3 flex items-center justify-center space-x-2"
                                    >
                                        <Globe size={18} />
                                        <span>Visit Website</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Business Information */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-construction-subtle rounded-2xl p-8 shadow-construction">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h1 className="text-4xl font-bold text-construction-heading mb-2">
                                            {contractor.businessName}
                                        </h1>
                                        <p className="text-xl text-stone-700 mb-4">{contractor.name}</p>

                                        <div className="flex flex-wrap items-center gap-6 text-stone-600 mb-6">
                                            <div className="flex items-center space-x-2">
                                                <MapPin size={18} className="text-amber-600" />
                                                <span className="font-medium">{contractor.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar size={18} className="text-amber-600" />
                                                <span>{contractor.yearsExperience} years experience</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Award size={18} className="text-amber-600" />
                                                <span className="badge-construction">{contractor.priceRange} Pricing</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Rating Display */}
                                    <div className="text-center bg-white rounded-xl px-6 py-4 shadow-lg">
                                        <div className="flex items-center justify-center space-x-1 mb-2">
                                            <Star className="text-yellow-400 fill-current" size={24} />
                                            <span className="text-3xl font-bold text-stone-900">{contractor.rating}</span>
                                        </div>
                                        <div className="text-sm text-stone-600">{contractor.reviewCount} reviews</div>
                                        <div className="text-xs text-green-600 font-medium mt-1">Excellent Rating</div>
                                    </div>
                                </div>

                                {/* Specialties */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-stone-900 mb-3">Specialties</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {contractor.specialties.map(specialty => (
                                            <span
                                                key={specialty}
                                                className="badge-construction text-sm px-4 py-2"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Service Areas */}
                                {contractor.serviceArea && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-stone-900 mb-3">Service Areas</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {contractor.serviceArea.map(area => (
                                                <span
                                                    key={area}
                                                    className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full border border-amber-200"
                                                >
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                <div>
                                    <h3 className="text-lg font-semibold text-stone-900 mb-3">About</h3>
                                    <p className="text-stone-700 leading-relaxed">{contractor.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Enhanced Portfolio Gallery */}
                        <div className="bg-white rounded-2xl shadow-construction overflow-hidden border border-stone-200">
                            <div className="bg-gradient-construction-subtle px-8 py-6 border-b border-stone-200">
                                <h2 className="text-2xl font-bold text-construction-heading flex items-center space-x-3">
                                    <ImageIcon size={28} className="text-amber-600" />
                                    <span>Our Work Portfolio</span>
                                </h2>
                                <p className="text-stone-600 mt-2">Browse through our recent projects and craftsmanship</p>
                            </div>

                            <div className="p-8">
                                <div className="relative">
                                    <img
                                        src={contractor.portfolioImages[selectedImageIndex]}
                                        alt="Portfolio"
                                        className="w-full h-96 object-cover rounded-xl shadow-lg"
                                    />

                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-construction-primary bg-opacity-90 text-white p-3 rounded-full hover:bg-opacity-100 transition-all shadow-lg"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-construction-primary bg-opacity-90 text-white p-3 rounded-full hover:bg-opacity-100 transition-all shadow-lg"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                        {contractor.portfolioImages.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImageIndex(index)}
                                                className={`w-3 h-3 rounded-full transition-all ${index === selectedImageIndex
                                                        ? 'bg-amber-500 shadow-lg'
                                                        : 'bg-white bg-opacity-60 hover:bg-opacity-80'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Thumbnail Gallery */}
                                <div className="flex space-x-3 mt-6 overflow-x-auto pb-2">
                                    {contractor.portfolioImages.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${index === selectedImageIndex
                                                    ? 'border-amber-500 shadow-lg'
                                                    : 'border-stone-200 hover:border-stone-300'
                                                }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`Portfolio ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Services & Expertise */}
                        <div className="bg-white rounded-2xl shadow-construction overflow-hidden border border-stone-200">
                            <div className="bg-gradient-construction-subtle px-8 py-6 border-b border-stone-200">
                                <h2 className="text-2xl font-bold text-construction-heading">Services & Expertise</h2>
                                <p className="text-stone-600 mt-2">Professional services we provide</p>
                            </div>

                            <div className="p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {contractor.services.map((service, index) => (
                                        <div key={service} className="flex items-center space-x-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                            <span className="text-stone-700 font-medium">{service}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* About Section */}
                        <div className="bg-white rounded-2xl shadow-construction overflow-hidden border border-stone-200">
                            <div className="bg-gradient-construction-subtle px-8 py-6 border-b border-stone-200">
                                <h2 className="text-2xl font-bold text-construction-heading">About Our Company</h2>
                            </div>

                            <div className="p-8">
                                <div className="prose prose-stone max-w-none">
                                    {contractor.fullDescription.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className="text-stone-700 leading-relaxed mb-4">{paragraph}</p>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-stone-200">
                                    <div className="text-center">
                                        <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Calendar size={24} className="text-amber-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-construction-heading">{contractor.yearsExperience}</div>
                                        <div className="text-stone-600">Years Experience</div>
                                    </div>

                                    <div className="text-center">
                                        <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Star size={24} className="text-amber-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-construction-heading">{contractor.rating}</div>
                                        <div className="text-stone-600">Star Rating</div>
                                    </div>

                                    <div className="text-center">
                                        <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <Award size={24} className="text-amber-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-construction-heading">Premium</div>
                                        <div className="text-stone-600">Service Quality</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Contact Form */}
                        <div className="bg-white rounded-2xl shadow-construction border border-stone-200 sticky top-24">
                            <div className="bg-gradient-construction-subtle px-6 py-4 border-b border-stone-200">
                                <h3 className="text-xl font-bold text-construction-heading">Get Free Quote</h3>
                                <p className="text-stone-600 text-sm mt-1">Request a personalized estimate</p>
                            </div>

                            <div className="p-6">
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">Project Type</label>
                                        <select className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500">
                                            <option>Kitchen Countertops</option>
                                            <option>Bathroom Vanity</option>
                                            <option>Outdoor Kitchen</option>
                                            <option>Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">Budget Range</label>
                                        <select className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500">
                                            <option>$5,000 - $10,000</option>
                                            <option>$10,000 - $20,000</option>
                                            <option>$20,000 - $30,000</option>
                                            <option>$30,000+</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">Timeline</label>
                                        <select className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500">
                                            <option>ASAP</option>
                                            <option>Within 1 month</option>
                                            <option>1-3 months</option>
                                            <option>3+ months</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-stone-700 mb-2">Project Details</label>
                                        <textarea
                                            rows={4}
                                            className="w-full border border-stone-300 rounded-lg px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                                            placeholder="Describe your project..."
                                        ></textarea>
                                    </div>

                                    <button type="submit" className="w-full btn-primary py-3">
                                        Request Free Quote
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Location & Map */}
                        <div className="bg-white rounded-2xl shadow-construction border border-stone-200">
                            <div className="bg-gradient-construction-subtle px-6 py-4 border-b border-stone-200">
                                <h3 className="text-xl font-bold text-construction-heading flex items-center space-x-2">
                                    <MapPin size={20} className="text-amber-600" />
                                    <span>Location & Service Area</span>
                                </h3>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2 text-stone-600">
                                        <MapPin size={16} className="text-amber-600" />
                                        <span>{contractor.location}</span>
                                    </div>

                                    {/* Google Maps */}
                                    {contractor.coordinates && (
                                        <div className="h-48 rounded-lg overflow-hidden">
                                            <GoogleMap
                                                contractors={[{
                                                    id: contractor.id.toString(),
                                                    name: contractor.businessName,
                                                    address: contractor.location,
                                                    coordinates: contractor.coordinates,
                                                    phone: contractor.phone
                                                }]}
                                                center={contractor.coordinates}
                                                zoom={13}
                                                onContractorClick={() => { }}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Service Areas */}
                                {contractor.serviceArea && (
                                    <div className="mt-6">
                                        <h4 className="font-medium text-stone-900 mb-2">Service Areas</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {contractor.serviceArea.map(area => (
                                                <span
                                                    key={area}
                                                    className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full border border-amber-200"
                                                >
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Directions */}
                                <div className="flex space-x-2 mt-6">
                                    <button
                                        onClick={() => {
                                            if (contractor.coordinates) {
                                                const url = `https://www.google.com/maps/dir/?api=1&destination=${contractor.coordinates.lat},${contractor.coordinates.lng}`;
                                                window.open(url, '_blank');
                                            }
                                        }}
                                        className="flex-1 btn-outline text-sm"
                                    >
                                        <Navigation size={16} className="mr-1" />
                                        Get Directions
                                    </button>
                                    <button
                                        onClick={() => {
                                            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contractor.businessName + ' ' + contractor.location)}`;
                                            window.open(url, '_blank');
                                        }}
                                        className="flex-1 btn-outline text-sm"
                                    >
                                        <Map size={16} className="mr-1" />
                                        View on Maps
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Back to Directory */}
                        <div className="text-center">
                            <Link href="/contractors" className="btn-outline">
                                ← Back to Directory
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
