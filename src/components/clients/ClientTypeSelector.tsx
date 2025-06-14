
import React from "react";
import { Button } from "@/components/ui/button";

interface ClientTypeSelectorProps {
  filterType: "residential" | "commercial" | "all";
  setFilterType: (type: "residential" | "commercial" | "all") => void;
  counts: {
    all: number;
    residential: number;
    commercial: number;
  };
}

export const ClientTypeSelector: React.FC<ClientTypeSelectorProps> = ({
  filterType,
  setFilterType,
  counts,
}) => {
  const options = [
    { value: "all", label: "All Clients", count: counts.all },
    { value: "residential", label: "Residential", count: counts.residential },
    { value: "commercial", label: "Commercial", count: counts.commercial },
  ] as const;

  return (
    <div className="flex gap-1 p-1 bg-gray-100 rounded-lg w-fit">
      {options.map((option) => (
        <Button
          key={option.value}
          variant={filterType === option.value ? "default" : "ghost"}
          size="sm"
          onClick={() => setFilterType(option.value)}
          className={`text-sm font-medium transition-all duration-200 ${
            filterType === option.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          }`}
        >
          {option.label}
          <span className="ml-1.5 text-xs opacity-60">({option.count})</span>
        </Button>
      ))}
    </div>
  );
};
