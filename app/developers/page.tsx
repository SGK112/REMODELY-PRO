import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Code, Database, Cloud, Shield, Zap, GitBranch } from 'lucide-react'

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">REMODELY.AI Developer Portal</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build powerful construction and remodeling applications with our comprehensive APIs and developer tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Code className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>REST APIs</CardTitle>
              <CardDescription>
                Access contractor data, project management, and AI services through our RESTful APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Contractor Search & Matching</li>
                <li>• Project Management</li>
                <li>• Quote Generation</li>
                <li>• Material Detection AI</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Database className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Database Access</CardTitle>
              <CardDescription>
                Direct access to our comprehensive contractor and project database
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• 50,000+ Verified Contractors</li>
                <li>• ROC License Data</li>
                <li>• Project History</li>
                <li>• Real-time Updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Cloud className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Cloud Services</CardTitle>
              <CardDescription>
                Scalable cloud infrastructure for enterprise applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Auto-scaling</li>
                <li>• Global CDN</li>
                <li>• 99.9% Uptime SLA</li>
                <li>• Enterprise Support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Shield className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Enterprise-grade security with OAuth 2.0 and API key management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• OAuth 2.0 Authentication</li>
                <li>• Rate Limiting</li>
                <li>• Data Encryption</li>
                <li>• Audit Logging</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-600 mb-2" />
              <CardTitle>AI Integration</CardTitle>
              <CardDescription>
                Advanced AI capabilities for smart construction applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Material Recognition</li>
                <li>• Voice Translation</li>
                <li>• Smart Quotes</li>
                <li>• Predictive Analytics</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <GitBranch className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>SDKs & Tools</CardTitle>
              <CardDescription>
                Pre-built SDKs and development tools for faster integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• JavaScript/TypeScript SDK</li>
                <li>• Python SDK</li>
                <li>• React Components</li>
                <li>• CLI Tools</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">1. Get API Key</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {`curl -X POST https://api.remodely.ai/auth/keys \\
  -H "Content-Type: application/json" \\
  -d '{"name": "My App", "scope": "read"}'`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">2. Make First Request</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                {`curl -X GET https://api.remodely.ai/contractors \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
              </pre>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Build?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of developers building the future of construction technology
          </p>
          <div className="space-x-4">
            <Button size="lg">
              Get API Key
            </Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
