# 🔧 Troubleshooting: Clicks Not Counting

If your click counters are not updating, it is almost certainly due to **Row Level Security (RLS)** in Supabase.

## The Cause
By default, Supabase enables RLS, which blocks "anonymous" users (users who aren't logged in) from modifying data. Since your redirect page is public, it counts as an anonymous user trying to update the database.

## The Fix

1.  **Go to Supabase**: [https://app.supabase.com](https://app.supabase.com)
2.  **Open your Project**.
3.  **Click "SQL Editor"** (left sidebar, icon looks like `>_`).
4.  **Paste and Run** this command:

```sql
ALTER TABLE links DISABLE ROW LEVEL SECURITY;
```

## Verify It Works

1.  Go back to your app.
2.  Click a short link.
3.  Check the terminal where `npm run dev` is running.
    *   **Success**: You won't see any errors.
    *   **Failure**: You will see `Error updating clicks: ...`
4.  Refresh the stats page. The count should now be higher!
