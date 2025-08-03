'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, MapPin, Heart, Users, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [location, setLocation] = useState('')
    const router = useRouter()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/contractors?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(location)}`)
        }
    }

    return (
        <nav className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border-b border-slate-600/30 sticky top-0 z-50 backdrop-blur-sm shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                                {/* Professional "R" monogram */}
                                <div className="text-white font-bold text-lg tracking-tight">
                                    <span className="text-white">R</span>
                                    <span className="text-blue-200">A</span>
                                </div>
                            </div>
                            <span className="font-bold text-xl text-white hidden sm:block tracking-tight">
                                REMODELY<span className="text-blue-400"> AI</span>
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
                                    placeholder="Search professional contractors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-2.5 border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-700 transition-colors"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/contractors"
                            className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-slate-600"
                        >
                            Find Contractors
                        </Link>
                        <Link
                            href="/marketplace"
                            className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-slate-600"
                        >
                            Marketplace
                        </Link>

                        {/* Solutions Dropdown - would need state management for full dropdown */}
                        <div className="relative group">
                            <button className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-slate-600 flex items-center">
                                Solutions
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>

                        <Link
                            href="/quote"
                            className="text-slate-300 hover:text-blue-400 hover:bg-slate-700 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-slate-600"
                        >
                            Get Quote
                        </Link>

                        {/* Divider */}
                        <div className="h-8 w-px bg-slate-600 mx-3"></div>

                        {/* CTA Buttons */}
                        <Link
                            href="/auth/signup"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-blue-900/25"
                        >
                            Join PRO
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2.5 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-transparent hover:border-slate-600 transition-all"
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
                <div className="md:hidden border-t border-slate-600 bg-slate-800 backdrop-blur-sm">
                    <div className="px-4 pt-4 pb-4 space-y-2">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search professional contractors..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full pl-10 pr-4 py-3.5 border border-slate-600 rounded-lg bg-slate-700/50 placeholder-slate-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-slate-700 transition-colors"
                                />
                            </div>
                        </form>

                        {/* Mobile Navigation Links */}
                        <Link
                            href="/contractors"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-700 rounded-lg border border-transparent hover:border-slate-600 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <Users className="w-5 h-5 mr-3 text-blue-400" />
                            Browse Professionals
                        </Link>

                        <Link
                            href="/marketplace"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-700 rounded-lg border border-transparent hover:border-slate-600 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <Users className="w-5 h-5 mr-3 text-blue-400" />
                            Marketplace
                        </Link>

                        <Link
                            href="/saved-contractors"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-700 rounded-lg border border-transparent hover:border-slate-600 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <Users className="w-5 h-5 mr-3 text-blue-400" />
                            Saved Professionals
                        </Link>

                        <Link
                            href="/quote"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-700 rounded-lg border border-transparent hover:border-slate-600 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <MessageCircle className="w-5 h-5 mr-3 text-blue-400" />
                            Get Professional Quote
                        </Link>

                        {/* Mobile CTAs */}
                        <div className="pt-4 border-t border-slate-600 space-y-3">
                            <Link
                                href="/auth/signup"
                                className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-center py-3.5 px-4 rounded-lg font-semibold shadow-lg hover:shadow-blue-900/25 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                Join REMODELY AI PRO
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="block w-full bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white text-center py-3.5 px-4 rounded-lg font-medium border border-slate-600 hover:border-slate-500 transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                Join as Professional
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}
