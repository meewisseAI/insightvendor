import { getCurrentUser } from "@/lib/auth/auth-service";
import { logout } from "@/lib/auth/logout";
import { Button } from "@/components/ui/button";

interface AdminShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export async function AdminShell({ children, title, description }: AdminShellProps) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-zinc-900">{title}</h1>
              {description && (
                <p className="text-sm text-zinc-600">{description}</p>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-zinc-600">
                Welcome, {user?.email}
              </span>
              <form action={logout}>
                <Button variant="outline" size="sm" type="submit">
                  Logout
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}