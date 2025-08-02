import Link from 'next/link'
import { Search, Users, MessageCircle, Star, ArrowRight, Sparkles, Home, Wrench } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Modern Animated Hero Section */}
            <div className="hero-gradient min-h-screen flex items-center relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-30 animate-float delay-200"></div>
                    <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-25 animate-float delay-500"></div>
                </div>

                <div className="max-w-7xl mx-auto container-padding relative z-10">
                    <div className="text-center">
                        {/* Animated headline with modern typography */}
                        <div className="animate-fade-in-up mb-6">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-[0.9] tracking-tight">
                                <span className="block text-gradient-animated">REMODELY</span>
                                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-700 mt-2">
                                    AI Home Platform
                                </span>
                            </h1>
                        </div>

                        {/* Enhanced description with animations */}
                        <div className="animate-fade-in-up delay-200 mb-8">
                            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
                                Revolutionary AI matching connects homeowners with expert contractors
                                <span className="block mt-3 text-lg sm:text-xl lg:text-2xl text-blue-600 font-semibold">
                                    <Sparkles className="inline w-6 h-6 mr-2" />
                                    Smart. Fast. Reliable.
                                </span>
                            </p>
                        </div>

                        {/* Enhanced CTA buttons with animations */}
                        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link
                                href="/quote"
                                className="btn-primary text-lg px-8 py-4 flex items-center justify-center group"
                            >
                                <MessageCircle className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                                Get Free Quotes
                            </Link>
                            <Link
                                href="/contractors"
                                className="btn-secondary text-lg px-8 py-4 flex items-center justify-center group"
                            >
                                <Search className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                                <span>Browse Contractors</span>
                            </Link>
                        </div>

                        {/* Animated Stats Section */}
                        <div className="animate-fade-in-up delay-400 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            <div className="card-enhanced text-center group">
                                <div className="text-4xl sm:text-5xl font-black text-gradient-animated mb-2 group-hover:scale-110 transition-transform">783+</div>
                                <div className="font-bold text-gray-800 mb-1">Expert Contractors</div>
                                <div className="text-sm text-gray-600">AI-verified professionals</div>
                            </div>
                            <div className="card-enhanced text-center group">
                                <div className="text-4xl sm:text-5xl font-black text-gradient-animated mb-2 group-hover:scale-110 transition-transform">99%</div>
                                <div className="font-bold text-gray-800 mb-1">Client Satisfaction</div>
                                <div className="text-sm text-gray-600">5-star rated projects</div>
                            </div>
                            <div className="card-enhanced text-center group">
                                <div className="text-4xl sm:text-5xl font-black text-gradient-animated mb-2 group-hover:scale-110 transition-transform">$12M+</div>
                                <div className="font-bold text-gray-800 mb-1">Projects Completed</div>
                                <div className="text-sm text-gray-600">Premium installations</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern Features Section */}
            <div className="section-padding bg-white">
                <div className="max-w-7xl mx-auto container-padding">
                    <div className="text-center mb-16">
                        <div className="animate-fade-in-up">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                                Why Choose <span className="text-gradient">REMODELY</span>?
                            </h2>
                            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Revolutionary AI technology meets expert craftsmanship for unmatched home renovation experiences
                            </p>
                        </div>
                    </div>

                    {/* Feature Grid with Animations */}
                    <div className="feature-grid">
                        <div className="card-enhanced animate-fade-in-up delay-100 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                                <Sparkles className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Matching</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our intelligent algorithms analyze your project requirements, location, and preferences to connect you with the perfect contractor in seconds.
                            </p>
                        </div>

                        <div className="card-enhanced animate-fade-in-up delay-200 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                                <Users className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Verified Professionals</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every contractor is thoroughly vetted with background checks, licensing verification, and portfolio reviews for your peace of mind.
                            </p>
                        </div>

                        <div className="card-enhanced animate-fade-in-up delay-300 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                                <MessageCircle className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Communication</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Connect instantly through our platform with real-time messaging, quote requests, and project updates from start to finish.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service Categories Section */}
            <div className="section-padding bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto container-padding">
                    <div className="text-center mb-16">
                        <div className="animate-fade-in-up">
                            <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
                                Complete Home <span className="text-gradient">Renovation Services</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                From kitchens to complete home makeovers - our expert contractors handle every aspect of your project
                            </p>
                        </div>
                    </div>

                    {/* Service Categories Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                        {[
                            { name: 'Kitchen Remodeling', icon: '🏠', color: 'from-blue-500 to-blue-600' },
                            { name: 'Bathroom Renovation', icon: '🛁', color: 'from-purple-500 to-purple-600' },
                            { name: 'Flooring Installation', icon: '🔨', color: 'from-emerald-500 to-emerald-600' },
                            { name: 'Countertops', icon: '⚡', color: 'from-slate-500 to-slate-600' },
                            { name: 'Roofing & Siding', icon: '🏘️', color: 'from-orange-500 to-orange-600' },
                            { name: 'Electrical Work', icon: '💡', color: 'from-amber-500 to-amber-600' },
                            { name: 'Plumbing', icon: '🔧', color: 'from-violet-500 to-violet-600' },
                            { name: 'HVAC Systems', icon: '❄️', color: 'from-rose-500 to-rose-600' }
                        ].map((service, index) => (
                            <div key={service.name} className={`card-enhanced animate-fade-in-up delay-${(index + 1) * 100} text-center group cursor-pointer`}>
                                <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300`}>
                                    <span className="text-2xl">{service.icon}</span>
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm sm:text-base">{service.name}</h3>
                            </div>
                        ))}
                    </div>

                    {/* Premium Brand Partners */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Trusted Brand Partners</h3>
                        <div className="flex flex-wrap justify-center items-center gap-6 opacity-60 hover:opacity-80 transition-opacity">
                            {[
                                { href: '/manufacturers/msi-stone', name: 'MSI Stone', color: 'from-red-500 to-red-600' },
                                { href: '/manufacturers/hanstone', name: 'HanStone', color: 'from-indigo-500 to-indigo-600' },
                                { href: '/manufacturers/caesarstone', name: 'Caesarstone', color: 'from-gray-500 to-gray-600' },
                                { href: '/manufacturers/cambria', name: 'Cambria', color: 'from-green-500 to-green-600' },
                                { href: '/manufacturers/silestone', name: 'Silestone', color: 'from-blue-500 to-blue-600' }
                            ].map((brand) => (
                                <Link key={brand.name} href={brand.href} className={`px-4 py-2 bg-gradient-to-r ${brand.color} text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300`}>
                                    {brand.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modern CTA Section */}
            <div className="section-padding bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-10 w-40 h-40 bg-white opacity-5 rounded-full animate-float"></div>
                    <div className="absolute bottom-20 left-20 w-32 h-32 bg-white opacity-10 rounded-full animate-float delay-300"></div>
                </div>

                <div className="max-w-4xl mx-auto container-padding text-center relative z-10">
                    <div className="animate-fade-in-up">
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                            Ready to Transform Your <span className="text-blue-200">Home</span>?
                        </h2>
                        <p className="text-xl sm:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
                            Join thousands of satisfied homeowners who found their perfect contractor through REMODELY AI
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/quote"
                                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg flex items-center justify-center group"
                            >
                                <Home className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                                Start Your Project Today
                            </Link>
                            <Link
                                href="/contractors"
                                className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 text-lg flex items-center justify-center group"
                            >
                                <Wrench className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                                Browse Expert Contractors
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
