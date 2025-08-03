import Link from 'next/link'

export default function SimpleHomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">REMODELY AI</h1>
        <p className="text-xl mb-8">Professional Construction Marketplace</p>

        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/auth/signin"
            className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg text-center"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="bg-green-600 hover:bg-green-700 p-4 rounded-lg text-center"
          >
            Sign Up
          </Link>
          <Link
            href="/contractors"
            className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg text-center"
          >
            Find Contractors
          </Link>
          <Link
            href="/quote"
            className="bg-orange-600 hover:bg-orange-700 p-4 rounded-lg text-center"
          >
            Get Quote
          </Link>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">System Status</h2>
          <ul className="space-y-2">
            <li>✅ Next.js 14 App Router</li>
            <li>✅ Authentication System</li>
            <li>✅ Database (SQLite)</li>
            <li>✅ Responsive Design</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
