import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Filter,
  ListFilter,
  Plus,
  Search,
  Columns3,
} from "lucide-react";
import { Client, mockClients } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { ClientStatus, ClientColumn, ClientFormValues, createClientFromFormData } from "@/components/clients/ClientUtils";
import { ClientStatusSelector } from "@/components/clients/ClientStatus";
import { ClientList } from "@/components/clients/ClientList";
import { ClientFilters } from "@/components/clients/ClientFilters";
import { ClientQuickView } from "@/components/clients/ClientQuickView";
import { ClientBulkActions } from "@/components/clients/ClientBulkActions";
import { ClientColumnSelector } from "@/components/clients/ClientColumnSelector";
import { ClientForm } from "@/components/clients/ClientForm";

const Clients = () => {
  const { toast } = useToast();
  const [filterType, setFilterType] = useState<"residential" | "commercial" | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ClientStatus>("active");
  const [localClients, setLocalClients] = useState(mockClients);
  
  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState<ClientColumn[]>([
    "name", "contact", "address", "type", "lastService"
  ]);

  // Saved views state
  const [savedViews, setSavedViews] = useState<{name: string, filters: any}[]>([
    { name: "All Clients", filters: { type: "all" } },
    { name: "Overdue Residential", filters: { type: "residential", status: "active", balance: "overdue" } }
  ]);
  
  // Advanced filters state
  const [advancedFilters, setAdvancedFilters] = useState({
    tags: [],
    status: "all",
    dateRange: { start: null, end: null },
    nextJobRange: { start: null, end: null },
    balanceStatus: "all",
    zipCodes: [],
    staff: []
  });

  // Handle status change
  const handleStatusChange = (status: ClientStatus) => {
    setSelectedStatus(status);
  };

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
  const residentialCount = localClients.filter(
    (client) => client.type === "residential"
  ).length;
  const commercialCount = localClients.filter(
    (client) => client.type === "commercial"
  ).length;

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

  // Open quick view panel
  const openQuickView = (client: Client) => {
    setSelectedClient(client);
    setIsQuickViewOpen(true);
  };

  // Handle applying saved view
  const applySavedView = (view: {name: string, filters: any}) => {
    // In a real app, this would set all the relevant filters
    setFilterType(view.filters.type);
    toast({
      title: "View Applied",
      description: `Applied the "${view.name}" view`,
    });
  };

  // Handle adding a new client
  const onSubmitNewClient = (data: ClientFormValues) => {
    console.log("Adding new client:", data);
    // Generate a unique ID
    const newId = `client-${Date.now()}`;
    
    // Create a new client object
    const newClient = createClientFromFormData(data, newId);
    
    // Add the new client to the local state
    setLocalClients(prevClients => [newClient, ...prevClients]);
    
    // Close the dialog
    setIsAddClientDialogOpen(false);
    
    // Show success toast
    toast({
      title: "Client added",
      description: `${data.name} has been added successfully.`,
    });
  };

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Manage your residential and commercial clients.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ClientStatusSelector 
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
          />
          
          <Dialog open={isAddClientDialogOpen} onOpenChange={setIsAddClientDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Add New Client</span>
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
            {/* Search and action bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search clients... (try email:john@ or tag:VIP)"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setIsFilterDrawerOpen(true)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <ListFilter className="h-4 w-4" />
                      Saved Views
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2">
                    <div className="space-y-1">
                      {savedViews.map((view, i) => (
                        <Button 
                          key={i} 
                          variant="ghost" 
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => applySavedView(view)}
                        >
                          {view.name}
                        </Button>
                      ))}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                      >
                        <Plus className="h-3 w-3 mr-1" /> Save Current View
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Popover open={isColumnSelectorOpen} onOpenChange={setIsColumnSelectorOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      <Columns3 className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2">
                    <ClientColumnSelector 
                      visibleColumns={visibleColumns}
                      setVisibleColumns={setVisibleColumns}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Type Filter Tabs */}
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

              {/* Client List with Bulk Actions */}
              <TabsContent value="all" className="mt-4">
                <ClientList 
                  clients={filteredClients} 
                  selectedClients={selectedClients}
                  toggleSelectAll={toggleSelectAll}
                  toggleClientSelection={toggleClientSelection}
                  visibleColumns={visibleColumns}
                />
              </TabsContent>
              <TabsContent value="residential" className="mt-4">
                <ClientList 
                  clients={filteredClients.filter(
                    (client) => client.type === "residential"
                  )} 
                  selectedClients={selectedClients}
                  toggleSelectAll={toggleSelectAll}
                  toggleClientSelection={toggleClientSelection}
                  visibleColumns={visibleColumns}
                />
              </TabsContent>
              <TabsContent value="commercial" className="mt-4">
                <ClientList 
                  clients={filteredClients.filter(
                    (client) => client.type === "commercial"
                  )} 
                  selectedClients={selectedClients}
                  toggleSelectAll={toggleSelectAll}
                  toggleClientSelection={toggleClientSelection}
                  visibleColumns={visibleColumns}
                />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Filters Drawer */}
      <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Advanced Filters</DrawerTitle>
            <DrawerDescription>
              Filter clients by multiple criteria
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-2 overflow-y-auto">
            <ClientFilters 
              filters={advancedFilters} 
              setFilters={setAdvancedFilters} 
            />
          </div>
          <DrawerFooter className="border-t pt-4">
            <div className="flex justify-between w-full">
              <Button variant="outline" onClick={() => {
                setAdvancedFilters({
                  tags: [],
                  status: "all",
                  dateRange: { start: null, end: null },
                  nextJobRange: { start: null, end: null },
                  balanceStatus: "all",
                  zipCodes: [],
                  staff: []
                });
              }}>
                Reset Filters
              </Button>
              <Button onClick={() => {
                setIsFilterDrawerOpen(false);
                toast({
                  title: "Filters Applied",
                  description: "Client list updated with your filters",
                });
              }}>
                Apply Filters
              </Button>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Quick View Panel */}
      <Drawer open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Client Details</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4">
            {selectedClient && <ClientQuickView client={selectedClient} />}
          </div>
          <DrawerFooter className="border-t">
            <div className="flex justify-between w-full">
              <Button variant="outline" asChild>
                <Link to={`/clients/${selectedClient?.id}`}>
                  View Full Profile
                </Link>
              </Button>
              <Button variant="outline" className="gap-2">
                <Link to={`/clients/${selectedClient?.id}`}>
                  View Full Profile
                </Link>
              </Button>
            </div>
            <DrawerClose />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      
      {/* Bulk Actions Panel - show only when clients are selected */}
      {selectedClients.length > 0 && (
        <ClientBulkActions 
          count={selectedClients.length} 
          onClearSelection={() => setSelectedClients([])} 
        />
      )}
    </div>
  );
};

export default Clients;
