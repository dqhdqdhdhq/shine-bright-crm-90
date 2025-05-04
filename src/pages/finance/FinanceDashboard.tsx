import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cog, Wallet, ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import FinanceNavigation from "@/components/finance/FinanceNavigation";
const FinanceDashboard = () => {
  const {
    t
  } = useLanguage();
  return <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("finance.dashboard")}</h1>
        
      </div>

      <FinanceNavigation />

      <Tabs defaultValue="mtd">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="mtd">{t("finance.dashboard.period.mtd")}</TabsTrigger>
            <TabsTrigger value="qtd">{t("finance.dashboard.period.qtd")}</TabsTrigger>
            <TabsTrigger value="ytd">{t("finance.dashboard.period.ytd")}</TabsTrigger>
            <TabsTrigger value="custom">{t("finance.dashboard.period.custom")}</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="mtd" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("finance.dashboard.profitLoss")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{formatCurrency(24500)}</div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span className="text-xs">+12%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  vs. last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("finance.dashboard.receivables")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{formatCurrency(18750)}</div>
                  <div className="flex items-center text-amber-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span className="text-xs">+5%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  15 outstanding invoices
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("finance.dashboard.payables")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{formatCurrency(7200)}</div>
                  <div className="flex items-center text-red-500">
                    <TrendingDown className="mr-1 h-4 w-4" />
                    <span className="text-xs">-8%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  8 pending bills
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("finance.dashboard.cashFlow")}</CardTitle>
                <CardDescription>Money in vs. money out</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <Wallet className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Cash flow visualization will appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("finance.dashboard.revenueVsExpenses")}</CardTitle>
                <CardDescription>Monthly comparison</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <TrendingUp className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-2">Revenue vs Expenses chart will appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("finance.dashboard.topExpenses")}</CardTitle>
                <CardDescription>Biggest expense categories</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <p className="mt-2">Top expenses chart will appear here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("finance.dashboard.payrollSummary")}</CardTitle>
                <CardDescription>Employee costs overview</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-muted-foreground text-center">
                  <p className="mt-2">Payroll summary will appear here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="qtd" className="space-y-4">
          <div className="flex items-center justify-center p-12">
            <p className="text-muted-foreground">Quarter to date data will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="ytd" className="space-y-4">
          <div className="flex items-center justify-center p-12">
            <p className="text-muted-foreground">Year to date data will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <div className="flex items-center justify-center p-12">
            <p className="text-muted-foreground">Custom period selector will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>;
};
export default FinanceDashboard;