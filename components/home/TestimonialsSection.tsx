import { Star, Quote } from 'lucide-react'

export function TestimonialsSection() {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            location: "Austin, TX",
            rating: 5,
            text: "Amazing experience! Found a fantastic contractor through NewCountertops.com. The process was smooth from quote to installation. Our new granite countertops look incredible!",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b367?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            project: "Kitchen Remodel"
        },
        {
            id: 2,
            name: "Mike Chen",
            location: "Denver, CO",
            rating: 5,
            text: "I was skeptical at first, but this platform delivered. Got 3 competitive quotes within 24 hours. The contractor we chose was professional, punctual, and did beautiful work.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            project: "Bathroom Renovation"
        },
        {
            id: 3,
            name: "Lisa Martinez",
            location: "Phoenix, AZ",
            rating: 5,
            text: "The quality of contractors on this platform is outstanding. Our fabricator was knowledgeable, fair-priced, and completed the job ahead of schedule. Highly recommend!",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
            project: "Kitchen Island"
        }
    ]

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Don't just take our word for it - hear from homeowners who found their perfect contractor
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="card relative">
                            <div className="absolute -top-3 -left-3">
                                <Quote className="h-8 w-8 text-primary-200" />
                            </div>

                            {/* Rating */}
                            <div className="flex items-center mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            {/* Testimonial text */}
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* Customer info */}
                            <div className="flex items-center">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                                    <p className="text-sm text-primary-600 font-medium">{testimonial.project}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-4xl font-bold text-primary-600 mb-2">10,000+</div>
                        <div className="text-gray-600">Projects Completed</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-primary-600 mb-2">4.9/5</div>
                        <div className="text-gray-600">Average Rating</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
                        <div className="text-gray-600">Verified Contractors</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
