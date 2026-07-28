import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import authOptions from "@/lib/auth";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions as any);

  if (!session || (session as any).user?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return <>{children}</>;
}