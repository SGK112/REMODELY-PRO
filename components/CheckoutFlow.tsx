'use client';

import React, { useState } from 'react';
import { CreditCard, Shield, Check, Star, Users, Zap, Building2, Crown } from 'lucide-react';

interface CheckoutProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  features: string[];
  category: 'API_TOKEN' | 'TOOL_ACCESS' | 'CONSULTATION' | 'WHITE_LABEL';
  popular?: boolean;
  enterprise?: boolean;
}

interface CheckoutFlowProps {
  product?: CheckoutProduct;
  onComplete: (orderData: any) => void;
  onCancel: () => void;
}

const PRODUCTS: CheckoutProduct[] = [
  {
    id: 'api_basic',
    name: 'Basic API Access',
    description: 'Perfect for small contractors and startups',
    price: 29,
    originalPrice: 49,
    category: 'API_TOKEN',
    features: [
      '1,000 API calls/month',
      'Material detection AI',
      'Basic voice translation',
      'Email support',
      'QuickBooks integration'
    ]
  },
  {
    id: 'api_pro',
    name: 'Professional API',
    description: 'For growing contracting businesses',
    price: 99,
    originalPrice: 149,
    category: 'API_TOKEN',
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
  },
  {
    id: 'api_enterprise',
    name: 'Enterprise API',
    description: 'For large contractors and agencies',
    price: 299,
    category: 'API_TOKEN',
    enterprise: true,
    features: [
      'Unlimited API calls',
      'Full AI suite access',
      'Dedicated account manager',
      '24/7 phone support',
      'Custom integrations',
      'White-label options',
      'SLA guarantee',
      'On-premise deployment'
    ]
  },
  {
    id: 'white_label',
    name: 'White Label Solution',
    description: 'Complete branded platform for your company',
    price: 999,
    category: 'WHITE_LABEL',
    enterprise: true,
    features: [
      'Full platform customization',
      'Your branding & domain',
      'QuickBooks integration',
      'Customer management',
      'Revenue sharing model',
      'Dedicated support',
      'Training & onboarding'
    ]
  }
];

export default function CheckoutFlow({ product, onComplete, onCancel }: CheckoutFlowProps) {
  const [selectedProduct, setSelectedProduct] = useState<CheckoutProduct | null>(product || null);
  const [quantity, setQuantity] = useState(1);
  const [billingInfo, setBillingInfo] = useState({
    email: '',
    companyName: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [step, setStep] = useState(product ? 'billing' : 'select');
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    const subtotal = selectedProduct.price * quantity;
    const tax = subtotal * 0.0875; // 8.75% tax
    return subtotal + tax;
  };

  const handleProductSelect = (product: CheckoutProduct) => {
    setSelectedProduct(product);
    setStep('billing');
  };

  const handleBillingSubmit = () => {
    if (!selectedProduct || !agreeToTerms) return;
    setStep('payment');
  };

  const handlePaymentSubmit = async () => {
    if (!selectedProduct) return;

    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const orderData = {
        product: selectedProduct,
        quantity,
        subtotal: selectedProduct.price * quantity,
        tax: selectedProduct.price * quantity * 0.0875,
        total: calculateTotal(),
        billing: billingInfo,
        paymentMethod,
        orderId: `RM-${Date.now()}`,
        createdAt: new Date().toISOString()
      };

      onComplete(orderData);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (step === 'select') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-gray-600">Select the perfect solution for your business needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className={`relative bg-white rounded-xl border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${product.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                } ${product.enterprise ? 'bg-gradient-to-br from-purple-50 to-blue-50' : ''}`}
              onClick={() => handleProductSelect(product)}
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </span>
                </div>
              )}

              {product.enterprise && (
                <div className="absolute -top-3 right-3">
                  <Crown className="w-6 h-6 text-purple-500" />
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{product.description}</p>

                <div className="mb-4">
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-lg mr-2">${product.originalPrice}</span>
                  )}
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${product.popular || product.enterprise
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}>
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'billing') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
            <p className="text-gray-600">Complete your order for {selectedProduct?.name}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            <div className="lg:col-span-2">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={billingInfo.firstName}
                      onChange={(e) => setBillingInfo({ ...billingInfo, firstName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={billingInfo.lastName}
                      onChange={(e) => setBillingInfo({ ...billingInfo, lastName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="you@company.com"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Use your @remodely.ai email for agent assignment</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={billingInfo.companyName}
                    onChange={(e) => setBillingInfo({ ...billingInfo, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={billingInfo.city}
                      onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      value={billingInfo.state}
                      onChange={(e) => setBillingInfo({ ...billingInfo, state: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="https://remodely.ai/terms" target="_blank" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="https://remodely.ai/privacy" target="_blank" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>

                {selectedProduct && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{selectedProduct.name}</span>
                      <span className="font-medium">${selectedProduct.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity</span>
                      <span className="font-medium">{quantity}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${(selectedProduct.price * quantity).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8.75%)</span>
                      <span className="font-medium">${(selectedProduct.price * quantity * 0.0875).toFixed(2)}</span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-lg font-bold">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleBillingSubmit}
                    disabled={!agreeToTerms}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Continue to Payment
                  </button>

                  <button
                    onClick={onCancel}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
                  <Shield className="w-4 h-4 mr-2" />
                  Secured by 256-bit SSL encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
            <p className="text-gray-600">Complete your purchase securely</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <CreditCard className="w-5 h-5 mr-3 text-gray-600" />
                      <span>Credit Card</span>
                    </label>

                    <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="quickbooks"
                        checked={paymentMethod === 'quickbooks'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <Building2 className="w-5 h-5 mr-3 text-blue-600" />
                      <span>QuickBooks Payments</span>
                    </label>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'quickbooks' && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-900">QuickBooks Integration</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      This purchase will be automatically synchronized with your QuickBooks Online account.
                      Invoice and payment records will be created for your internal accounting.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Final Review</h3>

                {selectedProduct && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{selectedProduct.name}</span>
                      <span className="font-medium">${selectedProduct.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Billing to</span>
                      <span className="font-medium text-right text-sm">
                        {billingInfo.companyName}<br />
                        {billingInfo.email}
                      </span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-lg font-bold">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <button
                    onClick={handlePaymentSubmit}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2" />
                        Complete Purchase
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setStep('billing')}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    Back to Billing
                  </button>
                </div>

                <div className="mt-6 text-xs text-gray-500 space-y-2">
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1" />
                    SSL Secured
                  </div>
                  <div>Monthly billing, cancel anytime</div>
                  <div>QuickBooks sync included</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
