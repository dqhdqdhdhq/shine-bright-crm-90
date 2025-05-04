import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MoveVertical } from "lucide-react";
import { ClientColumn } from "@/components/clients/ClientUtils";

interface ClientColumnSelectorProps {
  visibleColumns: ClientColumn[];
  setVisibleColumns: React.Dispatch<React.SetStateAction<ClientColumn[]>>;
}

// Define all available columns
const allColumns: { id: ClientColumn; label: string }[] = [
  { id: "name", label: "Name" },
  { id: "contact", label: "Contact Information" },
  { id: "address", label: "Address" },
  { id: "type", label: "Client Type" },
  { id: "status", label: "Status" },
  { id: "lastService", label: "Last Service Date" },
  { id: "nextService", label: "Next Job Date" },
  { id: "balance", label: "Balance Due" },
  { id: "clientSince", label: "Client Since" },
  { id: "assignedStaff", label: "Assigned Staff" },
];

export const ClientColumnSelector: React.FC<ClientColumnSelectorProps> = ({
  visibleColumns,
  setVisibleColumns,
}) => {
  const toggleColumn = (columnId: ClientColumn) => {
    if (visibleColumns.includes(columnId)) {
      // If it's already visible, only allow removal if more than one column will remain visible
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter((id) => id !== columnId));
      }
    } else {
      setVisibleColumns([...visibleColumns, columnId]);
    }
  };

  // Move column up in the order
  const moveColumnUp = (columnId: ClientColumn) => {
    const index = visibleColumns.indexOf(columnId);
    if (index > 0) {
      const newVisibleColumns = [...visibleColumns];
      [newVisibleColumns[index - 1], newVisibleColumns[index]] = [
        newVisibleColumns[index],
        newVisibleColumns[index - 1],
      ];
      setVisibleColumns(newVisibleColumns);
    }
  };

  // Move column down in the order
  const moveColumnDown = (columnId: ClientColumn) => {
    const index = visibleColumns.indexOf(columnId);
    if (index < visibleColumns.length - 1) {
      const newVisibleColumns = [...visibleColumns];
      [newVisibleColumns[index], newVisibleColumns[index + 1]] = [
        newVisibleColumns[index + 1],
        newVisibleColumns[index],
      ];
      setVisibleColumns(newVisibleColumns);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium">Customize Columns</div>
      <div className="space-y-2">
        {allColumns.map((column) => {
          const isVisible = visibleColumns.includes(column.id);
          const index = visibleColumns.indexOf(column.id);
          const isFirstItem = index === 0;
          const isLastItem = index === visibleColumns.length - 1;

          return (
            <div
              key={column.id}
              className="flex items-center justify-between rounded-md px-2 py-1 hover:bg-muted"
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`column-${column.id}`}
                  checked={isVisible}
                  onCheckedChange={() => toggleColumn(column.id)}
                  disabled={isVisible && visibleColumns.length === 1}
                />
                <Label
                  htmlFor={`column-${column.id}`}
                  className="text-sm cursor-pointer"
                >
                  {column.label}
                </Label>
              </div>
              {isVisible && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    disabled={isFirstItem}
                    onClick={() => moveColumnUp(column.id)}
                  >
                    <MoveVertical className="h-3.5 w-3.5 transform rotate-180" />
                    <span className="sr-only">Move up</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    disabled={isLastItem}
                    onClick={() => moveColumnDown(column.id)}
                  >
                    <MoveVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">Move down</span>
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="border-t pt-2 mt-2">
        <Button 
          variant="outline" 
          className="w-full text-sm" 
          size="sm"
          onClick={() => setVisibleColumns(["name", "contact", "address", "type", "lastService"])}
        >
          Reset to Default
        </Button>
      </div>
    </div>
  );
};
