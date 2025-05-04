
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, Edit, Mail, MapPin, Phone, Plus, ArrowLeft, AlertCircle } from 'lucide-react';
import { getClientById, getJobsByClientId } from '@/data/mockData';
import { formatPhoneNumber, getInitials } from '@/lib/utils';
import NotFound from './NotFound';

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const client = id ? getClientById(id) : undefined;
  const clientJobs = id ? getJobsByClientId(id) : [];
  
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!client) {
    return <NotFound />;
  }

  const primaryContact = client.contacts.find(c => c.isPrimary) || client.contacts[0];
  const primaryAddress = client.addresses[0];

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Link to="/clients">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={client.type === 'residential' ? 'outline' : 'secondary'}>
              {client.type === 'residential' ? 'Residential' : 'Commercial'}
            </Badge>
            {client.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit className="h-4 w-4" />
          Edit
        </Button>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule Job
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs History</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Contact Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Primary and additional contacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {client.contacts.map((contact, index) => (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          {contact.isPrimary && (
                            <Badge variant="outline" className="text-xs mt-0.5">
                              Primary Contact
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="ml-11 space-y-2">
                        <div className="flex items-center text-sm">
                          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                          <a href={`mailto:${contact.email}`} className="text-primary">
                            {contact.email}
                          </a>
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          <a href={`tel:${contact.phone}`} className="text-primary">
                            {formatPhoneNumber(contact.phone)}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Service Addresses */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Service Addresses</CardTitle>
                <CardDescription>Locations for cleaning services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {client.addresses.map((address, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {index === 0 ? 'Primary Address' : `Address ${index + 1}`}
                        </p>
                        <p className="text-sm mt-1">{address.street}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <div className="mt-2">
                          <a 
                            href={`https://maps.google.com/?q=${encodeURIComponent(
                              `${address.street}, ${address.city}, ${address.state} ${address.zipCode}`
                            )}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary"
                          >
                            View on Map
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            {/* Client Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Client Details</CardTitle>
                <CardDescription>Additional information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Client Since</p>
                  <div className="flex items-center text-sm">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                    {client.createdAt}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Last Service</p>
                  <div className="flex items-center text-sm">
                    <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
                    {client.lastService || "No services yet"}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Payment Method</p>
                  <p className="text-sm">
                    {client.billingInfo?.paymentMethod || "Not set"}
                    {client.billingInfo?.accountNumber && (
                      <span className="text-muted-foreground ml-2">
                        ({client.billingInfo.accountNumber})
                      </span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Client Notes & Preferences */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Notes & Preferences</CardTitle>
              <CardDescription>Special instructions for this client</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Notes</AlertTitle>
                <AlertDescription>
                  {client.notes || "No special notes for this client."}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
          
          {/* Upcoming Jobs */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Upcoming Jobs</CardTitle>
                  <CardDescription>Scheduled cleaning services</CardDescription>
                </div>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              {clientJobs.filter(job => job.status === 'scheduled').length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No upcoming jobs scheduled.
                </div>
              ) : (
                <div className="space-y-4">
                  {clientJobs
                    .filter(job => job.status === 'scheduled')
                    .map(job => (
                      <div key={job.id} className="flex items-center justify-between border-b pb-4">
                        <div>
                          <p className="font-medium">{job.serviceName}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {job.date} at {job.startTime}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="jobs" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Job History</CardTitle>
              <CardDescription>All jobs for {client.name}</CardDescription>
            </CardHeader>
            <CardContent>
              {clientJobs.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No job history found for this client.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 text-left font-medium">Service</th>
                        <th className="pb-2 text-left font-medium">Date</th>
                        <th className="pb-2 text-left font-medium">Time</th>
                        <th className="pb-2 text-left font-medium">Status</th>
                        <th className="pb-2 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientJobs.map(job => (
                        <tr key={job.id} className="border-b hover:bg-muted/50">
                          <td className="py-3">{job.serviceName}</td>
                          <td className="py-3">{job.date}</td>
                          <td className="py-3">{job.startTime} - {job.endTime}</td>
                          <td className="py-3">
                            <Badge 
                              variant={
                                job.status === 'completed' ? 'default' : 
                                job.status === 'in-progress' ? 'secondary' : 
                                job.status === 'cancelled' ? 'destructive' : 
                                'outline'
                              }
                            >
                              {job.status}
                            </Badge>
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm">View Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Payment history and invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h3 className="font-medium">Payment Method</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {client.billingInfo?.paymentMethod || "No payment method on file"}
                    {client.billingInfo?.accountNumber && ` (${client.billingInfo.accountNumber})`}
                  </p>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
              
              <h3 className="font-medium pt-2">Recent Invoices</h3>
              <div className="text-center py-8 text-muted-foreground">
                No invoice history available.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Client Notes</CardTitle>
              <CardDescription>Special instructions and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <p className="whitespace-pre-wrap">
                  {client.notes || "No notes available for this client."}
                </p>
              </div>
              <div className="flex justify-end">
                <Button>Edit Notes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetail;
