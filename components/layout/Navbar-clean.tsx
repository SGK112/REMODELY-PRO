'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, MapPin, Heart, Users, MessageCircle } from 'lucide-react'
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
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                                {/* Clean "RE" monogram */}
                                <div className="text-white font-bold text-lg tracking-tight">
                                    <span className="text-white">R</span>
                                    <span className="text-blue-200">E</span>
                                </div>
                            </div>
                            <span className="font-bold text-xl text-slate-900 hidden sm:block tracking-tight">
                                REMODELY<span className="text-blue-600">.AI</span>
                            </span>
                        </Link>
                    </div>                    {/* Desktop Search Bar - Centered */}
                    <div className="hidden lg:flex items-center flex-1 max-w-lg mx-8">
                        <form onSubmit={handleSearch} className="w-full">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search contractors, services..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg bg-slate-50 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/contractors"
                            className="text-slate-700 hover:text-blue-600 hover:bg-slate-50 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-slate-200"
                        >
                            Browse
                        </Link>
                        <Link
                            href="/saved-contractors"
                            className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-blue-200 flex items-center"
                        >
                            <Users className="w-4 h-4 mr-1.5" />
                            Saved
                        </Link>
                        <Link
                            href="/quote"
                            className="text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-emerald-200"
                        >
                            Quote
                        </Link>

                        {/* Divider */}
                        <div className="h-8 w-px bg-slate-200 mx-3"></div>

                        {/* CTA Buttons */}
                        <Link
                            href="/signup"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border border-blue-600 hover:border-blue-700 shadow-sm hover:shadow-md"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent hover:border-slate-200 transition-all"
                        >
                            {isOpen ? (
                                <X className="block h-5 w-5" />
                            ) : (
                                <Menu className="block h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-sm">
                    <div className="px-4 pt-4 pb-4 space-y-2">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search contractors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-3.5 border border-slate-300 rounded-lg bg-slate-50 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-colors"
                                />
                            </div>
                        </form>

                        {/* Mobile Navigation Links */}
                        <Link
                            href="/contractors"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <Users className="w-5 h-5 mr-3 text-slate-400" />
                            Browse Contractors
                        </Link>

                        <Link
                            href="/saved-contractors"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg border border-transparent hover:border-blue-200 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <Users className="w-5 h-5 mr-3 text-slate-400" />
                            Saved Contractors
                        </Link>

                        <Link
                            href="/quote"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg border border-transparent hover:border-emerald-200 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <MessageCircle className="w-5 h-5 mr-3 text-slate-400" />
                            Get Quotes
                        </Link>

                        {/* Mobile CTAs */}
                        <div className="pt-4 border-t border-slate-200 space-y-3">
                            <Link
                                href="/signup"
                                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3.5 px-4 rounded-lg font-semibold border border-blue-600 hover:border-blue-700 shadow-sm hover:shadow-md transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign Up Free
                            </Link>
                            <Link
                                href="/signup/contractor"
                                className="block w-full bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-center py-3.5 px-4 rounded-lg font-medium border border-slate-300 hover:border-slate-400 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                Join as Contractor
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
