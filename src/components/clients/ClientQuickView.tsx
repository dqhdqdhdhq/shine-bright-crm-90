
import React from "react";
import { Client } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber, getInitials } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Phone, 
  Mail, 
  MapPin, 
  CalendarDays, 
  DollarSign,
  FileText,
  Edit,
  ChevronRight,
} from "lucide-react";

interface ClientQuickViewProps {
  client: Client;
}

export const ClientQuickView: React.FC<ClientQuickViewProps> = ({ client }) => {
  const primaryContact = client.contacts.find((c) => c.isPrimary) || client.contacts[0];
  const primaryAddress = client.addresses[0];

  const InfoItem = ({ icon: Icon, label, value, action }: {
    icon: any;
    label: string;
    value: string;
    action?: () => void;
  }) => (
    <div 
      className={`flex items-center gap-3 py-2 ${action ? 'cursor-pointer hover:bg-gray-50 rounded-md px-2 -mx-2' : ''}`}
      onClick={action}
    >
      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon className="h-3 w-3 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 uppercase tracking-wide">{label}</p>
        <p className="text-sm text-gray-900 truncate">{value}</p>
      </div>
      {action && <ChevronRight className="h-3 w-3 text-gray-400" />}
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarFallback className="text-sm font-semibold">
            {getInitials(client.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{client.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={client.type === "residential" ? "outline" : "secondary"} className="text-xs">
              {client.type === "residential" ? "Residential" : "Commercial"}
            </Badge>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
              Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="space-y-3 mb-4">
        <InfoItem
          icon={Phone}
          label="Phone"
          value={formatPhoneNumber(primaryContact.phone)}
          action={() => window.open(`tel:${primaryContact.phone}`)}
        />
        <InfoItem
          icon={Mail}
          label="Email"
          value={primaryContact.email}
          action={() => window.open(`mailto:${primaryContact.email}`)}
        />
        <InfoItem
          icon={MapPin}
          label="Address"
          value={`${primaryAddress.street}, ${primaryAddress.city}`}
        />
        <InfoItem
          icon={CalendarDays}
          label="Last Service"
          value={client.lastService || "No services yet"}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">$0</div>
          <div className="text-xs text-gray-500">Balance</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">0</div>
          <div className="text-xs text-gray-500">Jobs</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link to={`/clients/${client.id}`} className="flex-1">
          <Button variant="default" size="sm" className="w-full gap-1 text-xs">
            <FileText className="h-3 w-3" />
            View Details
          </Button>
        </Link>
        <Button variant="outline" size="sm" className="gap-1 text-xs">
          <CalendarDays className="h-3 w-3" />
          Schedule
        </Button>
      </div>
    </div>
  );
};
