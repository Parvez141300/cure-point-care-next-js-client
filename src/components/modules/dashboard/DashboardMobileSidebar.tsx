"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SheetTitle } from "@/components/ui/sheet";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import { INavSections } from "@/types/dashboard.types";
import { IUserInfo } from "@/types/user.types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface DashboardMobileSidebarProps {
  userInfo: IUserInfo;
  navItems: INavSections[];
  dashboardHome: string;
}
const DashboardMobileSidebar = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardMobileSidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      {/* logo / brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href={dashboardHome}>
          <span className="text-xl font-bold text-primary">Cure PointCare</span>
        </Link>
      </div>

      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

      {/* navigation area */}
      <ScrollArea>
        <nav>
          {navItems.map((section, sectionId) => (
            <div key={sectionId}>
              {section.title && (
                <h4 className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemId) => {
                  const isActive = pathname === item.href;
                  const Icon = getIconComponent(item.icon);
                  return (
                    <Link
                      key={itemId}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-1 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        isActive && "bg-accent text-accent-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="flex-1">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
              {/* separator */}
              {sectionId < navItems.length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
      {/* user info at bottom */}
      <div className="border-t py-4">
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

export default DashboardMobileSidebar;
