import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
  Edit,
  Plus,
  Search,
  ChevronRight,
  Clock,
  Users,
  MapPin,
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

const Services = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [services, setServices] = useState<Service[]>(mockServices);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  // Smart filtering based on search term
  const filteredServices = useMemo(() => {
    if (!searchTerm) return services.filter(s => s.isActive !== false);
    
    return services.filter((service) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.category?.toLowerCase().includes(searchLower)
      ) && service.isActive !== false;
    });
  }, [searchTerm, services]);

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

  const categories = useMemo(() => {
    const allCategories = services.map((service) => service.category);
    return Array.from(new Set(allCategories)).filter(Boolean) as ServiceCategory[];
  }, [services]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Services</h1>
              <p className="text-gray-600 mt-1">
                {filteredServices.length} active services
              </p>
            </div>
            <Button 
              onClick={openNewServiceForm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search services..."
              className="pl-10 h-11 border-gray-300 bg-white rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
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
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first service"}
            </p>
            <Button onClick={openNewServiceForm} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Service
            </Button>
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
            <DialogTitle className="text-xl font-semibold">
              {editingService ? "Edit Service" : "Create Service"}
            </DialogTitle>
            <DialogDescription className="text-gray-500">
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

// Enhanced Service Card Component
interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  onEdit: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, onEdit }) => {
  return (
    <Card 
      className="group cursor-pointer bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 rounded-xl overflow-hidden"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
              {service.name}
            </CardTitle>
            {service.category && (
              <Badge 
                variant="secondary" 
                className="text-xs bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1 font-medium"
              >
                {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg h-8 w-8 hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price Display - Enhanced with gradient */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {formatCurrency(service.price)}
              </span>
              {service.priceType && service.priceType !== "flat" && (
                <span className="text-sm text-gray-600 font-medium">
                  {service.priceType === "hourly"
                    ? "/ hour"
                    : service.priceType === "sqft"
                    ? "/ sq ft"
                    : ""}
                </span>
              )}
            </div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Service Details */}
        <div className="space-y-3">
          {service.defaultDuration && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-3 text-blue-500" />
              <span className="font-medium">
                {service.defaultDuration < 60
                  ? `${service.defaultDuration} mins`
                  : `${Math.floor(service.defaultDuration / 60)}h ${service.defaultDuration % 60 > 0 ? `${service.defaultDuration % 60}m` : ""}`}
              </span>
            </div>
          )}

          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-3 text-green-500" />
            <span className="font-medium">
              {service.clientType === "both"
                ? "All clients"
                : service.clientType === "residential"
                ? "Residential"
                : "Commercial"}
            </span>
          </div>

          {service.tasks && service.tasks.length > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-3 text-purple-500" />
              <span className="font-medium">{service.tasks.length} tasks included</span>
            </div>
          )}
        </div>

        {/* View Details */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500 font-medium">Tap for details</span>
          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
      </CardContent>
    </Card>
  );
};

// Service Details Dialog with proper sizing
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

  const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center py-3 px-0">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold text-right">{value}</span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto rounded-xl">
        <DialogHeader className="text-left pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">{service.name}</DialogTitle>
          <DialogDescription className="text-gray-600 text-base leading-relaxed">
            {service.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category Badge */}
          {service.category && (
            <div>
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 rounded-full px-3 py-1">
                {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
              </Badge>
            </div>
          )}

          {/* Essential Details */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-0 divide-y divide-gray-200">
            <DetailRow
              label="Price"
              value={`${formatCurrency(service.price)} ${
                service.priceType === "hourly"
                  ? "/ hour"
                  : service.priceType === "sqft"
                  ? "/ sq ft"
                  : ""
              }`}
            />
            {service.defaultDuration && (
              <DetailRow
                label="Duration"
                value={
                  service.defaultDuration < 60
                    ? `${service.defaultDuration} minutes`
                    : `${Math.floor(service.defaultDuration / 60)} hour${Math.floor(service.defaultDuration / 60) > 1 ? "s" : ""}${
                        service.defaultDuration % 60 > 0 ? ` ${service.defaultDuration % 60} min` : ""
                      }`
                }
              />
            )}
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
          {service.tasks && service.tasks.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Tasks Included</h3>
              <div className="space-y-2">
                {service.tasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Supplies */}
          {service.requiredSupplies && service.requiredSupplies.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Required Supplies</h3>
              <div className="space-y-2">
                {service.requiredSupplies.map((supply, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{supply}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-6 border-t border-gray-100">
          <Button variant="outline" onClick={onClose} className="flex-1 h-11 rounded-lg">
            Close
          </Button>
          <Button 
            onClick={() => {
              onClose();
              onEdit(service);
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 h-11 rounded-lg"
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
