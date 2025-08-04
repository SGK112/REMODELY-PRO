'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function QuoteRequestPage() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const [formData, setFormData] = useState({
        projectType: '',
        description: '',
        budget: '',
        timeline: '',
        location: '',
        phone: '',
        preferredContact: 'email'
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    // Redirect to login if not authenticated
    if (status === 'loading') {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (status === 'unauthenticated') {
        router.push('/auth/login?callbackUrl=/quote/request')
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            const response = await fetch('/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setSuccess(true)
                setFormData({
                    projectType: '',
                    description: '',
                    budget: '',
                    timeline: '',
                    location: '',
                    phone: '',
                    preferredContact: 'email'
                })
            } else {
                const data = await response.json()
                setError(data.message || 'Failed to submit quote request')
            }
        } catch (err) {
            setError('An error occurred. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    if (success) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="pt-6">
                        <div className="text-primary text-6xl mb-4">✓</div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Quote Submitted!</h2>
                        <p className="text-muted-foreground mb-6">
                            We've received your quote request. Contractors will start responding within 24 hours.
                        </p>
                        <div className="space-y-3">
                            <Button
                                onClick={() => router.push('/dashboard')}
                                className="w-full"
                            >
                                View Dashboard
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setSuccess(false)
                                    setFormData({
                                        projectType: '',
                                        description: '',
                                        budget: '',
                                        timeline: '',
                                        location: '',
                                        phone: '',
                                        preferredContact: 'email'
                                    })
                                }}
                                className="w-full"
                            >
                                Submit Another Quote
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-primary hover:text-primary/80 mb-4 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Request a Quote</h1>
                    <p className="text-muted-foreground">
                        Tell us about your project and get connected with verified contractors.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Project Details</CardTitle>
                        <CardDescription>
                            Provide as much detail as possible to get accurate quotes.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="projectType" className="text-sm font-medium text-gray-700">
                                        Project Type *
                                    </label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select project type</option>
                                        <option value="kitchen">Kitchen Remodel</option>
                                        <option value="bathroom">Bathroom Renovation</option>
                                        <option value="addition">Home Addition</option>
                                        <option value="basement">Basement Finishing</option>
                                        <option value="flooring">Flooring Installation</option>
                                        <option value="roofing">Roofing</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="budget" className="text-sm font-medium text-gray-700">
                                        Budget Range
                                    </label>
                                    <select
                                        id="budget"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select budget range</option>
                                        <option value="under-5k">Under $5,000</option>
                                        <option value="5k-15k">$5,000 - $15,000</option>
                                        <option value="15k-30k">$15,000 - $30,000</option>
                                        <option value="30k-50k">$30,000 - $50,000</option>
                                        <option value="over-50k">Over $50,000</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                                    Project Description *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe your project in detail..."
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="location" className="text-sm font-medium text-gray-700">
                                        Location *
                                    </label>
                                    <Input
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="City, State"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="timeline" className="text-sm font-medium text-gray-700">
                                        Timeline
                                    </label>
                                    <select
                                        id="timeline"
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select timeline</option>
                                        <option value="asap">ASAP</option>
                                        <option value="1-month">Within 1 month</option>
                                        <option value="3-months">Within 3 months</option>
                                        <option value="6-months">Within 6 months</option>
                                        <option value="flexible">Flexible</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                    Phone Number
                                </label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="(555) 123-4567"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Preferred Contact Method
                                </label>
                                <div className="flex gap-4">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="preferredContact"
                                            value="email"
                                            checked={formData.preferredContact === 'email'}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        Email
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="preferredContact"
                                            value="phone"
                                            checked={formData.preferredContact === 'phone'}
                                            onChange={handleInputChange}
                                            className="mr-2"
                                        />
                                        Phone
                                    </label>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Quote Request'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
