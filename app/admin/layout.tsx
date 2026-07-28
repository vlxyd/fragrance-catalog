import React from "react";

import Sidebar from "@/components/admin/Sidebar";

export const metadata = {
  title: "Admin - Agape Essence",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0D0B09]">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex flex-1 flex-col overflow-hidden bg-[#0D0B09]">


  <main className="flex-1 overflow-hidden p-5">
  {children}
</main>
</div>
    </div>
  );
}