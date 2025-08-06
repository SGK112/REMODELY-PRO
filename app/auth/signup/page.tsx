"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2, ArrowLeft, Home, Hammer, Check, X } from "lucide-react"

interface SignUpFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  userType: string
  agreeToTerms: boolean
  subscribeNewsletter: boolean
}

interface PasswordRequirement {
  regex: RegExp
  text: string
  met: boolean
}

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [activeTab, setActiveTab] = useState("customer")
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    userType: "CUSTOMER",
    agreeToTerms: false,
    subscribeNewsletter: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Password requirements
  const passwordRequirements: PasswordRequirement[] = [
    { regex: /.{8,}/, text: "At least 8 characters", met: false },
    { regex: /[A-Z]/, text: "One uppercase letter", met: false },
    { regex: /[a-z]/, text: "One lowercase letter", met: false },
    { regex: /\d/, text: "One number", met: false },
    { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "One special character", met: false },
  ]

  // Check password requirements
  const checkPasswordRequirements = (password: string) => {
    return passwordRequirements.map(req => ({
      ...req,
      met: req.regex.test(password)
    }))
  }

  const currentPasswordRequirements = checkPasswordRequirements(formData.password)
  const allPasswordRequirementsMet = currentPasswordRequirements.every(req => req.met)

  // Set initial tab based on URL parameter
  useEffect(() => {
    const tabParam = searchParams?.get("tab")
    if (tabParam === "contractor" || tabParam === "customer") {
      setActiveTab(tabParam)
      setFormData(prev => ({ 
        ...prev, 
        userType: tabParam.toUpperCase() 
      }))
    }
  }, [searchParams])

  // Update userType when tab changes
  useEffect(() => {
    setFormData(prev => ({ 
      ...prev, 
      userType: activeTab.toUpperCase() 
    }))
  }, [activeTab])

  const handleInputChange = (field: keyof SignUpFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError("")
  }

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError("Full name is required")
      return false
    }
    if (!formData.email.trim()) {
      setError("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    if (!allPasswordRequirementsMet) {
      setError("Password does not meet all requirements")
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    return true
  }

  const validateStep2 = () => {
    if (formData.phone && !/^\+?[\d\s\-\(\)]+$/.test(formData.phone)) {
      setError("Please enter a valid phone number")
      return false
    }
    if (!formData.agreeToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      if (validateStep1()) {
        setStep(2)
        setError("")
      }
      return
    }

    // Step 2 - Submit registration
    if (!validateStep2()) {
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          phone: formData.phone.trim() || null,
          userType: formData.userType,
          subscribeNewsletter: formData.subscribeNewsletter,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      setSuccess("Account created successfully! Please check your email to verify your account.")
      
      // Redirect to sign in page after 3 seconds
      setTimeout(() => {
        router.push(`/auth/signin?tab=${activeTab}`)
      }, 3000)

    } catch (error) {
      console.error("Registration error:", error)
      setError(error instanceof Error ? error.message : "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const SignUpForm = ({ userType, icon: Icon, title }: { 
    userType: string
    icon: any
    title: string 
  }) => (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <CardTitle className="text-2xl">{title} Sign Up</CardTitle>
          </div>
          {step === 2 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep(1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>
          {step === 1 
            ? "Create your account to get started" 
            : "Complete your profile"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <Alert className="border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {success}
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <X className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor={`name-${userType}`}>Full Name</Label>
                  <Input
                    id={`name-${userType}`}
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`email-${userType}`}>Email Address</Label>
                  <Input
                    id={`email-${userType}`}
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    required
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
                      placeholder="Create a strong password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                      <div className="space-y-1">
                        {currentPasswordRequirements.map((req, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            {req.met ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <X className="h-3 w-3 text-red-500" />
                            )}
                            <span className={`text-xs ${req.met ? 'text-green-600' : 'text-red-500'}`}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`confirm-password-${userType}`}>Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id={`confirm-password-${userType}`}
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor={`phone-${userType}`}>Phone Number (Optional)</Label>
                  <Input
                    id={`phone-${userType}`}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={`terms-${userType}`}
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
                    />
                    <Label htmlFor={`terms-${userType}`} className="text-sm leading-4">
                      I agree to the{" "}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id={`newsletter-${userType}`}
                      checked={formData.subscribeNewsletter}
                      onCheckedChange={(checked) => handleInputChange("subscribeNewsletter", checked)}
                    />
                    <Label htmlFor={`newsletter-${userType}`} className="text-sm">
                      Subscribe to our newsletter for updates and tips
                    </Label>
                  </div>
                </div>
              </>
            )}
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || (step === 1 && !allPasswordRequirementsMet)}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {step === 1 ? "Continue" : "Create Account"}
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                href={`/auth/signin?tab=${userType}`} 
                className="text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        )}
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
            <SignUpForm 
              userType="customer" 
              icon={Home} 
              title="Homeowner" 
            />
          </TabsContent>
          
          <TabsContent value="contractor">
            <SignUpForm 
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
