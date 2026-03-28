# InsightVendor - Next.js + Supabase Authentication

A complete, production-ready authentication scaffold built with Next.js App Router and Supabase using cookie-based SSR authentication.

## Milestone 1: Authentication Setup ✅

This implementation includes everything needed for a secure, scalable authentication system:

### Features

- **🔐 Cookie-Based Supabase SSR Auth** - Secure authentication using HTTP-only cookies
- **⚡ Automatic Session Refresh** - Middleware-powered session refresh on every request
- **👤 User Authentication** - Complete login/signup/logout flow
- **🛡️ Protected Routes** - Admin routes with role-based access control
- **📋 Role-Based Access Control** - Admin, Editor, Viewer roles with policy routing
- **🎨 Beautiful UI** - Tailwind CSS styled pages with dark mode support
- **✨ TypeScript** - Fully typed for type safety
- **♻️ Server Actions** - Next.js server actions for secure auth operations

### Routes

- `/` - Home page (public, shows auth status)
- `/auth/login` - Login page (public)
- `/auth/callback` - OAuth callback handler (automatic, used by Supabase)
- `/admin` - Admin dashboard (protected, requires admin role)
- `/forbidden` - Access denied page (shown when unauthorized)

### Project Structure

```
app/
├── layout.tsx              # Root layout with metadata
├── page.tsx                # Home page with auth status
├── globals.css             # Tailwind CSS
├── favicon.ico
├── auth/
│   ├── login/
│   │   └── page.tsx        # Login page
│   └── callback/
│       └── route.ts        # OAuth callback handler
├── admin/
│   └── page.tsx            # Protected admin dashboard
└── forbidden/
    └── page.tsx            # Access denied page

lib/
├── supabase/
│   ├── client.ts           # Browser client (client-side)
│   └── server.ts           # Server client (server-side, SSR)
└── auth/
    ├── auth-service.ts     # Main auth service (login, logout, requireAuth)
    ├── get-user-role.ts    # Role-based access helper
    └── logout.ts           # Server action for logout

middleware.ts              # Session refresh middleware
.env.example              # Environment variables template
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file with your Supabase credentials:

```bash
cp .env.example .env.local
```

Then update with your Supabase project details:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

Get these values from your Supabase dashboard:
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click "Settings" > "API"
4. Copy the Project URL and Publishable Key (anon key)

### 3. Create Supabase Schema

Create a `profiles` table in Supabase for role management:

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'editor', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own profile
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

### Authentication Flow

1. **Login** - User submits credentials on `/auth/login`
2. **Session Created** - Supabase creates a session and sets HTTP-only cookie
3. **Middleware** - On every request, middleware refreshes the session
4. **Protected Routes** - Routes check for valid session and required role
5. **Logout** - Server action clears the session cookie and redirects

### Session Management

The middleware (`middleware.ts`) intercepts all requests and:
- Retrieves the current session from cookies
- Refreshes the session with Supabase (extends expiry)
- Updates cookies if session was refreshed
- Allows the request to proceed

This ensures users stay logged in as long as they're active.

### Role-Based Access Control

User roles are stored in the `profiles` table:
- **admin** - Full access to admin dashboard
- **editor** - Can edit content (available in Milestone 2)
- **viewer** - Read-only access (default role)

The `requireAdminRole()` function checks the user's role and redirects to `/forbidden` if unauthorized.

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Testing the Auth System

### Test Login
1. Create a new user in Supabase (Sign Up page, or use Supabase dashboard)
2. Sign in with the credentials
3. You'll be redirected to the home page
4. Click "Admin Dashboard" to test protected route
5. If your user doesn't have admin role, you'll see the "Access Denied" page

### Test Protected Routes
- Try accessing `/admin` while not logged in - redirected to `/auth/login`
- Try accessing `/admin` with a non-admin user - redirected to `/forbidden`
- Logged out? Try accessing protected routes - redirected to `/auth/login`

### Test Session Refresh
- Log in and leave the browser open for several minutes
- The middleware automatically refreshes your session
- Even if your session cookie expires, it's renewed with each request

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Your Supabase publishable key (anon) |

**Note:** These are marked `NEXT_PUBLIC_` because they're safe to expose (they're already public). Never expose the `SERVICE_ROLE_KEY`.

## API Reference

### Auth Service Functions

```typescript
// lib/auth/auth-service.ts

// Get current user or null if not authenticated
getCurrentUser(): Promise<User | null>

// Perform server-side login
login(email: string, password: string): Promise<{ data } | { error }>

// Perform server-side signup
signUp(email: string, password: string): Promise<{ data } | { error }>

// Redirect to logout and clear session
logout(): Promise<void>

// Require authenticated user (redirect to login if not)
requireAuth(): Promise<User>

// Require admin role (redirect to forbidden if not admin)
requireAdminRole(): Promise<User>
```

### Supabase Clients

```typescript
// lib/supabase/client.ts - Browser client
// Use in client components with @use client directive
const supabase = createClient();

// lib/supabase/server.ts - Server client
// Use in server components and server actions
const supabase = await createClient();
```

## Database Schema

### profiles table

```typescript
interface Profile {
  id: string;              // User ID (from auth.users)
  email: string;           // User email
  role: 'admin' | 'editor' | 'viewer';  // User role
  created_at: timestamp;   // Creation timestamp
  updated_at: timestamp;   // Last update timestamp
}
```

## Deployment

This app is ready to deploy to Vercel:

1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

```
NEXT_PUBLIC_SUPABASE_URL = your_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = your_key
```

## File Specifications

### `/middleware.ts`
- Runs on every request
- Refreshes Supabase session
- Handles cookie synchronization
- Excludes static assets

### `app/auth/login/page.tsx`
- Client component with form
- Handles sign-in with error display
- Redirects to home on success

### `app/auth/callback/route.ts`
- API route for OAuth
- Exchanges auth code for session
- Redirects to intended page

### `app/admin/page.tsx`
- Server component
- Requires admin role
- Shows user info and admin features
- Includes logout button

### `app/forbidden/page.tsx`
- Unauthorized access page
- Shows when accessing protected routes without permission

## Next Steps (Milestone 2)

Future enhancements include:
- Email verification
- Password reset flow
- Social OAuth login (Google, GitHub)
- User profile management
- Admin user management interface
- Activity logging
- Two-factor authentication (2FA)

## Support

For issues or questions:
1. Check the [Supabase docs](https://supabase.com/docs)
2. Check the [Next.js docs](https://nextjs.org/docs)
3. Review the code comments in the source files

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Built with Next.js 16.2.1 + Supabase + TypeScript**
