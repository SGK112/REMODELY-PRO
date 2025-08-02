'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, MapPin } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('Austin, TX')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/contractors?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`)
    }
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-stone-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 sm:h-18">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-2 sm:space-x-3 py-2">
              {/* Premium Professional Logo Icon */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                {/* Simple Colorful Globe */}
                <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                  <div className="text-white text-lg font-bold">🌍</div>
                </div>
              </div>
              {/* Enhanced Logo Text */}
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold text-gradient leading-tight">
                  NewCountertops
                </span>
                <span className="text-xs font-semibold -mt-1.5 tracking-wider" style={{ color: 'var(--stone-accent-copper)' }}>
                  .com
                </span>
              </div>
            </Link>
          </div>

          {/* Mobile-First Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-2xl mx-6 xl:mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="flex bg-gradient-to-r from-stone-50 to-neutral-50 backdrop-blur-sm rounded-xl overflow-hidden border border-stone-200/70 hover:border-stone-300/80 transition-all duration-300 shadow-sm hover:shadow-md">
                <div className="flex items-center px-3 sm:px-4 bg-white/60 border-r border-stone-200/50">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-stone-500" />
                </div>
                <input
                  type="text"
                  placeholder="Find certified stone contractors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent focus:outline-none focus:bg-white/80 transition-all placeholder-stone-500 text-stone-700 text-sm sm:text-base"
                />
                <div className="flex items-center px-3 sm:px-4 border-l border-stone-200/50 bg-white/40">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-stone-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-24 sm:w-28 bg-transparent focus:outline-none text-xs sm:text-sm placeholder-stone-500 text-stone-700"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold transition-all duration-300 rounded-none"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Navigation Links */}
            <Link
              href="/contractors"
              className="group relative text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
            >
              <span className="flex items-center">
                <Search className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                Find Contractors
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link
              href="/matches"
              className="group relative text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
            >
              <span className="flex items-center">
                ❤️ Smart Matching
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link
              href="/quote"
              className="group relative text-gray-700 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
            >
              <span className="flex items-center">
                💬 Get Quotes
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></div>
            </Link>

            {/* Separator */}
            <div className="mx-4 h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>

            {/* Secondary Link */}
            <Link
              href="/signup/contractor"
              className="text-gray-600 hover:text-blue-600 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:bg-blue-50/50 relative group"
            >
              <span className="flex items-center">
                🏗️ For Contractors
              </span>
            </Link>

            {/* Primary Action Buttons */}
            <div className="flex items-center space-x-3 ml-2">
              <Link
                href="/signup"
                className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Sign Up Free
                </span>
              </Link>

              <Link
                href="/quote"
                className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 hover:from-orange-600 hover:via-red-500 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center">
                  ⚡ Get Quote Now
                </span>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-700 hover:text-stone-900 focus:outline-none focus:text-stone-900 p-2 rounded-lg hover:bg-stone-50 transition-all duration-300 active:scale-95"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/96 backdrop-blur-md border-t border-stone-200/60 shadow-xl">
          <div className="px-4 pt-4 sm:pt-6 pb-6 space-y-4 sm:space-y-5">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="space-y-3">
              <div className="flex bg-gradient-to-r from-stone-50 to-neutral-50 backdrop-blur-sm rounded-xl overflow-hidden border border-stone-200/70 shadow-sm">
                <div className="flex items-center px-4 bg-white/60">
                  <Search className="w-4 h-4 text-stone-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search contractors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-3 py-3 bg-transparent focus:outline-none focus:bg-white/80 text-base placeholder-stone-500 text-stone-700"
                  style={{ fontSize: '16px' }} // Prevents iOS zoom
                />
              </div>
              <div className="flex bg-gradient-to-r from-stone-50 to-neutral-50 backdrop-blur-sm rounded-xl overflow-hidden border border-stone-200/70 shadow-sm">
                <div className="flex items-center px-4 bg-white/60">
                  <MapPin className="w-4 h-4 text-stone-500" />
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 px-3 py-3 bg-transparent focus:outline-none focus:bg-white/80 text-base placeholder-stone-500 text-stone-700"
                  style={{ fontSize: '16px' }} // Prevents iOS zoom
                />
                <button
                  type="submit"
                  className="btn-primary px-6 py-3 text-base font-semibold transition-all duration-300 rounded-none"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="border-t border-stone-200/40 pt-6 space-y-3">
              <Link
                href="/contractors"
                className="group relative flex items-center px-4 sm:px-6 py-3 sm:py-4 rounded-2xl text-base font-semibold text-stone-700 hover:text-stone-900 hover:bg-gradient-to-r hover:from-stone-50 hover:to-neutral-50 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-stone-200 mr-4 transition-colors duration-300">
                  <Search className="w-5 h-5 text-stone-600" />
                </div>
                <span className="flex-1">Find Contractors</span>
                <div className="absolute bottom-0 left-4 sm:left-6 right-4 sm:right-6 h-0.5 bg-gradient-to-r from-stone-400 to-neutral-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>

              <Link
                href="/matches"
                className="group relative flex items-center px-4 sm:px-6 py-3 sm:py-4 rounded-2xl text-base font-semibold text-stone-700 hover:text-pink-800 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-100 group-hover:bg-pink-200 mr-4 transition-colors duration-300">
                  <span className="text-xl">❤️</span>
                </div>
                <span className="flex-1">Smart Matching</span>
                <div className="absolute bottom-0 left-4 sm:left-6 right-4 sm:right-6 h-0.5 bg-gradient-to-r from-pink-400 to-rose-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>

              <Link
                href="/quote"
                className="group relative flex items-center px-4 sm:px-6 py-3 sm:py-4 rounded-2xl text-base font-semibold text-stone-700 hover:text-emerald-800 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-green-50 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-100 group-hover:bg-emerald-200 mr-4 transition-colors duration-300">
                  <span className="text-xl">💬</span>
                </div>
                <span className="flex-1">Get Quotes</span>
                <div className="absolute bottom-0 left-4 sm:left-6 right-4 sm:right-6 h-0.5 bg-gradient-to-r from-emerald-400 to-green-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>

              <Link
                href="/signup/contractor"
                className="group relative flex items-center px-4 sm:px-6 py-3 sm:py-4 rounded-2xl text-base font-semibold text-stone-700 hover:text-amber-800 hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] hover:shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-100 group-hover:bg-amber-200 mr-4 transition-colors duration-300">
                  <span className="text-xl">🏗️</span>
                </div>
                <span className="flex-1">For Contractors</span>
                <div className="absolute bottom-0 left-4 sm:left-6 right-4 sm:right-6 h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>

              <div className="grid grid-cols-1 gap-4 pt-6 border-t border-stone-200/40">
                <Link
                  href="/signup"
                  className="btn-primary block px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base font-bold text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up Free
                </Link>
                <Link
                  href="/quote"
                  className="btn-accent block px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base font-bold text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => setIsOpen(false)}
                >
                  Get Quote Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
