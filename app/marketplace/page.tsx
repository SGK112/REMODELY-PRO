'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, Star, MapPin, ShoppingCart, Heart, ArrowRight, Crown, Building2, Home, Palette, Bath, ChefHat, Sparkles } from 'lucide-react'

export default function MarketplacePage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [priceRange, setPriceRange] = useState('all')

    const categories = [
        { id: 'all', name: 'All Products', icon: ShoppingCart },
        { id: 'countertops', name: 'Countertops', icon: ChefHat },
        { id: 'flooring', name: 'Flooring', icon: Home },
        { id: 'backsplashes', name: 'Backsplashes', icon: Palette },
        { id: 'vanities', name: 'Vanities', icon: Bath },
        { id: 'commercial', name: 'Commercial', icon: Building2 }
    ]

    const featuredProducts = [
        {
            id: 1,
            name: 'Caesarstone Calacatta Nuvo',
            price: '$89.99',
            originalPrice: '$129.99',
            rating: 4.9,
            reviews: 284,
            location: 'Phoenix, AZ',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'countertops',
            badge: 'Best Seller',
            description: 'Premium quartz surface with natural marble veining'
        },
        {
            id: 2,
            name: 'Carrara Marble Tiles',
            price: '$45.99',
            originalPrice: '$65.99',
            rating: 4.8,
            reviews: 192,
            location: 'Scottsdale, AZ',
            image: 'https://images.unsplash.com/photo-1615971677499-5467cbab01c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'flooring',
            badge: 'PRO Exclusive',
            description: 'Authentic Italian Carrara marble flooring tiles'
        },
        {
            id: 3,
            name: 'Modern Glass Backsplash',
            price: '$32.99',
            originalPrice: null,
            rating: 4.7,
            reviews: 156,
            location: 'Tempe, AZ',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'backsplashes',
            badge: 'New Arrival',
            description: 'Contemporary glass tile backsplash system'
        },
        {
            id: 4,
            name: 'Luxury Bathroom Vanity',
            price: '$1,299.99',
            originalPrice: '$1,899.99',
            rating: 4.9,
            reviews: 89,
            location: 'Mesa, AZ',
            image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'vanities',
            badge: 'Limited Time',
            description: 'Designer bathroom vanity with quartz top'
        },
        {
            id: 5,
            name: 'Commercial Porcelain Tiles',
            price: '$78.99',
            originalPrice: null,
            rating: 4.8,
            reviews: 234,
            location: 'Phoenix, AZ',
            image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'commercial',
            badge: 'Commercial Grade',
            description: 'Heavy-duty porcelain for commercial applications'
        },
        {
            id: 6,
            name: 'Granite Countertop Slabs',
            price: '$156.99',
            originalPrice: '$199.99',
            rating: 4.9,
            reviews: 167,
            location: 'Chandler, AZ',
            image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            category: 'countertops',
            badge: 'Professional',
            description: 'Natural granite slabs with professional installation'
        }
    ]

    const filteredProducts = featuredProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Hero Section */}
            <section className="relative py-16 lg:py-24 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/90 to-slate-900/95"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm border border-slate-500/30 rounded-full mb-6">
                            <ShoppingCart className="w-5 h-5 text-blue-400 mr-2" />
                            <span className="text-white font-medium">Professional Marketplace</span>
                            <Crown className="w-4 h-4 text-amber-400 ml-2" />
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            <span className="block text-white">REMODELY AI</span>
                            <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 bg-clip-text text-transparent">
                                Marketplace
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
                            Premium stone surfaces, flooring, and renovation materials from verified suppliers.
                            Professional-grade products with AI-powered matching and instant availability.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search for countertops, flooring, tiles, vanities..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 backdrop-blur-sm"
                                />
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                            <div className="text-center p-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-blue-400/20">
                                <div className="text-2xl font-bold text-blue-400">2,750+</div>
                                <div className="text-sm text-slate-300">Products Available</div>
                            </div>
                            <div className="text-center p-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-emerald-400/20">
                                <div className="text-2xl font-bold text-emerald-400">150+</div>
                                <div className="text-sm text-slate-300">Verified Suppliers</div>
                            </div>
                            <div className="text-center p-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-amber-400/20">
                                <div className="text-2xl font-bold text-amber-400">24hr</div>
                                <div className="text-sm text-slate-300">Delivery Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="py-8 bg-slate-800/50 backdrop-blur-sm border-y border-slate-600/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => {
                            const IconComponent = category.icon
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${selectedCategory === category.id
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                                            : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 hover:text-white'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4 mr-2" />
                                    {category.name}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">Featured Products</h2>
                        <p className="text-slate-300">Premium materials from verified professional suppliers</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 overflow-hidden hover:border-blue-400/40 transition-all duration-300 group">
                                <div className="relative">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.badge === 'Best Seller' ? 'bg-emerald-500 text-white' :
                                                product.badge === 'PRO Exclusive' ? 'bg-amber-500 text-white' :
                                                    product.badge === 'New Arrival' ? 'bg-blue-500 text-white' :
                                                        product.badge === 'Limited Time' ? 'bg-red-500 text-white' :
                                                            'bg-slate-600 text-white'
                                            }`}>
                                            {product.badge}
                                        </span>
                                    </div>
                                    <button className="absolute top-3 right-3 p-2 bg-slate-800/80 rounded-full hover:bg-slate-700 transition-colors">
                                        <Heart className="w-4 h-4 text-slate-300 hover:text-red-400" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center text-amber-400">
                                            <Star className="w-4 h-4 fill-current mr-1" />
                                            <span className="text-sm font-medium">{product.rating}</span>
                                            <span className="text-slate-400 text-sm ml-1">({product.reviews})</span>
                                        </div>
                                        <div className="flex items-center text-slate-400 text-sm">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {product.location}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                        {product.name}
                                    </h3>

                                    <p className="text-slate-300 text-sm mb-4">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-2xl font-bold text-white">{product.price}</span>
                                            {product.originalPrice && (
                                                <span className="text-slate-400 line-through text-sm">{product.originalPrice}</span>
                                            )}
                                        </div>
                                        <div className="text-right text-xs text-slate-400">
                                            per sq ft
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-6">
                                        <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center group">
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Add to Cart
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                                        </button>
                                        <button className="px-4 py-3 bg-slate-700/50 text-slate-300 rounded-xl hover:bg-slate-600/50 hover:text-white transition-colors">
                                            <Sparkles className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-slate-400 text-lg">No products found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('all')
                                }}
                                className="mt-4 text-blue-400 hover:text-blue-300 font-medium"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Ready to Start Your Project?
                    </h2>
                    <p className="text-slate-300 text-lg mb-8">
                        Get matched with verified contractors and access exclusive marketplace pricing
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/search"
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center"
                        >
                            Find Contractors
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Link>
                        <Link
                            href="/quote"
                            className="bg-transparent border-2 border-blue-600 text-blue-400 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
                        >
                            Get Free Quote
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}