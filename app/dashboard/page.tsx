/**
 * Dashboard Page - Dark Theme
 * 
 * Main page displaying all links and form to create new ones
 */

'use client'

import { useState, useEffect } from 'react'
import FloatingNav from '@/components/FloatingNav'
import AddLinkForm from '@/components/AddLinkForm'
import LinkTable from '@/components/LinkTable'
import { Link } from '@/lib/supabaseClient'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const [links, setLinks] = useState<Link[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLinks = async () => {
    try {
      setError(null)
      const response = await fetch('/api/links')
      
      if (!response.ok) {
        throw new Error('Failed to fetch links')
      }
      
      const data = await response.json()
      setLinks(data)
    } catch (err) {
      console.error('Error fetching links:', err)
      setError('Failed to load links. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const handleLinkCreated = () => {
    fetchLinks()
  }

  const handleLinkDeleted = () => {
    fetchLinks()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <FloatingNav />
      
      <main className="container mx-auto px-4 py-24 max-w-6xl">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Create and manage your short links</p>
        </div>

        {/* Add Link Form */}
        <AddLinkForm onLinkCreated={handleLinkCreated} />

        {/* Links Section */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-4">Your Links</h2>
          
          {/* Error State */}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-12 border border-gray-700">
              <div className="flex flex-col items-center justify-center">
                <svg className="animate-spin h-10 w-10 text-primary-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-400">Loading links...</p>
              </div>
            </div>
          ) : (
            <LinkTable links={links} onLinkDeleted={handleLinkDeleted} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>TinyLink URL Shortener &copy; 2024</p>
        </div>
      </footer>
    </div>
  )
}
