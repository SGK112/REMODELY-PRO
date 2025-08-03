'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/SafeImage'
import { Menu, X, User, LogOut } from 'lucide-react'

export function Navigation() {
    const { data: session, status } = useSession()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Hide navigation on auth pages
    if (pathname?.startsWith('/auth/')) {
        return null
    }

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-1">
                        <img 
                            src="/logo-remodely.svg" 
                            alt="Remodely AI Pro" 
                            className="h-10 w-auto"
                            onError={(e) => {
                                console.log('Logo failed to load, using fallback')
                                e.currentTarget.style.display = 'none'
                                if (e.currentTarget.nextElementSibling) {
                                    (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex'
                                }
                            }}
                        />
                        <div className="hidden items-center space-x-1">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">RA</span>
                            </div>
                            <span className="font-semibold text-gray-900">Remodely AI</span>
                        </div>
                    </Link>                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/contractors"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Find Contractors
                        </Link>
                        <Link
                            href="/quote/request"
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Get Quotes
                        </Link>

                        {status === 'loading' ? (
                            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
                        ) : session ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/dashboard"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                                        <User className="h-4 w-4" />
                                        <span>{session.user?.name}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                        <Link
                                            href="/dashboard/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <LogOut className="inline h-4 w-4 mr-2" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/auth/login"
                                    className="text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link href="/auth/signup">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-gray-700 hover:text-blue-600"
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/contractors"
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Find Contractors
                            </Link>
                            <Link
                                href="/quote/request"
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Get Quotes
                            </Link>

                            {session ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="text-gray-700 hover:text-blue-600 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut({ callbackUrl: '/' })
                                            setIsMobileMenuOpen(false)
                                        }}
                                        className="text-left text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="text-gray-700 hover:text-blue-600 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
