import { requireAdminRole } from "@/lib/auth/auth-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  const user = await requireAdminRole();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User ID</CardTitle>
          </CardHeader>
          <CardContent>
            <code className="text-sm bg-zinc-100 px-2 py-1 rounded">{user.id}</code>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{user.email}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Admin
            </span>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Milestone 1 Complete</CardTitle>
          <CardDescription>
            You have successfully set up authentication and admin access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Cookie-based Supabase SSR authentication</li>
            <li>Middleware with automatic session refresh</li>
            <li>Protected admin routes with role-based access</li>
            <li>Login page with error handling</li>
            <li>Auth callback route for OAuth flows</li>
            <li>Full auth service with login/logout/signup</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
