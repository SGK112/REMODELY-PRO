'use client'

import { ThemeToggle } from '@/components/theme-toggle'

export function ThemeDemo() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header with theme toggle */}
            <header className="theme-nav sticky top-0 z-50">
                <div className="container-spacing mx-auto flex h-16 items-center justify-between">
                    <h1 className="text-2xl font-bold text-gradient-blue">Remodely.AI</h1>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main content with improved spacing */}
            <main className="container-spacing mx-auto">
                {/* Hero section */}
                <section className="section-spacing text-center">
                    <h2 className="mb-6 text-4xl font-bold text-gradient-blue md:text-6xl">
                        Welcome to Remodely.AI
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
                        Transform your home with AI-powered contractor matching and intelligent design tools.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <button className="btn-primary">Get Started</button>
                        <button className="btn-secondary">Learn More</button>
                    </div>
                </section>

                {/* Features grid */}
                <section className="section-spacing">
                    <h3 className="mb-12 text-center text-3xl font-bold">Features</h3>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="card-enhanced">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                🤖
                            </div>
                            <h4 className="mb-2 text-xl font-semibold">AI Matching</h4>
                            <p className="text-muted-foreground">
                                Smart contractor matching using advanced AI algorithms.
                            </p>
                        </div>

                        <div className="card-enhanced">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                                🎤
                            </div>
                            <h4 className="mb-2 text-xl font-semibold">Voice Consultation</h4>
                            <p className="text-muted-foreground">
                                Get instant advice through our AI-powered voice assistant.
                            </p>
                        </div>

                        <div className="card-enhanced">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
                                📊
                            </div>
                            <h4 className="mb-2 text-xl font-semibold">Smart Analytics</h4>
                            <p className="text-muted-foreground">
                                Track your projects with detailed analytics and insights.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Button showcase */}
                <section className="section-spacing">
                    <h3 className="mb-8 text-center text-3xl font-bold">Color Palette</h3>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="theme-card">
                            <h4 className="mb-4 text-lg font-semibold">Primary Actions</h4>
                            <div className="space-y-3">
                                <button className="btn-primary w-full">Primary Button</button>
                                <button className="btn-secondary w-full">Secondary Button</button>
                            </div>
                        </div>

                        <div className="theme-card">
                            <h4 className="mb-4 text-lg font-semibold">Status Actions</h4>
                            <div className="space-y-3">
                                <button className="btn-success w-full">Success Button</button>
                                <button className="btn-warning w-full">Warning Button</button>
                                <button className="btn-danger w-full">Danger Button</button>
                            </div>
                        </div>

                        <div className="theme-card">
                            <h4 className="mb-4 text-lg font-semibold">Status Badges</h4>
                            <div className="space-y-3">
                                <div className="flex flex-wrap gap-2">
                                    <span className="badge theme-badge-blue">Blue Badge</span>
                                    <span className="badge theme-badge-green">Green Badge</span>
                                    <span className="badge theme-badge-orange">Orange Badge</span>
                                    <span className="badge theme-badge-red">Red Badge</span>
                                    <span className="badge theme-badge-gray">Gray Badge</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Text examples */}
                <section className="section-spacing">
                    <h3 className="mb-8 text-center text-3xl font-bold">Typography</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="theme-card">
                            <h4 className="mb-4 text-lg font-semibold">Text Styles</h4>
                            <div className="space-y-3">
                                <p className="theme-text">Primary text color</p>
                                <p className="theme-text-secondary">Secondary text color</p>
                                <p className="text-muted-foreground">Muted text color</p>
                                <a href="#" className="theme-link">Link example</a>
                            </div>
                        </div>

                        <div className="theme-card">
                            <h4 className="mb-4 text-lg font-semibold">Gradient Text</h4>
                            <div className="space-y-3">
                                <p className="text-gradient-blue text-xl font-bold">Blue Gradient</p>
                                <p className="text-gradient-green text-xl font-bold">Green Gradient</p>
                                <p className="text-gradient-orange text-xl font-bold">Orange Gradient</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Forms example */}
                <section className="section-spacing">
                    <h3 className="mb-8 text-center text-3xl font-bold">Form Elements</h3>
                    <div className="mx-auto max-w-md theme-card">
                        <form className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    className="theme-input w-full"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    className="theme-input w-full"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">Message</label>
                                <textarea
                                    className="theme-input w-full"
                                    rows={4}
                                    placeholder="Enter your message"
                                ></textarea>
                            </div>
                            <button type="submit" className="btn-primary w-full">
                                Submit
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="theme-nav mt-16">
                <div className="container-spacing mx-auto py-8 text-center">
                    <p className="text-muted-foreground">
                        © 2025 Remodely.AI. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}
