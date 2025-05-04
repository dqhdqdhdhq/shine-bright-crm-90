
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "unchanged";
  trendValue?: string;
  iconBg?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue, 
  iconBg = "bg-primary/10"
}: StatsCardProps) => {
  return (
    <Card className="stats-card border shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <span className="text-3xl font-bold">{value}</span>
          </div>
          <div className={cn("rounded-full p-2", iconBg)}>
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
        {description && (
          <div className="mt-4 flex items-center text-sm">
            {trend && (
              <span className={cn(
                "mr-1",
                trend === "up" && "text-success",
                trend === "down" && "text-destructive"
              )}>
                {trend === "up" && "↑"}
                {trend === "down" && "↓"}
                {trendValue}
              </span>
            )}
            <span className="text-muted-foreground">{description}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
