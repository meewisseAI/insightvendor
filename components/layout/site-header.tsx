import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { logout } from "@/lib/auth/logout";
import { Button } from "@/components/ui/button";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-zinc-900">
              InsightVendor
            </Link>
          </div>

          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  href="/admin"
                  className="text-sm font-medium text-zinc-700 hover:text-zinc-900"
                >
                  Admin
                </Link>
                <form action={logout}>
                  <Button variant="outline" size="sm" type="submit">
                    Logout
                  </Button>
                </form>
              </>
            ) : (
              <Link href="/auth/login">
                <Button size="sm">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}