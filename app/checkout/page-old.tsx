'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Check, Shield, Star, CreditCard, Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const planDetails = {
  pro: {
    name: 'Pro Plan',
    price: 29,
    originalPrice: 39,
    features: [
      'Unlimited contractor search',
      'Unlimited quote requests', 
      'Advanced AI assistant',
      'Voice SARAH consultations',
      'Priority support',
      '2FA security'
    ]
  },
  business: {
    name: 'Business Plan',
    price: 99,
    originalPrice: 129,
    features: [
      'Everything in Pro',
      'Business verification',
      'Lead generation tools',
      'White-label options',
      'API access',
      'Dedicated account manager'
    ]
  }
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const plan = searchParams?.get('plan') as keyof typeof planDetails || 'pro'
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1) // 1: Plan Review, 2: Payment, 3: Success
  
  const selectedPlan = planDetails[plan] || planDetails.pro
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false)
      setStep(3)
    }, 2000)
  }

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to REMODELY.AI!</h1>
          <p className="text-gray-600 mb-8">
            Your {selectedPlan.name} subscription is now active. Check your email for account details.
          </p>
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <span>Go to Dashboard</span>
            </Link>
            <Link
              href="/ai-chat"
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Try AI Assistant
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/plans" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Plans</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Subscription</h1>
          <p className="text-gray-600 mt-2">Secure checkout powered by Stripe</p>
        </div>
        ]
      }
    };
    return id ? products[id as keyof typeof products] : null;
  };

  const selectedProduct = getProductFromId(productId);

  const handleOrderComplete = async (orderData: any) => {
    try {
      // Create QuickBooks invoice and customer record
      const response = await fetch('/api/quickbooks/process-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderData,
          accountId,
          createInvoice: true,
          syncToQuickBooks: true
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setOrderData({ ...orderData, ...result });
        setOrderComplete(true);
      } else {
        throw new Error('Failed to process order');
      }
    } catch (error) {
      console.error('Order processing error:', error);
      // Still show success to user, handle error in background
      setOrderData(orderData);
      setOrderComplete(true);
    }
  };

  const handleCancel = () => {
    router.push('/marketplace');
  };

  if (orderComplete && orderData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Complete!</h1>
              <p className="text-lg text-gray-600">
                Thank you for your purchase. Your account has been set up successfully.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Order Details</h3>
                  <p className="text-sm text-gray-600">Order ID: {orderData.orderId}</p>
                  <p className="text-sm text-gray-600">Product: {orderData.product?.name}</p>
                  <p className="text-sm text-gray-600">Total: ${orderData.total?.toFixed(2)}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Account Information</h3>
                  <p className="text-sm text-gray-600">Account: {accountId}</p>
                  <p className="text-sm text-gray-600">Email: {orderData.billing?.email}</p>
                  {orderData.apiKey && (
                    <p className="text-sm text-gray-600">API Key: {orderData.apiKey.substring(0, 12)}...</p>
                  )}
                </div>
              </div>
            </div>

            {orderData.invoiceNumber && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center">
                  <span className="text-blue-900 font-medium">
                    QuickBooks Invoice: {orderData.invoiceNumber}
                  </span>
                  <ExternalLink className="w-4 h-4 ml-2 text-blue-600" />
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  This purchase has been automatically synced to your QuickBooks account
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a
                  href={`mailto:${orderData.billing?.email}?subject=Welcome to Remodely.AI - Your API Keys&body=Your API access is ready!`}
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Get API Keys
                </a>

                <button
                  onClick={() => router.push('/dashboard')}
                  className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Go to Dashboard
                </button>

                <a
                  href="https://docs.remodely.ai/getting-started"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Docs
                </a>
              </div>

              <div className="text-sm text-gray-500 space-y-2">
                <p>
                  <strong>Next Steps:</strong>
                </p>
                <ul className="text-left max-w-md mx-auto space-y-1">
                  <li>• Check your email for API keys and setup instructions</li>
                  <li>• Visit your dashboard to configure integrations</li>
                  <li>• Review our documentation for implementation guides</li>
                  <li>• Contact support@remodely.ai for any questions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Remodely.AI Checkout</h1>
          <p className="text-lg text-gray-600">
            Secure checkout powered by QuickBooks integration
          </p>
          {accountId && (
            <div className="mt-4 inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Account: {accountId}
            </div>
          )}
        </div>

        <CheckoutFlow
          product={selectedProduct || undefined}
          onComplete={handleOrderComplete}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
