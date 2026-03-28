import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { logout } from "@/lib/auth/logout";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900">
      <div className="w-full max-w-4xl mx-auto py-16 px-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                InsightVendor
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                Next.js + Supabase Authentication Example
              </p>
            </div>
          </div>

          {user ? (
            <div className="space-y-6">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h2 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-2">
                  ✅ You are signed in
                </h2>
                <p className="text-green-800 dark:text-green-400 mb-4">
                  Welcome back, <span className="font-semibold">{user.email}</span>
                </p>
                <div className="text-sm text-green-700 dark:text-green-400">
                  User ID: <code className="font-mono bg-green-100 dark:bg-green-900 px-2 py-1 rounded">{user.id}</code>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/admin"
                  className="block p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:shadow-lg transition cursor-pointer"
                >
                  <div className="text-2xl mb-2">🔐</div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-300">Admin Dashboard</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                    Protected admin area (requires admin role)
                  </p>
                </Link>

                <button
                  onClick={() => document.querySelector('form')?.submit()}
                  className="block p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:shadow-lg transition cursor-pointer text-left"
                >
                  <form action={logout} className="hidden">
                    <button type="submit" />
                  </form>
                  <div className="text-2xl mb-2">🚪</div>
                  <h3 className="font-semibold text-red-900 dark:text-red-300">Logout</h3>
                  <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                    Sign out of your account
                  </p>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <h2 className="text-lg font-semibold text-yellow-900 dark:text-yellow-300 mb-2">
                  👋 Welcome
                </h2>
                <p className="text-yellow-800 dark:text-yellow-400">
                  You are not signed in. Please log in to access the admin dashboard.
                </p>
              </div>

              <Link
                href="/auth/login"
                className="inline-block px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition font-semibold"
              >
                Sign In
              </Link>
            </div>
          )}

          <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">📚 Milestone 1 Setup:</h3>
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <li>✅ Cookie-based Supabase SSR authentication</li>
              <li>✅ Middleware with automatic session refresh</li>
              <li>✅ Protected admin route with role-based access control</li>
              <li>✅ Login page at /auth/login</li>
              <li>✅ Auth callback route at /auth/callback</li>
              <li>✅ Forbidden page for unauthorized access</li>
              <li>✅ Fully typed auth service with TypeScript</li>
              <li>✅ Environment configuration example</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
