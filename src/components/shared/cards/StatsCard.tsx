import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getIconComponent } from "@/lib/iconMapper";
import { cn } from "@/lib/utils";
import React, { createElement } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  iconName: string;
  description?: string;
  className?: string;
}
const StatsCard = ({
  title,
  value,
  iconName,
  description,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className || "")}>
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
          {createElement(getIconComponent(iconName), {
            className: "text-primary w-4 h-4",
          })}
        </div>
      </CardHeader>

      <CardContent className="space-y-1">
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <div className="text-xs font-medium text-muted-foreground">
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
