'use client'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white animate-fade-in">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-4xl font-bold text-green-400 mb-2">Privacy Policy</h1>
          <p className="text-green-200 font-medium">Your privacy is our priority at RemodelyPro</p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="text-xs text-gray-400 border border-green-400 rounded px-2 py-1 animate-fade-in">Verified Contractors</span>
            <span className="text-xs text-gray-400 border border-green-400 rounded px-2 py-1 animate-fade-in">AI-Powered Matching</span>
            <span className="text-xs text-gray-400 border border-green-400 rounded px-2 py-1 animate-fade-in">Secure & Private</span>
          </div>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-2xl border-2 border-green-400 p-8 max-w-2xl mx-auto animate-fade-in">
          <p className="text-gray-700 text-lg font-semibold">Content coming soon...</p>
        </div>
      </div>
    </div>
  )
}
