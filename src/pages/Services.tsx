
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
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Services</h1>
              <p className="text-gray-500 mt-1 font-medium">
                {filteredServices.length} active services
              </p>
            </div>
            <Button 
              onClick={openNewServiceForm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>

          {/* Smart Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search services..."
              className="pl-10 h-11 border-gray-200 bg-white rounded-lg text-gray-900 placeholder-gray-500"
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

// Clean Service Card Component (iOS App Store inspired)
interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  onEdit: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick, onEdit }) => {
  return (
    <Card 
      className="group cursor-pointer bg-white border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden"
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
              {service.name}
            </CardTitle>
            {service.category && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 border-0 rounded-full px-2 py-1">
                {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price - Most Important */}
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(service.price)}
            </span>
            <span className="text-sm text-gray-500 font-medium">
              {service.priceType === "hourly"
                ? "/ hour"
                : service.priceType === "sqft"
                ? "/ sq ft"
                : ""}
            </span>
          </div>
        </div>

        {/* Key Details */}
        {service.defaultDuration && (
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-gray-400" />
            <span>
              {service.defaultDuration < 60
                ? `${service.defaultDuration} mins`
                : `${Math.floor(service.defaultDuration / 60)}h ${service.defaultDuration % 60 > 0 ? `${service.defaultDuration % 60}m` : ""}`}
            </span>
          </div>
        )}

        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2 text-gray-400" />
          <span>
            {service.clientType === "both"
              ? "All clients"
              : service.clientType === "residential"
              ? "Residential"
              : "Commercial"}
          </span>
        </div>

        {/* View Details Indicator */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <span className="text-xs text-gray-400 font-medium">Tap for details</span>
          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-400 transition-colors" />
        </div>
      </CardContent>
    </Card>
  );
};

// iOS Settings Style Service Details Dialog
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
    <div className="flex justify-between items-center py-4 px-0">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-900 font-semibold text-right">{value}</span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-xl">
        <DialogHeader className="text-left pb-2">
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
              <div className="space-y-3">
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
              <div className="space-y-3">
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
