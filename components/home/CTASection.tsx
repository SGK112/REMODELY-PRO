import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export function CTASection() {
    return (
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    Ready to Transform Your Space?
                </h2>
                <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-100">
                    Join thousands of satisfied homeowners who found their perfect granite contractor through our platform
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/contractors"
                        className="btn-secondary text-lg px-8 py-3 flex items-center space-x-2"
                    >
                        <span>Find Contractors Now</span>
                        <ArrowRight size={20} />
                    </Link>

                    <div className="flex items-center space-x-2 text-gray-200">
                        <span>or call us at</span>
                        <a
                            href="tel:1-800-GRANITE"
                            className="flex items-center space-x-2 text-secondary-400 hover:text-secondary-300 font-semibold"
                        >
                            <Phone size={18} />
                            <span>1-800-GRANITE</span>
                        </a>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="font-semibold mb-2">Fast Response</h3>
                        <p className="text-gray-200 text-sm">Get quotes within 24 hours</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4">
                            <span className="text-2xl">🛡️</span>
                        </div>
                        <h3 className="font-semibold mb-2">Fully Insured</h3>
                        <p className="text-gray-200 text-sm">All contractors are verified & insured</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="bg-white bg-opacity-20 rounded-full p-4 mb-4">
                            <span className="text-2xl">💯</span>
                        </div>
                        <h3 className="font-semibold mb-2">Satisfaction Guaranteed</h3>
                        <p className="text-gray-200 text-sm">100% satisfaction or money back</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
