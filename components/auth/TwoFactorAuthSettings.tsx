"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Shield, ShieldCheck, QrCode, Key, Copy, Eye, EyeOff, Check, X, Loader2 } from "lucide-react"
import Image from "next/image"

interface TwoFactorSetupData {
    secret: string
    qrCode: string
    backupCodes: string[]
}

export function TwoFactorAuthSettings() {
    const { data: session, update } = useSession()
    const [isEnabled, setIsEnabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [setupData, setSetupData] = useState<TwoFactorSetupData | null>(null)
    const [verificationCode, setVerificationCode] = useState("")
    const [disablePassword, setDisablePassword] = useState("")
    const [showBackupCodes, setShowBackupCodes] = useState(false)
    const [showDisablePassword, setShowDisablePassword] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [step, setStep] = useState<"main" | "setup" | "disable">("main")

    useEffect(() => {
        // Check if 2FA is already enabled
        setIsEnabled((session?.user as any)?.twoFactorEnabled || false)
    }, [session])

    const startSetup = async () => {
        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/2fa/setup", {
                method: "POST",
            })

            if (!response.ok) {
                throw new Error("Failed to setup 2FA")
            }

            const data = await response.json()
            setSetupData(data)
            setStep("setup")
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to setup 2FA")
        } finally {
            setIsLoading(false)
        }
    }

    const verifyAndEnable = async () => {
        if (!verificationCode.trim()) {
            setError("Please enter the verification code")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/2fa/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: verificationCode }),
            })

            if (!response.ok) {
                throw new Error("Invalid verification code")
            }

            const data = await response.json()
            setSuccess(data.message)
            setIsEnabled(true)
            setShowBackupCodes(true)

            // Update session
            await update()

            // Reset form
            setVerificationCode("")
            setStep("main")
        } catch (error) {
            setError(error instanceof Error ? error.message : "Verification failed")
        } finally {
            setIsLoading(false)
        }
    }

    const disable2FA = async () => {
        if (!disablePassword.trim()) {
            setError("Please enter your password")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            const response = await fetch("/api/auth/2fa/setup", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password: disablePassword }),
            })

            if (!response.ok) {
                const data = await response.json()
                throw new Error(data.error || "Failed to disable 2FA")
            }

            setSuccess("Two-factor authentication has been disabled")
            setIsEnabled(false)
            setDisablePassword("")
            setStep("main")

            // Update session
            await update()
        } catch (error) {
            setError(error instanceof Error ? error.message : "Failed to disable 2FA")
        } finally {
            setIsLoading(false)
        }
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setSuccess("Copied to clipboard!")
        setTimeout(() => setSuccess(""), 2000)
    }

    if (step === "setup" && setupData) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <QrCode className="h-5 w-5" />
                        <span>Setup Two-Factor Authentication</span>
                    </CardTitle>
                    <CardDescription>
                        Scan the QR code with your authenticator app and enter the verification code
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <X className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="text-center space-y-4">
                        <div className="flex justify-center">
                            <Image
                                src={setupData.qrCode}
                                alt="2FA QR Code"
                                width={200}
                                height={200}
                                className="border rounded-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-sm font-medium">Can't scan? Enter this code manually:</p>
                            <div className="flex items-center space-x-2">
                                <code className="flex-1 p-2 bg-gray-100 rounded text-sm font-mono">
                                    {setupData.secret}
                                </code>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => copyToClipboard(setupData.secret)}
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="verification-code">Verification Code</Label>
                        <Input
                            id="verification-code"
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Enter 6-digit code"
                            maxLength={6}
                            className="text-center text-lg font-mono"
                        />
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setStep("main")
                                setSetupData(null)
                                setError("")
                            }}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={verifyAndEnable}
                            disabled={isLoading || !verificationCode.trim()}
                            className="flex-1"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Enable 2FA
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (step === "disable") {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-600">
                        <Shield className="h-5 w-5" />
                        <span>Disable Two-Factor Authentication</span>
                    </CardTitle>
                    <CardDescription>
                        This will make your account less secure. Please enter your password to confirm.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <X className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="disable-password">Current Password</Label>
                        <div className="relative">
                            <Input
                                id="disable-password"
                                type={showDisablePassword ? "text" : "password"}
                                value={disablePassword}
                                onChange={(e) => setDisablePassword(e.target.value)}
                                placeholder="Enter your current password"
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowDisablePassword(!showDisablePassword)}
                            >
                                {showDisablePassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setStep("main")
                                setDisablePassword("")
                                setError("")
                            }}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={disable2FA}
                            disabled={isLoading || !disablePassword.trim()}
                            className="flex-1"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Disable 2FA
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    {isEnabled ? (
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                    ) : (
                        <Shield className="h-5 w-5" />
                    )}
                    <span>Two-Factor Authentication</span>
                    {isEnabled && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Enabled
                        </Badge>
                    )}
                </CardTitle>
                <CardDescription>
                    Add an extra layer of security to your account with two-factor authentication
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {error && (
                    <Alert variant="destructive">
                        <X className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {success && (
                    <Alert className="border-green-200 bg-green-50">
                        <Check className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                            {success}
                        </AlertDescription>
                    </Alert>
                )}

                {showBackupCodes && setupData && (
                    <Alert className="border-blue-200 bg-blue-50">
                        <Key className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                            <div className="space-y-2">
                                <p className="font-medium">Save these backup codes in a safe place:</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {setupData.backupCodes.map((code, index) => (
                                        <code key={index} className="block p-1 bg-white rounded text-xs font-mono">
                                            {code}
                                        </code>
                                    ))}
                                </div>
                                <p className="text-xs">
                                    You can use these codes to access your account if you lose your authenticator device.
                                </p>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setShowBackupCodes(false)}
                                >
                                    I've saved these codes
                                </Button>
                            </div>
                        </AlertDescription>
                    </Alert>
                )}

                {isEnabled ? (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 p-4 bg-green-50 rounded-lg">
                            <ShieldCheck className="h-5 w-5 text-green-600" />
                            <div>
                                <p className="font-medium text-green-800">2FA is active</p>
                                <p className="text-sm text-green-700">Your account is protected with two-factor authentication</p>
                            </div>
                        </div>
                        <Button
                            variant="destructive"
                            onClick={() => setStep("disable")}
                        >
                            Disable 2FA
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 p-4 bg-yellow-50 rounded-lg">
                            <Shield className="h-5 w-5 text-yellow-600" />
                            <div>
                                <p className="font-medium text-yellow-800">2FA is not enabled</p>
                                <p className="text-sm text-yellow-700">
                                    Enable two-factor authentication to better protect your account
                                </p>
                            </div>
                        </div>
                        <Button onClick={startSetup} disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Enable 2FA
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
