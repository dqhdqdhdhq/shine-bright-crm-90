
import React, { useState } from "react";
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
import { Edit, Plus, Search } from "lucide-react";
import { ClientType, Service, mockServices } from "@/data/mockData";
import { formatCurrency } from "@/lib/utils";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = mockServices.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const closeDialog = () => {
    setSelectedService(null);
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
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Service</span>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search services..."
          className="pl-8 w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="transition-all hover:shadow-md cursor-pointer"
            style={{
              borderTopColor: service.color,
              borderTopWidth: "4px",
            }}
            onClick={() => handleServiceClick(service)}
          >
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {service.description}
              </CardDescription>
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
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2">
                <Edit className="h-4 w-4" />
                <span>Edit Service</span>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredServices.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-center text-muted-foreground mb-4">
                No services found matching your search.
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <ServiceDetailsDialog
        service={selectedService}
        open={!!selectedService}
        onClose={closeDialog}
      />
    </div>
  );
};

interface ServiceDetailsDialogProps {
  service: Service | null;
  open: boolean;
  onClose: () => void;
}

const ServiceDetailsDialog: React.FC<ServiceDetailsDialogProps> = ({
  service,
  open,
  onClose,
}) => {
  if (!service) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{service.name}</DialogTitle>
          <DialogDescription>Service details and specifications</DialogDescription>
        </DialogHeader>

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
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Services;
