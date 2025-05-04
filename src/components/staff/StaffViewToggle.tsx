
import React from "react";
import { Button } from "@/components/ui/button";
import { GridIcon, List } from "lucide-react";

interface StaffViewToggleProps {
  view: "card" | "list";
  setView: (view: "card" | "list") => void;
}

const StaffViewToggle: React.FC<StaffViewToggleProps> = ({ view, setView }) => {
  return (
    <div className="flex items-center gap-1 border rounded-md overflow-hidden">
      <Button
        variant={view === "card" ? "default" : "ghost"}
        size="sm"
        className="rounded-none px-3 h-9"
        onClick={() => setView("card")}
      >
        <GridIcon className="h-4 w-4 mr-2" />
        Card View
      </Button>
      <Button
        variant={view === "list" ? "default" : "ghost"}
        size="sm"
        className="rounded-none px-3 h-9"
        onClick={() => setView("list")}
      >
        <List className="h-4 w-4 mr-2" />
        List View
      </Button>
    </div>
  );
};

export default StaffViewToggle;
