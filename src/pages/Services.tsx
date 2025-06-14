
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  Filter,
  X,
  ChevronRight,
  Clock,
  Users,
} from "lucide-react";
import {
  ClientType,
  Service,
  ServiceCategory,
  mockServices,
} from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";
import ServiceForm from "@/components/services/ServiceForm";
import { useToast } from "@/components/ui/use-toast";

// Filter options
type FilterState = {
  category: ServiceCategory | "all";
  clientType: ClientType | "both" | "all";
  status: "active" | "inactive" | "all";
};

const Services = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    clientType: "all",
    status: "active", // Default to active services only
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
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = 
        filters.category === "all" || service.category === filters.category;
      
      // Client type filter
      const matchesClientType =
        filters.clientType === "all" || 
        service.clientType === filters.clientType || 
        service.clientType === "both";
      
      // Status filter
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "active" && service.isActive !== false) ||
        (filters.status === "inactive" && service.isActive === false);
      
      return matchesSearch && matchesCategory && matchesClientType && matchesStatus;
    });
  }, [searchTerm, filters, services]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.clientType !== "all") count++;
    if (filters.status !== "active") count++; // active is default
    return count;
  }, [filters]);

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
    if (editingService) {
      setServices((prev) => 
        prev.map((s) => (s.id === editingService.id ? { ...serviceData, id: editingService.id } : s))
      );
      toast({
        title: "Service Updated",
        description: `${serviceData.name} has been updated successfully.`,
      });
    } else {
      const newService = {
        ...serviceData,
        id: `service-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setServices((prev) => [...prev, newService]);
      toast({
        title: "Service Created",
        description: `${serviceData.name} has been created successfully.`,
      });
    }
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
      status: "active",
    });
    setSearchTerm("");
    setShowFilters(false);
  };

  const clearFilter = (key: keyof FilterState) => {
    if (key === "status") {
      setFilters((prev) => ({ ...prev, [key]: "active" }));
    } else {
      setFilters((prev) => ({ ...prev, [key]: "all" }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900">Services</h1>
              <p className="text-gray-500 mt-1">
                {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'}
              </p>
            </div>
            <Button 
              onClick={openNewServiceForm}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          {/* Smart Search Bar */}
          <div className="mt-6 flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search services..."
                className="pl-10 border-gray-200 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`gap-2 ${activeFilterCount > 0 ? 'bg-blue-50 border-blue-200 text-blue-700' : ''}`}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) =>
                      handleFilterChange("category", value as ServiceCategory | "all")
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
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

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Client Type</label>
                  <Select
                    value={filters.clientType}
                    onValueChange={(value) =>
                      handleFilterChange("clientType", value as ClientType | "both" | "all")
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Status</label>
                  <Select
                    value={filters.status}
                    onValueChange={(value) =>
                      handleFilterChange("status", value as "active" | "inactive" | "all")
                    }
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex flex-wrap gap-2">
                  {filters.category !== "all" && (
                    <Badge variant="outline" className="flex gap-1 items-center">
                      <span>Category: {filters.category}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter("category")} />
                    </Badge>
                  )}
                  {filters.clientType !== "all" && (
                    <Badge variant="outline" className="flex gap-1 items-center">
                      <span>Client: {filters.clientType}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter("clientType")} />
                    </Badge>
                  )}
                  {filters.status !== "active" && (
                    <Badge variant="outline" className="flex gap-1 items-center">
                      <span>Status: {filters.status}</span>
                      <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter("status")} />
                    </Badge>
                  )}
                </div>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Reset All
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={() => handleServiceClick(service)}
                onEdit={() => openEditServiceForm(service)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <div className="space-x-3">
              <Button variant="outline" onClick={resetFilters}>
                Clear Filters
              </Button>
              <Button onClick={openNewServiceForm}>
                Create New Service
              </Button>
            </div>
          </div>
        )}
      </div>

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

// Clean Service Card Component (iOS App Store inspired)
interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  onEdit: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, onEdit }) => {
  return (
    <Card 
      className="group cursor-pointer border-0 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-1">
              {service.name}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              {service.category && (
                <Badge variant="secondary" className="text-xs">
                  {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                </Badge>
              )}
              {service.isActive === false ? (
                <Badge variant="outline" className="text-xs text-gray-500">
                  Inactive
                </Badge>
              ) : (
                <Badge className="text-xs bg-green-100 text-green-800 border-green-200">
                  Active
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price - Most Important Info */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(service.price)}
            </span>
            <span className="text-sm text-gray-500">
              {service.priceType === "hourly"
                ? "/ hour"
                : service.priceType === "sqft"
                ? "/ sq ft"
                : "flat rate"}
            </span>
          </div>
        </div>

        {/* Key Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>
              {service.defaultDuration < 60
                ? `${service.defaultDuration} mins`
                : `${service.defaultDuration / 60} hr${service.defaultDuration > 60 ? "s" : ""}`}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-2 text-gray-400" />
            <span>
              {service.clientType === "both"
                ? "All Clients"
                : service.clientType === "residential"
                ? "Residential"
                : "Commercial"}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-2">
          {service.description}
        </p>

        {/* View Details Indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">Tap for details</span>
          <ChevronRight className="h-4 w-4 text-gray-300" />
        </div>
      </CardContent>
    </Card>
  );
};

// Clean Service Details Dialog (iOS Settings inspired)
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

  const DetailRow = ({ label, value, action }: {
    label: string;
    value: string;
    action?: () => void;
  }) => (
    <div 
      className={`flex justify-between items-center py-3 px-4 hover:bg-gray-50 ${
        action ? 'cursor-pointer' : ''
      }`}
      onClick={action}
    >
      <span className="text-gray-600">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-gray-900 font-medium">{value}</span>
        {action && <ChevronRight className="h-4 w-4 text-gray-400" />}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-semibold">{service.name}</DialogTitle>
          <DialogDescription className="text-gray-500">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status & Category */}
          <div className="flex items-center gap-2">
            {service.category && (
              <Badge variant="secondary">
                {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
              </Badge>
            )}
            {service.isActive === false ? (
              <Badge variant="outline" className="text-gray-500">
                Inactive
              </Badge>
            ) : (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Active
              </Badge>
            )}
          </div>

          {/* Essential Details */}
          <div className="bg-gray-50 rounded-lg divide-y divide-gray-200">
            <DetailRow
              label="Price"
              value={`${formatCurrency(service.price)} ${
                service.priceType === "hourly"
                  ? "/ hour"
                  : service.priceType === "sqft"
                  ? "/ sq ft"
                  : "flat rate"
              }`}
            />
            <DetailRow
              label="Duration"
              value={
                service.defaultDuration < 60
                  ? `${service.defaultDuration} minutes`
                  : `${service.defaultDuration / 60} hour${
                      service.defaultDuration > 60 ? "s" : ""
                    }`
              }
            />
            <DetailRow
              label="Client Type"
              value={
                service.clientType === "both"
                  ? "All Clients"
                  : service.clientType === "residential"
                  ? "Residential"
                  : "Commercial"
              }
            />
          </div>

          {/* Tasks */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Tasks Included</h3>
            <div className="space-y-2">
              {service.tasks.map((task, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                  <span>{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Supplies */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Required Supplies</h3>
            <div className="space-y-2">
              {service.requiredSupplies.map((supply, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                  <span>{supply}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button 
            onClick={() => {
              onClose();
              onEdit(service);
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Services;
