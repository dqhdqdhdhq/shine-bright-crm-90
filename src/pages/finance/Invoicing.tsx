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
import { PlusCircle, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import FinanceNavigation from "@/components/finance/FinanceNavigation";

const Invoicing = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("finance.invoicing")}</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("finance.invoicing.create")}
        </Button>
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
              <TabsTrigger value="drafts">
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

            <TabsContent value="all">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  No invoices available. Create your first invoice to get started.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="drafts">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  No draft invoices available.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="sent">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  No sent invoices available.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="paid">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  No paid invoices available.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="overdue">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  No overdue invoices available.
                </p>
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
