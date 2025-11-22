# 🗄️ Supabase Database Setup Guide

Follow these simple steps to create the necessary table for your TinyLink project.

## Step 1: Log in to Supabase
1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Click **"New Project"**
4. Give it a name (e.g., "TinyLink") and a strong password
5. Choose a region close to you
6. Click **"Create new project"** and wait for it to be ready (takes ~1-2 mins)

## Step 2: Open the SQL Editor
1. Once your project is ready, look at the left sidebar.
2. Click on the **SQL Editor** icon (it looks like a terminal symbol `>_` or a page with code).
3. Click **"New query"** (or "Blank query").

## Step 3: Run the Schema Code
1. Copy the **entire** code block below:

```sql
-- Create the links table
CREATE TABLE IF NOT EXISTS links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(8) NOT NULL UNIQUE,
  target_url TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  last_clicked TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);
CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at DESC);
```

2. Paste it into the SQL Editor in Supabase.
3. Click the **"Run"** button (bottom right or top right of the editor).
4. You should see a message saying "Success" or "No rows returned".

## Step 4: Verify the Table
1. Click on the **Table Editor** icon in the left sidebar (looks like a grid/table).
2. You should see a table named `links`.
3. If you see it, you're done!

## Step 5: Get API Credentials
1. Go to **Settings** (gear icon) > **API**.
2. Find **Project URL** and **anon / public** key.
3. Copy these into your `.env` or `.env.local` file in the project.

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```
