"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EyeIcon, EyeOffIcon, CheckCircle, AlertCircle } from "lucide-react"

interface PasswordChangeProps {
    className?: string
}

export function PasswordChange({ className }: PasswordChangeProps) {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    })
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    })
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

    const validatePassword = (password: string) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        }

        return requirements
    }

    const passwordRequirements = validatePassword(passwords.new)
    const isPasswordValid = Object.values(passwordRequirements).every(Boolean)
    const passwordsMatch = passwords.new === passwords.confirm

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!passwords.current || !passwords.new || !passwords.confirm) {
            setMessage({ type: "error", text: "All fields are required" })
            return
        }

        if (!isPasswordValid) {
            setMessage({ type: "error", text: "New password doesn't meet requirements" })
            return
        }

        if (!passwordsMatch) {
            setMessage({ type: "error", text: "New passwords don't match" })
            return
        }

        setIsLoading(true)
        setMessage(null)

        try {
            const response = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: passwords.current,
                    newPassword: passwords.new
                })
            })

            if (response.ok) {
                setMessage({ type: "success", text: "Password changed successfully" })
                setPasswords({ current: "", new: "", confirm: "" })
            } else {
                const error = await response.text()
                setMessage({ type: "error", text: error || "Failed to change password" })
            }
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred. Please try again." })
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }))
    }

    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {message && (
                        <Alert variant={message.type === "error" ? "destructive" : "default"}>
                            {message.type === "success" ? (
                                <CheckCircle className="h-4 w-4" />
                            ) : (
                                <AlertCircle className="h-4 w-4" />
                            )}
                            <AlertDescription>{message.text}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <div className="relative">
                            <Input
                                id="currentPassword"
                                type={showPasswords.current ? "text" : "password"}
                                value={passwords.current}
                                onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                                placeholder="Enter your current password"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2"
                                onClick={() => togglePasswordVisibility("current")}
                            >
                                {showPasswords.current ? (
                                    <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                    <EyeIcon className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <div className="relative">
                            <Input
                                id="newPassword"
                                type={showPasswords.new ? "text" : "password"}
                                value={passwords.new}
                                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                                placeholder="Enter your new password"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2"
                                onClick={() => togglePasswordVisibility("new")}
                            >
                                {showPasswords.new ? (
                                    <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                    <EyeIcon className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        {passwords.new && (
                            <div className="space-y-1 text-sm">
                                <div className={`flex items-center space-x-2 ${passwordRequirements.length ? 'text-green-600' : 'text-gray-400'}`}>
                                    <CheckCircle className="h-3 w-3" />
                                    <span>At least 8 characters</span>
                                </div>
                                <div className={`flex items-center space-x-2 ${passwordRequirements.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                                    <CheckCircle className="h-3 w-3" />
                                    <span>One uppercase letter</span>
                                </div>
                                <div className={`flex items-center space-x-2 ${passwordRequirements.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                                    <CheckCircle className="h-3 w-3" />
                                    <span>One lowercase letter</span>
                                </div>
                                <div className={`flex items-center space-x-2 ${passwordRequirements.number ? 'text-green-600' : 'text-gray-400'}`}>
                                    <CheckCircle className="h-3 w-3" />
                                    <span>One number</span>
                                </div>
                                <div className={`flex items-center space-x-2 ${passwordRequirements.special ? 'text-green-600' : 'text-gray-400'}`}>
                                    <CheckCircle className="h-3 w-3" />
                                    <span>One special character</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showPasswords.confirm ? "text" : "password"}
                                value={passwords.confirm}
                                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                                placeholder="Confirm your new password"
                                required
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2"
                                onClick={() => togglePasswordVisibility("confirm")}
                            >
                                {showPasswords.confirm ? (
                                    <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                    <EyeIcon className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        {passwords.confirm && !passwordsMatch && (
                            <p className="text-sm text-red-600">Passwords don't match</p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading || !isPasswordValid || !passwordsMatch || !passwords.current}
                        className="w-full"
                    >
                        {isLoading ? "Changing Password..." : "Change Password"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
