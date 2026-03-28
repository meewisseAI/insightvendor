import Link from "next/link";
import { logout } from "@/lib/auth/logout";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-black dark:to-zinc-900 flex items-center justify-center">
      <div className="w-full max-w-md text-center px-4">
        <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 space-y-6">
          <div className="text-6xl mb-4">🔒</div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Access Denied
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              You don't have permission to access this page. Only administrators can view this content.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition font-semibold"
            >
              Go Home
            </Link>
            <form action={logout} className="flex-1">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Logout
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
