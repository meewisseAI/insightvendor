import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/auth-service";
import { logout } from "@/lib/auth/logout";
import { SiteHeader } from "@/components/layout/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-zinc-50">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            InsightVendor
          </h1>
          <p className="text-xl text-zinc-600">
            Next.js + Supabase Authentication
          </p>
        </div>

        {user ? (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Welcome back, {user.email}</CardTitle>
                <CardDescription>
                  You are signed in with user ID: <code className="bg-zinc-100 px-2 py-1 rounded text-sm">{user.id}</code>
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Dashboard</CardTitle>
                  <CardDescription>
                    Protected admin area (requires admin role)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/admin">
                    <Button className="w-full">Access Admin</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sign Out</CardTitle>
                  <CardDescription>
                    Sign out of your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form action={logout}>
                    <Button variant="outline" className="w-full" type="submit">
                      Logout
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Sign in to access the admin dashboard and explore the features.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/auth/login">
                  <Button className="w-full">Sign In</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Milestone 1 Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>✅ Cookie-based Supabase SSR authentication</li>
                <li>✅ Middleware with automatic session refresh</li>
                <li>✅ Protected admin route with role-based access control</li>
                <li>✅ Login page at /auth/login</li>
                <li>✅ Auth callback route at /auth/callback</li>
                <li>✅ Forbidden page for unauthorized access</li>
                <li>✅ Fully typed auth service with TypeScript</li>
                <li>✅ Environment configuration example</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
