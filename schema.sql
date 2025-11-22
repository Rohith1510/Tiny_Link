-- TinyLink URL Shortener Database Schema
-- This schema creates the links table for storing shortened URLs

-- Create the links table
CREATE TABLE IF NOT EXISTS links (
  -- Unique identifier for each link (UUID)
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Short code for the URL (6-8 alphanumeric characters)
  -- Must be unique across all links
  code VARCHAR(8) NOT NULL UNIQUE,
  
  -- The original/target URL to redirect to
  target_url TEXT NOT NULL,
  
  -- Number of times this link has been clicked
  clicks INTEGER NOT NULL DEFAULT 0,
  
  -- Timestamp of the last time this link was clicked
  -- NULL if never clicked
  last_clicked TIMESTAMPTZ,
  
  -- Timestamp when this link was created
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create an index on the code column for faster lookups
-- This is critical for performance since every redirect queries by code
CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);

-- Create an index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_links_created_at ON links(created_at DESC);

-- Example usage:
-- Insert a new link:
-- INSERT INTO links (code, target_url) VALUES ('abc123', 'https://example.com');

-- Query a link by code:
-- SELECT * FROM links WHERE code = 'abc123';

-- Increment clicks and update last_clicked:
-- UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = 'abc123';

-- Get all links ordered by creation date:
-- SELECT * FROM links ORDER BY created_at DESC;
