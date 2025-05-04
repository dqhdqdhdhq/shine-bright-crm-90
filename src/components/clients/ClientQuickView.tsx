
import React from "react";
import { Client } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/lib/utils";
import { 
  Phone, 
  Mail, 
  MapPin, 
  CalendarDays, 
  DollarSign,
  User,
  MessageSquare,
  ChevronDown
} from "lucide-react";

interface ClientQuickViewProps {
  client: Client;
}

export const ClientQuickView: React.FC<ClientQuickViewProps> = ({ client }) => {
  const primaryContact = client.contacts.find((c) => c.isPrimary) || client.contacts[0];
  const primaryAddress = client.addresses[0];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{client.name}</h3>
          <Badge variant={client.type === "residential" ? "outline" : "secondary"}>
            {client.type === "residential" ? "Residential" : "Commercial"}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-1">
          {client.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 mt-1">
          Active
        </Badge>
      </div>

      {/* Primary Contact Information */}
      <div className="border rounded-md p-3 space-y-2 bg-muted/30">
        <div className="flex items-center">
          <User className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="font-medium">{primaryContact.name}</span>
        </div>
        <div className="flex items-center text-sm">
          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
          <a href={`mailto:${primaryContact.email}`} className="text-primary hover:underline">
            {primaryContact.email}
          </a>
        </div>
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
          <a href={`tel:${primaryContact.phone}`} className="hover:underline">
            {formatPhoneNumber(primaryContact.phone)}
          </a>
        </div>
      </div>

      {/* Primary Address */}
      <div className="border rounded-md p-3">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="font-medium">Primary Address</span>
        </div>
        <div className="mt-1 pl-6 text-sm">
          <p>{primaryAddress.street}</p>
          <p>
            {primaryAddress.city}, {primaryAddress.state} {primaryAddress.zipCode}
          </p>
        </div>
      </div>

      {/* Service Information */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-md p-3">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm font-medium">Last Service</span>
          </div>
          <p className="mt-1 text-sm">
            {client.lastService || "None"}
          </p>
        </div>
        <div className="border rounded-md p-3">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm font-medium">Next Service</span>
          </div>
          <p className="mt-1 text-sm">
            {client.lastService || "None scheduled"}
          </p>
        </div>
      </div>

      {/* Financial Information */}
      <div className="border rounded-md p-3">
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="font-medium">Financial</span>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <p className="text-xs text-muted-foreground">Current Balance</p>
            <p className="font-medium">$0.00</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Client Since</p>
            <p className="font-medium">Mar 15, 2023</p>
          </div>
        </div>
      </div>

      {/* Notes Accordion */}
      <Accordion type="single" collapsible className="border rounded-md">
        <AccordionItem value="notes" className="border-b-0">
          <AccordionTrigger className="px-3 py-2 hover:bg-muted/20">
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              <span>Notes</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-0 pb-2">
            <div className="space-y-2">
              <div className="text-sm p-2 border rounded-md">
                <p className="font-medium">Service Note</p>
                <p className="text-xs text-muted-foreground">Apr 15, 2023</p>
                <p className="mt-1 text-sm">Client requested extra attention to kitchen floors.</p>
              </div>
              <div className="text-sm p-2 border rounded-md">
                <p className="font-medium">Follow Up</p>
                <p className="text-xs text-muted-foreground">Mar 23, 2023</p>
                <p className="mt-1 text-sm">Called about increasing service frequency.</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Phone className="h-3.5 w-3.5" />
          Call
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Mail className="h-3.5 w-3.5" />
          Email
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <CalendarDays className="h-3.5 w-3.5" />
          Schedule
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <MessageSquare className="h-3.5 w-3.5" />
          Add Note
        </Button>
      </div>
    </div>
  );
};
