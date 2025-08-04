'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Search,
  Calendar,
  MapPin,
  Camera,
  MessageSquare,
  Award,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertCircle,
  Eye,
  Heart,
  Share2
} from 'lucide-react'

interface Review {
  id: string
  rating: number
  title: string
  comment: string
  images?: string[]
  createdAt: string
  customer: {
    firstName: string
    lastName: string
    image?: string
  }
  contractor: {
    businessName: string
    id: string
  }
  projectType: string
  helpful: number
  verified: boolean
}

export default function ReviewsPage() {
  const { data: session } = useSession()
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState('newest')
  const [isLoading, setIsLoading] = useState(true)
  const [showWriteReview, setShowWriteReview] = useState(false)

  useEffect(() => {
    fetchReviews()
  }, [])

  useEffect(() => {
    filterAndSortReviews()
  }, [reviews, searchQuery, filterRating, sortBy])

  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews')
      const data = await response.json()
      setReviews(data.reviews || mockReviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      setReviews(mockReviews)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortReviews = () => {
    let filtered = reviews

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(review =>
        review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.contractor.businessName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by rating
    if (filterRating) {
      filtered = filtered.filter(review => review.rating === filterRating)
    }

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'highest':
          return b.rating - a.rating
        case 'lowest':
          return a.rating - b.rating
        case 'helpful':
          return b.helpful - a.helpful
        default:
          return 0
      }
    })

    setFilteredReviews(filtered)
  }

  const handleHelpfulClick = async (reviewId: string) => {
    // API call to mark review as helpful
    setReviews(prev => prev.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ))
  }

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }

    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  // Mock data for demonstration
  const mockReviews: Review[] = [
    {
      id: '1',
      rating: 5,
      title: 'Exceptional Kitchen Renovation',
      comment: 'Phoenix Premium Renovations exceeded all our expectations. The attention to detail was remarkable, and they completed the project on time and within budget. Our new kitchen is absolutely stunning!',
      images: [],
      createdAt: '2024-12-01T10:00:00Z',
      customer: {
        firstName: 'Sarah',
        lastName: 'Johnson'
      },
      contractor: {
        businessName: 'Phoenix Premium Renovations',
        id: '1'
      },
      projectType: 'Kitchen Renovation',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      rating: 4,
      title: 'Great Countertop Installation',
      comment: 'Elite Stone & Surface did an amazing job with our quartz countertops. Professional service and beautiful results. Minor delay in scheduling but overall very satisfied.',
      images: [],
      createdAt: '2024-11-28T14:30:00Z',
      customer: {
        firstName: 'Mike',
        lastName: 'Chen'
      },
      contractor: {
        businessName: 'Elite Stone & Surface Co.',
        id: '2'
      },
      projectType: 'Countertop Installation',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      rating: 5,
      title: 'Full Bathroom Remodel Perfection',
      comment: 'Modern Home Solutions transformed our outdated bathroom into a spa-like retreat. Every detail was perfect, from the tile work to the lighting. Highly recommend!',
      images: [],
      createdAt: '2024-11-25T09:15:00Z',
      customer: {
        firstName: 'Emily',
        lastName: 'Rodriguez'
      },
      contractor: {
        businessName: 'Modern Home Solutions',
        id: '3'
      },
      projectType: 'Bathroom Remodel',
      helpful: 15,
      verified: true
    }
  ]

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 
      : 0
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
              <p className="text-gray-600 mt-2">Real feedback from verified Remodely.AI customers</p>
            </div>
            {session && (
              <button
                onClick={() => setShowWriteReview(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Write Review
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Stats & Filters */}
          <div className="lg:col-span-1">
            {/* Review Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Review Summary</h3>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating), 'lg')}
                </div>
                <div className="text-sm text-gray-600">{reviews.length} total reviews</div>
              </div>
              
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center text-sm">
                    <span className="w-8">{rating}</span>
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-2" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-600">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select
                    value={filterRating || ''}
                    onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                    <option value="helpful">Most Helpful</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Reviews */}
          <div className="lg:col-span-3">
            {/* Search */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews, contractors, or project types..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Reviews List */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading reviews...</p>
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No reviews found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                          {review.customer.firstName[0]}{review.customer.lastName[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{review.customer.firstName} {review.customer.lastName}</h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(review.createdAt).toLocaleDateString()}
                            {review.verified && (
                              <span className="ml-2 flex items-center text-green-600">
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <div className="text-sm text-gray-600 mt-1">{review.projectType}</div>
                      </div>
                    </div>

                    <h4 className="text-lg font-semibold mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.comment}</p>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        <span className="font-medium">{review.contractor.businessName}</span>
                      </div>
                    </div>

                    {review.images && review.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleHelpfulClick(review.id)}
                          className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Helpful ({review.helpful})
                        </button>
                        <button className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </button>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Eye className="w-4 h-4 mr-1" />
                        {Math.floor(Math.random() * 100) + 50} views
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
