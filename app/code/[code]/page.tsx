/**
 * Stats Page - Dark Theme
 * 
 * Displays statistics for a specific short link
 */

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { formatDate } from '@/lib/utils'
import FloatingNav from '@/components/FloatingNav'
import CopyButton from '@/components/CopyButton'

interface StatsPageProps {
  params: {
    code: string
  }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default async function StatsPage({ params }: StatsPageProps) {
  const { code } = params

  // Fetch the link from the database
  const { data: link, error } = await supabase
    .from('links')
    .select('*')
    .eq('code', code)
    .single() as { data: any, error: any } // Temporary cast to fix type inference

  // If link not found, show 404
  if (error || !link) {
    notFound()
  }

  const shortUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).origin : 'http://localhost:3000'}/${link.code}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <FloatingNav />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        {/* Back Button */}
        <Link 
          href="/dashboard" 
          className="inline-flex items-center text-primary-400 hover:text-primary-300 mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Link Statistics</h1>
          <p className="text-gray-400">Detailed information about your short link</p>
        </div>

        {/* Stats Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
            <div className="flex items-center">
              <div className="bg-white/20 rounded-lg p-2 mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <code className="text-xl font-mono font-bold text-white">{link.code}</code>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="p-6 space-y-6">
            {/* Short URL */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Short URL</label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-primary-400 font-mono font-semibold">
                  {shortUrl}
                </code>
                <CopyButton text={shortUrl} />
              </div>
            </div>

            {/* Target URL */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Target URL</label>
              <a 
                href={link.target_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-gray-300 hover:text-primary-400 transition-colors break-all"
              >
                {link.target_url}
              </a>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Clicks */}
              <div className="bg-primary-900/30 rounded-lg p-4 border border-primary-700/50">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-primary-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-400">Total Clicks</span>
                </div>
                <p className="text-3xl font-bold text-primary-400">{link.clicks}</p>
              </div>

              {/* Created At */}
              <div className="bg-green-900/30 rounded-lg p-4 border border-green-700/50">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm font-medium text-gray-400">Created</span>
                </div>
                <p className="text-sm font-semibold text-green-400">{formatDate(link.created_at)}</p>
              </div>

              {/* Last Clicked */}
              <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-700/50">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-purple-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-400">Last Clicked</span>
                </div>
                <p className="text-sm font-semibold text-purple-400">{formatDate(link.last_clicked)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center">
          <a
            href={`/${link.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all inline-flex items-center shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Test Redirect
          </a>
        </div>
      </main>
    </div>
  )
}
