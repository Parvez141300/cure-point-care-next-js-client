import { getDashboardNavItemsByRole } from "@/lib/navItems";
import { getUserInfo } from "@/services/auth.service";
import { INavSections } from "@/types/dashboard.types";
import React from "react";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getDefaultDashboardRoute } from "@/lib/authUtils";

const DashboardNavbar = async () => {
  const userInfo = await getUserInfo();
  const navItems: INavSections[] = getDashboardNavItemsByRole(
    userInfo.role,
  );

  const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
