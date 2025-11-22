/**
 * Redirect Handler Page
 * 
 * Handles /:code routes - increments clicks and redirects to target URL
 */

import { redirect, notFound } from 'next/navigation'
import { supabase, Database } from '@/lib/supabaseClient'
import { Link } from '@/lib/supabaseClient'

interface RedirectPageProps {
  params: {
    code: string
  }
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { code } = params

  // Fetch the link from the database
  const { data: link, error } = await supabase
    .from('links')
    .select('*')
    .eq('code', code)
    .single() as { data:Link|null, error: any } // Temporary cast to fix type inference

  // If link not found, show 404
  if (error || !link) {
    notFound()
  }

  // Increment clicks and update last_clicked timestamp
  // We must await this to ensure the update happens before the request context is torn down
  const { error: updateError } = await supabase
    .from('links')
    // @ts-ignore - Supabase type inference issue with Update type
    .update({
      clicks: link.clicks + 1,
      last_clicked: new Date().toISOString(),
    })
    .eq('code', code)

  if (updateError) {
    console.error('Error updating clicks:', updateError)
  }

  // Perform 302 redirect to target URL
  redirect(link.target_url)
}
