
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
import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  CalendarDays, 
  DollarSign,
  User,
  MessageSquare,
  ChevronDown,
  Edit,
  FileText,
  Plus,
} from "lucide-react";
import { ScheduleJobDialog } from "@/components/schedule/ScheduleJobDialog";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";

interface ClientQuickViewProps {
  client: Client;
}

const clientEditFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  street: z.string().min(3, { message: "Street address is required." }),
  city: z.string().min(2, { message: "City is required." }),
  state: z.string().min(2, { message: "State is required." }),
  zipCode: z.string().min(5, { message: "Zip code is required." }),
  notes: z.string().optional(),
});

export const ClientQuickView: React.FC<ClientQuickViewProps> = ({ client }) => {
  const primaryContact = client.contacts.find((c) => c.isPrimary) || client.contacts[0];
  const primaryAddress = client.addresses[0];
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const [isJobsDialogOpen, setIsJobsDialogOpen] = React.useState(false);

  const form = useForm<z.infer<typeof clientEditFormSchema>>({
    resolver: zodResolver(clientEditFormSchema),
    defaultValues: {
      name: client.name,
      email: primaryContact.email,
      phone: primaryContact.phone,
      street: primaryAddress.street,
      city: primaryAddress.city,
      state: primaryAddress.state,
      zipCode: primaryAddress.zipCode,
      notes: "",
    },
  });
  
  function onSubmitEdit(data: z.infer<typeof clientEditFormSchema>) {
    // In a real app, we would save this to the backend
    console.log("Edited client data:", data);
    
    toast({
      title: "Client updated",
      description: `${data.name} has been updated successfully.`,
    });
    
    setIsEditOpen(false);
  }

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
        <Link to={`/clients/${client.id}`}>
          <Button variant="default" size="sm" className="gap-1">
            <FileText className="h-3.5 w-3.5" />
            View Profile
          </Button>
        </Link>
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Client</DialogTitle>
              <DialogDescription>
                Make changes to client information below.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zip Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Add additional notes..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        <ScheduleJobDialog 
          client={client}
          triggerButton={
            <Button variant="outline" size="sm" className="gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              Schedule
            </Button>
          }
        />
        
        <Dialog open={isJobsDialogOpen} onOpenChange={setIsJobsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1">
              <FileText className="h-3.5 w-3.5" />
              View Jobs
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[650px]">
            <DialogHeader>
              <DialogTitle>Jobs for {client.name}</DialogTitle>
              <DialogDescription>
                View upcoming and past jobs for this client.
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="upcoming">
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="upcoming">Upcoming Jobs</TabsTrigger>
                <TabsTrigger value="past">Past Jobs</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="mt-4 border rounded-md p-4">
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming jobs scheduled.
                </div>
              </TabsContent>
              <TabsContent value="past" className="mt-4 border rounded-md p-4">
                <div className="text-center py-8 text-muted-foreground">
                  No past jobs found.
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <ScheduleJobDialog
                client={client}
                triggerButton={
                  <Button className="gap-1">
                    <Plus className="h-3.5 w-3.5" />
                    Schedule New Job
                  </Button>
                }
              />
              <Button type="button" variant="outline" onClick={() => setIsJobsDialogOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

