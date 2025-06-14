
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  MoreHorizontal, 
  Phone, 
  Mail
} from "lucide-react";
import { Client } from "@/data/mockData";
import { formatPhoneNumber } from "@/lib/utils";

interface SimpleClientListProps {
  clients: Client[];
  selectedClients: string[];
  toggleSelectAll: () => void;
  toggleClientSelection: (clientId: string) => void;
  showMoreColumns: boolean;
}

export const SimpleClientList: React.FC<SimpleClientListProps> = ({
  clients,
  selectedClients,
  toggleSelectAll,
  toggleClientSelection,
  showMoreColumns,
}) => {
  if (clients.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <div className="text-lg font-medium mb-2">No clients found</div>
        <div className="text-sm">Try adjusting your search or add your first client</div>
      </div>
    );
  }

  const isAllSelected = clients.length > 0 && selectedClients.length === clients.length;

  return (
    <div className="space-y-1">
      {clients.map((client) => {
        const primaryContact = client.contacts.find((c) => c.isPrimary) || client.contacts[0];
        const primaryAddress = client.addresses[0];
        const isSelected = selectedClients.includes(client.id);

        return (
          <div
            key={client.id}
            className={`group relative p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50/50 transition-all duration-200 ${
              isSelected ? "bg-blue-50/50 border-blue-200" : "bg-white"
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Selection checkbox - only visible when clients are selected or on hover */}
              <div className={`transition-opacity duration-200 ${selectedClients.length > 0 || isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <Checkbox 
                  checked={isSelected}
                  onCheckedChange={() => toggleClientSelection(client.id)}
                  className="rounded"
                />
              </div>

              {/* Client info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/clients/${client.id}`}
                      className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors block truncate"
                    >
                      {client.name}
                    </Link>
                    
                    {/* Contact info */}
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span className="truncate max-w-[200px]">{primaryContact.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        <span>{formatPhoneNumber(primaryContact.phone)}</span>
                      </div>
                    </div>

                    {/* Additional info when expanded */}
                    {showMoreColumns && (
                      <div className="mt-2 text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="truncate max-w-[300px]">
                            {primaryAddress.street}, {primaryAddress.city}, {primaryAddress.state}
                          </span>
                          <span>Last service: {client.lastService || "None"}</span>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {client.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {client.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 border-gray-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {client.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-0.5 bg-gray-50 text-gray-600 border-gray-200">
                            +{client.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Status and type badges */}
                  <div className="flex items-center gap-2 ml-4">
                    <Badge 
                      variant={client.type === "residential" ? "outline" : "secondary"}
                      className="text-xs font-medium"
                    >
                      {client.type === "residential" ? "Residential" : "Commercial"}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className="text-xs font-medium bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Actions menu - only visible on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem asChild>
                      <Link to={`/clients/${client.id}`} className="w-full">
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Client</DropdownMenuItem>
                    <DropdownMenuItem>Schedule Job</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
