'use client'

import { useState } from 'react'
import { Phone, MessageSquare, Send, CheckCircle, XCircle } from 'lucide-react'

export default function SMSNotificationPanel() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const [notificationType, setNotificationType] = useState<'sms' | 'voice'>('voice') // Default to voice since SMS is limited
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSendNotification = async () => {
    if (!phoneNumber || !message) {
      setResult({ success: false, message: 'Phone number and message are required' })
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const endpoint = notificationType === 'voice' ? '/api/voice' : '/api/sms'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult({ 
          success: true, 
          message: notificationType === 'voice' 
            ? `Voice call initiated successfully!` 
            : `SMS sent successfully!`
        })
        setMessage('')
      } else {
        setResult({ success: false, message: data.error || 'Failed to send notification' })
      }
    } catch (error) {
      setResult({ success: false, message: 'Network error occurred' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md">
      <div className="flex items-center mb-4">
        <Phone className="h-6 w-6 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Test Notifications</h3>
      </div>

      <div className="space-y-4">
        {/* Notification Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notification Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="notificationType"
                value="voice"
                checked={notificationType === 'voice'}
                onChange={(e) => setNotificationType(e.target.value as 'sms' | 'voice')}
                className="mr-2"
              />
              <Phone className="h-4 w-4 mr-1" />
              Voice Call
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="notificationType"
                value="sms"
                checked={notificationType === 'sms'}
                onChange={(e) => setNotificationType(e.target.value as 'sms' | 'voice')}
                className="mr-2"
              />
              <MessageSquare className="h-4 w-4 mr-1" />
              SMS (Limited)
            </label>
          </div>
        </div>

        {/* Phone Number Input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1234567890"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Message Input */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={notificationType === 'voice' 
              ? "Enter message for voice call..." 
              : "Enter SMS message..."
            }
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Send Button */}
        <button
          onClick={handleSendNotification}
          disabled={loading || !phoneNumber || !message}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Send className="h-4 w-4 mr-2" />
          )}
          {loading 
            ? (notificationType === 'voice' ? 'Making Call...' : 'Sending SMS...') 
            : (notificationType === 'voice' ? 'Make Voice Call' : 'Send SMS')
          }
        </button>

        {/* Result Display */}
        {result && (
          <div className={`flex items-center p-3 rounded-md ${
            result.success 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            {result.success ? (
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mr-2" />
            )}
            <span className={`text-sm ${
              result.success ? 'text-green-800' : 'text-red-800'
            }`}>
              {result.message}
            </span>
          </div>
        )}

        {/* Trial Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-sm text-blue-800">
            <strong>🎯 Trial Account:</strong> Voice calls work to <strong>verified numbers only</strong>. 
            <br />
            <strong>📝 To verify:</strong> Go to Twilio Console → Phone Numbers → Verified Caller IDs → Add your number
          </p>
        </div>
      </div>
    </div>
  )
}
