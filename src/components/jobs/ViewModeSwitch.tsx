
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, List, Map } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "list" | "calendar" | "map";

export interface ViewModeSwitchProps {
  activeView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  className?: string;
}

const ViewModeSwitch = ({
  activeView,
  onViewChange,
  className,
}: ViewModeSwitchProps) => {
  return (
    <div className={cn("flex bg-muted rounded-lg p-1 space-x-1", className)}>
      <Button
        size="sm"
        variant="ghost"
        className={cn(
          "flex-1",
          activeView === "list" && "bg-background shadow-sm"
        )}
        onClick={() => onViewChange("list")}
      >
        <List className="h-4 w-4 mr-2" /> List
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        className={cn(
          "flex-1",
          activeView === "calendar" && "bg-background shadow-sm"
        )}
        onClick={() => onViewChange("calendar")}
      >
        <CalendarDays className="h-4 w-4 mr-2" /> Calendar
      </Button>
      
      <Button
        size="sm"
        variant="ghost"
        className={cn(
          "flex-1",
          activeView === "map" && "bg-background shadow-sm"
        )}
        onClick={() => onViewChange("map")}
      >
        <Map className="h-4 w-4 mr-2" /> Map
      </Button>
    </div>
  );
};

export default ViewModeSwitch;
