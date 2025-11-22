/**
 * Custom 404 Not Found Page - Dark Theme
 * 
 * Displayed when a short link code doesn't exist
 */

import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <FloatingNav />
      
      <main className="container mx-auto px-4 py-24 max-w-2xl">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-12 text-center border border-gray-700">
          {/* 404 Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-red-900/50 mb-6 border border-red-700">
            <svg className="h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-white mb-4">404 - Link Not Found</h1>
          
          {/* Description */}
          <p className="text-lg text-gray-400 mb-8">
            The short link you're looking for doesn't exist or has been deleted.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all inline-flex items-center justify-center shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Dashboard
            </Link>
            
            <Link
              href="/"
              className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
