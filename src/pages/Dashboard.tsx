
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertCircle,
  Calendar, 
  ChartBarIcon,
  Clock, 
  FileWarning,
  ListCheck, 
  Plus, 
  Users 
} from "lucide-react";
import { 
  mockDashboardStats, 
  getTodaysJobs,
  mockJobs
} from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import StatsCard from "@/components/dashboard/StatsCard";
import DashboardCalendar from "@/components/dashboard/DashboardCalendar";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const todaysJobs = getTodaysJobs();
  const [searchQuery, setSearchQuery] = useState("");
  
  const mockRevenueData = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
    { name: "Jul", value: 7000 },
    { name: "Aug", value: 6500 },
    { name: "Sep", value: 8000 },
    { name: "Oct", value: 7500 },
    { name: "Nov", value: 9000 },
    { name: "Dec", value: 8500 },
  ];
  
  const handleQuickAction = (action: string) => {
    toast.success(`Action triggered: ${action}`);
  };
  
  const handleMarkAsRead = (id: string) => {
    toast.success(`Marked notification ${id} as read`);
  };
  
  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to your cleaning business dashboard.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            <span>New Job</span>
          </Button>
          <Button className="gap-2" variant="outline">
            <Plus className="h-4 w-4" />
            <span>New Client</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Today's Jobs" 
          value={mockDashboardStats.todaysJobs.toString()} 
          description="Jobs scheduled for today" 
          icon={ListCheck} 
          trend="up" 
          trendValue="5%"
          trendCount="+2"
          linkTo="/jobs?date=today"
        />
        <StatsCard 
          title="Active Clients" 
          value={mockDashboardStats.activeClients.toString()} 
          description="Total active clients" 
          icon={Users} 
          trend="up" 
          trendValue="12%"
          trendCount="+5"
          linkTo="/clients"
        />
        <StatsCard 
          title="Unassigned Jobs" 
          value="4" 
          description="Require staff assignment" 
          icon={Clock} 
          trend="down" 
          trendValue="25%"
          trendCount="-2"
          linkTo="/jobs?status=unassigned"
        />
        <StatsCard 
          title="Overdue Invoices" 
          value={formatCurrency(2450)} 
          description="3 invoices past due" 
          icon={FileWarning} 
          trend="up" 
          trendValue="15%"
          trendCount="+1"
          linkTo="/invoices?status=overdue"
        />
        <StatsCard 
          title="Monthly Revenue" 
          value={formatCurrency(mockDashboardStats.monthlyRevenue)} 
          description="For current month" 
          icon={ChartBarIcon} 
          trend="up" 
          trendValue="8%"
          trendCount="+$1,200"
          linkTo="/reports/revenue"
        />
        <StatsCard 
          title="Completed Today" 
          value="5" 
          description="Jobs completed today" 
          icon={ListCheck} 
          trend="unchanged" 
          trendValue="0%"
          linkTo="/jobs?status=completed&date=today"
        />
        <StatsCard 
          title="Upcoming Jobs" 
          value={mockDashboardStats.upcomingJobs.toString()} 
          description="Scheduled for this week" 
          icon={Calendar} 
          trend="unchanged" 
          trendValue="0%"
          linkTo="/jobs?period=upcoming"
        />
        <StatsCard 
          title="Client Satisfaction" 
          value="4.8/5" 
          description="Average client rating" 
          icon={AlertCircle} 
          trend="up" 
          trendValue="2%"
          trendCount="+0.1"
          linkTo="/reports/satisfaction"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Schedule Overview</CardTitle>
            <CardDescription>
              View and manage upcoming jobs and appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Tabs defaultValue="jobs">
                <div className="flex justify-between items-center">
                  <TabsList>
                    <TabsTrigger value="jobs">Today's Jobs</TabsTrigger>
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                  </TabsList>
                  <Button variant="ghost" size="sm" className="h-7" onClick={() => handleQuickAction("View All Jobs")}>
                    View All
                  </Button>
                </div>
                
                <TabsContent value="jobs" className="space-y-4 pt-4">
                  {todaysJobs.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No jobs scheduled for today
                    </div>
                  ) : (
                    todaysJobs.map((job) => (
                      <Card key={job.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div 
                            className="w-full md:w-2 h-2 md:h-auto"
                            style={{ 
                              backgroundColor: 
                                job.status === 'completed' ? '#22c55e' : 
                                job.status === 'in-progress' ? '#f59e0b' : 
                                job.status === 'cancelled' ? '#ef4444' : 
                                '#0ea5e9'
                            }}
                          />
                          <div className="p-4 flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{job.clientName}</h3>
                                <p className="text-sm">{job.serviceName}</p>
                                <div className="mt-1 text-xs text-muted-foreground">
                                  <span className="inline-flex items-center">
                                    <Users className="mr-1 h-3 w-3" />
                                    {job.assignedStaff ? job.assignedStaff.join(", ") : "Unassigned"}
                                  </span>
                                </div>
                              </div>
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
                            </div>
                            <div className="mt-2 flex justify-between items-center">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-1 h-3 w-3" />
                                {job.startTime} - {job.endTime}
                              </div>
                              <div className="flex space-x-1">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-7"
                                        onClick={() => handleQuickAction("Mark Complete")}
                                      >
                                        Complete
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Mark job as completed</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                                
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-7"
                                  onClick={() => handleQuickAction("View Job Details")}
                                >
                                  Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="calendar">
                  <DashboardCalendar jobs={mockJobs} />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your clients</CardDescription>
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm">All</Button>
              <Button variant="ghost" size="sm">Jobs</Button>
              <Button variant="ghost" size="sm">Clients</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockDashboardStats.recentClientActivity.map((activity, i) => (
                <div key={activity.id} className="flex gap-4 group">
                  <div className="relative mt-1">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      <span className="text-muted-foreground text-xs">
                        {activity.clientName.slice(0, 2)}
                      </span>
                    </div>
                    {i < mockDashboardStats.recentClientActivity.length - 1 && (
                      <div className="absolute bottom-0 left-1/2 h-8 w-px -translate-x-1/2 translate-y-8 bg-border" />
                    )}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium leading-none">
                        {activity.clientName}
                      </p>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 hidden group-hover:flex"
                        onClick={() => handleMarkAsRead(activity.id)}
                      >
                        &times;
                      </Button>
                    </div>
                    <p 
                      className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                      onClick={() => handleQuickAction(`Go to ${activity.type}`)}
                    >
                      {activity.activity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(`${activity.date}T${activity.time}`), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                </div>
              ))}

              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue performance</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  theme: {
                    light: "#0ea5e9",
                    dark: "#38bdf8",
                  }
                }
              }}
              className="aspect-[4/3]"
            >
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <RechartsTooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="revenue"
                  stroke="var(--color-revenue)"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Performance</CardTitle>
            <CardDescription>Key metrics for your cleaning staff</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockDashboardStats.staffPerformance.map((staff, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                      <span className="font-medium">
                        {staff.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p 
                        className="text-sm font-medium cursor-pointer hover:text-primary"
                        onClick={() => handleQuickAction(`View ${staff.name}'s Profile`)}
                      >
                        {staff.name}
                      </p>
                      <div className="flex space-x-3">
                        <p className="text-xs text-muted-foreground">
                          {staff.jobsCompleted} jobs completed
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {Math.floor(Math.random() * 4) + 2} today
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="relative h-2 w-40 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${staff.onTimeRate}%` }}
                      />
                    </div>
                    <span className="ml-2 text-xs font-medium">
                      {staff.onTimeRate}% on time
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Alerts & Notifications</CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { id: 1, title: "Certification Expiring", description: "John Smith's cleaning certificate expires in 7 days", priority: "medium" },
                { id: 2, title: "Overdue Job", description: "Residential cleaning at 123 Oak St is 2 days overdue", priority: "high" },
                { id: 3, title: "Payment Failed", description: "Client payment for invoice #1234 failed - $245", priority: "high" },
                { id: 4, title: "Inventory Low", description: "Cleaning solution inventory below threshold (2 units remaining)", priority: "low" }
              ].map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-3 rounded-md flex justify-between items-start ${
                    alert.priority === 'high' 
                      ? 'bg-red-50 border-l-4 border-red-500 dark:bg-red-900/20' 
                      : alert.priority === 'medium'
                      ? 'bg-amber-50 border-l-4 border-amber-500 dark:bg-amber-900/20'
                      : 'bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-900/20'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-semibold">{alert.title}</h4>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleQuickAction(`Resolve: ${alert.title}`)}
                  >
                    Resolve
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2 justify-center text-left" onClick={() => handleQuickAction("Schedule Job")}>
                <span className="font-medium">Schedule Job</span>
                <span className="text-xs text-muted-foreground">
                  Create a new job appointment
                </span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 justify-center text-left" onClick={() => handleQuickAction("Add Client")}>
                <span className="font-medium">Add Client</span>
                <span className="text-xs text-muted-foreground">
                  Register a new client
                </span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 justify-center text-left" onClick={() => handleQuickAction("Staff Availability")}>
                <span className="font-medium">Staff Availability</span>
                <span className="text-xs text-muted-foreground">
                  Check who's available
                </span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 justify-center text-left" onClick={() => handleQuickAction("Generate Invoice")}>
                <span className="font-medium">Generate Invoice</span>
                <span className="text-xs text-muted-foreground">
                  Create and send invoices
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
