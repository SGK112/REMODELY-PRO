'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/SafeImage'
import { Menu, X, User, LogOut } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

export function Navigation() {
    const { data: session, status } = useSession()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Hide navigation on auth pages
    if (pathname?.startsWith('/auth/')) {
        return null
    }

    return (
        <nav className="bg-background shadow-sm border-b border-border">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">R</span>
                        </div>
                        <span className="font-bold text-xl text-foreground">Remodely<span className="text-primary">.AI</span></span>
                    </Link>                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/contractors"
                            className="text-foreground/80 hover:text-primary transition-colors"
                        >
                            Find Contractors
                        </Link>
                        <Link
                            href="/quote/request"
                            className="text-foreground/80 hover:text-primary transition-colors"
                        >
                            Get Quotes
                        </Link>

                        {status === 'loading' ? (
                            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
                        ) : session ? (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href="/dashboard"
                                    className="text-foreground/80 hover:text-primary transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-foreground/80 hover:text-primary">
                                        <User className="h-4 w-4" />
                                        <span>{session.user?.name}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 bg-background rounded-md shadow-lg border border-border py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                        <Link
                                            href="/dashboard/profile"
                                            className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="block w-full text-left px-4 py-2 text-sm text-foreground/80 hover:bg-muted"
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
                                    className="text-foreground/80 hover:text-primary transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link href="/auth/signup">
                                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Theme Toggle */}
                        <ThemeToggle />
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-foreground/80 hover:text-primary"
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-border">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/contractors"
                                className="text-foreground/80 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Find Contractors
                            </Link>
                            <Link
                                href="/quote/request"
                                className="text-foreground/80 hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Get Quotes
                            </Link>

                            {session ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="text-foreground/80 hover:text-primary transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                    <button
                                        onClick={() => {
                                            signOut({ callbackUrl: '/' })
                                            setIsMobileMenuOpen(false)
                                        }}
                                        className="text-left text-foreground/80 hover:text-primary transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/login"
                                        className="text-foreground/80 hover:text-primary transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Button className="w-full">
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
