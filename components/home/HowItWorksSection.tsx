import { CheckCircle, Users, Search, Calendar } from 'lucide-react'

export function HowItWorksSection() {
    const steps = [
        {
            step: 1,
            icon: <Search className="h-12 w-12 text-white" />,
            title: "Search & Compare",
            description: "Browse verified contractors in your area, view their portfolios, and read customer reviews."
        },
        {
            step: 2,
            icon: <Users className="h-12 w-12 text-white" />,
            title: "Get Quotes",
            description: "Submit your project details and receive multiple quotes from qualified contractors."
        },
        {
            step: 3,
            icon: <CheckCircle className="h-12 w-12 text-white" />,
            title: "Choose & Hire",
            description: "Compare quotes, chat with contractors, and hire the best fit for your project."
        },
        {
            step: 4,
            icon: <Calendar className="h-12 w-12 text-white" />,
            title: "Track Progress",
            description: "Schedule work, make secure payments, and track your project progress online."
        }
    ]

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Getting your dream granite countertops is easier than ever with our simple 4-step process
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center relative">
                            {/* Step number */}
                            <div className="relative mb-6">
                                <div className="bg-primary-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                    {step.icon}
                                </div>
                                <div className="absolute -top-2 -right-2 bg-secondary-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                                    {step.step}
                                </div>
                            </div>

                            {/* Arrow for desktop */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-10 -right-4 transform rotate-0">
                                    <svg className="w-8 h-8 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="/contractors" className="btn-primary text-lg px-8 py-3">
                        Get Started Now
                    </a>
                </div>
            </div>
        </section>
    )
}
