"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logout } from "@/actions/auth-actions";
import { UserMenuProps } from "@/types/types";

export function UserMenu({ user }: { user: UserMenuProps }) {
  const { isMobile } = useSidebar();

  const handleLogout = async () => {
    await Logout();
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                relative group
                hover:bg-amber-100/50 
                dark:hover:bg-amber-900/10
                data-[state=open]:bg-amber-100 
                dark:data-[state=open]:bg-amber-900/20
                data-[state=open]:text-amber-950
                dark:data-[state=open]:text-amber-100
                transition-colors duration-200
                rounded-lg
              "
            >
              {/* Hexagonal Highlight Effect */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity"
                style={{
                  clipPath:
                    "polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)",
                  background: "linear-gradient(to right, #FCD34D, #F59E0B)",
                }}
              />

              {/* User Avatar */}
              <Avatar className="h-8 w-8 rounded-lg border border-amber-300 dark:border-amber-700">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-amber-950 dark:text-amber-100">
                  {user.name}
                </span>
                <span className="truncate text-xs text-amber-800 dark:text-amber-300">
                  {user.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-amber-800 dark:text-amber-300" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="
              w-[--radix-dropdown-menu-trigger-width] 
              min-w-56 
              rounded-lg 
              border-amber-300
              dark:border-amber-700
              bg-white 
              dark:bg-gray-950
              shadow-lg 
              shadow-amber-100/20
              dark:shadow-amber-900/20
            "
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            {/* User Header */}
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 p-3 text-left text-sm bg-gradient-to-b from-amber-50/50 to-transparent dark:from-amber-900/10 dark:to-transparent rounded-t-lg">
                <Avatar className="h-8 w-8 rounded-lg border border-amber-300 dark:border-amber-700">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold text-amber-950 dark:text-amber-100">
                    {user.name}
                  </span>
                  <span className="truncate text-xs text-amber-800 dark:text-amber-300">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-amber-200 dark:border-amber-800" />

            {/* Upgrade Section */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:bg-amber-50 dark:focus:bg-amber-900/20 text-amber-950 dark:text-amber-100">
                <Sparkles className="mr-2 h-4 w-4 text-amber-600 dark:text-amber-400" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="border-amber-200 dark:border-amber-800" />

            {/* Main Menu Items */}
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:bg-amber-50 dark:focus:bg-amber-900/20 text-amber-950 dark:text-amber-100">
                <BadgeCheck className="mr-2 h-4 w-4 text-amber-700 dark:text-amber-400" />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:bg-amber-50 dark:focus:bg-amber-900/20 text-amber-950 dark:text-amber-100">
                <CreditCard className="mr-2 h-4 w-4 text-amber-700 dark:text-amber-400" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-amber-50 dark:hover:bg-amber-900/20 focus:bg-amber-50 dark:focus:bg-amber-900/20 text-amber-950 dark:text-amber-100">
                <Bell className="mr-2 h-4 w-4 text-amber-700 dark:text-amber-400" />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="border-amber-200 dark:border-amber-800" />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleLogout}
              className="hover:bg-red-50 dark:hover:bg-red-900/20 focus:bg-red-50 dark:focus:bg-red-900/20 text-red-700 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
