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
  console.log('Attempting to update link:', code, 'Current clicks:', link.clicks)
  // @ts-ignore - Custom Supabase RPC function
  const { error: updateError } = await supabase.rpc('increment_clicks', {
    link_code: code 
  })

if (updateError) {
  console.error('Error updating clicks:', updateError)
}
  // console.log('Update result:', { updateData, updateError })


  // Perform 302 redirect to target URL
  redirect(link.target_url)
}
