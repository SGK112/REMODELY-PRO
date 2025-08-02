'use client'

import { useState } from 'react'
import { Star, MapPin, Phone, Globe, Calendar, Award, Shield, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface Contractor {
  id: string
  name: string
  businessName: string
  rating: number
  reviewCount: number
  location: string
  specialties: string[]
  yearsExperience: number
  profileImage: string
  portfolioImages: string[]
  description: string
  verified: boolean
  phone: string
  website?: string
  priceRange: string
  fullDescription: string
  services: string[]
  certifications: string[]
  insuranceInfo: string
  businessHours: {
    [key: string]: string
  }
  reviews: Review[]
}

interface Review {
  id: string
  customerName: string
  rating: number
  date: string
  comment: string
  projectType: string
  images?: string[]
}

// Mock data - in a real app this would come from an API
const MOCK_CONTRACTOR: Contractor = {
  id: '1',
  name: 'Michael Rodriguez',
  businessName: 'Rodriguez Granite Works',
  rating: 4.9,
  reviewCount: 127,
  location: 'Austin, TX',
  specialties: ['Kitchen Remodeling', 'Granite Installation', 'Quartz Countertops'],
  yearsExperience: 15,
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  portfolioImages: [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f3bda3dd4b3f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-4e4fa72bb41c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909011-7309f48f79b6?w=800&h=600&fit=crop'
  ],
  description: 'Specializing in premium granite and quartz installations with over 15 years of experience.',
  verified: true,
  phone: '(512) 555-0123',
  website: 'rodriguezgranite.com',
  priceRange: '$$$',
  fullDescription: `Rodriguez Granite Works has been serving the Austin area for over 15 years, specializing in premium granite and quartz countertop installations. As a family-owned business, we take pride in our commitment to quality craftsmanship and exceptional customer service.

Our team of experienced fabricators and installers work with the finest materials to create stunning countertops that will last a lifetime. We handle everything from initial consultation and design to fabrication and installation, ensuring your project is completed to the highest standards.

Whether you're remodeling your kitchen, updating your bathroom, or working on a commercial project, Rodriguez Granite Works has the expertise and dedication to bring your vision to life.`,
  services: [
    'Granite Countertop Installation',
    'Quartz Countertop Installation', 
    'Kitchen Remodeling',
    'Bathroom Countertops',
    'Commercial Stone Installation',
    'Custom Edge Profiles',
    'Stone Repair & Restoration',
    'Free Design Consultation'
  ],
  certifications: [
    'Licensed General Contractor',
    'Certified Stone Installation Professional',
    'Better Business Bureau A+ Rating',
    'OSHA Safety Certified'
  ],
  insuranceInfo: 'Fully Licensed & Insured • General Liability & Workers Compensation',
  businessHours: {
    'Monday': '8:00 AM - 6:00 PM',
    'Tuesday': '8:00 AM - 6:00 PM',
    'Wednesday': '8:00 AM - 6:00 PM',
    'Thursday': '8:00 AM - 6:00 PM',
    'Friday': '8:00 AM - 6:00 PM',
    'Saturday': '9:00 AM - 4:00 PM',
    'Sunday': 'Closed'
  },
  reviews: [
    {
      id: '1',
      customerName: 'Sarah Johnson',
      rating: 5,
      date: '2024-01-15',
      comment: 'Exceptional work! Michael and his team transformed our kitchen with beautiful granite countertops. The attention to detail and professionalism was outstanding. Highly recommend!',
      projectType: 'Kitchen Remodel',
      images: ['https://images.unsplash.com/photo-1556909114-355b4e88f73b?w=300&h=200&fit=crop']
    },
    {
      id: '2',
      customerName: 'David Chen',
      rating: 5,
      date: '2024-01-08',
      comment: 'Rodriguez Granite Works did an amazing job on our bathroom vanity. The quality of work exceeded our expectations and they completed the project on time and within budget.',
      projectType: 'Bathroom Remodel'
    },
    {
      id: '3',
      customerName: 'Jennifer Martinez',
      rating: 4,
      date: '2023-12-22',
      comment: 'Very pleased with the quartz countertops. Professional installation and great customer service throughout the process. Would definitely use them again.',
      projectType: 'Kitchen Countertops'
    },
    {
      id: '4',
      customerName: 'Robert Taylor',
      rating: 5,
      date: '2023-12-10',
      comment: 'Outstanding craftsmanship and attention to detail. The team was punctual, clean, and respectful of our home. The finished product is absolutely beautiful.',
      projectType: 'Kitchen Remodel',
      images: ['https://images.unsplash.com/photo-1556909114-2e6c4fb81ef3?w=300&h=200&fit=crop']
    }
  ]
}

export default function ContractorProfilePage({ params }: { params: { id: string } }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showAllReviews, setShowAllReviews] = useState(false)
  
  // In a real app, you'd fetch the contractor data based on params.id
  const contractor = MOCK_CONTRACTOR
  
  if (!contractor) {
    notFound()
  }

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === contractor.portfolioImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? contractor.portfolioImages.length - 1 : prev - 1
    )
  }

  const displayedReviews = showAllReviews ? contractor.reviews : contractor.reviews.slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={contractor.profileImage}
                alt={contractor.name}
                className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{contractor.businessName}</h1>
                    {contractor.verified && (
                      <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        <Shield size={16} />
                        <span className="text-sm font-medium">Verified</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xl text-gray-600 mb-2">{contractor.name}</p>
                  <div className="flex items-center justify-center md:justify-start space-x-4 text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{contractor.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{contractor.yearsExperience} years experience</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-center md:items-end space-y-2">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={20} />
                    <span className="text-2xl font-bold">{contractor.rating}</span>
                    <span className="text-gray-500">({contractor.reviewCount} reviews)</span>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">{contractor.priceRange}</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                {contractor.specialties.map(specialty => (
                  <span
                    key={specialty}
                    className="bg-primary-100 text-primary-800 font-medium px-3 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="btn-primary flex items-center space-x-2">
                  <span>Get Free Quote</span>
                </button>
                <a 
                  href={`tel:${contractor.phone}`}
                  className="btn-outline flex items-center space-x-2"
                >
                  <Phone size={18} />
                  <span>{contractor.phone}</span>
                </a>
                {contractor.website && (
                  <a 
                    href={`https://${contractor.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center space-x-2"
                  >
                    <Globe size={18} />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Portfolio Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <ImageIcon size={24} />
                  <span>Portfolio</span>
                </h2>
                
                <div className="relative">
                  <img
                    src={contractor.portfolioImages[selectedImageIndex]}
                    alt="Portfolio"
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {contractor.portfolioImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === selectedImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-6 gap-2 mt-4">
                  {contractor.portfolioImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square rounded overflow-hidden border-2 transition-colors ${
                        index === selectedImageIndex ? 'border-primary-500' : 'border-transparent'
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

            {/* About */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
              <div className="prose prose-gray max-w-none">
                {contractor.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contractor.services.map(service => (
                  <div key={service} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center space-x-2">
                  <Star className="text-yellow-400 fill-current" size={24} />
                  <span>Reviews ({contractor.reviewCount})</span>
                </h2>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">{contractor.rating}</div>
                  <div className="text-sm text-gray-500">out of 5</div>
                </div>
              </div>
              
              <div className="space-y-6">
                {displayedReviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-semibold text-gray-900">{review.customerName}</div>
                        <div className="text-sm text-gray-500">{review.projectType}</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.comment}</p>
                    {review.images && (
                      <div className="flex space-x-2">
                        {review.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt="Review"
                            className="w-20 h-20 rounded object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {contractor.reviews.length > 3 && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="btn-outline"
                  >
                    {showAllReviews ? 'Show Less' : `Show All ${contractor.reviewCount} Reviews`}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Get a Quote</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Type
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option>Kitchen Remodel</option>
                    <option>Bathroom Remodel</option>
                    <option>Countertop Installation</option>
                    <option>Commercial Project</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button type="submit" className="w-full btn-primary">
                  Request Quote
                </button>
              </form>
            </div>

            {/* Business Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Certifications</h4>
                  <div className="space-y-1">
                    {contractor.certifications.map(cert => (
                      <div key={cert} className="flex items-center space-x-2 text-sm">
                        <Award size={16} className="text-primary-500" />
                        <span className="text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Insurance</h4>
                  <p className="text-sm text-gray-700">{contractor.insuranceInfo}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Business Hours</h4>
                  <div className="space-y-1">
                    {Object.entries(contractor.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">{day}</span>
                        <span className="text-gray-700">{hours}</span>
                      </div>
                    ))}
                  </div>
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
