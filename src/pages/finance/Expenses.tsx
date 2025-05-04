
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
import { PlusCircle, FileText, Receipt, Users, Clock, ChevronRight, DollarSign, CalendarIcon } from "lucide-react";
import FinanceNavigation from "@/components/finance/FinanceNavigation";
import { mockExpenses, Expense } from "@/data/mockFinanceData";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const expenseCategories = [
  "Supplies", "Vehicle", "Equipment", "Insurance", 
  "Rent", "Utilities", "Advertising", "Travel",
  "Meals", "Office", "Software", "Training", "Other"
];

const paymentMethods = [
  "Credit Card", "Debit Card", "Cash", "Bank Transfer", 
  "Check", "Company Card", "Automatic Withdrawal", "PayPal"
];

const Expenses = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "",
    vendor: "",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "",
    recurring: false,
  });

  const filteredExpenses = expenses.filter(expense => {
    if (activeTab === "all") return true;
    if (activeTab === "recurring") return expense.recurring === true;
    if (activeTab === "recent") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return new Date(expense.date) >= thirtyDaysAgo;
    }
    return activeTab === "categories";
  });

  const handleCreateExpense = () => {
    if (!newExpense.category || !newExpense.vendor || !newExpense.amount || !newExpense.paymentMethod) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const expense: Expense = {
      id: `${expenses.length + 1}`,
      category: newExpense.category,
      vendor: newExpense.vendor,
      date: newExpense.date,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      status: 'pending',
      paymentMethod: newExpense.paymentMethod,
      recurring: newExpense.recurring
    };

    setExpenses([expense, ...expenses]);
    setDialogOpen(false);
    toast.success("Expense created successfully");
    
    // Reset form
    setNewExpense({
      category: "",
      vendor: "",
      amount: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "",
      recurring: false,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reconciled': return 'bg-green-100 text-green-800';
      case 'processed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("finance.expenses")}</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              {t("finance.expenses.add")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>{t("finance.expenses.add")}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select
                  onValueChange={(value) => setNewExpense({...newExpense, category: value})}
                  value={newExpense.category}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vendor" className="text-right">
                  Vendor
                </Label>
                <Input
                  id="vendor"
                  className="col-span-3"
                  value={newExpense.vendor}
                  onChange={(e) => setNewExpense({...newExpense, vendor: e.target.value})}
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
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  className="col-span-3"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="paymentMethod" className="text-right">
                  Payment Method
                </Label>
                <Select
                  onValueChange={(value) => setNewExpense({...newExpense, paymentMethod: value})}
                  value={newExpense.paymentMethod}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((method) => (
                      <SelectItem key={method} value={method}>{method}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  className="col-span-3"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="recurring" className="text-right">
                  Recurring
                </Label>
                <div className="flex items-center space-x-2 col-span-3">
                  <Switch
                    id="recurring"
                    checked={newExpense.recurring}
                    onCheckedChange={(checked) => setNewExpense({...newExpense, recurring: checked})}
                  />
                  <Label htmlFor="recurring">This is a recurring expense</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreateExpense}>Create Expense</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <FinanceNavigation />

      <Card>
        <CardHeader>
          <CardTitle>{t("finance.expenses.all")}</CardTitle>
          <CardDescription>
            Track and manage all your business expenses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-4 w-full max-w-2xl">
              <TabsTrigger value="all">
                <FileText className="mr-2 h-4 w-4" />
                {t("finance.expenses.all")}
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="recurring">
                <Clock className="mr-2 h-4 w-4" />
                {t("finance.expenses.recurring")}
              </TabsTrigger>
              <TabsTrigger value="categories">
                <FileText className="mr-2 h-4 w-4" />
                {t("finance.expenses.categories")}
              </TabsTrigger>
            </TabsList>

            {activeTab !== "categories" && (
              <TabsContent value={activeTab}>
                <div className="mt-6">
                  {filteredExpenses.length > 0 ? (
                    <div className="overflow-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-medium">Date</th>
                            <th className="text-left py-3 px-4 font-medium">Category</th>
                            <th className="text-left py-3 px-4 font-medium">Vendor</th>
                            <th className="text-left py-3 px-4 font-medium">Description</th>
                            <th className="text-left py-3 px-4 font-medium">Amount</th>
                            <th className="text-left py-3 px-4 font-medium">Status</th>
                            <th className="text-right py-3 px-4 font-medium">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredExpenses.map((expense) => (
                            <tr key={expense.id} className="border-b hover:bg-muted/50">
                              <td className="py-3 px-4">{expense.date}</td>
                              <td className="py-3 px-4">{expense.category}</td>
                              <td className="py-3 px-4">{expense.vendor}</td>
                              <td className="py-3 px-4 max-w-[200px] truncate">{expense.description}</td>
                              <td className="py-3 px-4">{formatCurrency(expense.amount)}</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(expense.status)}`}>
                                  {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
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
                      No expenses found.
                    </p>
                  )}
                </div>
              </TabsContent>
            )}

            <TabsContent value="categories">
              <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {expenseCategories.map((category) => (
                    <Card key={category}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">{category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {formatCurrency(expenses
                            .filter(e => e.category === category)
                            .reduce((sum, e) => sum + e.amount, 0))}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {expenses.filter(e => e.category === category).length} expenses
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("finance.expenses.vendors")}</CardTitle>
            <CardDescription>
              Manage your suppliers and service providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Keep track of vendor information, contacts, and payment terms.
            </p>
            <Button variant="outline" className="mt-4">
              <Users className="mr-2 h-4 w-4" />
              Manage Vendors
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("finance.expenses.bills")}</CardTitle>
            <CardDescription>
              Track upcoming bills and payment status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Never miss a payment deadline with organized bill tracking.
            </p>
            <Button variant="outline" className="mt-4">
              View Bills
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("finance.expenses.receipts")}</CardTitle>
            <CardDescription>
              Store and organize expense receipts digitally
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Upload, store, and easily find receipts when needed.
            </p>
            <Button variant="outline" className="mt-4">
              <Receipt className="mr-2 h-4 w-4" />
              Manage Receipts
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("finance.expenses.aging")}</CardTitle>
            <CardDescription>
              View bills organized by due date
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              See which bills are coming due and which ones are overdue.
            </p>
            <Button variant="outline" className="mt-4">
              View Aging Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Expenses;
