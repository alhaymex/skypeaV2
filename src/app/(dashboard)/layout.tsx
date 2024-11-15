import DashboardNavbar from "@/components/pages/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/pages/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";
import { SessionProvider } from "next-auth/react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <DashboardNavbar />
          {children}
        </main>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default layout;
