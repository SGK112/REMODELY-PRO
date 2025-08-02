'use client'

import { Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  title: string
  contractor: string
  location: string
  image: string
  beforeImage: string
  rating: number
  completedDate: string
  description: string
}

const RECENT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Modern Kitchen Renovation',
    contractor: 'Rodriguez Granite Works',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1556909045-f3bda3dd4b3f?w=200&h=150&fit=crop',
    rating: 5.0,
    completedDate: '2024-01-15',
    description: 'Complete kitchen makeover with premium granite countertops and custom cabinets'
  },
  {
    id: '2',
    title: 'Luxury Master Bath',
    contractor: 'Elite Kitchen & Bath',
    location: 'Round Rock, TX',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=400&h=300&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=200&h=150&fit=crop',
    rating: 4.9,
    completedDate: '2024-01-10',
    description: 'Stunning bathroom transformation with marble countertops and modern fixtures'
  },
  {
    id: '3',
    title: 'Contemporary Kitchen Island',
    contractor: 'Chen\'s Stoneworks',
    location: 'Cedar Park, TX',
    image: 'https://images.unsplash.com/photo-1556909114-4f678e4ced90?w=400&h=300&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1556909114-4f678e4ced90?w=200&h=150&fit=crop',
    rating: 4.8,
    completedDate: '2024-01-08',
    description: 'Custom quartz island installation with waterfall edge design'
  }
]

export function RecentProjectsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Recent Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the amazing transformations our verified contractors have completed for homeowners just like you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {RECENT_PROJECTS.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Before/After Images */}
              <div className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <div className="bg-white rounded-lg p-2 shadow-md">
                    <img
                      src={project.beforeImage}
                      alt="Before"
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="text-xs text-center mt-1 font-medium text-gray-600">Before</div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  ✓ Completed
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(project.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {project.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(project.completedDate).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900 text-sm">
                      {project.contractor}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {project.location}
                    </div>
                  </div>
                  <Link 
                    href={`/contractors/1`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                  >
                    View Contractor
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contractors"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            View All Contractors
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
