import { requireAdminRole } from "@/lib/auth/auth-service";
import { AdminShell } from "@/components/layout/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will redirect if not admin
  await requireAdminRole();

  return (
    <AdminShell title="Admin Dashboard" description="Manage your application">
      {children}
    </AdminShell>
  );
}