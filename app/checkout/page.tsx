'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CheckoutFlow from '@/components/CheckoutFlow';
import { CheckCircle, Download, ExternalLink, ArrowRight } from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const productId = searchParams.get('product');
  const accountId = searchParams.get('account') || 'SGK112';

  // Predefined product from URL params
  const getProductFromId = (id: string | null) => {
    const products = {
      api_basic: {
        id: 'api_basic',
        name: 'Basic API Access',
        description: 'Perfect for small contractors and startups',
        price: 29,
        originalPrice: 49,
        category: 'API_TOKEN' as const,
        features: [
          '1,000 API calls/month',
          'Material detection AI',
          'Basic voice translation',
          'Email support',
          'QuickBooks integration'
        ]
      },
      api_pro: {
        id: 'api_pro',
        name: 'Professional API',
        description: 'For growing contracting businesses',
        price: 99,
        originalPrice: 149,
        category: 'API_TOKEN' as const,
        popular: true,
        features: [
          '10,000 API calls/month',
          'Advanced AI tools',
          'Voice consultation system',
          'Priority support',
          'QuickBooks Pro integration',
          'Custom webhooks',
          'Analytics dashboard'
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
