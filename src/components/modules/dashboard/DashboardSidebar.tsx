import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getDashboardNavItemsByRole } from "@/lib/navItems";
import { getUserInfo } from "@/services/auth.service";
import { INavSections } from "@/types/dashboard.types";
import React from "react";
import DashboardSidebarContent from "./DashboardSidebarContent";

const DashboardSidebar = async () => {
  const userInfo = await getUserInfo();
  const sidebarNavItems: INavSections[] = getDashboardNavItemsByRole(
    userInfo.role,
  );

  const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  return (
    <div>
      <DashboardSidebarContent
        userInfo={userInfo}
        sidebarNavItems={sidebarNavItems}
        dashboardHome={dashboardHome}
      />
    </div>
  );
};

export default DashboardSidebar;
