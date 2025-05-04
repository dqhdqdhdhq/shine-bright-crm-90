import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  List,
  MapPin,
  Plus,
  User,
} from "lucide-react";
import { Job, mockJobs, mockStaff, getStaffById } from "@/data/mockData";
import { format, addDays, startOfWeek, parse, isToday } from "date-fns";
import { getInitials } from "@/lib/utils";

const Schedule = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("day");
  
  // Week view helpers
  const startOfCurrentWeek = startOfWeek(date);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i));
  
  // Filter jobs based on the current view
  const filteredJobs = mockJobs.filter((job) => {
    const jobDate = parse(job.date, "yyyy-MM-dd", new Date());
    
    if (view === "day") {
      return format(date, "yyyy-MM-dd") === job.date;
    } else if (view === "week") {
      const jobWeekStart = format(startOfWeek(jobDate), "yyyy-MM-dd");
      const currentWeekStart = format(startOfCurrentWeek, "yyyy-MM-dd");
      return jobWeekStart === currentWeekStart;
    } else {
      return format(date, "yyyy-MM") === format(jobDate, "yyyy-MM");
    }
  });
  
  // Get formatted dates for views
  const formattedDate = format(date, "MMMM d, yyyy");
  const formattedWeek = `${format(weekDays[0], "MMM d")} - ${format(weekDays[6], "MMM d, yyyy")}`;
  const formattedMonth = format(date, "MMMM yyyy");
  
  // Navigate between days/weeks/months
  const navigatePrevious = () => {
    if (view === "day") {
      setDate(addDays(date, -1));
    } else if (view === "week") {
      setDate(addDays(date, -7));
    } else {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      setDate(newDate);
    }
  };
  
  const navigateNext = () => {
    if (view === "day") {
      setDate(addDays(date, 1));
    } else if (view === "week") {
      setDate(addDays(date, 7));
    } else {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      setDate(newDate);
    }
  };
  
  const navigateToday = () => {
    setDate(new Date());
  };

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground">
            Manage job appointments and staff schedules.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Schedule New Job</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <h2 className="text-lg font-semibold">
                  {view === "day" ? formattedDate : view === "week" ? formattedWeek : formattedMonth}
                </h2>
                {!isToday(date) && (
                  <Button variant="link" className="p-0 h-auto" onClick={navigateToday}>
                    Today
                  </Button>
                )}
              </div>
              <Button variant="outline" size="icon" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")}>
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {view === "month" ? (
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    setView("day");
                  }
                }}
                className="rounded-md border max-w-full"
                month={date}
              />
              
              <div className="space-y-2 mt-6">
                <h3 className="font-medium">Jobs This Month</h3>
                {filteredJobs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No jobs scheduled for this month.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : view === "week" ? (
            <WeekView weekDays={weekDays} jobs={filteredJobs} />
          ) : (
            <DayView date={date} jobs={filteredJobs} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div
          className="w-full sm:w-1 h-2 sm:h-auto"
          style={{
            backgroundColor:
              job.status === "completed"
                ? "#22c55e"
                : job.status === "in-progress"
                ? "#f59e0b"
                : job.status === "cancelled"
                ? "#ef4444"
                : "#0ea5e9",
          }}
        />
        <div className="p-4 flex-1">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-semibold">{job.clientName}</h3>
                <Badge
                  variant={
                    job.status === "completed"
                      ? "default"
                      : job.status === "in-progress"
                      ? "secondary"
                      : job.status === "cancelled"
                      ? "destructive"
                      : "outline"
                  }
                >
                  {job.status}
                </Badge>
              </div>
              <p className="text-sm">{job.serviceName}</p>
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span className="truncate max-w-[200px]">
                  {job.address.street}, {job.address.city}
                </span>
              </div>
            </div>
            <div className="mt-2 sm:mt-0 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span>
                  {job.date}, {job.startTime} - {job.endTime}
                </span>
              </div>
              <div className="flex items-center mt-1">
                <p className="text-xs text-muted-foreground mr-2">Staff:</p>
                <div className="flex -space-x-2">
                  {job.assignedStaffIds.map((staffId) => {
                    const staff = getStaffById(staffId);
                    return (
                      <Avatar key={staffId} className="h-6 w-6 border-2 border-background">
                        <AvatarFallback className="text-xs">
                          {staff ? getInitials(staff.name) : "?"}
                        </AvatarFallback>
                      </Avatar>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface DayViewProps {
  date: Date;
  jobs: Job[];
}

const DayView: React.FC<DayViewProps> = ({ date, jobs }) => {
  // Sort jobs by start time
  const sortedJobs = [...jobs].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="space-y-4">
      <div className="text-center border-b pb-2">
        <h3>{format(date, "EEEE")}</h3>
      </div>

      {sortedJobs.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No jobs scheduled for this day.
        </div>
      ) : (
        <div className="space-y-4">
          {sortedJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

interface WeekViewProps {
  weekDays: Date[];
  jobs: Job[];
}

const WeekView: React.FC<WeekViewProps> = ({ weekDays, jobs }) => {
  // Group jobs by date
  const jobsByDate: Record<string, Job[]> = {};
  
  jobs.forEach((job) => {
    if (!jobsByDate[job.date]) {
      jobsByDate[job.date] = [];
    }
    jobsByDate[job.date].push(job);
  });
  
  return (
    <div className="grid grid-cols-7 gap-2">
      {/* Day headers */}
      {weekDays.map((day, i) => (
        <div 
          key={i} 
          className={`text-center p-2 ${
            isToday(day) 
              ? "bg-primary/10 font-medium rounded-md" 
              : ""
          }`}
        >
          <div className="text-sm font-medium">{format(day, "EEE")}</div>
          <div className="text-2xl">{format(day, "d")}</div>
        </div>
      ))}
      
      {/* Day columns with jobs */}
      {weekDays.map((day, i) => {
        const dateString = format(day, "yyyy-MM-dd");
        const dayJobs = jobsByDate[dateString] || [];
        
        return (
          <div key={`jobs-${i}`} className="border rounded-md min-h-[150px] p-1">
            {dayJobs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                No jobs
              </div>
            ) : (
              <div className="space-y-1">
                {dayJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="text-xs p-1 rounded truncate cursor-pointer hover:bg-muted"
                    style={{
                      borderLeft: `3px solid ${
                        job.status === "completed"
                          ? "#22c55e"
                          : job.status === "in-progress"
                          ? "#f59e0b"
                          : job.status === "cancelled"
                          ? "#ef4444"
                          : "#0ea5e9"
                      }`
                    }}
                  >
                    <div className="font-medium">{job.startTime} - {job.clientName}</div>
                    <div className="text-muted-foreground truncate">{job.serviceName}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Schedule;
