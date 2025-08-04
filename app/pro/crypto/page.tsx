'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Wallet,
  Zap,
  Shield,
  Copy,
  CheckCircle,
  Eye,
  EyeOff,
  Send,
  Download,
  TrendingUp,
  Brain,
  DollarSign,
  Globe,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  Star,
  Smartphone,
  QrCode
} from 'lucide-react';

// TON Wallet connectors from your specification
const tonWallets = [
  {
    app_name: "tonkeeper",
    name: "Tonkeeper",
    image: "https://tonkeeper.com/assets/tonconnect-icon.png",
    about_url: "https://tonkeeper.com",
    platforms: ["ios", "android", "chrome", "firefox"],
    description: "Most popular TON wallet with full DeFi support"
  },
  {
    app_name: "mytonwallet",
    name: "MyTonWallet",
    image: "https://mytonwallet.io/icon-256.png",
    about_url: "https://mytonwallet.io",
    platforms: ["chrome", "windows", "macos", "linux"],
    description: "Secure desktop and browser wallet"
  },
  {
    app_name: "tonhub",
    name: "Tonhub",
    image: "https://tonhub.com/tonconnect_logo.png",
    about_url: "https://tonhub.com",
    platforms: ["ios", "android"],
    description: "Mobile-first TON wallet"
  },
  {
    app_name: "openmask",
    name: "OpenMask",
    image: "https://raw.githubusercontent.com/OpenProduct/openmask-extension/main/public/openmask-logo-288.png",
    about_url: "https://www.openmask.app/",
    platforms: ["chrome"],
    description: "Privacy-focused browser extension"
  }
];

const cryptoFeatures = [
  {
    title: "Instant Payments",
    description: "Receive payments in seconds with TON blockchain",
    icon: Zap,
    benefit: "No more waiting 3-5 days for ACH transfers"
  },
  {
    title: "Low Fees",
    description: "Pay pennies in transaction fees vs 3% credit card fees",
    icon: DollarSign,
    benefit: "Save $300+ per $10k project"
  },
  {
    title: "Global Reach",
    description: "Accept payments from anywhere in the world",
    icon: Globe,
    benefit: "Expand to international clients"
  },
  {
    title: "Auto Conversion",
    description: "Automatically convert crypto to USD in your bank",
    icon: TrendingUp,
    benefit: "No crypto volatility risk"
  }
];

const recentTransactions = [
  {
    id: '1',
    type: 'received',
    amount: '2,340',
    currency: 'TON',
    usdValue: '$15,600',
    from: 'Kitchen Remodel - Johnson Residence',
    status: 'completed',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'sent',
    amount: '450',
    currency: 'TON',
    usdValue: '$3,000',
    from: 'Subcontractor Payment - Mike Electric',
    status: 'completed',
    timestamp: '1 day ago'
  },
  {
    id: '3',
    type: 'received',
    amount: '890',
    currency: 'TON',
    usdValue: '$5,934',
    from: 'Bathroom Renovation - Davis Home',
    status: 'pending',
    timestamp: '2 days ago'
  }
];

export default function CryptoWalletPage() {
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [balance, setBalance] = useState({
    ton: '12,847',
    usd: '$85,634'
  });
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);

  const walletAddress = "EQDrLq-X_IpKdKjOyPg6Tm7-ZVP5PWfhHDK...";

  const connectWallet = (walletName: string) => {
    setConnectedWallet(walletName);
    // In real implementation, this would trigger TON Connect protocol
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">
                <ArrowLeft className="h-6 w-6" />
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Crypto Payment Hub</h1>
                  <p className="text-sm text-blue-300">TON & multi-crypto contractor payments</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/chat" className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                <Brain className="h-4 w-4" />
                <span>Ask Sarah</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {!connectedWallet ? (
          // Wallet Connection Screen
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Accept Crypto Payments Like a Pro
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                Connect your TON wallet to start accepting instant, low-fee cryptocurrency payments from clients worldwide.
                Automatically convert to USD or keep in crypto.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {cryptoFeatures.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                  <feature.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{feature.description}</p>
                  <p className="text-blue-400 text-xs font-medium">{feature.benefit}</p>
                </div>
              ))}
            </div>

            {/* Wallet Selection */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Connect Your TON Wallet</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {tonWallets.map((wallet) => (
                  <div
                    key={wallet.app_name}
                    className="bg-white/10 border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all cursor-pointer group"
                    onClick={() => connectWallet(wallet.name)}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={wallet.image}
                        alt={wallet.name}
                        className="w-12 h-12 rounded-lg"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{wallet.name}</h4>
                        <p className="text-white/60 text-sm mb-2">{wallet.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {wallet.platforms.map((platform) => (
                            <span key={platform} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-blue-400 group-hover:text-blue-300">
                        <ArrowUpRight className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <p className="text-white/60 text-sm mb-4">
                  Don't have a TON wallet? Download one of the options above - they're all free and secure.
                </p>
                <Link
                  href="https://ton.org/wallets"
                  target="_blank"
                  className="text-blue-400 hover:text-blue-300 text-sm underline"
                >
                  Learn more about TON wallets →
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Connected Wallet Dashboard
          <div className="max-w-6xl mx-auto">
            {/* Wallet Overview */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Connected to {connectedWallet}</h3>
                    <p className="text-white/60 text-sm">Ready to receive payments</p>
                  </div>
                </div>
                <button
                  onClick={() => setConnectedWallet(null)}
                  className="text-white/60 hover:text-white text-sm"
                >
                  Disconnect
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <h4 className="text-white font-semibold">Wallet Balance</h4>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-white/60 hover:text-white"
                    >
                      {showBalance ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {showBalance ? (
                    <div>
                      <div className="text-3xl font-bold text-white mb-2">{balance.ton} TON</div>
                      <div className="text-lg text-white/70">{balance.usd} USD</div>
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-white/30">••••••</div>
                  )}
                </div>

                <div>
                  <h4 className="text-white font-semibold mb-4">Wallet Address</h4>
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 bg-white/10 text-white/80 px-3 py-2 rounded text-sm">
                      {walletAddress}
                    </code>
                    <button
                      onClick={copyAddress}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
                    >
                      {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors">
                      <QrCode className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                    <ArrowDownLeft className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Receive Payment</h3>
                </div>
                <p className="text-white/70 mb-6">Generate payment links for clients or show QR codes for instant payments.</p>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Create Payment Request
                  </button>
                  <button className="w-full bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-all">
                    Show QR Code
                  </button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Send Payment</h3>
                </div>
                <p className="text-white/70 mb-6">Pay subcontractors, suppliers, or convert to your bank account.</p>
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    Send Crypto
                  </button>
                  <button className="w-full bg-white/10 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-all">
                    Convert to USD
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'received' ? 'bg-green-500/20' : 'bg-blue-500/20'
                        }`}>
                        {tx.type === 'received' ?
                          <ArrowDownLeft className="h-5 w-5 text-green-400" /> :
                          <ArrowUpRight className="h-5 w-5 text-blue-400" />
                        }
                      </div>
                      <div>
                        <div className="text-white font-medium">{tx.from}</div>
                        <div className="text-white/60 text-sm">{tx.timestamp}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${tx.type === 'received' ? 'text-green-400' : 'text-blue-400'
                        }`}>
                        {tx.type === 'received' ? '+' : '-'}{tx.amount} TON
                      </div>
                      <div className="text-white/60 text-sm">{tx.usdValue}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              The Future of Contractor Payments
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Join the growing number of contractors accepting crypto payments. Fast, secure, and global.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl transition-all">
                Get Started Today
              </button>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
