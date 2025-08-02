import { Component, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-50">
                    <div className="text-center p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Something went wrong</h2>
                        <p className="text-slate-600 mb-6">We're working to fix this issue. Please refresh the page.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
