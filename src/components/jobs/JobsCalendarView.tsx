
import React, { useState } from "react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job, JobStatus } from "@/data/mockData";
import { FilterState } from "@/types/JobsFilterState";

interface JobsCalendarViewProps {
  jobs: Job[];
  filters: FilterState;
  onSelectJob: (job: Job) => void;
}

const JobsCalendarView: React.FC<JobsCalendarViewProps> = ({ jobs, filters, onSelectJob }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Generate days for the current month view
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Go to previous/next month
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => setCurrentMonth(new Date());
  
  // Group jobs by date
  const jobsByDate = jobs.reduce((acc, job) => {
    const date = job.date; // assuming job.date is in format "YYYY-MM-DD"
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(job);
    return acc;
  }, {} as Record<string, Job[]>);
  
  // Get status color
  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-amber-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-muted text-center rounded-md overflow-hidden">
        {/* Calendar headers (days of week) */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-background p-2 font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, dayIdx) => {
          const dateStr = format(day, "yyyy-MM-dd");
          const dayJobs = jobsByDate[dateStr] || [];
          
          return (
            <div
              key={dayIdx}
              className={cn(
                "min-h-[120px] p-2 bg-background",
                !isSameMonth(day, currentMonth) && "text-muted-foreground opacity-50",
                isToday(day) && "bg-muted/30"
              )}
            >
              <div className="flex justify-between items-start">
                <span 
                  className={cn(
                    "inline-flex items-center justify-center h-6 w-6 rounded-full text-xs",
                    isToday(day) && "bg-primary text-primary-foreground"
                  )}
                >
                  {format(day, "d")}
                </span>
              </div>
              
              {/* Jobs for this day */}
              <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                {dayJobs.map((job) => (
                  <div 
                    key={job.id}
                    className={cn(
                      "px-2 py-1 rounded text-xs cursor-pointer hover:bg-muted flex items-center"
                    )}
                    onClick={() => onSelectJob(job)}
                  >
                    <div 
                      className={cn(
                        "h-2 w-2 rounded-full mr-1",
                        getStatusColor(job.status)
                      )} 
                    />
                    <span className="font-medium truncate">{job.clientName}</span>
                    <span className="ml-auto text-muted-foreground">
                      {job.startTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobsCalendarView;
