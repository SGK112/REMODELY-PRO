"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building2 } from "lucide-react";

export default function SignInPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Add sign in logic here
            console.log('Sign in attempt:', formData);
            // Redirect to dashboard after successful sign in
            router.push('/dashboard');
        } catch (error) {
            console.error('Sign in error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>

                {/* Sign In Card */}
                <Card className="card-enhanced">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                            <CardDescription>
                                Sign in to your Remodely.AI account
                            </CardDescription>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full btn-primary"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </form>

                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
