'use client'

export default function SigninPage() {
  // Redirect to the main login page
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/signin'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl text-white mb-4">Redirecting to Sign In...</h1>
        <p className="text-blue-200">If you are not redirected automatically, <a href="/auth/signin" className="text-blue-400 underline">click here</a>.</p>
      </div>
    </div>
  )
}