/**
 * Header Component
 * 
 * Main navigation header for the application
 */

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="bg-white text-primary-600 rounded-lg p-2">
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" 
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold">TinyLink</h1>
              <p className="text-xs text-primary-100">URL Shortener</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="hover:text-primary-100 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/dashboard" 
              className="hover:text-primary-100 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-100 transition-colors font-medium"
            >
              GitHub
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
