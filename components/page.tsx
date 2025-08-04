import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="card-enhanced space-y-6">
          <h1 className="text-3xl font-bold text-primary">Terms of Service</h1>
          <div className="space-y-4 text-muted-foreground">
            <p>Welcome to Remodely.AI. These terms govern your use of our construction marketplace platform.</p>
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>By accessing and using Remodely.AI, you accept and agree to be bound by these Terms of Service.</p>
            <h2 className="text-xl font-semibold text-foreground">2. Service Description</h2>
            <p>Remodely.AI connects homeowners with verified contractors for construction and remodeling projects.</p>
            <h2 className="text-xl font-semibold text-foreground">3. User Responsibilities</h2>
            <p>Users must provide accurate information and comply with all applicable laws and regulations.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
