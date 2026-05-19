"use client";

import { INavSections } from "@/types/dashboard.types";
import { IUserInfo } from "@/types/user.types";
import React, { useState } from "react";

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
    const [isOpne, setIsOpen] = useState(false);
  return <div>
    {/* mobile menu toggle button and menu */}

    {/* search component */}

    {/* right side actions */}

    {/* notifications dropdown */}

    {/* user dropdown */}
  </div>;
};

export default DashboardNavbarContent;
