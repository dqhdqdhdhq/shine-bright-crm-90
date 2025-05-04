
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Client, ClientType, mockClients } from "@/data/mockData";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "@/lib/utils";

const Clients = () => {
  const [filterType, setFilterType] = useState<ClientType | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter clients based on type and search term
  const filteredClients = mockClients.filter((client) => {
    // Filter by type
    if (filterType !== "all" && client.type !== filterType) {
      return false;
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        client.name.toLowerCase().includes(searchLower) ||
        client.contacts.some(
          (contact) =>
            contact.name.toLowerCase().includes(searchLower) ||
            contact.email.toLowerCase().includes(searchLower) ||
            contact.phone.includes(searchTerm)
        ) ||
        client.addresses.some((address) =>
          address.street.toLowerCase().includes(searchLower)
        )
      );
    }

    return true;
  });

  // Count clients by type
  const residentialCount = mockClients.filter(
    (client) => client.type === "residential"
  ).length;
  const commercialCount = mockClients.filter(
    (client) => client.type === "commercial"
  ).length;

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage your residential and commercial clients.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Client</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>
            View and manage all your cleaning clients.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                <TabsTrigger value="all" onClick={() => setFilterType("all")}>
                  All ({mockClients.length})
                </TabsTrigger>
                <TabsTrigger
                  value="residential"
                  onClick={() => setFilterType("residential")}
                >
                  Residential ({residentialCount})
                </TabsTrigger>
                <TabsTrigger
                  value="commercial"
                  onClick={() => setFilterType("commercial")}
                >
                  Commercial ({commercialCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <ClientList clients={filteredClients} />
              </TabsContent>
              <TabsContent value="residential" className="mt-4">
                <ClientList
                  clients={filteredClients.filter(
                    (client) => client.type === "residential"
                  )}
                />
              </TabsContent>
              <TabsContent value="commercial" className="mt-4">
                <ClientList
                  clients={filteredClients.filter(
                    (client) => client.type === "commercial"
                  )}
                />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface ClientListProps {
  clients: Client[];
}

const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  if (clients.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No clients found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="pb-2 text-left font-medium">Name</th>
            <th className="pb-2 text-left font-medium hidden md:table-cell">
              Contact
            </th>
            <th className="pb-2 text-left font-medium hidden lg:table-cell">
              Address
            </th>
            <th className="pb-2 text-left font-medium hidden sm:table-cell">
              Type
            </th>
            <th className="pb-2 text-left font-medium hidden xl:table-cell">
              Last Service
            </th>
            <th className="pb-2 text-left font-medium w-10"></th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            // Get primary contact or first contact
            const primaryContact =
              client.contacts.find((c) => c.isPrimary) || client.contacts[0];
            // Get first address
            const primaryAddress = client.addresses[0];

            return (
              <tr
                key={client.id}
                className="border-b hover:bg-muted/50 transition-colors"
              >
                <td className="py-3">
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
                </td>
                <td className="py-3 hidden md:table-cell">
                  <div className="flex flex-col">
                    <span>{primaryContact.email}</span>
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {formatPhoneNumber(primaryContact.phone)}
                    </span>
                  </div>
                </td>
                <td className="py-3 hidden lg:table-cell text-sm">
                  <div className="max-w-[250px]">
                    <span>
                      {primaryAddress.street}
                    </span>
                    <div className="text-muted-foreground">
                      {primaryAddress.city}, {primaryAddress.state} {primaryAddress.zipCode}
                    </div>
                  </div>
                </td>
                <td className="py-3 hidden sm:table-cell">
                  <Badge variant={client.type === "residential" ? "outline" : "secondary"}>
                    {client.type === "residential" ? "Residential" : "Commercial"}
                  </Badge>
                </td>
                <td className="py-3 hidden xl:table-cell text-sm">
                  {client.lastService ? client.lastService : "No services yet"}
                </td>
                <td className="py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
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
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
