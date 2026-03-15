import AdminShell from "@/components/features/admin/AdminShell";
import { requireAdmin } from "@/lib/server-auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return <AdminShell>{children}</AdminShell>;
}
