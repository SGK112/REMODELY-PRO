'use client'

export default function CountertopAnalyzerDemoPage() {
  // Redirect to the main countertop analyzer page
  if (typeof window !== 'undefined') {
    window.location.href = '/apps/countertop-analyzer'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl text-white mb-4">Redirecting to Countertop Analyzer...</h1>
        <p className="text-blue-200">If you are not redirected automatically, <a href="/apps/countertop-analyzer" className="text-blue-400 underline">click here</a>.</p>
      </div>
    </div>
  )
}