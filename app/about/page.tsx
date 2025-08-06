'use client'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Remodely Pro</h1>
        <div className="prose prose-lg max-w-4xl">
          <p className="text-lg text-gray-600">
            Remodely Pro is an innovative AI-powered marketplace that connects contractors 
            with customers while providing cutting-edge tools for the construction industry.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Our platform leverages artificial intelligence to streamline project management, 
            enhance communication, and deliver better outcomes for all stakeholders in the 
            construction and remodeling industry.
          </p>
        </div>
      </div>
    </div>
  )
}
