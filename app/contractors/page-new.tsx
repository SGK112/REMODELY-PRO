'use client'

export default function RedirectPage() {
  if (typeof window !== 'undefined') {
    window.location.href = '/contractors'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl text-white mb-4">Redirecting to Contractors...</h1>
        <p className="text-blue-200">If you are not redirected automatically, <a href="/contractors" className="text-blue-400 underline">click here</a>.</p>
      </div>
    </div>
  )
}
