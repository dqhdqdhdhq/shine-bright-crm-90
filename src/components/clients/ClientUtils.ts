
import * as z from "zod";
import { Client } from "@/data/mockData";

// Client status types
export type ClientStatus = "lead" | "prospect" | "active" | "on-hold" | "inactive" | "lost";

// Define available columns for customization
export type ClientColumn = 
  | "name" 
  | "contact" 
  | "address" 
  | "type" 
  | "status" 
  | "lastService" 
  | "nextService" 
  | "balance" 
  | "clientSince"
  | "assignedStaff";

// Define the client form schema
export const ClientFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  type: z.enum(["residential", "commercial"]),
  contactName: z.string().min(2, { message: "Contact name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number is required." }),
  street: z.string().min(5, { message: "Street address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().min(5, { message: "Zip code is required." }),
  tags: z.string().optional(),
  status: z.enum(["lead", "prospect", "active", "on-hold", "inactive", "lost"]),
  notes: z.string().optional(),
});

// Define the client form values type
export type ClientFormValues = z.infer<typeof ClientFormSchema>;

// Helper function to create a new client from form data
export const createClientFromFormData = (data: ClientFormValues, id: string): Client => {
  return {
    id,
    name: data.name,
    type: data.type,
    contacts: [
      {
        name: data.contactName,
        email: data.email,
        phone: data.phone,
        isPrimary: true,
      },
    ],
    addresses: [
      {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
      },
    ],
    tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
    lastService: null,
    notes: data.notes || "",
    createdAt: new Date().toISOString(),
  };
};

// Helper functions for filtering clients
export const filterClients = (
  clients: Client[],
  filterType: string,
  searchTerm: string
) => {
  return clients.filter((client) => {
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
};
