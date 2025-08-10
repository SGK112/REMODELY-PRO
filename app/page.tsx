import Link from 'next/link'
import { Brain, Phone, ShieldCheck, Users, Star, Sparkles } from 'lucide-react'
import Gallery from './components/Gallery'

const galleryImages = [
	{ src: '/hero-kitchen-modern.jpg', alt: 'Modern Kitchen' },
	{ src: '/living-room-modern.jpg', alt: 'Modern Living Room' },
	{ src: '/kitchen-luxury.jpg', alt: 'Luxury Kitchen' },
	{ src: '/general-contracting.jpg', alt: 'General Contracting' },
	{ src: '/flooring-hardwood.jpg', alt: 'Hardwood Flooring' },
]

export default function HomePage() {
	return (
		<main className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
			{/* Hero Section */}
			<section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-12">
				<div className="flex-1 w-full mb-8 md:mb-0">
					<h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-green-400">AI-Powered Construction Solutions</h1>
					<p className="text-base sm:text-lg text-gray-300 mb-8">Transform your next project with RemodelyPro. Instantly connect with verified contractors, get quotes, and visualize your remodel with advanced AI tools.</p>
				</div>
				<div className="flex-1 w-full flex justify-center items-center">
					<Gallery images={galleryImages} />
				</div>
			</section>

			{/* Trust Signals */}
			<section className="bg-gray-900 py-8">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
					<div className="flex items-center space-x-2 sm:space-x-4 mb-4 md:mb-0">
						<ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" />
						<span className="font-semibold text-gray-200 text-sm sm:text-base">Verified & Licensed Contractors</span>
					</div>
					<div className="flex items-center space-x-2 sm:space-x-4 mb-4 md:mb-0">
						<Users className="w-7 h-7 sm:w-8 sm:h-8 text-orange-400" />
						<span className="font-semibold text-gray-200 text-sm sm:text-base">Trusted by 50,000+ Homeowners</span>
					</div>
					<div className="flex items-center space-x-2 sm:space-x-4">
						<Star className="w-7 h-7 sm:w-8 sm:h-8 text-orange-400" />
						<span className="font-semibold text-gray-200 text-sm sm:text-base">5-Star Rated Platform</span>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-10 sm:py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center text-orange-400">How RemodelyPro Works</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
						<div className="bg-gray-900 rounded-lg shadow p-6 sm:p-8 flex flex-col items-center text-center">
							<Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mb-4" />
							<h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-400">AI Visualization</h3>
							<p className="text-gray-300 text-sm sm:text-base">Upload your space, choose a style, and instantly see remodel ideas powered by AI.</p>
						</div>
						<div className="bg-gray-900 rounded-lg shadow p-6 sm:p-8 flex flex-col items-center text-center">
							<ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-green-400 mb-4" />
							<h3 className="text-lg sm:text-xl font-semibold mb-2 text-green-400">Verified Pros</h3>
							<p className="text-gray-300 text-sm sm:text-base">All contractors are background-checked and ROC-licensed for your peace of mind.</p>
						</div>
						<div className="bg-gray-900 rounded-lg shadow p-6 sm:p-8 flex flex-col items-center text-center">
							<Users className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400 mb-4" />
							<h3 className="text-lg sm:text-xl font-semibold mb-2 text-orange-400">Easy Project Management</h3>
							<p className="text-gray-300 text-sm sm:text-base">Get quotes, compare, and manage your remodel from start to finish in one dashboard.</p>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="bg-gray-900 py-10 sm:py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					<h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-10 text-center text-green-400">What Our Users Say</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
						<div className="bg-gray-950 rounded-lg shadow p-6 sm:p-8 flex flex-col items-center text-center border border-green-500">
							<img src="/user1.jpg" alt="User 1" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 object-cover border-2 border-orange-500" />
							<p className="text-gray-200 italic mb-2 text-sm sm:text-base">“RemodelyPro made my kitchen remodel easy and stress-free. The AI designs were spot on!”</p>
							<span className="font-semibold text-green-400 text-sm sm:text-base">Sarah M.</span>
						</div>
						<div className="bg-gray-950 rounded-lg shadow p-6 sm:p-8 flex flex-col items-center text-center border border-green-500">
							<img src="/user2.jpg" alt="User 2" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 object-cover border-2 border-orange-500" />
							<p className="text-gray-200 italic mb-2 text-sm sm:text-base">“I found a great contractor and managed my project all in one place. Highly recommend!”</p>
							<span className="font-semibold text-green-400 text-sm sm:text-base">James T.</span>
						</div>
						<div className="bg-gray-950 rounded-lg shadow p-6 sm:p-8 flex flex-col items-center text-center border border-green-500">
							<img src="/user3.jpg" alt="User 3" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 object-cover border-2 border-orange-500" />
							<p className="text-gray-200 italic mb-2 text-sm sm:text-base">“The platform is so easy to use and the support team is fantastic.”</p>
							<span className="font-semibold text-green-400 text-sm sm:text-base">Linda G.</span>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-green-600 py-16">
				<div className="max-w-7xl mx-auto px-6 text-center">
					<h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Space?</h2>
					<p className="text-lg text-green-100 mb-8">Join thousands of homeowners and professionals using RemodelyPro to streamline their projects.</p>
					<Link href="/signup" className="bg-orange-500 text-white font-bold px-8 py-4 rounded-lg shadow hover:bg-orange-600">Start Free Trial</Link>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-950 py-10 mt-auto">
				<div className="max-w-7xl mx-auto px-6 text-sm text-center mt-4 text-gray-500">© {new Date().getFullYear()} RemodelyPro. All rights reserved.</div>
			</footer>
		</main>
	)
}
