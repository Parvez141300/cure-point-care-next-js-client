"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IBarchartData } from "@/types/dashboard.types";
import { format } from "date-fns";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IAppointmentBarChartProps {
  data: IBarchartData[];
}

const AppointmentBarChart = ({ data }: IAppointmentBarChartProps) => {
  if (!data || !Array.isArray(data)) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Appointment Trends of Month</CardTitle>
          <CardDescription>
            Appointments chart details are in the Bar chart.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-72">
          <p className="text-sm text-muted-foreground">
            Invalid data provided for the chart
          </p>
        </CardContent>
      </Card>
    );
  }
  const formatedData = data.map((item) => ({
    month:
      typeof item.month === "string"
        ? format(new Date(item.month), "MMM yyyy")
        : item.month,
    appointments: Number(item.count),
  }));

  if (
    !formatedData.length ||
    formatedData.every((item) => item.appointments === 0)
  ) {
    return (
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Appointment Trends of Month</CardTitle>
          <CardDescription>
            Appointments chart details are in the Bar chart.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-72">
          <p className="text-sm text-muted-foreground">
            No appointment avaible to display in the chart
          </p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Appointment Trends of Month</CardTitle>
        <CardDescription>
          Appointments chart details are in the Bar chart.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-72">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formatedData} dataKey={"appointments"}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={"appointments"}
              fill="oklch(0.646 0.222 41.116)"
              radius={[4, 4, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AppointmentBarChart;
