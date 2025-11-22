/**
 * Unified Floating Navbar Component
 * 
 * Dark theme floating navbar with glassmorphism effect
 */

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3' : 'py-5'
    }`}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className={`rounded-full transition-all duration-300 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-xl shadow-2xl border border-gray-700/50' 
            : 'bg-black/80 backdrop-blur-lg shadow-xl border border-gray-700/30'
        }`}>
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 text-white rounded-2xl p-4 group-hover:scale-110 transition-transform shadow-lg">
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TinyLink
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/" 
                className={`transition-colors font-medium ${
                  isActive('/') 
                    ? 'text-primary-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/dashboard" 
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-gray-300 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
