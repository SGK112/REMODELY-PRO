import Link from 'next/link'
import { ArrowLeft, AlertTriangle, Home, Wrench, Users, Database } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function CopilotInstructionsPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Updated Copilot Instructions for Remodely Pro
                    </h1>
                    <p className="text-xl text-gray-600">
                        **NEW RULES** - General Home Remodeling & Construction Marketplace
                    </p>
                </div>

                {/* Critical Rule Change */}
                <Alert className="mb-8 border-red-200 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        <strong>IMPORTANT RULE CHANGE:</strong> This platform is <strong>NO LONGER</strong> focused on stone and surface contractors.
                        All references to granite, quartz, marble, stone surfaces, etc. should be removed and replaced with general remodeling services.
                    </AlertDescription>
                </Alert>

                {/* New Architecture Overview */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center text-2xl">
                            <Home className="mr-3 h-6 w-6 text-blue-600" />
                            Updated Platform Focus
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-3 text-green-600">✅ NEW FOCUS - General Remodeling</h3>
                                <ul className="space-y-2 text-sm">
                                    <li>• <strong>Kitchen Remodeling</strong> - Cabinets, appliances, layouts</li>
                                    <li>• <strong>Bathroom Renovations</strong> - Complete makeovers, fixtures</li>
                                    <li>• <strong>Home Additions</strong> - Room additions, extensions</li>
                                    <li>• <strong>Flooring Projects</strong> - Hardwood, tile, carpet, LVP</li>
                                    <li>• <strong>Roofing Services</strong> - Repairs, replacements, maintenance</li>
                                    <li>• <strong>General Construction</strong> - Repairs, maintenance, custom work</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-3 text-red-600">❌ OLD FOCUS - Remove These</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li>• ~~Granite countertops~~</li>
                                    <li>• ~~Quartz surfaces~~</li>
                                    <li>• ~~Marble installations~~</li>
                                    <li>• ~~Natural stone~~</li>
                                    <li>• ~~Stone fabrication~~</li>
                                    <li>• ~~Surface contractors~~</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Updated Systems */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Database className="mr-2 h-5 w-5 text-blue-600" />
                                Updated Data Sources
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Contractor scraping should target general remodeling sources:
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li>• <strong>General Contractors:</strong> HomeAdvisor, Angie's List</li>
                                <li>• <strong>Specialty Services:</strong> Kitchen/bath specialists</li>
                                <li>• <strong>Directory Sources:</strong> Yelp, Google Business</li>
                                <li>• <strong>Professional Networks:</strong> Houzz, contractor associations</li>
                                <li>• <strong>Licensing Boards:</strong> State contractor licensing</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Wrench className="mr-2 h-5 w-5 text-blue-600" />
                                Service Categories
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-4">
                                Platform should support these project types:
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li>• Kitchen remodeling & renovation</li>
                                <li>• Bathroom renovation & design</li>
                                <li>• Home additions & extensions</li>
                                <li>• Flooring installation & repair</li>
                                <li>• Roofing & exterior work</li>
                                <li>• General home repairs</li>
                                <li>• Custom construction projects</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Content Guidelines */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Users className="mr-2 h-5 w-5 text-blue-600" />
                            Content & Messaging Guidelines
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-green-600 mb-2">✅ Use This Language:</h4>
                                <ul className="text-sm space-y-1 ml-4">
                                    <li>• "Home remodeling professionals"</li>
                                    <li>• "Construction contractors"</li>
                                    <li>• "Renovation specialists"</li>
                                    <li>• "Home improvement experts"</li>
                                    <li>• "Licensed contractors"</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-600 mb-2">❌ Remove This Language:</h4>
                                <ul className="text-sm space-y-1 ml-4 text-gray-600">
                                    <li>• ~~"Stone & surface professionals"~~</li>
                                    <li>• ~~"Granite specialists"~~</li>
                                    <li>• ~~"Countertop installers"~~</li>
                                    <li>• ~~"Stone contractors"~~</li>
                                    <li>• ~~"Fabrication experts"~~</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Technical Implementation */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Technical Implementation Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold mb-2">Database Schema:</h4>
                                <p className="text-sm text-gray-600">
                                    Update contractor categories, service types, and project classifications to reflect general remodeling services.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">Scraping Sources:</h4>
                                <p className="text-sm text-gray-600">
                                    Modify scraper targets from stone/surface manufacturers to general contractor directories and home improvement platforms.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-2">UI Components:</h4>
                                <p className="text-sm text-gray-600">
                                    Update all text, images, icons, and service categories throughout the application to reflect general remodeling focus.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Priority Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-red-600">Priority Actions Required</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>Update homepage hero section and descriptions</li>
                            <li>Modify navigation menus and service categories</li>
                            <li>Update quote request forms with general project types</li>
                            <li>Revise contractor onboarding for general services</li>
                            <li>Update database schemas and validation rules</li>
                            <li>Modify scraping targets and data sources</li>
                            <li>Update all marketing copy and metadata</li>
                        </ol>
                    </CardContent>
                </Card>

                <p className="text-center text-gray-500 text-sm mt-8">
                    Last updated: {new Date().toLocaleDateString()} - This overrides all previous stone/surface focused instructions
                </p>
            </div>
        </div>
    )
}
