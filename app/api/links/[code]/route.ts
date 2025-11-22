/**
 * API Routes for Individual Links
 * 
 * GET /api/links/:code - Get a specific link by code
 * DELETE /api/links/:code - Delete a link by code
 */

import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

/**
 * GET /api/links/:code
 * Retrieves a specific link by its code
 * 
 * Responses:
 * - 200: Link found and returned
 * - 404: Link not found
 * - 500: Server error
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        const { code } = params

        const { data, error } = await supabase
            .from('links')
            .select('*')
            .eq('code', code)
            .single()

        if (error || !data) {
            return NextResponse.json(
                { error: 'Link not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(data)

    } catch (error) {
        console.error('Error fetching link:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

/**
 * DELETE /api/links/:code
 * Deletes a link by its code
 * 
 * Responses:
 * - 204: Link deleted successfully (no content)
 * - 404: Link not found
 * - 500: Server error
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { code: string } }
) {
    try {
        const { code } = params

        // First check if the link exists
        const { data: existing } = await supabase
            .from('links')
            .select('code')
            .eq('code', code)
            .single()

        if (!existing) {
            return NextResponse.json(
                { error: 'Link not found' },
                { status: 404 }
            )
        }

        // Delete the link
        const { error } = await supabase
            .from('links')
            .delete()
            .eq('code', code)

        if (error) {
            console.error('Database error:', error)
            return NextResponse.json(
                { error: 'Failed to delete link' },
                { status: 500 }
            )
        }

        // Return 204 No Content on successful deletion
        return new NextResponse(null, { status: 204 })

    } catch (error) {
        console.error('Error deleting link:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
