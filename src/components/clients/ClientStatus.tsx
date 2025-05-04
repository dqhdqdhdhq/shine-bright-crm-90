
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from "@/components/ui/dropdown-menu";
import { CircleDot } from "lucide-react";
import { ClientStatus } from "./ClientUtils";
import { useToast } from "@/hooks/use-toast";

interface ClientStatusSelectorProps {
  selectedStatus: ClientStatus;
  onStatusChange: (status: ClientStatus) => void;
}

export const ClientStatusSelector: React.FC<ClientStatusSelectorProps> = ({
  selectedStatus,
  onStatusChange,
}) => {
  const { toast } = useToast();

  const handleStatusChange = (status: ClientStatus) => {
    onStatusChange(status);
    toast({
      title: "Status changed",
      description: `Client status updated to ${status}`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1">
          <CircleDot className="h-4 w-4" color={
            selectedStatus === "lead" ? "blue" : 
            selectedStatus === "prospect" ? "indigo" :
            selectedStatus === "active" ? "green" :
            selectedStatus === "on-hold" ? "orange" :
            selectedStatus === "inactive" ? "gray" : "red"
          } />
          {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleStatusChange("lead")}>
          <CircleDot className="h-4 w-4 mr-2 text-blue-500" />
          Lead
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("prospect")}>
          <CircleDot className="h-4 w-4 mr-2 text-indigo-500" />
          Prospect
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("active")}>
          <CircleDot className="h-4 w-4 mr-2 text-green-500" />
          Active
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("on-hold")}>
          <CircleDot className="h-4 w-4 mr-2 text-orange-500" />
          On Hold
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("inactive")}>
          <CircleDot className="h-4 w-4 mr-2 text-gray-500" />
          Inactive
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusChange("lost")}>
          <CircleDot className="h-4 w-4 mr-2 text-red-500" />
          Lost
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
