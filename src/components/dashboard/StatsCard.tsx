
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "unchanged";
  trendValue?: string;
  trendCount?: string;
  linkTo?: string;
  onClick?: () => void;
}

const StatsCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend, 
  trendValue,
  trendCount,
  linkTo,
  onClick
}: StatsCardProps) => {
  const cardContent = (
    <CardContent className="p-6">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex flex-col space-y-1">
          <span className="text-sm font-medium text-muted-foreground">
            {title}
          </span>
          <span className="text-2xl font-bold">{value}</span>
        </div>
        <div className="rounded-full bg-muted p-2">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        {trend && (
          <span className={cn(
            "mr-1",
            trend === "up" && "text-green-500",
            trend === "down" && "text-red-500"
          )}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trendValue}
            {trendCount && <span className="ml-1">({trendCount})</span>}
          </span>
        )}
        <span className="text-muted-foreground">{description}</span>
      </div>
    </CardContent>
  );
  
  if (linkTo) {
    return (
      <Card className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-1">
        <Link to={linkTo} className="block">
          {cardContent}
        </Link>
      </Card>
    );
  }
  
  if (onClick) {
    return (
      <Card 
        className="cursor-pointer transition-all hover:shadow-md hover:-translate-y-1"
        onClick={onClick}
      >
        {cardContent}
      </Card>
    );
  }
  
  return <Card>{cardContent}</Card>;
};

export default StatsCard;
