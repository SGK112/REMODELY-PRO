'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X, User, LogOut, Settings, ChevronDown, Home, Wrench, ShoppingBag, CreditCard, Palette, Brain, Mic, MessageSquare, Phone, Search, Zap, Users, Star, Play } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
    // Navigation state
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const { data: session, status } = useSession()

    // Refs for outside click detection
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const userDropdownRef = useRef<HTMLDivElement>(null)

    const isAuthenticated = status === 'authenticated'
    const userType = session?.user?.userType

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // Handle navigation link clicks
    const handleLinkClick = () => {
        console.log('Navigation link clicked - closing dropdowns')
        setIsMenuOpen(false)
        setIsDropdownOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
            <div className="container max-w-7xl mx-auto flex h-14 sm:h-16 items-center px-3 sm:px-6 lg:px-8">
                {/* Mobile-Optimized Logo */}
                <div className="mr-4 sm:mr-8 flex">
                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
                        {/* REMODELY Logo */}
                        <div className="relative">
                            <div className="h-10 sm:h-14 w-auto flex items-center justify-center">
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                    {/* AI Brain Icon - Mobile Optimized */}
                                    <div className="relative">
                                        {/* Glow effect background */}
                                        <div className="absolute inset-0 w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg sm:rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        {/* Main icon */}
                                        <div className="relative w-8 sm:w-12 h-8 sm:h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                                            <Brain className="h-5 sm:h-7 w-5 sm:w-7 text-white group-hover:animate-pulse" />
                                        </div>
                                    </div>

                                    {/* Text with enhanced styling - Mobile Responsive */}
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline space-x-1">
                                            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300">REMODELY</span>
                                            <span className="text-sm sm:text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent group-hover:from-cyan-600 group-hover:to-blue-600 transition-all duration-300">.ai</span>
                                        </div>
                                        <span className="text-xs text-gray-500 -mt-1 group-hover:text-gray-600 transition-colors duration-300 hidden sm:block">AI Brains for your House</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation - Simplified for mobile focus */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="hidden lg:flex items-center space-x-1">
                        <Link
                            href="/"
                            className="flex items-center space-x-1 px-2 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        >
                            <Home className="h-4 w-4" />
                            <span className="hidden xl:inline">Home</span>
                        </Link>

                        <Link
                            href="/apps"
                            className="flex items-center space-x-1 px-2 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        >
                            <Brain className="h-4 w-4" />
                            <span className="hidden xl:inline">AI Apps</span>
                        </Link>

                        <Link
                            href="/consultation"
                            className="flex items-center space-x-1 px-2 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        >
                            <Phone className="h-4 w-4" />
                            <span className="hidden xl:inline">Talk to AI</span>
                        </Link>
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center space-x-3">
                        {/* Authentication */}
                        {isAuthenticated ? (
                            <div className="relative" ref={userDropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 rounded-lg p-2 text-sm hover:bg-blue-50 transition-all duration-200"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                                        {session?.user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="hidden md:inline-block font-medium text-gray-700">
                                        {session?.user?.name || 'User'}
                                    </span>
                                    <ChevronDown className="h-3 w-3 text-gray-500" />
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg py-2 z-50">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                                            <p className="text-xs text-gray-500">{session?.user?.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            onClick={handleLinkClick}
                                        >
                                            <User className="h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <Link
                                            href="/dashboard/settings"
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            onClick={handleLinkClick}
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                        <div className="my-1 h-px bg-gray-200" />
                                        <button
                                            onClick={() => {
                                                handleLinkClick()
                                                signOut()
                                            }}
                                            className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Sign out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    href="/auth/signin"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            className="inline-flex items-center justify-center rounded-lg p-2 lg:hidden hover:bg-blue-50 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="h-6 w-6 text-gray-700" />
                            ) : (
                                <Menu className="h-6 w-6 text-gray-700" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation - Optimized */}
            {isMenuOpen && (
                <div className="border-t bg-white lg:hidden" ref={mobileMenuRef}>
                    <nav className="container space-y-1 p-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-3 rounded-lg px-4 py-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
                            onClick={handleLinkClick}
                        >
                            <Home className="h-6 w-6" />
                            <span>Home</span>
                        </Link>

                        <Link
                            href="/apps"
                            className="flex items-center space-x-3 rounded-lg px-4 py-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
                            onClick={handleLinkClick}
                        >
                            <Brain className="h-6 w-6" />
                            <span>AI Apps</span>
                        </Link>

                        <Link
                            href="/consultation"
                            className="flex items-center space-x-3 rounded-lg px-4 py-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
                            onClick={handleLinkClick}
                        >
                            <Phone className="h-6 w-6" />
                            <span>Talk to Sarah AI</span>
                        </Link>

                        <Link
                            href="/demo"
                            className="flex items-center space-x-3 rounded-lg px-4 py-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
                            onClick={handleLinkClick}
                        >
                            <Play className="h-6 w-6" />
                            <span>Watch Demo</span>
                        </Link>

                        {!isAuthenticated && (
                            <div className="space-y-3 pt-6 border-t">
                                <Link
                                    href="/auth/signin"
                                    className="block text-center rounded-lg px-4 py-4 text-lg font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 border-2 border-gray-200"
                                    onClick={handleLinkClick}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-4 rounded-lg text-lg font-medium mx-3 shadow-md active:scale-95 transition-transform"
                                    onClick={handleLinkClick}
                                >
                                    Get Started Free
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}