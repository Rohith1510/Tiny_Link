/**
 * Add Link Form Component - Dark Theme
 * 
 * Form for creating new short links with validation
 */

'use client'

import { useState } from 'react'
import { isValidUrl, isValidCode } from '@/lib/utils'

interface AddLinkFormProps {
  onLinkCreated: () => void
}

export default function AddLinkForm({ onLinkCreated }: AddLinkFormProps) {
  const [targetUrl, setTargetUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Client-side validation
    if (!targetUrl.trim()) {
      setError('Please enter a URL')
      return
    }

    if (!isValidUrl(targetUrl)) {
      setError('Please enter a valid URL (must start with http:// or https://)')
      return
    }

    if (customCode && !isValidCode(customCode)) {
      setError('Custom code must be 6-8 alphanumeric characters (A-Z, a-z, 0-9)')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          target_url: targetUrl,
          code: customCode || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create link')
        return
      }

      // Success!
      setSuccess(`Link created successfully! Code: ${data.code}`)
      setTargetUrl('')
      setCustomCode('')
      
      // Notify parent component to refresh the list
      onLinkCreated()

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
      
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Error creating link:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-6 mb-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-4">Create Short Link</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Target URL Input */}
        <div>
          <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-300 mb-2">
            Target URL <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="targetUrl"
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            placeholder="https://example.com/very/long/url"
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
            disabled={isLoading}
          />
        </div>

        {/* Custom Code Input (Optional) */}
        <div>
          <label htmlFor="customCode" className="block text-sm font-medium text-gray-300 mb-2">
            Custom Code <span className="text-gray-500 text-xs">(optional, 6-8 characters)</span>
          </label>
          <input
            type="text"
            id="customCode"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="mycode"
            maxLength={8}
            className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave empty to generate a random code
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-900/50 border border-green-700 text-green-200 px-4 py-3 rounded-lg animate-fade-in">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Short Link
            </>
          )}
        </button>
      </form>
    </div>
  )
}
