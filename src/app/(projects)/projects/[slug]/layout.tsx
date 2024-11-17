import DashboardNavbar from "@/components/pages/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/pages/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const session = await getSession();

  if (!session || !session.user) {
    redirect("/login");
  }

  const slug = (await params).slug;

  return (
    <SidebarProvider>
      <DashboardSidebar slug={slug} />
      <main className="w-full">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
