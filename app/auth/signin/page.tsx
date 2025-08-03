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
import { Home, Hammer, Loader2 } from "lucide-react"

function SignInContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("customer")

  const callbackUrl = searchParams?.get("callbackUrl") || "/"

  // Set initial tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams?.get("tab")
    if (tabParam === "contractor" || tabParam === "customer") {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, userType: string) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        userType,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.ok) {
        // Get updated session
        const session = await getSession()

        // Redirect based on user type
        if (session?.user?.userType === "CONTRACTOR") {
          router.push("/dashboard/contractor")
        } else if (session?.user?.userType === "CUSTOMER") {
          router.push("/dashboard/customer")
        } else {
          router.push(callbackUrl)
        }
        router.refresh()
      }
    } catch (error) {
      console.error("Sign in error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            {activeTab === "customer"
              ? "Sign in to get quotes from verified contractors"
              : "Sign in to manage your contractor profile"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="customer" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Homeowner
              </TabsTrigger>
              <TabsTrigger value="contractor" className="flex items-center gap-2">
                <Hammer className="h-4 w-4" />
                Contractor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="customer" className="space-y-4">
              <div className="text-center py-2">
                <p className="text-sm text-gray-600">
                  Get quotes for your stone & surface projects
                </p>
              </div>
              <form onSubmit={(e) => handleSubmit(e, "CUSTOMER")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-email">Email</Label>
                  <Input
                    id="customer-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-password">Password</Label>
                  <Input
                    id="customer-password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In & Get Quotes"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="contractor" className="space-y-4">
              <div className="text-center py-2">
                <p className="text-sm text-gray-600">
                  Access your contractor dashboard
                </p>
              </div>
              <form onSubmit={(e) => handleSubmit(e, "CONTRACTOR")} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contractor-email">Email</Label>
                  <Input
                    id="contractor-email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contractor-password">Password</Label>
                  <Input
                    id="contractor-password"
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Access Dashboard"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href={`/auth/signup?tab=${activeTab}`}
                className="text-blue-600 hover:underline"
              >
                Sign up here
              </Link>
            </p>
            <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </Link>
          </div>

          {/* Quick Browse Option */}
          <div className="mt-4 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500 mb-2">Or continue without signing in</p>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/contractors">
                Browse Contractors
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardContent className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
        </Card>
      </div>
    }>
      <SignInContent />
    </Suspense>
  )
}
