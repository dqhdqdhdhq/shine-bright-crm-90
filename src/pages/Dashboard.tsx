
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, LineChart, ListChecks, Plus, Search, Users } from "lucide-react";
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

const Dashboard = () => {
  const todaysJobs = getTodaysJobs();
  
  return (
    <div className="space-y-6 py-6">
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Today's Jobs" 
          value={mockDashboardStats.todaysJobs.toString()} 
          description={`${mockDashboardStats.todaysJobs > 0 ? '↑ 12% from yesterday' : 'No change from yesterday'}`} 
          icon={ListChecks} 
          iconBg="bg-blue-100 dark:bg-blue-900/30" 
        />
        <StatsCard 
          title="Active Clients" 
          value={mockDashboardStats.activeClients.toString()} 
          description="↑ 5% this month"
          icon={Users} 
          iconBg="bg-indigo-100 dark:bg-indigo-900/30"
        />
        <StatsCard 
          title="Upcoming Jobs" 
          value={mockDashboardStats.upcomingJobs.toString()} 
          description="For this week"
          icon={CalendarDays} 
          iconBg="bg-purple-100 dark:bg-purple-900/30"
        />
        <StatsCard 
          title="Monthly Revenue" 
          value={formatCurrency(mockDashboardStats.monthlyRevenue)} 
          description="↑ 8% vs last month"
          icon={LineChart} 
          iconBg="bg-green-100 dark:bg-green-900/30"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                  <Button variant="ghost" size="sm" className="h-7">
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
                      <Card key={job.id} className="overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row">
                          <div 
                            className="w-full md:w-1 h-1 md:h-auto"
                            style={{ 
                              backgroundColor: 
                                job.status === 'completed' ? 'rgb(34, 197, 94)' : 
                                job.status === 'in-progress' ? 'rgb(245, 158, 11)' : 
                                job.status === 'cancelled' ? 'rgb(239, 68, 68)' : 
                                'rgb(14, 165, 233)'
                            }}
                          />
                          <div className="p-4 flex-grow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold">{job.clientName}</h3>
                                <p className="text-sm">{job.serviceName}</p>
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
                                <CalendarDays className="mr-1 h-3 w-3" />
                                {job.startTime} - {job.endTime}
                              </div>
                              <Button variant="ghost" size="sm" className="h-7">
                                Details
                              </Button>
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
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from your clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockDashboardStats.recentClientActivity.map((activity, i) => (
                <div key={activity.id} className="flex gap-4">
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
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.clientName}
                    </p>
                    <p className="text-sm text-muted-foreground">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <p className="text-sm font-medium">{staff.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {staff.jobsCompleted} jobs completed
                      </p>
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

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2 justify-center items-center">
                <CalendarDays className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <span className="font-medium block">Schedule Job</span>
                  <span className="text-xs text-muted-foreground">Create appointment</span>
                </div>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 justify-center items-center">
                <Users className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <span className="font-medium block">Add Client</span>
                  <span className="text-xs text-muted-foreground">Register new client</span>
                </div>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 justify-center items-center">
                <Users className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <span className="font-medium block">Staff Schedule</span>
                  <span className="text-xs text-muted-foreground">View availability</span>
                </div>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2 justify-center items-center">
                <LineChart className="h-5 w-5 text-primary" />
                <div className="text-center">
                  <span className="font-medium block">Invoice</span>
                  <span className="text-xs text-muted-foreground">Create and send</span>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
