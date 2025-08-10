"use client"

import { useState, useEffect, Suspense } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Hammer, Loader2, Eye, EyeOff, Chrome } from "lucide-react"

interface SignInFormData {
  email: string
  password: string
}

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("customer")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: ""
  })

  const callbackUrl = searchParams?.get("callbackUrl") || "/"

  // Set initial tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams?.get("tab")
    if (tabParam === "contractor" || tabParam === "customer") {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  const handleInputChange = (field: keyof SignInFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError("") // Clear error when user types
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setError("")
    
    try {
      await signIn("google", { 
        callbackUrl: callbackUrl !== "/" ? callbackUrl : "/dashboard/customer"
      })
    } catch (error) {
      console.error("Google sign in error:", error)
      setError("Google sign in failed. Please try again.")
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, userType: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        userType,
        redirect: false
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        // Check if sign in was successful
        const session = await getSession()
        if (session) {
          // Redirect based on user type
          const redirectUrl = userType === "contractor" 
            ? "/dashboard/contractor"
            : userType === "admin"
            ? "/dashboard/admin" 
            : "/dashboard/customer"
          
          router.push(callbackUrl !== "/" ? callbackUrl : redirectUrl)
        } else {
          setError("Sign in failed. Please try again.")
        }
      }
    } catch (error) {
      console.error("Sign in error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const SignInForm = ({ userType, icon: Icon, title }: { 
    userType: string
    icon: any
    title: string 
  }) => (
    <Card className="w-full max-w-md mx-auto border-2 border-green-400 shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:shadow-green-400">
      <CardHeader className="space-y-1 pb-4 animate-fade-in">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-green-600 animate-bounce" />
          <CardTitle className="text-2xl text-gray-800">{title} Sign In</CardTitle>
        </div>
        <CardDescription className="text-gray-600">
          Welcome back! Sign in to your RemodelyPro account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Google Sign In Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 border-green-400 hover:bg-green-50 text-green-700 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-green-400"
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading || isLoading}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Chrome className="mr-2 h-4 w-4" />
          )}
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-green-400" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-green-700">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={(e) => handleSubmit(e, userType)} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50 animate-shake">
              <AlertDescription className="text-red-700">{error}</AlertDescription>
            </Alert>
          )}
          {/* Add focus and transition effects to inputs */}
          <div className="space-y-2">
            <Label htmlFor={`email-${userType}`} className="text-gray-700 font-medium">Email</Label>
            <Input
              id={`email-${userType}`}
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              required
              className="h-11 border-green-300 focus:border-green-500 focus:ring-green-400 transition-all duration-200 hover:scale-105"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`password-${userType}`} className="text-gray-700 font-medium">Password</Label>
            <div className="relative">
              <Input
                id={`password-${userType}`}
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Enter your password"
                required
                className="h-11 border-green-300 focus:border-green-500 focus:ring-green-400 transition-all duration-200 hover:scale-105 pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-gray-400 animate-fade-in" /> : <Eye className="h-4 w-4 text-gray-400 animate-fade-in" />}
              </Button>
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full h-11 bg-green-600 hover:bg-orange-500 text-white font-medium transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-green-400"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
          <div className="text-center space-y-3">
            <Link 
              href="/auth/forgot-password" 
              className="text-sm text-green-600 hover:text-orange-500 hover:underline font-medium transition-colors duration-200"
            >
              Forgot your password?
            </Link>
            <div className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link 
                href={`/auth/signup?tab=${userType}`} 
                className="text-green-600 hover:text-orange-500 hover:underline font-medium transition-colors duration-200"
              >
                Sign up here
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative animate-fade-in">
      {/* Trust signals and branding */}
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center space-x-3 text-3xl font-bold text-green-700 hover:text-orange-500 transition-colors duration-200">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg border-2 border-green-400 animate-bounce">
              <span className="text-white text-lg font-bold">R</span>
            </div>
            <span className="text-green-600">RemodelyPro</span>
          </Link>
          <p className="text-green-400 mt-2 font-medium">Professional Construction Intelligence</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-xs text-gray-400 border border-green-400 rounded px-2 py-1 animate-fade-in">Verified Contractors</span>
            <span className="text-xs text-gray-400 border border-green-400 rounded px-2 py-1 animate-fade-in">AI-Powered Matching</span>
            <span className="text-xs text-gray-400 border border-green-400 rounded px-2 py-1 animate-fade-in">Secure & Private</span>
          </div>
        </div>
        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value)
        }} className="w-full animate-fade-in">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/70 backdrop-blur-sm border-2 border-green-400 rounded-xl transition-all duration-200">
            <TabsTrigger 
              value="customer" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-200"
            >
              <Home className="h-4 w-4 animate-fade-in" />
              <span>Homeowner</span>
            </TabsTrigger>
            <TabsTrigger 
              value="contractor" 
              className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white transition-all duration-200"
            >
              <Hammer className="h-4 w-4 animate-fade-in" />
              <span>Contractor</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="customer">
            <SignInForm 
              userType="customer" 
              icon={Home} 
              title="Homeowner" 
            />
          </TabsContent>
          <TabsContent value="contractor">
            <SignInForm 
              userType="contractor" 
              icon={Hammer} 
              title="Contractor" 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    }>
      <SignInContent />
    </Suspense>
  )
}
