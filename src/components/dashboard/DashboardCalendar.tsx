
import React, { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/data/mockData";
import { format } from "date-fns";

interface DashboardCalendarProps {
  jobs: Job[];
}

const DashboardCalendar = ({ jobs }: DashboardCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());

  // Create a map of jobs by date for easy lookup
  const jobsByDate = jobs.reduce((acc, job) => {
    const dateKey = job.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(job);
    return acc;
  }, {} as Record<string, Job[]>);

  // Function to render calendar day content with job indicators
  const renderDayContent = (day: Date) => {
    try {
      // Make sure day is a valid Date object
      if (!(day instanceof Date) || isNaN(day.getTime())) {
        return null;
      }
      
      const dateString = format(day, "yyyy-MM-dd");
      const dayJobs = jobsByDate[dateString] || [];
      const hasJobs = dayJobs.length > 0;
      
      if (!hasJobs) return null;

      return (
        <div className="flex justify-center mt-1">
          <Badge variant="outline" className="h-1 w-1 rounded-full p-0">
            <span className="sr-only">{dayJobs.length} jobs</span>
          </Badge>
        </div>
      );
    } catch (error) {
      console.error("Error rendering day content:", error);
      return null;
    }
  };

  // Show jobs for selected date
  const selectedDateString = date ? format(date, "yyyy-MM-dd") : "";
  const selectedDateJobs = jobsByDate[selectedDateString] || [];
  
  return (
    <div className="space-y-4">
      <CalendarComponent
        mode="single"
        selected={date}
        onSelect={setDate as any}
        className="rounded-md border pointer-events-auto"
        components={{
          DayContent: (props) => {
            const { day } = props as { day: Date };
            return renderDayContent(day);
          }
        }}
        initialFocus
      />

      <div className="space-y-2 mt-4">
        <h3 className="font-medium">
          Jobs on {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
        </h3>
        
        {selectedDateJobs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No jobs scheduled for this date.</p>
        ) : (
          <div className="space-y-2">
            {selectedDateJobs.map((job) => (
              <div key={job.id} className="text-sm p-2 border rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">{job.clientName}</span>
                  <Badge variant="outline" className="text-xs h-5">
                    {job.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground">
                  {job.startTime} - {job.endTime}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCalendar;
