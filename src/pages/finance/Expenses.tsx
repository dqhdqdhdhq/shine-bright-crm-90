import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, FileText, Receipt, Users, Clock } from "lucide-react";
import FinanceNavigation from "@/components/finance/FinanceNavigation";

const Expenses = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("finance.expenses")}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("finance.expenses.add")}
        </Button>
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

            <TabsContent value="all">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  No expenses recorded. Add your first expense to get started.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  No recent expenses.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="recurring">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  No recurring expenses set up.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  Define expense categories to better organize your spending.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Category
                  </Button>
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
