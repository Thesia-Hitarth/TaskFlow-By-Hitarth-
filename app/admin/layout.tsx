import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

import { isAdmin } from "@/lib/admin/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  
  if (!isAdmin(session)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-border pb-4 mb-6">
          <h1 className="text-2xl font-bold">Admin Console</h1>
          <p className="text-sm text-text-secondary">TaskFlow platform monitoring & settings</p>
        </div>
        {children}
      </div>
    </div>
  );
}
