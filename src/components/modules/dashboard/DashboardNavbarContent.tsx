"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { INavSections } from "@/types/dashboard.types";
import { IUserInfo } from "@/types/user.types";
import { Menu, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";
import { Input } from "@/components/ui/input";
import NotificationDropDown from "./NotificationDropDown";
import UserDropDown from "./UserDropDown";

interface DashboardNavbarContentProps {
  userInfo: IUserInfo;
  navItems: INavSections[];
  dashboardHome: string;
}
const DashboardNavbarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardNavbarContentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSmallerScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkSmallerScreen();
    window.addEventListener("resize", checkSmallerScreen);
    return () => {
      window.removeEventListener("resize", checkSmallerScreen);
    };
  }, []);

  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* mobile menu toggle button and menu */}
      <Sheet open={isOpen && isMobile} onOpenChange={setIsOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size={"icon"}>
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <DashboardMobileSidebar
            userInfo={userInfo}
            navItems={navItems}
            dashboardHome={dashboardHome}
          />
        </SheetContent>
      </Sheet>
      {/* search component */}
      <div className="flex items-center justify-end gap-2 basis-1/3">
        <div className="relative max-w-5xl hidden sm:block w-full">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 " />
          <Input type="text" placeholder="Search..." className="pl-8 pr-4 w-full" />
        </div>
      </div>
      {/* right side actions */}

      <div className="flex items-center gap-2">
        {/* notifications dropdown */}
        <NotificationDropDown />
        {/* user dropdown */}
        <UserDropDown userInfo={userInfo} />
      </div>
    </div>
  );
};

export default DashboardNavbarContent;
