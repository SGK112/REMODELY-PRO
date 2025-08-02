import React from 'react'

interface LogoProps {
  className?: string
  width?: number
  height?: number
  variant?: 'full' | 'icon' | 'text'
}

export function Logo({ className = '', width = 200, height = 60, variant = 'full' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="reGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#f59e0b', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f97316', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Main RE icon - geometric and modern */}
        <rect x="6" y="6" width="32" height="32" rx="8" fill="url(#iconGradient)" />

        {/* RE text using same font as REMODELY */}
        <text x="22" y="20" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="12" fontWeight="700" fill="white" letterSpacing="-0.02em">
          RE
        </text>

        {/* Animated neural network dots */}
        <g opacity="0.7">
          <circle cx="15" cy="15" r="1" fill="white">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0s" />
          </circle>
          <circle cx="29" cy="15" r="1" fill="white">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="0.7s" />
          </circle>
          <circle cx="22" cy="29" r="1" fill="white">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" begin="1.4s" />
          </circle>
        </g>
      </svg>
    )
  }

  if (variant === 'text') {
    return (
      <div className={`flex items-center ${className}`}>
        <span className="text-2xl font-bold tracking-tight text-gray-900">
          REMODELY
        </span>
      </div>
    )
  }

  // Full logo with icon and text
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* RE Icon */}
      <g transform="translate(8, 12)">
        <rect x="0" y="0" width="36" height="36" rx="8" fill="url(#logoGradient)" />

        {/* RE text using same font as REMODELY */}
        <text x="18" y="24" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontSize="14" fontWeight="700" fill="white" letterSpacing="-0.02em">
          RE
        </text>

        {/* Neural network animation */}
        <g opacity="0.6">
          <circle cx="12" cy="12" r="1" fill="white">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" begin="0s" />
          </circle>
          <circle cx="24" cy="12" r="1" fill="white">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" begin="1s" />
          </circle>
          <circle cx="18" cy="24" r="1" fill="white">
            <animate attributeName="opacity" values="0.2;1;0.2" dur="3s" repeatCount="indefinite" begin="2s" />
          </circle>

          {/* Connecting lines */}
          <line x1="12" y1="12" x2="24" y2="12" stroke="white" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite" begin="0.5s" />
          </line>
          <line x1="18" y1="12" x2="18" y2="24" stroke="white" strokeWidth="0.5" opacity="0.3">
            <animate attributeName="opacity" values="0.1;0.5;0.1" dur="3s" repeatCount="indefinite" begin="1.5s" />
          </line>
        </g>
      </g>

      {/* REMODELY text with AI emphasis */}
      <text x="56" y="35" fontFamily="system-ui, -apple-system, sans-serif" fontSize="24" fontWeight="700" fill="#111827" letterSpacing="-0.02em">
        REMODELY
      </text>

      {/* Powered by AI tagline */}
      <text x="56" y="48" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="500" fill="url(#textGradient)" letterSpacing="0.05em">
        POWERED BY AI
      </text>
    </svg>
  )
}
