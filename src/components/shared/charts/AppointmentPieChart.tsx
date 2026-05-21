"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPieChartData } from "@/types/dashboard.types";
import React from "react";
import {
  Legend,
  Pie,
  PieChart,
  PieSectorShapeProps,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";


interface IAppointmentPieChartProps {
  data: IPieChartData[];
  title?: string;
  description?: string;
}

const CHART_COLORS = [
  "oklch(0.72 0.19 45)",
  "oklch(0.68 0.24 30)",
  "oklch(0.61 0.21 55)",
  "oklch(0.75 0.18 20)",
  "oklch(0.58 0.26 35)",
];
const AppointmentPieChart = ({
  data,
  title,
  description,
}: IAppointmentPieChartProps) => {
  if (!data || !Array.isArray(data)) {
    return (
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
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
    name:
      item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase(),
    value: Number(item.count),
  }));

  if (!formatedData.length || formatedData.every((item) => item.value === 0)) {
    return (
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-72">
          <p className="text-sm text-muted-foreground">
            No appointment avaible to display in the chart
          </p>
        </CardContent>
      </Card>
    );
  }
  const MyCustomPie = (props: PieSectorShapeProps) => {
    return (
      <Sector
        {...props}
        fill={CHART_COLORS[props.index % CHART_COLORS.length]}
      />
    );
  };
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={formatedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
              shape={MyCustomPie}
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AppointmentPieChart;
