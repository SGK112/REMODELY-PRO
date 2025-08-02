import Link from 'next/link'

export default function SitemapPage() {
  const siteStructure = {
    'Main Pages': [
      { name: 'Home', url: '/', description: 'Premium stone & surface contractor marketplace' },
      { name: 'Browse Contractors', url: '/contractors', description: 'Find certified contractors in your area' },
      { name: 'Get Free Quotes', url: '/quote', description: 'Request quotes for your countertop project' },
      { name: 'Smart Matches', url: '/matches', description: 'AI-powered contractor matching' },
      { name: 'Saved Contractors', url: '/saved-contractors', description: 'Your saved contractor profiles' },
      { name: 'About Us', url: '/about', description: 'Learn about NewCountertops.com mission' },
    ],
    'User Accounts': [
      { name: 'Sign Up', url: '/signup', description: 'Create your account' },
      { name: 'Contractor Signup', url: '/signup/contractor', description: 'Join as a contractor' },
      { name: 'Customer Dashboard', url: '/dashboard/customer', description: 'Manage your projects and quotes' },
      { name: 'Customer Profile', url: '/dashboard/customer/profile', description: 'Update your profile information' },
      { name: 'Contractor Dashboard', url: '/dashboard/contractor', description: 'Manage your business and leads' },
      { name: 'Contractor Profile', url: '/dashboard/contractor/profile', description: 'Update your business profile' },
    ],
    'Manufacturers': [
      { name: 'All Manufacturers', url: '/manufacturers', description: 'Premium surface material brands' },
      { name: 'Silestone', url: '/manufacturers/silestone', description: 'Silestone quartz surfaces by Cosentino' },
      { name: 'Caesarstone', url: '/manufacturers/caesarstone', description: 'Caesarstone engineered quartz' },
      { name: 'Cambria', url: '/manufacturers/cambria', description: 'American-made natural quartz surfaces' },
      { name: 'MSI Stone', url: '/manufacturers/msi-stone', description: 'Natural stone and quartz distributor' },
      { name: 'Quartz Master', url: '/manufacturers/quartz-master', description: 'Premium quartz surface solutions' },
      { name: 'Hanstone', url: '/manufacturers/hanstone', description: 'Korean quartz technology' },
      { name: 'Corian', url: '/manufacturers/corian', description: 'DuPont solid surface materials' },
      { name: 'Formica', url: '/manufacturers/formica', description: 'Laminate and solid surface solutions' },
    ],
    'Search & Discovery': [
      { name: 'Search Results', url: '/search', description: 'Advanced contractor search with filters' },
      { name: 'Austin Contractors', url: '/contractors?location=Austin,%20TX', description: 'Find contractors in Austin, Texas' },
      { name: 'Phoenix Contractors', url: '/contractors?location=Phoenix,%20AZ', description: 'Find contractors in Phoenix, Arizona' },
      { name: 'Dallas Contractors', url: '/contractors?location=Dallas,%20TX', description: 'Find contractors in Dallas, Texas' },
      { name: 'Houston Contractors', url: '/contractors?location=Houston,%20TX', description: 'Find contractors in Houston, Texas' },
    ],
    'Legal & Support': [
      { name: 'Privacy Policy', url: '/privacy', description: 'How we protect your personal information' },
      { name: 'Terms of Service', url: '/terms', description: 'Terms and conditions of use' },
      { name: 'Sitemap', url: '/sitemap', description: 'Complete site navigation structure' },
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Site Map</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete navigation structure for NewCountertops.com - Find contractors, manufacturers, and everything you need for your countertop project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(siteStructure).map(([category, pages]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                {category}
              </h2>
              <div className="space-y-4">
                {pages.map((page) => (
                  <div key={page.url} className="border-l-4 border-blue-500 pl-4">
                    <Link
                      href={page.url}
                      className="text-lg font-medium text-blue-600 hover:text-blue-800 transition-colors block"
                    >
                      {page.name}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">{page.description}</p>
                    <p className="text-gray-400 text-xs mt-1">{page.url}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Popular Service Areas */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
              Popular Service Areas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'Austin, TX', 'Dallas, TX', 'Houston, TX', 'San Antonio, TX',
                'Phoenix, AZ', 'Scottsdale, AZ', 'Denver, CO', 'Colorado Springs, CO',
                'Atlanta, GA', 'Miami, FL', 'Orlando, FL', 'Tampa, FL',
                'Las Vegas, NV', 'Reno, NV', 'Los Angeles, CA', 'San Diego, CA',
                'Chicago, IL', 'Nashville, TN', 'Charlotte, NC', 'Raleigh, NC',
                'Seattle, WA', 'Portland, OR', 'Salt Lake City, UT', 'Boise, ID'
              ].map((location) => (
                <Link
                  key={location}
                  href={`/contractors?location=${encodeURIComponent(location)}`}
                  className="text-blue-600 hover:text-blue-800 transition-colors py-1 text-sm"
                >
                  Contractors in {location}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-blue-100">Total Pages</div>
          </div>
          <div className="bg-green-600 text-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2">8</div>
            <div className="text-green-100">Manufacturer Profiles</div>
          </div>
          <div className="bg-purple-600 text-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-purple-100">Contractor Profiles</div>
          </div>
          <div className="bg-orange-600 text-white rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2">24</div>
            <div className="text-orange-100">Service Areas</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-lg mb-6">
              Get connected with qualified contractors in your area today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Free Quotes
              </Link>
              <Link
                href="/contractors"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Browse Contractors
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
