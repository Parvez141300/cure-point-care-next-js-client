import AdminDashboardContent from "@/components/modules/dashboard/AdminDashboardContent";
import { getAdminDashboardData } from "@/services/dashboard.service";
// import { IApiResponse } from "@/types/api.types";
// import { IAdminDashboardData } from "@/types/dashboard.types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

const AdminDashboardPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getAdminDashboardData,
    staleTime: 30 * 1000, // 30 seconds - data stays fresh for 30 seconds after 30 seconds it will be refetched
    gcTime: 60 * 300 * 1000, // 5 minutes - data will be removed from cache after 5 minutes
  });

  // const dashboardData = (await queryClient.getQueryData([
  //   "admin-dashboard-data",
  // ])) as IApiResponse<IAdminDashboardData>;

  // console.log("dashboard admin data", dashboardData);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminDashboardContent />
    </HydrationBoundary>
  );
};

export default AdminDashboardPage;
