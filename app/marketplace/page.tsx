'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { ShoppingBag, Plus, Package, TrendingUp, Users, DollarSign } from 'lucide-react'
import Link from 'next/link'

interface Product {
    id: string
    title: string
    description: string
    vendor: string
    product_type: string
    images: { src: string; alt: string }[]
    variants: { price: string; inventory_quantity: number }[]
    created_at: string
}

interface MarketplaceStats {
    totalProducts: number
    totalOrders: number
    totalRevenue: string
    activeContractors: number
}

export default function MarketplacePage() {
    const { data: session } = useSession()
    const [products, setProducts] = useState<Product[]>([])
    const [stats, setStats] = useState<MarketplaceStats | null>(null)
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState<string>('all')

    const categories = [
        { id: 'all', name: 'All Products', icon: Package },
        { id: 'tools', name: 'Tools & Equipment', icon: Package },
        { id: 'materials', name: 'Materials', icon: Package },
        { id: 'services', name: 'Professional Services', icon: Users },
    ]

    useEffect(() => {
        fetchProducts()
        if (session?.user.userType === 'ADMIN') {
            fetchStats()
        }
    }, [selectedCategory, session])

    const fetchProducts = async () => {
        try {
            const params = new URLSearchParams()
            if (selectedCategory !== 'all') {
                params.append('category', selectedCategory)
            }
            params.append('limit', '50')

            const response = await fetch(`/api/marketplace/products?${params}`)
            if (response.ok) {
                const data = await response.json()
                setProducts(data.products)
            }
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchStats = async () => {
        try {
            const response = await fetch('/api/marketplace/stats')
            if (response.ok) {
                const data = await response.json()
                setStats(data)
            }
        } catch (error) {
            console.error('Error fetching stats:', error)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-slate-300 mt-4">Loading marketplace...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-900">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            REMODELY AI Marketplace
                        </h1>
                        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                            Professional construction tools, materials, and services from verified contractors
                        </p>

                        {session?.user.userType === 'CONTRACTOR' && (
                            <Link
                                href="/marketplace/sell"
                                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Sell Your Products
                            </Link>
                        )}
                    </div>

                    {/* Stats for Admins */}
                    {stats && session?.user.userType === 'ADMIN' && (
                        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-slate-800 rounded-lg p-6 text-center">
                                <Package className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">{stats.totalProducts}</div>
                                <div className="text-slate-400">Total Products</div>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-6 text-center">
                                <ShoppingBag className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">{stats.totalOrders}</div>
                                <div className="text-slate-400">Total Orders</div>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-6 text-center">
                                <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">${stats.totalRevenue}</div>
                                <div className="text-slate-400">Total Revenue</div>
                            </div>
                            <div className="bg-slate-800 rounded-lg p-6 text-center">
                                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                <div className="text-2xl font-bold text-white">{stats.activeContractors}</div>
                                <div className="text-slate-400">Active Sellers</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-4">
                        {categories.map((category) => {
                            const Icon = category.icon
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 mr-2" />
                                    {category.name}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-400 mb-2">No products found</h3>
                        <p className="text-slate-500">
                            {selectedCategory === 'all'
                                ? 'Be the first to list a product in the marketplace!'
                                : `No products found in the ${categories.find(c => c.id === selectedCategory)?.name} category.`
                            }
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="aspect-w-16 aspect-h-9 bg-slate-700">
                                    {product.images.length > 0 ? (
                                        <img
                                            src={product.images[0].src}
                                            alt={product.images[0].alt || product.title}
                                            className="w-full h-48 object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-48 bg-slate-700 flex items-center justify-center">
                                            <Package className="w-12 h-12 text-slate-500" />
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-blue-400 font-medium uppercase tracking-wide">
                                            {product.product_type}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {product.vendor}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                                        {product.title}
                                    </h3>

                                    <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-bold text-blue-400">
                                            ${product.variants[0]?.price || '0.00'}
                                        </span>
                                        <span className="text-sm text-slate-500">
                                            {product.variants[0]?.inventory_quantity || 0} in stock
                                        </span>
                                    </div>

                                    <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
