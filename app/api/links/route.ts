/**
 * API Routes for Links
 * 
 * POST /api/links - Create a new short link
 * GET /api/links - Get all links
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { isValidUrl, isValidCode, generateRandomCode } from '@/lib/utils'

/**
 * POST /api/links
 * Creates a new short link
 * 
 * Request body:
 * - target_url: string (required) - The URL to shorten
 * - code: string (optional) - Custom short code (6-8 alphanumeric chars)
 * 
 * Responses:
 * - 201: Link created successfully
 * - 400: Invalid URL or code format
 * - 409: Code already exists
 * - 500: Server error
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { target_url, code } = body

        // Validate target_url is provided
        if (!target_url) {
            return NextResponse.json(
                { error: 'target_url is required' },
                { status: 400 }
            )
        }

        // Validate URL format
        if (!isValidUrl(target_url)) {
            return NextResponse.json(
                { error: 'Invalid URL format. URL must start with http:// or https://' },
                { status: 400 }
            )
        }

        // If custom code is provided, validate it
        let shortCode = code
        if (shortCode) {
            if (!isValidCode(shortCode)) {
                return NextResponse.json(
                    { error: 'Invalid code format. Code must be 6-8 alphanumeric characters (A-Z, a-z, 0-9)' },
                    { status: 400 }
                )
            }
        } else {
            // Generate a random code if not provided
            // Try up to 5 times to find a unique code
            let attempts = 0
            let isUnique = false

            while (!isUnique && attempts < 5) {
                shortCode = generateRandomCode(6)

                // Check if code already exists
                const { data: existing } = await supabase
                    .from('links')
                    .select('code')
                    .eq('code', shortCode)
                    .single()

                if (!existing) {
                    isUnique = true
                }
                attempts++
            }

            if (!isUnique) {
                return NextResponse.json(
                    { error: 'Failed to generate unique code. Please try again.' },
                    { status: 500 }
                )
            }
        }

        // Insert the new link
        const { data, error } = await supabase
            .from('links')
            .insert({
                code: shortCode,
                target_url: target_url,
            })
            .select()
            .single()

        // Handle duplicate code error
        if (error) {
            if (error.code === '23505') { // PostgreSQL unique violation error code
                return NextResponse.json(
                    { error: 'Code already exists. Please choose a different code.' },
                    { status: 409 }
                )
            }

            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to create link' },
                { status: 500 }
            )
        }

        // Return the created link with 201 status
        return NextResponse.json(data, { status: 201 })

    } catch (error) {
        console.error('Error creating link:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

/**
 * GET /api/links
 * Retrieves all links ordered by creation date (newest first)
 * 
 * Responses:
 * - 200: Array of links
 * - 500: Server error
 */
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('links')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to fetch links' },
                { status: 500 }
            )
        }

        return NextResponse.json(data || [])

    } catch (error) {
        console.error('Error fetching links:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
