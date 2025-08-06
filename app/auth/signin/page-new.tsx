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
import { Home, Hammer, Loader2, Shield, Eye, EyeOff } from "lucide-react"

interface SignInFormData {
    email: string
    password: string
    twoFactorCode: string
    backupCode: string
}

function SignInContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [activeTab, setActiveTab] = useState("customer")
    const [requires2FA, setRequires2FA] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [use2FABackup, setUse2FABackup] = useState(false)
    const [formData, setFormData] = useState<SignInFormData>({
        email: "",
        password: "",
        twoFactorCode: "",
        backupCode: ""
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

        // If 2FA is required but no code provided
        if (requires2FA && !formData.twoFactorCode && !formData.backupCode) {
            setError("Please enter your 2FA code or backup code")
            setIsLoading(false)
            return
        }

        try {
            const credentials: any = {
                email: formData.email,
                password: formData.password,
                userType,
                redirect: false
            }

            // Add 2FA credentials if available
            if (formData.twoFactorCode) {
                credentials.twoFactorCode = formData.twoFactorCode
            }
            if (formData.backupCode) {
                credentials.backupCode = formData.backupCode
            }

            const result = await signIn("credentials", credentials)

            if (result?.error) {
                if (result.error === "2FA_REQUIRED") {
                    setRequires2FA(true)
                    setError("Two-factor authentication required")
                } else {
                    setError(result.error)
                }
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
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <CardTitle className="text-2xl">{title} Sign In</CardTitle>
                </div>
                <CardDescription>
                    Enter your email and password to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => handleSubmit(e, userType)} className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor={`email-${userType}`}>Email</Label>
                        <Input
                            id={`email-${userType}`}
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="Enter your email"
                            required
                            disabled={requires2FA}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor={`password-${userType}`}>Password</Label>
                        <div className="relative">
                            <Input
                                id={`password-${userType}`}
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={requires2FA}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={requires2FA}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    {requires2FA && (
                        <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
                            <div className="flex items-center space-x-2">
                                <Shield className="h-4 w-4 text-blue-600" />
                                <Label className="text-blue-800 font-medium">Two-Factor Authentication</Label>
                            </div>

                            {!use2FABackup ? (
                                <div className="space-y-2">
                                    <Label htmlFor={`2fa-${userType}`}>Authentication Code</Label>
                                    <Input
                                        id={`2fa-${userType}`}
                                        type="text"
                                        value={formData.twoFactorCode}
                                        onChange={(e) => handleInputChange("twoFactorCode", e.target.value)}
                                        placeholder="Enter 6-digit code"
                                        maxLength={6}
                                        className="text-center text-lg font-mono"
                                    />
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="sm"
                                        onClick={() => setUse2FABackup(true)}
                                        className="text-xs"
                                    >
                                        Use backup code instead
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <Label htmlFor={`backup-${userType}`}>Backup Code</Label>
                                    <Input
                                        id={`backup-${userType}`}
                                        type="text"
                                        value={formData.backupCode}
                                        onChange={(e) => handleInputChange("backupCode", e.target.value)}
                                        placeholder="Enter backup code"
                                        className="text-center font-mono"
                                    />
                                    <Button
                                        type="button"
                                        variant="link"
                                        size="sm"
                                        onClick={() => setUse2FABackup(false)}
                                        className="text-xs"
                                    >
                                        Use authenticator code instead
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Sign In
                    </Button>

                    <div className="text-center space-y-2">
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm text-blue-600 hover:underline"
                        >
                            Forgot your password?
                        </Link>
                        <div className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                href={`/auth/signup?tab=${userType}`}
                                className="text-blue-600 hover:underline"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-blue-600 hover:text-blue-700">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">R</span>
                        </div>
                        <span>REMODELY.ai</span>
                    </Link>
                    <p className="text-gray-600 mt-2">AI Brains for your House</p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                        <TabsTrigger value="customer" className="flex items-center space-x-2">
                            <Home className="h-4 w-4" />
                            <span>Homeowner</span>
                        </TabsTrigger>
                        <TabsTrigger value="contractor" className="flex items-center space-x-2">
                            <Hammer className="h-4 w-4" />
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
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <SignInContent />
        </Suspense>
    )
}
