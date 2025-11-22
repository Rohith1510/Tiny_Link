-- Disable Row Level Security (RLS) to allow public updates
-- Run this in the Supabase SQL Editor if your clicks are not updating

ALTER TABLE links DISABLE ROW LEVEL SECURITY;

-- Alternatively, if you want to keep RLS enabled, add a policy:
-- CREATE POLICY "Allow public updates" ON links FOR UPDATE USING (true);
