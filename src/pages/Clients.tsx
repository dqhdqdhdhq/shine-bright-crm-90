
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Filter,
  Plus,
  Eye,
  EyeOff,
} from "lucide-react";
import { Client, mockClients } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { ClientStatus, ClientFormValues, createClientFromFormData } from "@/components/clients/ClientUtils";
import { ClientForm } from "@/components/clients/ClientForm";
import { SimpleClientList } from "@/components/clients/SimpleClientList";
import { ClientTypeSelector } from "@/components/clients/ClientTypeSelector";
import { ClientSearchBar } from "@/components/clients/ClientSearchBar";
import { ClientBulkActionsBar } from "@/components/clients/ClientBulkActionsBar";

const Clients = () => {
  const { toast } = useToast();
  const [filterType, setFilterType] = useState<"residential" | "commercial" | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [localClients, setLocalClients] = useState(mockClients);
  const [showMoreColumns, setShowMoreColumns] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filter clients based on all criteria
  const filteredClients = localClients.filter((client) => {
    // Filter by type
    if (filterType !== "all" && client.type !== filterType) {
      return false;
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      
      // Check if it's a field-specific search
      if (searchTerm.includes(':')) {
        const [field, value] = searchTerm.split(':');
        const valueLower = value.toLowerCase();
        
        switch (field.toLowerCase()) {
          case 'email':
            return client.contacts.some(contact => 
              contact.email.toLowerCase().includes(valueLower));
          case 'tag':
            return client.tags.some(tag => 
              tag.toLowerCase().includes(valueLower));
          case 'city':
            return client.addresses.some(address => 
              address.city.toLowerCase().includes(valueLower));
          default:
            // Default search behavior
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
      }
      
      // Regular search across all fields
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
        ) ||
        client.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return true;
  });

  // Count clients by type
  const counts = {
    all: localClients.length,
    residential: localClients.filter(client => client.type === "residential").length,
    commercial: localClients.filter(client => client.type === "commercial").length,
  };

  // Handle bulk selection
  const toggleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(filteredClients.map(client => client.id));
    }
  };

  const toggleClientSelection = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId) 
        : [...prev, clientId]
    );
  };

  // Handle adding a new client
  const onSubmitNewClient = (data: ClientFormValues) => {
    console.log("Adding new client:", data);
    const newId = `client-${Date.now()}`;
    const newClient = createClientFromFormData(data, newId);
    setLocalClients(prevClients => [newClient, ...prevClients]);
    setIsAddClientDialogOpen(false);
    
    toast({
      title: "Client added",
      description: `${data.name} has been added successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-6xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Clients</h1>
              <p className="text-gray-600">
                Manage your {counts.all} cleaning clients
              </p>
            </div>
            
            <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-lg px-4 py-2">
                  <Plus className="h-4 w-4" />
                  Add Client
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to add a new client to your system.
                  </DialogDescription>
                </DialogHeader>
                
                <ClientForm 
                  onSubmit={onSubmitNewClient}
                  onCancel={() => setIsAddClientDialogOpen(false)}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <ClientTypeSelector 
                filterType={filterType}
                setFilterType={setFilterType}
                counts={counts}
              />
              
              <ClientSearchBar 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search clients... (try email:john@ or tag:VIP)"
              />
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMoreColumns(!showMoreColumns)}
                className="gap-2 text-sm"
              >
                {showMoreColumns ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showMoreColumns ? "Show Less" : "Show More"}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="gap-2 text-sm"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        {/* Client List */}
        <SimpleClientList 
          clients={filteredClients}
          selectedClients={selectedClients}
          toggleSelectAll={toggleSelectAll}
          toggleClientSelection={toggleClientSelection}
          showMoreColumns={showMoreColumns}
        />

        {/* Results footer */}
        {filteredClients.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {filteredClients.length} of {counts.all} clients
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      <ClientBulkActionsBar 
        selectedCount={selectedClients.length}
        onClearSelection={() => setSelectedClients([])}
      />
    </div>
  );
};

export default Clients;
