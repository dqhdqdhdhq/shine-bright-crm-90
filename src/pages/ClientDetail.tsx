
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  ArrowLeft, CalendarDays, Phone, Mail, MapPin, 
  ChevronRight, Clock, DollarSign, MessageSquare
} from 'lucide-react';
import { getClientById, getJobsByClientId } from '@/data/mockData';
import { formatPhoneNumber, getInitials, formatCurrency } from '@/lib/utils';
import NotFound from './NotFound';

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const client = id ? getClientById(id) : undefined;
  const clientJobs = id ? getJobsByClientId(id) : [];
  
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary']));

  if (!client) {
    return <NotFound />;
  }

  const primaryContact = client.contacts.find(c => c.isPrimary) || client.contacts[0];
  const primaryAddress = client.addresses[0];
  const nextJob = clientJobs.find(job => job.status === 'scheduled');
  const completedJobs = clientJobs.filter(job => job.status === 'completed').length;
  const totalBilled = completedJobs * 150; // Using a sample rate of $150/job

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const InfoRow = ({ icon: Icon, label, value, action, clickable = false }: {
    icon: any;
    label: string;
    value: string;
    action?: () => void;
    clickable?: boolean;
  }) => (
    <div 
      className={`flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors ${
        clickable ? 'cursor-pointer' : ''
      }`}
      onClick={action}
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Icon className="h-4 w-4 text-gray-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-gray-500">{value}</p>
        </div>
      </div>
      {clickable && <ChevronRight className="h-4 w-4 text-gray-400" />}
    </div>
  );

  const SectionCard = ({ title, children, expandable = false, sectionKey }: {
    title: string;
    children: React.ReactNode;
    expandable?: boolean;
    sectionKey?: string;
  }) => {
    const isExpanded = sectionKey ? expandedSections.has(sectionKey) : true;
    
    return (
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader 
          className={`pb-2 ${expandable ? 'cursor-pointer' : ''}`}
          onClick={() => expandable && sectionKey && toggleSection(sectionKey)}
        >
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">{title}</CardTitle>
            {expandable && (
              <ChevronRight className={`h-4 w-4 text-gray-400 transition-transform ${
                isExpanded ? 'rotate-90' : ''
              }`} />
            )}
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent className="pt-0">
            {children}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Clean Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/clients">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-lg font-semibold">
                    {getInitials(client.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={client.type === 'residential' ? 'outline' : 'secondary'}>
                      {client.type === 'residential' ? 'Residential' : 'Commercial'}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <CalendarDays className="h-4 w-4 mr-2" />
              Schedule Job
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Summary Section - Always Visible */}
        <SectionCard title="Summary">
          <div className="space-y-0 divide-y divide-gray-100">
            <InfoRow
              icon={Phone}
              label="Phone"
              value={formatPhoneNumber(primaryContact.phone)}
              action={() => window.open(`tel:${primaryContact.phone}`)}
              clickable
            />
            <InfoRow
              icon={Mail}
              label="Email"
              value={primaryContact.email}
              action={() => window.open(`mailto:${primaryContact.email}`)}
              clickable
            />
            <InfoRow
              icon={MapPin}
              label="Address"
              value={`${primaryAddress.street}, ${primaryAddress.city}`}
            />
            {nextJob ? (
              <InfoRow
                icon={CalendarDays}
                label="Next Service"
                value={`${nextJob.date} at ${nextJob.startTime}`}
                clickable
              />
            ) : (
              <InfoRow
                icon={CalendarDays}
                label="Next Service"
                value="None scheduled"
              />
            )}
          </div>
        </SectionCard>

        {/* Quick Stats */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">{completedJobs}</div>
                <div className="text-sm text-gray-500">Jobs Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">{formatCurrency(totalBilled)}</div>
                <div className="text-sm text-gray-500">Total Billed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {client.createdAt.split(' ')[0]}
                </div>
                <div className="text-sm text-gray-500">Client Since</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progressive Disclosure Sections */}
        <SectionCard 
          title="Contact Details" 
          expandable 
          sectionKey="contacts"
        >
          <div className="space-y-4">
            {client.contacts.map((contact, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Avatar>
                  <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{contact.name}</p>
                  {contact.isPrimary && (
                    <Badge variant="outline" className="text-xs mt-1">Primary</Badge>
                  )}
                  <p className="text-sm text-gray-500">{contact.email}</p>
                  <p className="text-sm text-gray-500">{formatPhoneNumber(contact.phone)}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard 
          title="Service History" 
          expandable 
          sectionKey="history"
        >
          <div className="space-y-3">
            {clientJobs.length > 0 ? (
              clientJobs.slice(0, 5).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{job.serviceName}</p>
                    <p className="text-sm text-gray-500">{job.date} at {job.startTime}</p>
                  </div>
                  <Badge variant={
                    job.status === 'completed' ? 'default' : 
                    job.status === 'scheduled' ? 'secondary' : 'outline'
                  }>
                    {job.status}
                  </Badge>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No service history yet</p>
            )}
          </div>
        </SectionCard>

        <SectionCard 
          title="Billing & Payments" 
          expandable 
          sectionKey="billing"
        >
          <div className="space-y-0 divide-y divide-gray-100">
            <InfoRow
              icon={DollarSign}
              label="Payment Method"
              value={client.billingInfo?.paymentMethod || "Not set"}
            />
            <InfoRow
              icon={Clock}
              label="Current Balance"
              value={formatCurrency(totalBilled)}
            />
            <InfoRow
              icon={MessageSquare}
              label="Billing Preferences"
              value="Email invoices"
            />
          </div>
        </SectionCard>

        <SectionCard 
          title="Notes & Preferences" 
          expandable 
          sectionKey="notes"
        >
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm text-blue-800">
              {client.notes || "No special notes or preferences recorded."}
            </p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
};

export default ClientDetail;
