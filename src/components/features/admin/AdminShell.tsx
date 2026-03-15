"use client";

import AdminSidebar from "./AdminSidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      <AdminSidebar />
      <main className="min-w-0 flex-1 bg-white">{children}</main>
    </div>
  );
}
