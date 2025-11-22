/**
 * Landing Page - Dark Theme
 * 
 * Hero section with animated background and CTA
 */

import Link from 'next/link'
import FloatingNav from '@/components/FloatingNav'
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <FloatingNav />

      <DottedGlowBackground>
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 pt-16">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center space-y-8 animate-fade-in">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border-[3px] border-pink-800">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-gray-300">Fast, Simple, Powerful</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Shorten Your Links,
                <br />
                <span className="bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Amplify Your Reach
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Create short, memorable links in seconds. Track clicks, analyze performance, and share with confidence.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link 
                  href="/dashboard"
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all hover:scale-105"
                >
                  <span className="flex items-center space-x-2">
                    <span>Get Started Free</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DottedGlowBackground>

    </div>
  )
}
