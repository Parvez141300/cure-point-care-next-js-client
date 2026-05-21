"use client";
import StatsCard from "@/components/shared/cards/StatsCard";
import AppointmentBarChart from "@/components/shared/charts/AppointmentBarChart";
import AppointmentPieChart from "@/components/shared/charts/AppointmentPieChart";
import { getAdminDashboardData } from "@/services/dashboard.service";
import { IApiResponse } from "@/types/api.types";
import { IAdminDashboardData } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const AdminDashboardContent = () => {
  const { data: adminDashboardData } = useQuery({
    queryKey: ["admin-dashboard-data"],
    queryFn: getAdminDashboardData,
    refetchOnWindowFocus: "always", // refetch on window focus it means when the user comes back to the page it will be refetched
  });

  const { data } = adminDashboardData as IApiResponse<IAdminDashboardData>;

  return (
    <div className="space-y-5">
      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          value={data?.usersCount || 0}
          title="Total Users"
          description="Number of Users"
          iconName="Users"
        />
        <StatsCard
          value={data?.adminCount || 0}
          title="Total Admins"
          description="Number of Admins"
          iconName="ShieldCheck"
        />
        <StatsCard
          value={data?.doctorCount || 0}
          title="Total Doctors"
          description="Number of Doctors"
          iconName="BriefcaseMedical"
        />
        <StatsCard
          value={data?.patientCount || 0}
          title="Total Patients"
          description="Number of Patients"
          iconName="UserPlus"
        />
        <StatsCard
          value={data?.paymentCount || 0}
          title="Total Payments"
          description="Number of Payments"
          iconName="BadgeDollarSign"
        />
        <StatsCard
          value={data?.appointmentCount || 0}
          title="Total appointments"
          description="Number of appointments schedules"
          iconName="CalendarDays"
        />
        <StatsCard
          value={data?.totalRevenue || 0}
          title="Total Revenue"
          description="Number of appointments Revenue"
          iconName="BanknoteArrowUp"
        />
        <StatsCard
          value={data?.totalExpense || 0}
          title="Total Expense"
          description="Number of appointments Expense"
          iconName="BanknoteArrowDown"
        />
      </div>
      {/* charts */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
        <AppointmentBarChart data={data?.barChartData || []} />
        <AppointmentPieChart title="Appoiment Count" data={data?.pieChartData || []} />
      </div>
    </div>
  );
};

export default AdminDashboardContent;
