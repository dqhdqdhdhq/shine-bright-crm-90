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
import { Users, Calendar, Clock, Calculator, FileText } from "lucide-react";
import FinanceNavigation from "@/components/finance/FinanceNavigation";

const Payroll = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("finance.payroll")}</h1>
        <Button>
          <Calculator className="mr-2 h-4 w-4" />
          {t("finance.payroll.calculate")}
        </Button>
      </div>

      <FinanceNavigation />

      <Card>
        <CardHeader>
          <CardTitle>{t("finance.payroll")}</CardTitle>
          <CardDescription>
            Manage employee information and process payroll
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="employees"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-5 w-full max-w-3xl">
              <TabsTrigger value="employees">
                <Users className="mr-2 h-4 w-4" />
                {t("finance.payroll.employees")}
              </TabsTrigger>
              <TabsTrigger value="time">
                <Clock className="mr-2 h-4 w-4" />
                {t("finance.payroll.timeTracking")}
              </TabsTrigger>
              <TabsTrigger value="history">
                <Calendar className="mr-2 h-4 w-4" />
                {t("finance.payroll.history")}
              </TabsTrigger>
              <TabsTrigger value="contractors">
                <Users className="mr-2 h-4 w-4" />
                {t("finance.payroll.contractors")}
              </TabsTrigger>
              <TabsTrigger value="reports">
                <FileText className="mr-2 h-4 w-4" />
                {t("finance.payroll.reports")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="employees">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  Add employee profiles with pay rates, tax information, and deductions.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Add Employee
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="time">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  Track working hours for hourly employees.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline">
                    <Clock className="mr-2 h-4 w-4" />
                    View Time Records
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  View past payroll runs and payment records.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="contractors">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  Manage 1099 contractor payments and records.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Add Contractor
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reports">
              <div className="mt-6">
                <p className="text-muted-foreground text-center py-12">
                  Generate payroll reports for different periods.
                </p>
                <div className="flex justify-center">
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Report
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
            <CardTitle>{t("finance.payroll.calculate")}</CardTitle>
            <CardDescription>
              Process your next payroll run
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Calculate gross pay, taxes, deductions and net pay for all employees.
            </p>
            <Button variant="outline" className="mt-4">
              <Calculator className="mr-2 h-4 w-4" />
              Start New Payroll
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("finance.payroll.paystubs")}</CardTitle>
            <CardDescription>
              Generate and distribute pay stubs to employees
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Create professional paystubs with detailed earnings and deductions.
            </p>
            <Button variant="outline" className="mt-4">
              Generate Paystubs
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("finance.payroll.taxes")}</CardTitle>
            <CardDescription>
              Manage employer tax obligations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Track payroll taxes, withholdings, and employer contributions.
            </p>
            <Button variant="outline" className="mt-4">
              View Tax Records
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payroll Calendar</CardTitle>
            <CardDescription>
              View upcoming payroll schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Plan ahead with a calendar of upcoming payroll dates and deadlines.
            </p>
            <Button variant="outline" className="mt-4">
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payroll;
