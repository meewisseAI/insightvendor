import { requireAdminRole } from "@/lib/auth/auth-service";
import { logout } from "@/lib/auth/logout";

export default async function AdminPage() {
  const user = await requireAdminRole();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900">
      <div className="w-full max-w-4xl mx-auto py-16 px-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                Welcome back, {user.email}
              </p>
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">User ID</div>
              <div className="text-xl font-semibold text-zinc-900 dark:text-white mt-1 font-mono text-sm">
                {user.id}
              </div>
            </div>

            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Email</div>
              <div className="text-xl font-semibold text-zinc-900 dark:text-white mt-1">
                {user.email}
              </div>
            </div>

            <div className="p-6 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Role</div>
              <div className="text-xl font-semibold text-zinc-900 dark:text-white mt-1">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-sm font-medium">
                  Admin
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">
              🎉 Milestone 1 Complete
            </h2>
            <p className="text-blue-800 dark:text-blue-400 text-sm">
              You have successfully set up:
            </p>
            <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 text-sm mt-3 space-y-1">
              <li>Cookie-based Supabase SSR authentication</li>
              <li>Middleware with automatic session refresh</li>
              <li>Protected admin routes with role-based access</li>
              <li>Login page with error handling</li>
              <li>Auth callback route for OAuth flows</li>
              <li>Full auth service with login/logout/signup</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
