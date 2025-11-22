/**
 * Link Table Component - Dark Theme
 * 
 * Displays all short links in a responsive table with actions
 */

'use client'

import { useState } from 'react'
import { Link as LinkType } from '@/lib/supabaseClient'
import { formatDate, truncateUrl, copyToClipboard } from '@/lib/utils'
import DeleteModal from './DeleteModal'

interface LinkTableProps {
  links: LinkType[]
  onLinkDeleted: () => void
}

export default function LinkTable({ links, onLinkDeleted }: LinkTableProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [linkToDelete, setLinkToDelete] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleCopyClick = async (code: string) => {
    const shortUrl = `${window.location.origin}/${code}`
    try {
      await copyToClipboard(shortUrl)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDeleteClick = (code: string) => {
    setLinkToDelete(code)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!linkToDelete) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/links/${linkToDelete}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        onLinkDeleted()
        setDeleteModalOpen(false)
        setLinkToDelete(null)
      } else {
        alert('Failed to delete link')
      }
    } catch (err) {
      console.error('Error deleting link:', err)
      alert('An error occurred while deleting the link')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
    setLinkToDelete(null)
  }

  // Empty state
  if (links.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-12 text-center border border-gray-700">
        <svg className="mx-auto h-12 w-12 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <h3 className="text-lg font-medium text-white mb-2">No links yet</h3>
        <p className="text-gray-400">Create your first short link to get started!</p>
      </div>
    )
  }

  return (
    <>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl overflow-hidden border border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Target URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Last Clicked
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/30 divide-y divide-gray-700">
              {links.map((link) => (
                <tr key={link.id} className="hover:bg-gray-700/30 transition-colors">
                  {/* Code */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <code className="text-sm font-mono font-semibold text-primary-400 bg-primary-900/30 px-2 py-1 rounded border border-primary-700/50">
                        {link.code}
                      </code>
                    </div>
                  </td>

                  {/* Target URL */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300 max-w-xs">
                      <a 
                        href={link.target_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary-400 transition-colors"
                        title={link.target_url}
                      >
                        {truncateUrl(link.target_url, 50)}
                      </a>
                    </div>
                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-sm text-white font-medium">{link.clicks}</span>
                    </div>
                  </td>

                  {/* Last Clicked */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {formatDate(link.last_clicked)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {/* Copy Button */}
                      <button
                        onClick={() => handleCopyClick(link.code)}
                        className="text-primary-400 hover:text-primary-300 transition-colors p-2 rounded hover:bg-primary-900/30"
                        title="Copy short URL"
                      >
                        {copiedCode === link.code ? (
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                      </button>

                      {/* Stats Link */}
                      <a
                        href={`/code/${link.code}`}
                        className="text-gray-400 hover:text-white transition-colors p-2 rounded hover:bg-gray-700/50"
                        title="View statistics"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </a>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDeleteClick(link.code)}
                        className="text-red-400 hover:text-red-300 transition-colors p-2 rounded hover:bg-red-900/30"
                        title="Delete link"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        linkCode={linkToDelete || ''}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  )
}
