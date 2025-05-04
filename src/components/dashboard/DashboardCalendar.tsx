
import React, { useState } from "react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Job } from "@/data/mockData";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface DashboardCalendarProps {
  jobs: Job[];
}

const DashboardCalendar = ({ jobs }: DashboardCalendarProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const navigate = useNavigate();

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
          <Badge 
            variant="outline" 
            className={`h-1.5 w-1.5 rounded-full p-0 ${dateString === hoveredDate ? 'bg-primary' : ''}`}
            onMouseEnter={() => setHoveredDate(dateString)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            <span className="sr-only">{dayJobs.length} jobs</span>
          </Badge>
          {dayJobs.length > 1 && (
            <Badge 
              variant="outline" 
              className={`h-1.5 w-1.5 rounded-full p-0 ml-0.5 ${dateString === hoveredDate ? 'bg-primary' : ''}`}
            >
              <span className="sr-only">{dayJobs.length} jobs</span>
            </Badge>
          )}
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

  const handlePreviousDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 1);
    setDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    setDate(newDate);
  };

  // Get color based on job status
  const getStatusColor = (status: string) => {
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

  const handleAction = (action: string, jobId: string) => {
    navigate(`/jobs`);
  };
  
  return (
    <div className="space-y-4">
      <TooltipProvider>
        <CalendarComponent
          mode="single"
          selected={date}
          onSelect={setDate as any}
          className="rounded-md border pointer-events-auto"
          components={{
            DayContent: ({ date, ...props }: any) => {
              return renderDayContent(date);
            }
          }}
          initialFocus
        />
      </TooltipProvider>

      <div className="space-y-2 mt-4">
        <div className="flex items-center justify-between">
          <Button size="sm" variant="ghost" onClick={handlePreviousDay}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-medium">
            Jobs on {date ? format(date, "MMMM d, yyyy") : "Selected Date"}
          </h3>
          <Button size="sm" variant="ghost" onClick={handleNextDay}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {selectedDateJobs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No jobs scheduled for this date.</p>
        ) : (
          <div className="space-y-2">
            {selectedDateJobs.map((job) => (
              <Card key={job.id} className="p-3 hover:bg-accent/50 cursor-pointer transition-colors" onClick={() => navigate(`/jobs`)}>
                <div className="flex justify-between">
                  <span className="font-medium">{job.clientName}</span>
                  <Badge variant="outline" className="text-xs h-5">
                    {job.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground text-sm">
                  {job.startTime} - {job.endTime}
                </div>
                <div className="text-xs text-muted-foreground mt-1 flex items-center">
                  <Users className="mr-1 h-3 w-3" />
                  {job.assignedStaffIds && job.assignedStaffIds.length > 0 ? job.assignedStaffIds.join(", ") : "Unassigned"}
                </div>
                <div className="flex justify-end gap-1 mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction("View", job.id);
                    }}
                  >
                    View
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction("Assign", job.id);
                    }}
                  >
                    Assign
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCalendar;
