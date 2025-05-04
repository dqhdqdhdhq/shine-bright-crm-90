
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Users, Clipboard, CalendarDays, Briefcase, Settings, X, DollarSign } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: Home
  },
  {
    name: "Clients",
    path: "/clients",
    icon: Users
  },
  {
    name: "Services",
    path: "/services",
    icon: Clipboard
  },
  {
    name: "Staff",
    path: "/staff",
    icon: Users
  },
  {
    name: "Schedule",
    path: "/schedule",
    icon: CalendarDays
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: Briefcase
  },
  {
    name: "Finance",
    path: "/finance",
    icon: DollarSign
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings
  }
];

const Sidebar = ({
  isOpen,
  setIsOpen
}: SidebarProps) => {
  const location = useLocation();
  
  return (
    <div className={cn("fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-card shadow-lg transition-transform duration-200 ease-in-out md:relative", isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16")}>
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <div className="flex items-center space-x-2">
          {isOpen ? <div className="flex items-center">
              <img src="/lovable-uploads/c5daf843-b099-42d9-b425-ddf2549761d9.png" alt="Pancevski's Städservice Logo" className="h-10" />
              
            </div> : <div className="flex items-center justify-center">
              <img src="/lovable-uploads/c5daf843-b099-42d9-b425-ddf2549761d9.png" alt="Pancevski's Städservice Logo" className="h-8" />
            </div>}
        </div>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {navItems.map(item => <Link key={item.path} to={item.path} className={cn("flex items-center px-2 py-2 rounded-md text-sm font-medium transition-colors", location.pathname === item.path ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted", !isOpen && "justify-center")}>
            <item.icon className={cn("w-5 h-5", !isOpen && "w-6 h-6")} />
            {isOpen && <span className="ml-3">{item.name}</span>}
          </Link>)}
      </nav>
    </div>
  );
};

export default Sidebar;
