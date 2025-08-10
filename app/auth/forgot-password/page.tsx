"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, Loader2, Check } from "lucide-react"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email.trim()) {
      setError("Email address is required")
      setIsLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email")
      }

      setSuccess(true)

    } catch (error) {
      console.error("Forgot password error:", error)
      setError(error instanceof Error ? error.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-green-700 hover:text-orange-500 transition-colors duration-200">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center border-2 border-green-400 animate-bounce">
              <span className="text-white text-sm font-bold">R</span>
            </div>
            <span className="text-green-600">RemodelyPro</span>
          </Link>
          <p className="text-green-400 mt-2">Professional Construction Intelligence</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs text-gray-400 border border-green-400 rounded px-2 py-1 animate-fade-in">Verified Contractors</span>
            <span className="text-xs text-gray-400 border border-green-400 rounded px-2 py-1 animate-fade-in">AI-Powered Matching</span>
            <span className="text-xs text-gray-400 border border-green-400 rounded px-2 py-1 animate-fade-in">Secure & Private</span>
          </div>
        </div>
        <Card className="w-full border-2 border-green-400 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:shadow-green-400">
          <CardHeader className="space-y-1 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="transition-all duration-200">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <CardTitle className="text-2xl">Reset Password</CardTitle>
                <CardDescription className="mt-1">
                  Enter your email to receive a password reset link
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center space-y-4 animate-fade-in">
                <Alert className="border-green-200 bg-green-50 animate-fade-in">
                  <Check className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Password reset email sent! Check your inbox and spam folder.
                  </AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSuccess(false)
                      setEmail("")
                    }}
                    className="transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-green-400"
                  >
                    Try Different Email
                  </Button>
                </div>
                <div className="text-center">
                  <Link 
                    href="/auth/signin" 
                    className="text-sm text-green-600 hover:text-orange-500 hover:underline transition-colors duration-200"
                  >
                    Back to Sign In
                  </Link>
                  <div className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link 
                      href="/auth/signup" 
                      className="text-green-600 hover:text-orange-500 hover:underline transition-colors duration-200"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50 animate-shake">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400 animate-fade-in" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-400 transition-all duration-200 hover:scale-105"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    We'll send you a secure link to reset your password.
                  </p>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-orange-500 text-white font-medium transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-green-400" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Send Reset Link
                </Button>
                <div className="text-center space-y-2">
                  <Link 
                    href="/auth/signin" 
                    className="text-sm text-green-600 hover:text-orange-500 hover:underline transition-colors duration-200"
                  >
                    Back to Sign In
                  </Link>
                  <div className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link 
                      href="/auth/signup" 
                      className="text-green-600 hover:text-orange-500 hover:underline transition-colors duration-200"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
