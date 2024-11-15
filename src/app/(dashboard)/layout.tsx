import DashboardNavbar from "@/components/common/DashboardNavbar";
import DashboardSidebar from "@/components/common/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
