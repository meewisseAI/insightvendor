import Link from "next/link";
import { logout } from "@/lib/auth/logout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-red-700">Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access this page. Only administrators can view this content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/">
            <Button className="w-full">Go Home</Button>
          </Link>
          <form action={logout}>
            <Button variant="outline" className="w-full" type="submit">
              Logout
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
