import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  CalendarDays, Edit, Mail, MapPin, Phone, Plus, ArrowLeft, AlertCircle,
  MessageSquare, FileText, Clock, DollarSign, Repeat, PenTool
} from 'lucide-react';
import { getClientById, getJobsByClientId } from '@/data/mockData';
import { formatPhoneNumber, getInitials } from '@/lib/utils';
import NotFound from './NotFound';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const client = id ? getClientById(id) : undefined;
  const clientJobs = id ? getJobsByClientId(id) : [];
  
  const [activeTab, setActiveTab] = useState('overview');
  const [showCommunicationDialog, setShowCommunicationDialog] = useState(false);
  const [communicationType, setCommunicationType] = useState('');
  
  if (!client) {
    return <NotFound />;
  }

  // Calculate key metrics
  const totalJobs = clientJobs.length;
  const completedJobs = clientJobs.filter(job => job.status === 'completed').length;
  const totalBilled = clientJobs.reduce((sum, job) => sum + (job.amount || 0), 0);
  const avgJobValue = totalJobs > 0 ? totalBilled / totalJobs : 0;
  const lastServiceDate = client.lastService || 'Never';

  // Mock communication log data
  const communicationLog = [
    { type: 'email', date: '2023-04-28', content: 'Sent reminder about upcoming cleaning service', user: 'Jane Operator' },
    { type: 'call', date: '2023-04-26', content: 'Client requested extra attention to kitchen area', user: 'Mark Manager' },
    { type: 'note', date: '2023-04-22', content: 'Updated client preferences for cleaning products', user: 'Sarah Admin' },
    { type: 'sms', date: '2023-04-20', content: 'Confirmed appointment for April 28', user: 'System' },
    { type: 'job', date: '2023-04-15', content: 'Completed regular cleaning service', user: 'Cleaning Team' },
  ];

  const primaryContact = client.contacts.find(c => c.isPrimary) || client.contacts[0];
  const primaryAddress = client.addresses[0];

  const handleQuickAction = (action, type) => {
    setCommunicationType(type);
    setShowCommunicationDialog(true);
  };

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
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs History</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-6">
          {/* Quick Actions Bar */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAction('Log a call with client', 'call')}>
                <Phone className="h-4 w-4" />
                Log Call
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAction('Send email to client', 'email')}>
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAction('Add a note about client', 'note')}>
                <PenTool className="h-4 w-4" />
                Add Note
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                Create Task
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <CalendarDays className="h-4 w-4" />
                Schedule Job
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <DollarSign className="h-4 w-4" />
                Generate Invoice
              </Button>
            </CardContent>
          </Card>

          {/* Key Metrics Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Key Metrics</CardTitle>
              <CardDescription>Client performance at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Lifetime Value</p>
                  <p className="text-2xl font-bold mt-1">${totalBilled}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Avg. Job Value</p>
                  <p className="text-2xl font-bold mt-1">${avgJobValue.toFixed(2)}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Jobs Completed</p>
                  <p className="text-2xl font-bold mt-1">{completedJobs}/{totalJobs}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Client Since</p>
                  <p className="text-2xl font-bold mt-1">{client.createdAt.split(' ')[0]}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Last Service</p>
                  <p className="text-2xl font-bold mt-1">{lastServiceDate.split(' ')[0] || 'Never'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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
          
          {/* Communication Log */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Communication Log</CardTitle>
              <CardDescription>Recent interactions with client</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communicationLog.map((log, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="bg-muted p-2 rounded-full">
                      {log.type === 'email' && <Mail className="h-4 w-4" />}
                      {log.type === 'call' && <Phone className="h-4 w-4" />}
                      {log.type === 'note' && <PenTool className="h-4 w-4" />}
                      {log.type === 'sms' && <MessageSquare className="h-4 w-4" />}
                      {log.type === 'job' && <CalendarDays className="h-4 w-4" />}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {log.type === 'email' && 'Email'}
                          {log.type === 'call' && 'Phone Call'}
                          {log.type === 'note' && 'Note Added'}
                          {log.type === 'sms' && 'SMS Message'}
                          {log.type === 'job' && 'Job Update'}
                        </span>
                        <span className="text-xs text-muted-foreground">{log.date}</span>
                      </div>
                      <p className="text-sm">{log.content}</p>
                      <p className="text-xs text-muted-foreground">{log.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
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
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Job History</CardTitle>
                <CardDescription>All jobs for {client.name}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Filter</Button>
                <Button variant="outline" size="sm">Date Range</Button>
              </div>
            </CardHeader>
            <CardContent>
              {clientJobs.length === 0 ? (
                <div className="text-center py-6 text-muted-foreground">
                  No job history found for this client.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Staff</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientJobs.map(job => (
                        <TableRow key={job.id}>
                          <TableCell className="font-medium">{job.serviceName}</TableCell>
                          <TableCell>{job.date}</TableCell>
                          <TableCell>{job.startTime} - {job.endTime}</TableCell>
                          <TableCell>{job.assignedStaff || 'Unassigned'}</TableCell>
                          <TableCell>
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
                          </TableCell>
                          <TableCell>${job.amount || '--'}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Repeat className="h-3 w-3" />
                              Repeat
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
            <CardContent className="space-y-8">
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
              
              <div>
                <h3 className="font-medium mb-4">Recent Invoices</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clientJobs.length > 0 ? (
                      clientJobs.slice(0, 5).map((job, index) => (
                        <TableRow key={index}>
                          <TableCell>{job.date}</TableCell>
                          <TableCell>INV-{1000 + index}</TableCell>
                          <TableCell>${job.amount || 0}</TableCell>
                          <TableCell>
                            <Badge variant={
                              index % 3 === 0 ? "default" : 
                              index % 3 === 1 ? "secondary" : 
                              "outline"
                            }>
                              {index % 3 === 0 ? "Paid" : 
                               index % 3 === 1 ? "Sent" : 
                               "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">View</Button>
                            <Button variant="ghost" size="sm">Download</Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No invoice history available.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Payment History</h3>
                {clientJobs.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Reference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientJobs.slice(0, 3).map((job, index) => (
                        <TableRow key={index}>
                          <TableCell>{job.date}</TableCell>
                          <TableCell>${job.amount || 0}</TableCell>
                          <TableCell>{index % 2 === 0 ? "Credit Card" : "Bank Transfer"}</TableCell>
                          <TableCell>REF-{2000 + index}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-6 text-muted-foreground">
                    No payment history available.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Client Notes</CardTitle>
                <CardDescription>Special instructions and preferences</CardDescription>
              </div>
              <div>
                <Button>Add Note</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {client.notes ? (
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <Badge>Important</Badge>
                      <span className="text-xs text-muted-foreground">Added on April 28, 2023</span>
                    </div>
                    <p className="whitespace-pre-wrap mb-2">
                      {client.notes}
                    </p>
                    <p className="text-xs text-muted-foreground">Added by Jane Operator</p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <Badge variant="outline">Service Instructions</Badge>
                      <span className="text-xs text-muted-foreground">Added on March 15, 2023</span>
                    </div>
                    <p className="whitespace-pre-wrap mb-2">
                      Client prefers eco-friendly cleaning products only. Please ensure all surfaces are properly wiped down, with special attention to glass surfaces.
                    </p>
                    <p className="text-xs text-muted-foreground">Added by Mark Manager</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No notes available for this client.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other tabs rendered with placeholder content */}
        {['contacts', 'addresses', 'files', 'activity'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{tab.charAt(0).toUpperCase() + tab.slice(1)}</CardTitle>
                <CardDescription>This tab is under development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <p className="mb-2">This section is coming soon</p>
                  <p className="text-sm">We're working on adding more features to help you manage your clients better.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Communication Dialog */}
      <Dialog open={showCommunicationDialog} onOpenChange={setShowCommunicationDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{communicationType}</DialogTitle>
            <DialogDescription>
              Enter the details below to record this communication.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {communicationType === 'email' && (
              <>
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Email subject" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input placeholder="Email content" className="h-24" />
                  </FormControl>
                </FormItem>
              </>
            )}
            {communicationType === 'call' && (
              <>
                <FormItem>
                  <FormLabel>Call Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="Notes from the call" className="h-24" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Call Duration</FormLabel>
                  <FormControl>
                    <Input placeholder="Duration in minutes" type="number" />
                  </FormControl>
                </FormItem>
              </>
            )}
            {communicationType === 'note' && (
              <>
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input placeholder="Add your note here" className="h-24" />
                  </FormControl>
                </FormItem>
                <FormItem>
                  <FormLabel>Note Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Type of note" />
                  </FormControl>
                </FormItem>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCommunicationDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              // Here you would save the communication
              setShowCommunicationDialog(false);
            }}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientDetail;
