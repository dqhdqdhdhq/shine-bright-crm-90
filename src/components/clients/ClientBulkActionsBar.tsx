
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Mail, Tag, Users, Trash2 } from "lucide-react";

interface ClientBulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
}

export const ClientBulkActionsBar: React.FC<ClientBulkActionsBarProps> = ({
  selectedCount,
  onClearSelection,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3">
        <Badge variant="secondary" className="text-sm font-medium">
          {selectedCount} selected
        </Badge>
        
        <div className="h-4 w-px bg-gray-200" />
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="gap-2 text-sm">
            <Mail className="h-4 w-4" />
            Send Email
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-sm">
            <Tag className="h-4 w-4" />
            Add Tags
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-sm">
            <Users className="h-4 w-4" />
            Assign Staff
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-sm text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
        
        <div className="h-4 w-px bg-gray-200" />
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClearSelection}
          className="h-8 w-8 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
