
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  Plus,
  Search,
  ListFilter,
  Package,
  LayoutGrid,
  List as ListIcon,
} from "lucide-react";
import {
  ClientType,
  Service,
  ServiceCategory,
  mockServices,
} from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ServiceForm from "@/components/services/ServiceForm";
import { useToast } from "@/components/ui/use-toast";

type ViewMode = "card" | "list";

// Filter options
type FilterState = {
  category: ServiceCategory | "all";
  clientType: ClientType | "both" | "all";
  priceType: Service["priceType"] | "all";
  status: "active" | "inactive" | "all";
};

const Services = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("card");
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    clientType: "all",
    priceType: "all",
    status: "all",
  });
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const allCategories = services.map((service) => service.category);
    return Array.from(new Set(allCategories)).filter(Boolean) as ServiceCategory[];
  }, [services]);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Search filter
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = 
        filters.category === "all" || service.category === filters.category;
      
      // Client type filter
      const matchesClientType =
        filters.clientType === "all" || 
        service.clientType === filters.clientType || 
        service.clientType === "both";
      
      // Price type filter
      const matchesPriceType =
        filters.priceType === "all" || service.priceType === filters.priceType;
      
      // Status filter
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "active" && service.isActive !== false) ||
        (filters.status === "inactive" && service.isActive === false);
      
      return matchesSearch && matchesCategory && matchesClientType && matchesPriceType && matchesStatus;
    });
  }, [searchTerm, filters, services]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const closeDetailsDialog = () => {
    setSelectedService(null);
  };

  const openNewServiceForm = () => {
    setEditingService(null);
    setIsFormOpen(true);
  };

  const openEditServiceForm = (service: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const closeServiceForm = () => {
    setEditingService(null);
    setIsFormOpen(false);
  };

  const handleSaveService = (serviceData: any) => {
    // In a real app, we would make API calls here
    // For this example, we'll just update the local state
    
    if (editingService) {
      // Update existing service
      setServices((prev) => 
        prev.map((s) => (s.id === editingService.id ? { ...serviceData, id: editingService.id } : s))
      );
      toast({
        title: "Service Updated",
        description: `${serviceData.name} has been updated successfully.`,
      });
    } else {
      // Create new service
      const newService = {
        ...serviceData,
        id: `service-${Date.now()}`, // Generate a unique ID
        createdAt: new Date().toISOString(),
      };
      setServices((prev) => [...prev, newService]);
      toast({
        title: "Service Created",
        description: `${serviceData.name} has been created successfully.`,
      });
    }
    
    // Close the form dialog
    setIsFormOpen(false);
  };

  const handleFilterChange = (
    key: keyof FilterState,
    value: FilterState[keyof FilterState]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      category: "all",
      clientType: "all",
      priceType: "all",
      status: "all",
    });
    setSearchTerm("");
  };

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Manage your cleaning service offerings.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode(viewMode === "card" ? "list" : "card")}
            className="h-9 w-9"
          >
            {viewMode === "card" ? (
              <ListIcon className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </Button>
          <Button className="gap-2" onClick={openNewServiceForm}>
            <Plus className="h-4 w-4" />
            <span>Add New Service</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative col-span-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search services..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-span-1">
          <Select
            value={filters.category}
            onValueChange={(value) =>
              handleFilterChange("category", value as ServiceCategory | "all")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1">
          <Select
            value={filters.clientType}
            onValueChange={(value) =>
              handleFilterChange("clientType", value as ClientType | "both" | "all")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Client Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Client Types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1">
          <Select
            value={filters.status}
            onValueChange={(value) =>
              handleFilterChange("status", value as "active" | "inactive" | "all")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(filters.category !== "all" ||
          filters.clientType !== "all" ||
          filters.priceType !== "all" ||
          filters.status !== "all" ||
          searchTerm !== "") && (
          <div className="col-span-full flex justify-between items-center mt-2 mb-4">
            <div className="flex flex-wrap gap-2">
              {filters.category !== "all" && (
                <Badge variant="outline" className="flex gap-1 items-center">
                  <span>Category: {filters.category}</span>
                </Badge>
              )}
              {filters.clientType !== "all" && (
                <Badge variant="outline" className="flex gap-1 items-center">
                  <span>Client: {filters.clientType}</span>
                </Badge>
              )}
              {filters.priceType !== "all" && (
                <Badge variant="outline" className="flex gap-1 items-center">
                  <span>Price: {filters.priceType}</span>
                </Badge>
              )}
              {filters.status !== "all" && (
                <Badge variant="outline" className="flex gap-1 items-center">
                  <span>Status: {filters.status}</span>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="outline" className="flex gap-1 items-center">
                  <span>Search: {searchTerm}</span>
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <Card
                key={service.id}
                className={`transition-all hover:shadow-md cursor-pointer ${
                  !service.isActive ? "opacity-70" : ""
                }`}
                style={{
                  borderLeftColor: service.color,
                  borderLeftWidth: "8px",
                }}
                onClick={() => handleServiceClick(service)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">
                        {service.description}
                      </CardDescription>
                    </div>
                    {service.category && (
                      <Badge variant="secondary" className="ml-2">
                        {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold">
                        {formatCurrency(service.price)}
                      </span>
                      <span className="text-muted-foreground ml-2">
                        {service.priceType === "hourly"
                          ? "/ hour"
                          : service.priceType === "sqft"
                          ? "/ sq ft"
                          : "flat rate"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span>
                      {service.defaultDuration < 60
                        ? `${service.defaultDuration} minutes`
                        : `${service.defaultDuration / 60} hour${
                            service.defaultDuration > 60 ? "s" : ""
                          }`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm text-muted-foreground">Client Type</span>
                      <Badge
                        variant={
                          service.clientType === "residential"
                            ? "outline"
                            : service.clientType === "commercial"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {service.clientType === "both"
                          ? "All Clients"
                          : service.clientType === "residential"
                          ? "Residential"
                          : "Commercial"}
                      </Badge>
                    </div>

                    {service.isActive === false && (
                      <Badge variant="outline" className="text-muted-foreground">
                        Inactive
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditServiceForm(service);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Service</span>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="col-span-full">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <p className="text-center text-muted-foreground mb-4">
                  No services found matching your criteria.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Service Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Client Type</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <TableRow 
                    key={service.id}
                    className={`cursor-pointer ${!service.isActive ? "opacity-70" : ""}`}
                    onClick={() => handleServiceClick(service)}
                  >
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-8 w-2 rounded-full mr-3" style={{ backgroundColor: service.color }}></div>
                        <div>
                          <p className="font-medium">{service.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {service.category && (
                        <Badge variant="secondary">
                          {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          service.clientType === "residential"
                            ? "outline"
                            : service.clientType === "commercial"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {service.clientType === "both"
                          ? "All Clients"
                          : service.clientType === "residential"
                          ? "Residential"
                          : "Commercial"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {service.defaultDuration < 60
                        ? `${service.defaultDuration} mins`
                        : `${service.defaultDuration / 60} hr${
                            service.defaultDuration > 60 ? "s" : ""
                          }`}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span className="font-medium">
                          {formatCurrency(service.price)}
                        </span>
                        <span className="text-xs text-muted-foreground ml-1">
                          {service.priceType === "hourly"
                            ? "/ hr"
                            : service.priceType === "sqft"
                            ? "/ sqft"
                            : "flat"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {service.isActive === false ? (
                        <Badge variant="outline" className="text-muted-foreground">
                          Inactive
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditServiceForm(service);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <p className="text-muted-foreground">
                      No services found matching your criteria.
                    </p>
                    <Button variant="link" onClick={resetFilters} className="mt-2">
                      Clear Filters
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Service Details Dialog */}
      <ServiceDetailsDialog
        service={selectedService}
        open={!!selectedService}
        onClose={closeDetailsDialog}
        onEdit={openEditServiceForm}
      />

      {/* Service Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={(open) => !open && closeServiceForm()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Create New Service"}
            </DialogTitle>
            <DialogDescription>
              {editingService
                ? "Update the details for this service"
                : "Fill in the details to create a new service"}
            </DialogDescription>
          </DialogHeader>

          <ServiceForm
            service={editingService}
            onSave={handleSaveService}
            onCancel={closeServiceForm}
            availableCategories={categories}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface ServiceDetailsDialogProps {
  service: Service | null;
  open: boolean;
  onClose: () => void;
  onEdit: (service: Service) => void;
}

const ServiceDetailsDialog: React.FC<ServiceDetailsDialogProps> = ({
  service,
  open,
  onClose,
  onEdit,
}) => {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{service.name}</DialogTitle>
          <DialogDescription>Service details and specifications</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 mt-2">
          {service.category && (
            <Badge variant="secondary">
              {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
            </Badge>
          )}
          {service.isActive === false ? (
            <Badge variant="outline" className="text-muted-foreground">
              Inactive
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Active
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {service.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Price</h3>
              <div className="flex items-center mt-1">
                <span className="text-2xl font-bold">
                  {formatCurrency(service.price)}
                </span>
                <span className="text-muted-foreground ml-2">
                  {service.priceType === "hourly"
                    ? "/ hour"
                    : service.priceType === "sqft"
                    ? "/ sq ft"
                    : "flat rate"}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">Default Duration</h3>
              <p className="text-sm mt-1">
                {service.defaultDuration < 60
                  ? `${service.defaultDuration} minutes`
                  : `${service.defaultDuration / 60} hour${
                      service.defaultDuration > 60 ? "s" : ""
                    }`}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium">Client Type</h3>
              <Badge
                className="mt-1"
                variant={
                  service.clientType === "residential"
                    ? "outline"
                    : service.clientType === "commercial"
                    ? "secondary"
                    : "default"
                }
              >
                {service.clientType === "both"
                  ? "All Clients"
                  : service.clientType === "residential"
                  ? "Residential"
                  : "Commercial"}
              </Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Tasks Included</h3>
              <ul className="space-y-1">
                {service.tasks.map((task, index) => (
                  <li
                    key={index}
                    className="text-sm flex items-center gap-2 before:content-['•'] before:text-primary"
                  >
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Required Supplies</h3>
              <ul className="space-y-1">
                {service.requiredSupplies.map((supply, index) => (
                  <li
                    key={index}
                    className="text-sm flex items-center gap-2 before:content-['•'] before:text-primary"
                  >
                    <span>{supply}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            className="gap-2"
            onClick={() => {
              onClose();
              onEdit(service);
            }}
          >
            <Edit className="h-4 w-4" />
            Edit Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Services;
