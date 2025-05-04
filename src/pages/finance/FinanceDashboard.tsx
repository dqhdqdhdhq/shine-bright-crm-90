
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cog, Wallet, ArrowUpRight, TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import FinanceNavigation from "@/components/finance/FinanceNavigation";
import { mockFinancialStats, mockInvoices, mockExpenses } from "@/data/mockFinanceData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { PieChart, Pie, Cell, Legend } from "recharts";
import PaymentCalculator from "@/components/finance/PaymentCalculator";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#A5A5A5"];

const FinanceDashboard = () => {
  const { t } = useLanguage();

  // Calculate overdue amount
  const overdueAmount = mockInvoices
    .filter(invoice => invoice.status === 'overdue')
    .reduce((sum, invoice) => sum + (invoice.total - invoice.paid), 0);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("finance.dashboard")}</h1>
        <Button variant="outline">
          <Cog className="mr-2 h-4 w-4" />
          {t("finance.dashboard.customize")}
        </Button>
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
                  <div className="text-2xl font-bold">
                    {formatCurrency(mockFinancialStats.profitLoss.amount)}
                  </div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span className="text-xs">+{mockFinancialStats.profitLoss.trend}%</span>
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
                  <div className="text-2xl font-bold">
                    {formatCurrency(mockFinancialStats.receivables.amount)}
                  </div>
                  <div className="flex items-center text-amber-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span className="text-xs">+{mockFinancialStats.receivables.trend}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockFinancialStats.receivables.count} outstanding invoices
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
                  <div className="text-2xl font-bold">
                    {formatCurrency(mockFinancialStats.payables.amount)}
                  </div>
                  <div className="flex items-center text-red-500">
                    <TrendingDown className="mr-1 h-4 w-4" />
                    <span className="text-xs">{mockFinancialStats.payables.trend}%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mockFinancialStats.payables.count} pending bills
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
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockFinancialStats.monthlyCashFlow}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Line type="monotone" dataKey="income" stroke="#0ea5e9" name="Income" />
                    <Line type="monotone" dataKey="expenses" stroke="#f43f5e" name="Expenses" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("finance.dashboard.revenueVsExpenses")}</CardTitle>
                <CardDescription>Monthly comparison</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockFinancialStats.monthlyCashFlow}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="income" name="Revenue" fill="#0ea5e9" />
                    <Bar dataKey="expenses" name="Expenses" fill="#f43f5e" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("finance.dashboard.topExpenses")}</CardTitle>
                <CardDescription>Biggest expense categories</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockFinancialStats.topExpenseCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {mockFinancialStats.topExpenseCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <PaymentCalculator />
          </div>
        </TabsContent>

        <TabsContent value="qtd" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  {t("finance.dashboard.profitLoss")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{formatCurrency(72300)}</div>
                  <div className="flex items-center text-green-500">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span className="text-xs">+17%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  vs. last quarter
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
                  <div className="text-2xl font-bold">{formatCurrency(35400)}</div>
                  <div className="flex items-center text-amber-500">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span className="text-xs">+12%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  28 outstanding invoices
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
                  <div className="text-2xl font-bold">{formatCurrency(21800)}</div>
                  <div className="flex items-center text-red-500">
                    <TrendingDown className="mr-1 h-4 w-4" />
                    <span className="text-xs">-4%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  19 pending bills
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quarterly Revenue Trend</CardTitle>
                <CardDescription>Revenue comparison by quarter</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockFinancialStats.quarterlyRevenue}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="quarter" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="amount" name="Revenue" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <PaymentCalculator />
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
    </div>
  );
};

export default FinanceDashboard;
