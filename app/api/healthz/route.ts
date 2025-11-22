/**
 * Health Check Endpoint
 * 
 * GET /api/healthz - Returns health status of the application
 */

import { NextResponse } from 'next/server'

/**
 * GET /api/healthz
 * Simple health check endpoint for monitoring
 * 
 * Response:
 * {
 *   "ok": true,
 *   "version": "1.0"
 * }
 */
export async function GET() {
    return NextResponse.json({
        ok: true,
        version: '1.0'
    })
}
