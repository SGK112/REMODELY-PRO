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
        <nav className="bg-gradient-to-r from-slate-50 via-white to-stone-50 border-b border-amber-200/50 sticky top-0 z-50 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center shadow-md">
                                {/* Professional "RA" monogram */}
                                <div className="text-white font-bold text-lg tracking-tight">
                                    <span className="text-white">R</span>
                                    <span className="text-amber-200">A</span>
                                </div>
                            </div>
                            <span className="font-bold text-xl text-slate-900 hidden sm:block tracking-tight">
                                REMODELY<span className="text-amber-600"> AI</span><span className="text-orange-600 text-base"> PRO</span>
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
                                    className="block w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-lg bg-stone-50/50 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-colors"
                                />
                            </div>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/contractors"
                            className="text-slate-700 hover:text-amber-700 hover:bg-amber-50 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-amber-200"
                        >
                            Browse Professionals
                        </Link>
                        <Link
                            href="/saved-contractors"
                            className="text-slate-700 hover:text-orange-700 hover:bg-orange-50 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-orange-200 flex items-center"
                        >
                            <Users className="w-4 h-4 mr-1.5" />
                            Saved
                        </Link>
                        <Link
                            href="/quote"
                            className="text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 px-4 py-2 text-sm font-medium transition-all rounded-lg border border-transparent hover:border-emerald-200"
                        >
                            Get Quote
                        </Link>

                        {/* Divider */}
                        <div className="h-8 w-px bg-stone-200 mx-3"></div>

                        {/* CTA Buttons */}
                        <Link
                            href="/signup"
                            className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow-md"
                        >
                            Join PRO
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2.5 rounded-lg text-slate-500 hover:text-amber-700 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-transparent hover:border-amber-200 transition-all"
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
                <div className="md:hidden border-t border-stone-200 bg-gradient-to-b from-white/98 to-stone-50/98 backdrop-blur-sm">
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
                                    className="block w-full pl-10 pr-4 py-3.5 border border-stone-300 rounded-lg bg-stone-50/50 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:bg-white transition-colors"
                                />
                            </div>
                        </form>

                        {/* Mobile Navigation Links */}
                        <Link
                            href="/contractors"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-700 hover:text-amber-700 hover:bg-amber-50 rounded-lg border border-transparent hover:border-amber-200 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <Users className="w-5 h-5 mr-3 text-amber-600" />
                            Browse Professionals
                        </Link>

                        <Link
                            href="/saved-contractors"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-700 hover:text-orange-700 hover:bg-orange-50 rounded-lg border border-transparent hover:border-orange-200 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <Users className="w-5 h-5 mr-3 text-orange-600" />
                            Saved Professionals
                        </Link>

                        <Link
                            href="/quote"
                            className="flex items-center px-4 py-3.5 text-base font-medium text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-transparent hover:border-emerald-200 transition-all"
                            onClick={() => setIsOpen(false)}
                        >
                            <MessageCircle className="w-5 h-5 mr-3 text-emerald-600" />
                            Get Professional Quote
                        </Link>

                        {/* Mobile CTAs */}
                        <div className="pt-4 border-t border-stone-200 space-y-3">
                            <Link
                                href="/signup"
                                className="block w-full bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white text-center py-3.5 px-4 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all"
                                onClick={() => setIsOpen(false)}
                            >
                                Join REMODELY AI PRO
                            </Link>
                            <Link
                                href="/signup/contractor"
                                className="block w-full bg-stone-50 hover:bg-stone-100 text-slate-700 hover:text-slate-900 text-center py-3.5 px-4 rounded-lg font-medium border border-stone-300 hover:border-stone-400 transition-all"
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
