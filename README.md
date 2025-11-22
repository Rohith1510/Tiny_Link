# TinyLink - URL Shortener

A modern, production-ready URL shortener built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## 🚀 Features

- **Create Short Links**: Generate short URLs with custom or auto-generated codes
- **Link Management**: View, copy, and delete your short links
- **Click Tracking**: Track the number of clicks and last clicked timestamp
- **Statistics Page**: Detailed statistics for each short link
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Updates**: Instant feedback on all operations
- **Custom 404 Page**: User-friendly error page for invalid links
- **Health Check Endpoint**: Monitor application status

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (recommended)
- **Fonts**: Inter (Google Fonts)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher
- npm or yarn package manager
- A Supabase account (free tier works)

## 🔧 Installation & Setup

### 1. Clone or Download the Project

```bash
cd tinylink
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Database

1. Go to [Supabase](https://app.supabase.com) and create a new project
2. Wait for the project to be fully provisioned
3. Go to the SQL Editor in your Supabase dashboard
4. Copy the contents of `schema.sql` and run it in the SQL Editor
5. Verify the `links` table was created successfully

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Get your Supabase credentials:
   - Go to your Supabase project settings
   - Navigate to Settings > API
   - Copy the **Project URL** and **anon/public key**

3. Update `.env.local` with your credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
tinylink/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   │   ├── healthz/              # Health check endpoint
│   │   │   └── route.ts          # GET /api/healthz
│   │   └── links/                # Links API
│   │       ├── route.ts          # GET /api/links, POST /api/links
│   │       └── [code]/           # Individual link operations
│   │           └── route.ts      # GET /api/links/:code, DELETE /api/links/:code
│   ├── code/                     # Stats pages
│   │   └── [code]/               # Dynamic stats route
│   │       └── page.tsx          # GET /code/:code
│   ├── [code]/                   # Redirect handler
│   │   └── page.tsx              # GET /:code (redirects)
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx             # Custom 404 page
│   └── page.tsx                  # Dashboard (home page)
├── components/                   # React components
│   ├── AddLinkForm.tsx           # Form to create new links
│   ├── DeleteModal.tsx           # Confirmation modal for deletion
│   ├── Header.tsx                # Application header
│   └── LinkTable.tsx             # Table displaying all links
├── lib/                          # Utility functions and configs
│   ├── supabaseClient.ts         # Supabase client configuration
│   └── utils.ts                  # Helper functions
├── .env.example                  # Environment variable template
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── postcss.config.js             # PostCSS configuration
├── README.md                     # This file
├── schema.sql                    # Database schema
├── tailwind.config.ts            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🔌 API Endpoints

### Health Check

**GET** `/api/healthz`

Returns the health status of the application.

**Response:**
```json
{
  "ok": true,
  "version": "1.0"
}
```

---

### Create Link

**POST** `/api/links`

Creates a new short link.

**Request Body:**
```json
{
  "target_url": "https://example.com/very/long/url",
  "code": "mycode"  // Optional: 6-8 alphanumeric characters
}
```

**Responses:**
- `201 Created`: Link created successfully
- `400 Bad Request`: Invalid URL or code format
- `409 Conflict`: Code already exists
- `500 Internal Server Error`: Server error

---

### Get All Links

**GET** `/api/links`

Retrieves all links ordered by creation date (newest first).

**Response:**
```json
[
  {
    "id": "uuid",
    "code": "abc123",
    "target_url": "https://example.com",
    "clicks": 42,
    "last_clicked": "2024-01-15T10:30:00Z",
    "created_at": "2024-01-10T08:00:00Z"
  }
]
```

---

### Get Single Link

**GET** `/api/links/:code`

Retrieves a specific link by code.

**Responses:**
- `200 OK`: Link found
- `404 Not Found`: Link doesn't exist

---

### Delete Link

**DELETE** `/api/links/:code`

Deletes a link by code.

**Responses:**
- `204 No Content`: Link deleted successfully
- `404 Not Found`: Link doesn't exist

---

### Redirect

**GET** `/:code`

Redirects to the target URL, increments click counter, and updates last_clicked timestamp.

**Responses:**
- `302 Found`: Redirects to target URL
- `404 Not Found`: Link doesn't exist (custom 404 page)

---

### Stats Page

**GET** `/code/:code`

Displays statistics for a specific link (server-side rendered).

## 🗄️ Database Schema

```sql
CREATE TABLE links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(8) NOT NULL UNIQUE,
  target_url TEXT NOT NULL,
  clicks INTEGER NOT NULL DEFAULT 0,
  last_clicked TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_links_code ON links(code);
CREATE INDEX idx_links_created_at ON links(created_at DESC);
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Go to [Vercel](https://vercel.com) and sign in

3. Click "New Project" and import your repository

4. Configure environment variables:
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5. Click "Deploy"

Your application will be live at `https://your-project.vercel.app`

### Deploy to Other Platforms

This is a standard Next.js application and can be deployed to any platform that supports Node.js:

- **Netlify**: Use the Netlify CLI or connect your Git repository
- **Railway**: Connect your repository and set environment variables
- **AWS Amplify**: Deploy via Git or CLI
- **DigitalOcean App Platform**: Connect repository and configure build settings

## 🧪 Testing

### Manual Testing Checklist

- [ ] Create a link with auto-generated code
- [ ] Create a link with custom code
- [ ] Try to create a link with invalid URL (should show error)
- [ ] Try to create a link with invalid code format (should show error)
- [ ] Try to create a link with duplicate code (should show 409 error)
- [ ] View all links in the dashboard
- [ ] Copy a short URL using the copy button
- [ ] Click on a short URL and verify redirect works
- [ ] Verify click counter increments after redirect
- [ ] View stats page for a link
- [ ] Delete a link (with confirmation)
- [ ] Try to access a deleted link (should show 404)
- [ ] Test responsive design on mobile/tablet
- [ ] Check health endpoint: `/api/healthz`

## 🎨 UI Features

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Loading States**: Skeleton loaders and spinners for better UX
- **Error Handling**: Clear error messages for all failure scenarios
- **Success Feedback**: Visual confirmation for successful operations
- **Copy to Clipboard**: One-click copying of short URLs
- **Confirmation Modals**: Prevent accidental deletions
- **Empty States**: Helpful messages when no data is available

## 🔒 Validation Rules

### URL Validation
- Must be a valid URL format
- Must start with `http://` or `https://`
- Must have a valid hostname

### Code Validation
- Must be 6-8 characters long
- Only alphanumeric characters allowed (A-Z, a-z, 0-9)
- Regex pattern: `^[A-Za-z0-9]{6,8}$`

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key | Yes |

## 🐛 Troubleshooting

### "Missing Supabase environment variables" Error

**Solution**: Ensure `.env.local` exists and contains valid Supabase credentials.

### Database Connection Errors

**Solution**: 
1. Verify your Supabase project is active
2. Check that the `links` table exists
3. Confirm your API keys are correct

### Build Errors

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Links Not Appearing

**Solution**:
1. Check browser console for errors
2. Verify Supabase connection
3. Ensure the database schema is correctly set up

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This is a take-home assignment project. For production use, consider adding:

- User authentication
- Rate limiting
- Analytics dashboard
- QR code generation
- Custom domains
- Link expiration
- Password-protected links

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the Supabase documentation
3. Check Next.js documentation

---

**Built with ❤️ using Next.js 14, TypeScript, and Supabase**
