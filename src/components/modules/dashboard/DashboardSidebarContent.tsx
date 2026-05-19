"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { INavSections } from "@/types/dashboard.types";
import { IUserInfo } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface DashboardSidebarContentProps {
  userInfo: IUserInfo;
  sidebarNavItems: INavSections[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
  sidebarNavItems,
  dashboardHome,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();
  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card">
      {/* logo / brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href={dashboardHome}>
          <span className="text-xl font-bold text-primary">
            Cure Point Care
          </span>
        </Link>
      </div>
      {/* navigation area */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {sidebarNavItems.map((section, sectionId) => (
            <div key={sectionId}>
              {section.title && (
                <h4 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
              )}
              {section.items.map((item, itemId) => {
                const isActive = pathname === item.href;
                const Icon = getIconComponent(item.icon);
                return (
                  <Link
                    key={itemId}
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      isActive
                        ? "bg-primary text-accent hover:bg-primary hover:text-accent"
                        : "text-muted-foreground",
                    )}
                  >
                    <Icon />
                    <span className="ml-4">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>
      {/* user info at bottom */}
      <div className="border-t px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {userInfo.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{userInfo.name}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {userInfo.role.toLowerCase().replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebarContent;
