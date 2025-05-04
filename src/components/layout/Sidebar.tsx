
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  CalendarDays,
  Briefcase,
  Settings,
  X,
  CheckCircle,
  LineChart
} from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Clients", path: "/clients", icon: Users },
  { name: "Services", path: "/services", icon: ClipboardList },
  { name: "Staff", path: "/staff", icon: Users },
  { name: "Schedule", path: "/schedule", icon: CalendarDays },
  { name: "Jobs", path: "/jobs", icon: Briefcase },
  { name: "Check-In", path: "/check-in", icon: CheckCircle },
  { name: "Reports", path: "/reports", icon: LineChart },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col sidebar transition-transform duration-200 ease-in-out md:relative",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          {isOpen ? (
            <>
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold">SC</span>
              </div>
              <h1 className="text-lg font-bold">ShineClean</h1>
            </>
          ) : (
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold">SC</span>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "sidebar-item",
              location.pathname === item.path
                ? "active"
                : "text-sidebar-foreground/80",
              !isOpen && "justify-center"
            )}
          >
            <item.icon className={cn("w-5 h-5", !isOpen && "w-6 h-6")} />
            {isOpen && <span className="ml-3">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
