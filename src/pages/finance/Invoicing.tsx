
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PlusCircle,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import FinanceNavigation from "@/components/finance/FinanceNavigation";
import { mockInvoices, Invoice } from "@/data/mockFinanceData";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { mockClients } from "@/data/mockData";
import { toast } from "sonner";

const Invoicing = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientId: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    notes: ""
  });

  const filteredInvoices = invoices.filter(invoice => {
    if (activeTab === "all") return true;
    return invoice.status === activeTab;
  });

  const handleCreateInvoice = () => {
    if (!newInvoice.clientId || !newInvoice.description || !newInvoice.amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const client = mockClients.find(c => c.id === newInvoice.clientId);
    
    const invoice: Invoice = {
      id: `${invoices.length + 1}`,
      clientId: newInvoice.clientId,
      clientName: client ? client.name : "Unknown Client",
      status: 'draft',
      number: `INV-2025-${(invoices.length + 1).toString().padStart(3, '0')}`,
      issueDate: newInvoice.date,
      dueDate: newInvoice.dueDate,
      total: parseFloat(newInvoice.amount),
      paid: 0,
      items: [
        {
          id: '1',
          description: newInvoice.description,
          quantity: 1,
          rate: parseFloat(newInvoice.amount),
          amount: parseFloat(newInvoice.amount),
        }
      ],
      notes: newInvoice.notes
    };

    setInvoices([invoice, ...invoices]);
    setDialogOpen(false);
    toast.success("Invoice created successfully");
    
    // Reset form
    setNewInvoice({
      clientId: "",
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      notes: ""
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("finance.invoicing")}</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("finance.invoicing.create")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{t("finance.invoicing.create")}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Client
                </Label>
                <Select 
                  onValueChange={(value) => setNewInvoice({...newInvoice, clientId: value})}
                  value={newInvoice.clientId}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  className="col-span-3"
                  value={newInvoice.description}
                  onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="amount"
                  className="col-span-3"
                  type="number"
                  step="0.01"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Issue Date
                </Label>
                <Input
                  id="date"
                  className="col-span-3"
                  type="date"
                  value={newInvoice.date}
                  onChange={(e) => setNewInvoice({...newInvoice, date: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Due Date
                </Label>
                <Input
                  id="dueDate"
                  className="col-span-3"
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  className="col-span-3"
                  value={newInvoice.notes}
                  onChange={(e) => setNewInvoice({...newInvoice, notes: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateInvoice}>Create Invoice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <FinanceNavigation />

      <Card>
        <CardHeader>
          <CardTitle>{t("finance.invoicing.all")}</CardTitle>
          <CardDescription>
            {t("finance.invoicing.all")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="all">
                <FileText className="mr-2 h-4 w-4" />
                {t("finance.invoicing.all")}
              </TabsTrigger>
              <TabsTrigger value="draft">
                <Clock className="mr-2 h-4 w-4" />
                {t("finance.invoicing.drafts")}
              </TabsTrigger>
              <TabsTrigger value="sent">
                <FileText className="mr-2 h-4 w-4" />
                {t("finance.invoicing.sent")}
              </TabsTrigger>
              <TabsTrigger value="paid">
                <CheckCircle className="mr-2 h-4 w-4" />
                {t("finance.invoicing.paid")}
              </TabsTrigger>
              <TabsTrigger value="overdue">
                <AlertCircle className="mr-2 h-4 w-4" />
                {t("finance.invoicing.overdue")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="mt-6">
                {filteredInvoices.length > 0 ? (
                  <div className="overflow-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Invoice #</th>
                          <th className="text-left py-3 px-4 font-medium">Client</th>
                          <th className="text-left py-3 px-4 font-medium">Date</th>
                          <th className="text-left py-3 px-4 font-medium">Due Date</th>
                          <th className="text-left py-3 px-4 font-medium">Amount</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-right py-3 px-4 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b hover:bg-muted/50">
                            <td className="py-3 px-4">{invoice.number}</td>
                            <td className="py-3 px-4">{invoice.clientName}</td>
                            <td className="py-3 px-4">{invoice.issueDate}</td>
                            <td className="py-3 px-4">{invoice.dueDate}</td>
                            <td className="py-3 px-4">{formatCurrency(invoice.total)}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="ghost" size="icon">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-12">
                    No invoices available.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("finance.invoicing.templates")}</CardTitle>
            <CardDescription>
              Manage your invoice templates and branding options
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Configure different invoice templates for various job types or clients.
            </p>
            <Button variant="outline" className="mt-4">
              Manage Templates
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("finance.invoicing.recurring")}</CardTitle>
            <CardDescription>
              Set up automated billing schedules for regular clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Create automatic invoice schedules for recurring services.
            </p>
            <Button variant="outline" className="mt-4">
              Set Up Recurring Invoices
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("finance.invoicing.aging")}</CardTitle>
            <CardDescription>
              Track outstanding invoices by age
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Monitor outstanding invoices by age brackets (0-30, 31-60, 61-90, 90+ days).
            </p>
            <Button variant="outline" className="mt-4">
              View Aging Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("finance.invoicing.payments")}</CardTitle>
            <CardDescription>
              Record and track payments from clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Manage full or partial payments for invoices.
            </p>
            <Button variant="outline" className="mt-4">
              Record New Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invoicing;
