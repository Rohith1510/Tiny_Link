# TinyLink - Quick Start Guide

## 🚀 Quick Commands

### Install Dependencies
```bash
npm install --legacy-peer-deps

# For Windows users, also install SWC binary:
npm install @next/swc-win32-x64-msvc --save-optional
```

### Run Development Server
```bash
npm run dev
```
Then open http://localhost:3000

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Run Linter
```bash
npm run lint
```

---

## 📝 Setup Steps (First Time)

### 1. Install Dependencies
```bash
cd tinylink
npm install --legacy-peer-deps
```

### 2. Set Up Supabase

1. Go to https://app.supabase.com
2. Create a new project
3. Wait for provisioning to complete
4. Go to SQL Editor
5. Run the SQL from `schema.sql` file
6. Go to Settings > API
7. Copy your Project URL and anon key

### 3. Configure Environment Variables

Create `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run the Project
```bash
npm run dev
```

Open http://localhost:3000 in your browser!

---

## 🔧 Troubleshooting

### SWC binary error (Windows)
If you see "Failed to load SWC binary for win32/x64":
```bash
npm install @next/swc-win32-x64-msvc --save-optional
```

### npm install fails
Try with legacy peer deps:
```bash
npm install --legacy-peer-deps
```

### Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Port 3000 already in use
```bash
# Kill the process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or run on different port
npm run dev -- -p 3001
```

### Supabase connection errors
- Verify your `.env.local` file exists
- Check that credentials are correct
- Ensure database schema is set up
- Confirm Supabase project is active

---

## 📦 Project Structure

```
tinylink/
├── app/                    # Next.js pages and API routes
│   ├── api/               # API endpoints
│   ├── [code]/            # Redirect handler
│   ├── code/[code]/       # Stats page
│   └── page.tsx           # Dashboard
├── components/            # React components
├── lib/                   # Utilities and configs
├── schema.sql             # Database schema
└── .env.local            # Your environment variables (create this!)
```

---

## 🌐 Available Routes

- `/` - Dashboard (create and manage links)
- `/:code` - Redirect to target URL
- `/code/:code` - View link statistics
- `/api/links` - API endpoints
- `/api/healthz` - Health check

---

## ✅ Testing Checklist

After running the project:

1. ✅ Dashboard loads at http://localhost:3000
2. ✅ Create a link with auto-generated code
3. ✅ Create a link with custom code
4. ✅ Copy short URL
5. ✅ Click short URL and verify redirect
6. ✅ View stats page
7. ✅ Delete a link
8. ✅ Test invalid link (should show 404)

---

## 🚢 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

Or use the Vercel web interface:
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

---

**Need help? Check README.md for full documentation!**
