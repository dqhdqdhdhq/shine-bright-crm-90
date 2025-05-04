
import React from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DollarSign,
  FileText,
  Receipt,
  Users,
  HardDriveDownload,
  ClipboardCheck,
  BarChart2,
  Settings,
} from "lucide-react";

const FinanceNavigation: React.FC = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { 
      name: t("finance.dashboard"), 
      path: "/finance", 
      icon: <DollarSign className="h-5 w-5" /> 
    },
    { 
      name: t("finance.invoicing"), 
      path: "/finance/invoicing", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: t("finance.expenses"), 
      path: "/finance/expenses", 
      icon: <Receipt className="h-5 w-5" /> 
    },
    { 
      name: t("finance.payroll"), 
      path: "/finance/payroll", 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: t("finance.assets"), 
      path: "/finance/assets", 
      icon: <HardDriveDownload className="h-5 w-5" /> 
    },
    { 
      name: t("finance.taxes"), 
      path: "/finance/taxes", 
      icon: <ClipboardCheck className="h-5 w-5" /> 
    },
    { 
      name: t("finance.reports"), 
      path: "/finance/reports", 
      icon: <BarChart2 className="h-5 w-5" /> 
    },
    { 
      name: t("nav.settings"), 
      path: "/finance/settings", 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="bg-card border rounded-md p-1 mb-6">
      <nav className="flex overflow-x-auto pb-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-md whitespace-nowrap transition-colors mx-1 ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default FinanceNavigation;
