import { Shield, Users, Clock, Award, CheckCircle, Star } from 'lucide-react'

const trustMetrics = [
    {
        icon: Users,
        value: "10,000+",
        label: "Verified Contractors",
        description: "All licensed and insured"
    },
    {
        icon: CheckCircle,
        value: "50,000+",
        label: "Projects Completed",
        description: "With 98% satisfaction rate"
    },
    {
        icon: Clock,
        value: "< 2 Hours",
        label: "Average Response Time",
        description: "From quote to contractor contact"
    },
    {
        icon: Award,
        value: "4.9/5",
        label: "Platform Rating",
        description: "Based on 15,000+ reviews"
    }
]

const securityFeatures = [
    "Licensed & Insured Contractors Only",
    "Automated Background Verification",
    "Secure Payment Processing",
    "24/7 Customer Support",
    "Money-Back Guarantee",
    "Real-Time Project Tracking"
]

export default function TrustSignals() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Trusted by Thousands of Homeowners
                    </h2>
                    <p className="text-xl text-gray-600">
                        Our automated verification system ensures you work with only the best contractors
                    </p>
                </div>

                {/* Trust Metrics */}
                <div className="grid md:grid-cols-4 gap-8 mb-16">
                    {trustMetrics.map((metric, index) => (
                        <div key={index} className="text-center">
                            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <metric.icon className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                            <div className="text-lg font-semibold text-gray-700 mb-1">{metric.label}</div>
                            <div className="text-sm text-gray-500">{metric.description}</div>
                        </div>
                    ))}
                </div>

                {/* Security Features */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center justify-center mb-8">
                        <Shield className="w-8 h-8 text-green-500 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-900">Your Safety is Our Priority</h3>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {securityFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Social Proof */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8">What Our Users Say</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah M.",
                                location: "Phoenix, AZ",
                                project: "Kitchen Countertops",
                                rating: 5,
                                review: "Found 3 qualified contractors in minutes. The whole process was seamless and professional."
                            },
                            {
                                name: "Mike R.",
                                location: "Scottsdale, AZ",
                                project: "Bathroom Remodel",
                                rating: 5,
                                review: "Amazing platform! The automated matching saved me hours of research. Highly recommend."
                            },
                            {
                                name: "Lisa K.",
                                location: "Tempe, AZ",
                                project: "Fireplace Surround",
                                rating: 5,
                                review: "The verification process gave me confidence. All contractors were licensed and professional."
                            }
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                                <div className="flex items-center mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                    ))}
                                </div>
                                <p className="text-gray-600 mb-4 italic">"{testimonial.review}"</p>
                                <div className="text-sm">
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-gray-500">{testimonial.location} • {testimonial.project}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
