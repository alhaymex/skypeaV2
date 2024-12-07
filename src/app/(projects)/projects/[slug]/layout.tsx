import { getBlogBySlug, getBlogs } from "@/actions/blogs-actions";
import NotFound from "@/app/not-found";
import DashboardNavbar from "@/components/pages/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/pages/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import getSession from "@/lib/getSession";
import { UserMenuProps } from "@/types/types";
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
  const user = {
    name: session?.user?.name,
    email: session?.user?.email,
    avatar: session?.user?.image,
  };

  const slug = (await params).slug;

  const blog = await getBlogBySlug(slug);
  if (!blog.data) return <NotFound />;

  return (
    <SidebarProvider>
      <DashboardSidebar slug={slug} user={user as UserMenuProps} />
      <main className="w-full">
        <DashboardNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
