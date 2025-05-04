import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  ChevronDown,
  FileText,
  Mail,
  MessageSquare,
  Minus,
  Plus,
  Printer,
  Tag,
  User,
  UserCheck,
  UserX,
  X,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ClientBulkActionsProps {
  count: number;
  onClearSelection: () => void;
}

export const ClientBulkActions: React.FC<ClientBulkActionsProps> = ({
  count,
  onClearSelection,
}) => {
  const { toast } = useToast();
  
  const handleAction = (action: string) => {
    toast({
      title: "Bulk Action",
      description: `${action} applied to ${count} clients`,
    });
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-background border shadow-lg rounded-lg px-4 py-3 flex items-center gap-3">
      <span className="font-medium text-sm">
        {count} {count === 1 ? "client" : "clients"} selected
      </span>
      
      {/* Tag Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Tag className="h-3.5 w-3.5" />
            Tags
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleAction("Add tags")} className="gap-2">
            <Plus className="h-3.5 w-3.5" /> Add Tags
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("Remove tags")} className="gap-2">
            <Minus className="h-3.5 w-3.5" /> Remove Tags
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Staff Assignment */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <User className="h-3.5 w-3.5" />
            Assign
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleAction("Assigned to John Doe")}>
            John Doe
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("Assigned to Jane Smith")}>
            Jane Smith
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("Assigned to Robert Johnson")}>
            Robert Johnson
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleAction("Clear assignment")} className="text-muted-foreground">
            Clear Assignment
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Communication */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Mail className="h-3.5 w-3.5" />
            Send
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleAction("Bulk email sent")} className="gap-2">
            <Mail className="h-3.5 w-3.5" /> Email
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("Bulk SMS sent")} className="gap-2">
            <MessageSquare className="h-3.5 w-3.5" /> SMS
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1">
            <Check className="h-3.5 w-3.5" />
            Status
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleAction("Marked active")} className="gap-2">
            <UserCheck className="h-3.5 w-3.5" /> Mark Active
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction("Marked inactive")} className="gap-2">
            <UserX className="h-3.5 w-3.5" /> Mark Inactive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export */}
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-1"
        onClick={() => handleAction("Exported selected clients")}
      >
        <FileText className="h-3.5 w-3.5" />
        Export
      </Button>

      {/* Print Labels */}
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-1"
        onClick={() => handleAction("Generated mailing labels")}
      >
        <Printer className="h-3.5 w-3.5" />
        Labels
      </Button>

      {/* Clear Selection */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8 rounded-full" 
        onClick={onClearSelection}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Clear selection</span>
      </Button>
    </div>
  );
};
