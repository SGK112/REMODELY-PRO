'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, User, LogOut, Settings, ChevronDown, Home, Wrench, ShoppingBag, CreditCard, Palette, Brain, Mic, MessageSquare, Phone, Search, Zap, Users, Star } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [isAiDropdownOpen, setIsAiDropdownOpen] = useState(false)
    const { data: session, status } = useSession()

    const isAuthenticated = status === 'authenticated'
    const userType = session?.user?.userType

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
            <div className="container max-w-7xl mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <div className="mr-8 flex">
                    <Link href="/" className="flex items-center space-x-3 group">
                        {/* REMODELY 2.0 Logo */}
                        <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-2 shadow-lg group-hover:shadow-xl transition-all duration-200">
                            <div className="flex h-full w-full items-center justify-center rounded-lg bg-white/90 text-sm font-bold text-blue-600">
                                R
                            </div>
                        </div>
                        <div className="hidden sm:block">
                            <div className="font-bold text-xl text-gray-900">
                                REMODELY<span className="text-blue-600">.AI</span>
                            </div>
                            <div className="text-xs text-gray-500 -mt-1">Marketplace</div>
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="hidden lg:flex items-center space-x-1">
                        <Link
                            href="/"
                            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        >
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Link>

                        <Link
                            href="/contractors"
                            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        >
                            <Search className="h-4 w-4" />
                            <span>Find Contractors</span>
                        </Link>

                        <div className="relative">
                            <button
                                onClick={() => setIsAiDropdownOpen(!isAiDropdownOpen)}
                                className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            >
                                <Brain className="h-4 w-4" />
                                <span>AI Tools</span>
                                <ChevronDown className="h-3 w-3" />
                            </button>

                            {isAiDropdownOpen && (
                                <div className="absolute top-full mt-1 w-56 rounded-xl border bg-white shadow-lg py-2 z-50">
                                    <Link href="/ai-chat" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                        <MessageSquare className="h-4 w-4" />
                                        <span>AI Assistant Chat</span>
                                    </Link>
                                    <Link href="/marketplace/dashboard" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                        <ShoppingBag className="h-4 w-4" />
                                        <span>Smart Tools</span>
                                    </Link>
                                    <Link href="/ai-transform" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                        <Palette className="h-4 w-4" />
                                        <span>AI Transform</span>
                                    </Link>
                                    <Link href="/voice-consultation" className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                        <Mic className="h-4 w-4" />
                                        <span>Voice SARAH</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/plans"
                            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        >
                            <Star className="h-4 w-4" />
                            <span>Plans</span>
                        </Link>

                        <Link
                            href="/contact"
                            className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                        >
                            <Phone className="h-4 w-4" />
                            <span>Contact</span>
                        </Link>
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center space-x-3">
                        {/* Authentication */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
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

                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg py-2 z-50">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                                            <p className="text-xs text-gray-500">{session?.user?.email}</p>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <User className="h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                        <Link
                                            href="/dashboard/settings"
                                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                        <div className="my-1 h-px bg-gray-200" />
                                        <button
                                            onClick={() => {
                                                setIsMenuOpen(false)
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

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t bg-white lg:hidden">
                    <nav className="container space-y-1 p-4">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Home className="h-5 w-5" />
                            <span>Home</span>
                        </Link>
                        <Link
                            href="/contractors"
                            className="flex items-center space-x-2 rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Search className="h-5 w-5" />
                            <span>Find Contractors</span>
                        </Link>

                        <div className="py-2">
                            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">AI Tools</p>
                            <div className="mt-2 space-y-1">
                                <Link
                                    href="/ai-chat"
                                    className="flex items-center space-x-2 rounded-lg px-6 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <MessageSquare className="h-4 w-4" />
                                    <span>AI Assistant Chat</span>
                                </Link>
                                <Link
                                    href="/marketplace/dashboard"
                                    className="flex items-center space-x-2 rounded-lg px-6 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <ShoppingBag className="h-4 w-4" />
                                    <span>Smart Tools</span>
                                </Link>
                                <Link
                                    href="/ai-transform"
                                    className="flex items-center space-x-2 rounded-lg px-6 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Palette className="h-4 w-4" />
                                    <span>AI Transform</span>
                                </Link>
                                <Link
                                    href="/voice-consultation"
                                    className="flex items-center space-x-2 rounded-lg px-6 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Mic className="h-4 w-4" />
                                    <span>Voice SARAH</span>
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/plans"
                            className="flex items-center space-x-2 rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Star className="h-5 w-5" />
                            <span>Plans</span>
                        </Link>
                        <Link
                            href="/contact"
                            className="flex items-center space-x-2 rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Phone className="h-5 w-5" />
                            <span>Contact</span>
                        </Link>

                        {!isAuthenticated && (
                            <div className="space-y-3 pt-4 border-t">
                                <Link
                                    href="/auth/signin"
                                    className="block text-center rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg text-base font-medium mx-3 shadow-md"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            )}
        </header>
    )
}