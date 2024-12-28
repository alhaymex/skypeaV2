"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const isLast = index === pathSegments.length - 1;
    const title = segment.charAt(0).toUpperCase() + segment.slice(1);

    return (
      <React.Fragment key={href}>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage
              className="
              lowercase
              text-amber-950 dark:text-amber-100
              font-semibold
            "
            >
              {title}
            </BreadcrumbPage>
          ) : (
            <BreadcrumbLink
              className="
                lowercase
                text-amber-800 dark:text-amber-300
                hover:text-amber-950 dark:hover:text-amber-100
                transition-colors duration-200
                relative group
              "
              href={href}
            >
              {/* Hover Effect */}
              <span
                className="
                absolute -bottom-0.5 left-0 right-0 h-0.5
                bg-gradient-to-r from-amber-400 to-amber-500
                dark:from-amber-600 dark:to-amber-700
                origin-left scale-x-0 group-hover:scale-x-100
                transition-transform duration-300
              "
              />
              {title}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && (
          <BreadcrumbSeparator className="text-amber-400 dark:text-amber-700">
            /
          </BreadcrumbSeparator>
        )}
      </React.Fragment>
    );
  });

  return (
    <div
      className="
      sticky top-0 z-10 
      border-b border-amber-200 dark:border-amber-800
      bg-white/80 dark:bg-gray-950/80
      backdrop-blur-sm
      p-3
      shadow-sm
    "
    >
      <Breadcrumb>
        <BreadcrumbList className="flex items-center">
          <SidebarTrigger
            className="
            mr-2
            text-amber-700 dark:text-amber-400
            hover:text-amber-800 dark:hover:text-amber-300
            hover:bg-amber-100/50 dark:hover:bg-amber-900/30
            rounded-lg
            transition-colors
          "
          />
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/"
              className="
                text-amber-800 dark:text-amber-300
                hover:text-amber-950 dark:hover:text-amber-100
                transition-colors duration-200
                relative group
              "
            >
              {/* Home Link Hover Effect */}
              <span
                className="
                absolute -bottom-0.5 left-0 right-0 h-0.5
                bg-gradient-to-r from-amber-400 to-amber-500
                dark:from-amber-600 dark:to-amber-700
                origin-left scale-x-0 group-hover:scale-x-100
                transition-transform duration-300
              "
              />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-amber-400 dark:text-amber-700">
            /
          </BreadcrumbSeparator>
          {breadcrumbItems}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default DashboardNavbar;
