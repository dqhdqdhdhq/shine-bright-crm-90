
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Edit, 
  MoreHorizontal, 
  Phone, 
  Tag, 
  Users 
} from "lucide-react";
import { Client } from "@/data/mockData";
import { formatPhoneNumber } from "@/lib/utils";
import { ClientColumn } from "./ClientUtils";

interface ClientListProps {
  clients: Client[];
  selectedClients: string[];
  toggleSelectAll: () => void;
  toggleClientSelection: (clientId: string) => void;
  visibleColumns: ClientColumn[];
}

export const ClientList: React.FC<ClientListProps> = ({
  clients,
  selectedClients,
  toggleSelectAll,
  toggleClientSelection,
  visibleColumns,
}) => {
  if (clients.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No clients found. Try adjusting your search or filters.
      </div>
    );
  }

  const isAllSelected = clients.length > 0 && selectedClients.length === clients.length;

  // Determine if a column is visible
  const isColumnVisible = (column: ClientColumn) => visibleColumns.includes(column);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox 
                checked={isAllSelected} 
                onCheckedChange={toggleSelectAll} 
              />
            </TableHead>
            <TableHead className="font-medium">Name</TableHead>
            {isColumnVisible("contact") && (
              <TableHead className="font-medium hidden md:table-cell">
                Contact
              </TableHead>
            )}
            {isColumnVisible("address") && (
              <TableHead className="font-medium hidden lg:table-cell">
                Address
              </TableHead>
            )}
            {isColumnVisible("type") && (
              <TableHead className="font-medium hidden sm:table-cell">
                Type
              </TableHead>
            )}
            {isColumnVisible("status") && (
              <TableHead className="font-medium hidden sm:table-cell">
                Status
              </TableHead>
            )}
            {isColumnVisible("lastService") && (
              <TableHead className="font-medium hidden xl:table-cell">
                Last Service
              </TableHead>
            )}
            {isColumnVisible("nextService") && (
              <TableHead className="font-medium hidden xl:table-cell">
                Next Job
              </TableHead>
            )}
            {isColumnVisible("balance") && (
              <TableHead className="font-medium hidden xl:table-cell">
                Balance
              </TableHead>
            )}
            {isColumnVisible("clientSince") && (
              <TableHead className="font-medium hidden xl:table-cell">
                Client Since
              </TableHead>
            )}
            {isColumnVisible("assignedStaff") && (
              <TableHead className="font-medium hidden xl:table-cell">
                Staff
              </TableHead>
            )}
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => {
            // Get primary contact or first contact
            const primaryContact =
              client.contacts.find((c) => c.isPrimary) || client.contacts[0];
            // Get first address
            const primaryAddress = client.addresses[0];
            const isSelected = selectedClients.includes(client.id);

            return (
              <TableRow
                key={client.id}
                className={`hover:bg-muted/50 transition-colors ${
                  isSelected ? "bg-muted/30" : ""
                }`}
              >
                <TableCell className="p-2">
                  <Checkbox 
                    checked={isSelected}
                    onCheckedChange={() => toggleClientSelection(client.id)}
                  />
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-2">
                    <div>
                      <Link
                        to={`/clients/${client.id}`}
                        className="font-medium hover:underline"
                      >
                        {client.name}
                      </Link>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {client.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs px-1 h-5"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TableCell>
                {isColumnVisible("contact") && (
                  <TableCell className="py-3 hidden md:table-cell">
                    <div className="flex flex-col">
                      <span>{primaryContact.email}</span>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {formatPhoneNumber(primaryContact.phone)}
                      </span>
                    </div>
                  </TableCell>
                )}
                {isColumnVisible("address") && (
                  <TableCell className="py-3 hidden lg:table-cell text-sm">
                    <div className="max-w-[250px]">
                      <span>
                        {primaryAddress.street}
                      </span>
                      <div className="text-muted-foreground">
                        {primaryAddress.city}, {primaryAddress.state} {primaryAddress.zipCode}
                      </div>
                    </div>
                  </TableCell>
                )}
                {isColumnVisible("type") && (
                  <TableCell className="py-3 hidden sm:table-cell">
                    <Badge variant={client.type === "residential" ? "outline" : "secondary"}>
                      {client.type === "residential" ? "Residential" : "Commercial"}
                    </Badge>
                  </TableCell>
                )}
                {isColumnVisible("status") && (
                  <TableCell className="py-3 hidden sm:table-cell">
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-200">
                      Active
                    </Badge>
                  </TableCell>
                )}
                {isColumnVisible("lastService") && (
                  <TableCell className="py-3 hidden xl:table-cell text-sm">
                    {client.lastService ? client.lastService : "No services yet"}
                  </TableCell>
                )}
                {isColumnVisible("nextService") && (
                  <TableCell className="py-3 hidden xl:table-cell text-sm">
                    {client.lastService || "None scheduled"}
                  </TableCell>
                )}
                {isColumnVisible("balance") && (
                  <TableCell className="py-3 hidden xl:table-cell text-sm">
                    <span className="font-medium">$0.00</span>
                  </TableCell>
                )}
                {isColumnVisible("clientSince") && (
                  <TableCell className="py-3 hidden xl:table-cell text-sm">
                    <span>Mar 15, 2023</span>
                  </TableCell>
                )}
                {isColumnVisible("assignedStaff") && (
                  <TableCell className="py-3 hidden xl:table-cell text-sm">
                    <span>John Doe</span>
                  </TableCell>
                )}
                <TableCell className="py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link
                          to={`/clients/${client.id}`}
                          className="flex items-center w-full"
                        >
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Client
                      </DropdownMenuItem>
                      <DropdownMenuItem>Schedule Job</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Tag className="mr-2 h-4 w-4" />
                        Manage Tags
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        Assign Staff
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
