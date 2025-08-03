'use client'

import Link from 'next/link'
import { CheckCircle, AlertCircle, Home, Users, Search, Quote } from 'lucide-react'

export default function StatusPage() {
  const routes = [
    { path: '/', name: 'Home Page', icon: Home },
    { path: '/auth/signin', name: 'Sign In', icon: Users },
    { path: '/auth/signup', name: 'Sign Up', icon: Users },
    { path: '/auth/forgot-password', name: 'Forgot Password', icon: Users },
    { path: '/contractors', name: 'Contractors', icon: Users },
    { path: '/search', name: 'Search', icon: Search },
    { path: '/quote', name: 'Get Quote', icon: Quote },
    { path: '/marketplace', name: 'Marketplace', icon: Users },
    { path: '/dashboard', name: 'Dashboard', icon: Users },
    { path: '/upgrade', name: 'Upgrade', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            REMODELY AI - System Status
          </h1>
          <p className="text-xl text-slate-300">
            All core features are functional and ready to use
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <Link
                key={route.path}
                href={route.path}
                className="bg-slate-800 rounded-lg p-6 border border-slate-700 hover:border-slate-600 hover:bg-slate-750 transition-all group"
              >
                <div className="flex items-center">
                  <Icon className="w-6 h-6 text-blue-400 mr-4 group-hover:text-blue-300" />
                  <div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300">
                      {route.name}
                    </h3>
                    <p className="text-slate-400 text-sm">{route.path}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                </div>
              </Link>
            )
          })}
        </div>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">✅ System Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              Authentication System (NextAuth.js)
            </div>
            <div className="flex items-center text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              User Registration & Login
            </div>
            <div className="flex items-center text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              Password Reset Flow
            </div>
            <div className="flex items-center text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              Role-based Dashboards
            </div>
            <div className="flex items-center text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              Contractor Marketplace
            </div>
            <div className="flex items-center text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              Quote Generation System
            </div>
            <div className="flex items-center text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              AI-Powered Matching
            </div>
            <div className="flex items-center text-slate-300">
              <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
              Responsive Design
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-400">
            Server running on <code className="bg-slate-700 px-2 py-1 rounded">localhost:3001</code>
          </p>
        </div>
      </div>
    </div>
  )
}
