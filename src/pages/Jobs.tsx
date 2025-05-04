
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  MapPin,
  MoreVertical,
  PlayCircle,
  XCircle,
  FileImage,
  FilePlus,
  FileText,
  StopCircle,
} from "lucide-react";
import { Job, JobStatus, mockJobs, getClientById, getServiceById } from "@/data/mockData";
import { getInitials } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Jobs = () => {
  const [filter, setFilter] = useState<JobStatus | 'all'>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false);
  const [isCheckOutDialogOpen, setIsCheckOutDialogOpen] = useState(false);
  const [isAddNotesDialogOpen, setIsAddNotesDialogOpen] = useState(false);
  
  // Filter jobs based on status
  const filteredJobs = filter === 'all' 
    ? mockJobs 
    : mockJobs.filter(job => job.status === filter);
  
  const handleStatusChange = (job: Job, newStatus: JobStatus) => {
    // In a real app, this would update the job status in the database
    toast({
      title: "Status updated",
      description: `Job for ${job.clientName} marked as ${newStatus}`,
    });
  };
  
  const handleCheckIn = () => {
    if (selectedJob) {
      // In a real app, this would update the job with check-in time
      toast({
        title: "Checked in successfully",
        description: `You've checked in for the job at ${new Date().toLocaleTimeString()}`,
      });
      setIsCheckInDialogOpen(false);
    }
  };
  
  const handleCheckOut = () => {
    if (selectedJob) {
      // In a real app, this would update the job with check-out time
      toast({
        title: "Checked out successfully",
        description: `You've checked out from the job at ${new Date().toLocaleTimeString()}`,
      });
      setIsCheckOutDialogOpen(false);
    }
  };
  
  const handleAddNotes = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the notes to the database
    toast({
      title: "Notes added",
      description: "Your notes have been saved successfully",
    });
    setIsAddNotesDialogOpen(false);
  };

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Job Tracking</h1>
        <p className="text-muted-foreground">
          Manage and track your cleaning jobs.
        </p>
      </div>

      <Tabs defaultValue="all" value={filter} onValueChange={(value) => setFilter(value as JobStatus | 'all')}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <JobsList 
            jobs={filteredJobs} 
            onSelectJob={setSelectedJob} 
            onChangeStatus={handleStatusChange}
            onCheckIn={() => setIsCheckInDialogOpen(true)}
            onCheckOut={() => setIsCheckOutDialogOpen(true)}
            onAddNotes={() => setIsAddNotesDialogOpen(true)}
          />
        </TabsContent>
        
        <TabsContent value="scheduled" className="mt-6">
          <JobsList 
            jobs={filteredJobs} 
            onSelectJob={setSelectedJob} 
            onChangeStatus={handleStatusChange}
            onCheckIn={() => setIsCheckInDialogOpen(true)}
            onCheckOut={() => setIsCheckOutDialogOpen(true)}
            onAddNotes={() => setIsAddNotesDialogOpen(true)}
          />
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-6">
          <JobsList 
            jobs={filteredJobs} 
            onSelectJob={setSelectedJob} 
            onChangeStatus={handleStatusChange}
            onCheckIn={() => setIsCheckInDialogOpen(true)}
            onCheckOut={() => setIsCheckOutDialogOpen(true)}
            onAddNotes={() => setIsAddNotesDialogOpen(true)}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <JobsList 
            jobs={filteredJobs} 
            onSelectJob={setSelectedJob} 
            onChangeStatus={handleStatusChange}
            onCheckIn={() => setIsCheckInDialogOpen(true)}
            onCheckOut={() => setIsCheckOutDialogOpen(true)}
            onAddNotes={() => setIsAddNotesDialogOpen(true)}
          />
        </TabsContent>
        
        <TabsContent value="cancelled" className="mt-6">
          <JobsList 
            jobs={filteredJobs} 
            onSelectJob={setSelectedJob} 
            onChangeStatus={handleStatusChange}
            onCheckIn={() => setIsCheckInDialogOpen(true)}
            onCheckOut={() => setIsCheckOutDialogOpen(true)}
            onAddNotes={() => setIsAddNotesDialogOpen(true)}
          />
        </TabsContent>
      </Tabs>
      
      {/* Check In Dialog */}
      <Dialog open={isCheckInDialogOpen} onOpenChange={setIsCheckInDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check In to Job</DialogTitle>
            <DialogDescription>
              Confirm your arrival at the job location.
            </DialogDescription>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <Label>Job Location</Label>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">
                    {selectedJob.address.street}, {selectedJob.address.city}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label>Current Time</Label>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckInDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCheckIn}>
              Confirm Check In
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Check Out Dialog */}
      <Dialog open={isCheckOutDialogOpen} onOpenChange={setIsCheckOutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check Out from Job</DialogTitle>
            <DialogDescription>
              Confirm you've completed the job.
            </DialogDescription>
          </DialogHeader>
          
          {selectedJob && (
            <div className="space-y-4 py-2">
              <div className="space-y-1">
                <Label>Job Summary</Label>
                <div className="text-sm">
                  <p><span className="font-medium">Client:</span> {selectedJob.clientName}</p>
                  <p><span className="font-medium">Service:</span> {selectedJob.serviceName}</p>
                  <p><span className="font-medium">Check In Time:</span> {selectedJob.checkinTime || "Not checked in"}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label>Current Time</Label>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                  <span className="text-sm">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="completed-tasks">Completed Tasks</Label>
                <Textarea id="completed-tasks" placeholder="List any specific tasks completed..." />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCheckOutDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCheckOut}>
              Confirm Check Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Notes Dialog */}
      <Dialog open={isAddNotesDialogOpen} onOpenChange={setIsAddNotesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Job Notes</DialogTitle>
            <DialogDescription>
              Add notes or upload photos for this job.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddNotes}>
            <div className="space-y-4 py-2">
              {selectedJob && (
                <div className="space-y-1">
                  <Label>Job Details</Label>
                  <div className="text-sm">
                    <p><span className="font-medium">Client:</span> {selectedJob.clientName}</p>
                    <p><span className="font-medium">Service:</span> {selectedJob.serviceName}</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-1">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add any notes about the job..." />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="photos">Photos</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button type="button" variant="outline" className="h-20 flex flex-col gap-1">
                    <FileImage className="h-6 w-6" />
                    <span className="text-xs">Take Photo</span>
                  </Button>
                  <Button type="button" variant="outline" className="h-20 flex flex-col gap-1">
                    <FilePlus className="h-6 w-6" />
                    <span className="text-xs">Upload Image</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setIsAddNotesDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Save Notes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface JobsListProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
  onChangeStatus: (job: Job, status: JobStatus) => void;
  onCheckIn: () => void;
  onCheckOut: () => void;
  onAddNotes: () => void;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, onSelectJob, onChangeStatus, onCheckIn, onCheckOut, onAddNotes }) => {
  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-center text-muted-foreground mb-2">
            No jobs found matching the selected filter.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard 
          key={job.id}
          job={job}
          onSelectJob={onSelectJob}
          onChangeStatus={onChangeStatus}
          onCheckIn={onCheckIn}
          onCheckOut={onCheckOut}
          onAddNotes={onAddNotes}
        />
      ))}
    </div>
  );
};

interface JobCardProps {
  job: Job;
  onSelectJob: (job: Job) => void;
  onChangeStatus: (job: Job, status: JobStatus) => void;
  onCheckIn: () => void;
  onCheckOut: () => void;
  onAddNotes: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  onSelectJob,
  onChangeStatus,
  onCheckIn,
  onCheckOut,
  onAddNotes
}) => {
  const client = getClientById(job.clientId);
  const service = getServiceById(job.serviceId);
  
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const handleStatusAction = (status: JobStatus) => {
    onChangeStatus(job, status);
  };
  
  const handleCheckInClick = () => {
    onSelectJob(job);
    onCheckIn();
  };
  
  const handleCheckOutClick = () => {
    onSelectJob(job);
    onCheckOut();
  };
  
  const handleAddNotesClick = () => {
    onSelectJob(job);
    onAddNotes();
  };
  
  return (
    <Card className="overflow-hidden">
      <div
        className="h-2"
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
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{job.clientName}</CardTitle>
            <CardDescription>{job.serviceName}</CardDescription>
          </div>
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
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-2">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {job.date}, {job.startTime} - {job.endTime}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm">
              {job.address.street}, {job.address.city}, {job.address.state} {job.address.zipCode}
            </span>
          </div>
          
          {isDetailsOpen && (
            <div className="mt-4 space-y-4 border-t pt-4">
              {job.notes && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Notes:</p>
                  <p className="text-sm text-muted-foreground">{job.notes}</p>
                </div>
              )}
              
              {job.recurring !== 'none' && (
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    Recurring: {job.recurring} service
                  </span>
                </div>
              )}
              
              {service && service.tasks && (
                <div className="space-y-1">
                  <p className="text-sm font-medium">Tasks:</p>
                  <ul className="space-y-1 text-sm">
                    {service.tasks.slice(0, 4).map((task, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <span>{task}</span>
                      </li>
                    ))}
                    {service.tasks.length > 4 && (
                      <li className="text-sm text-muted-foreground">
                        +{service.tasks.length - 4} more tasks...
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              {job.status === 'in-progress' && job.checkinTime && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    Checked in at: {job.checkinTime}
                  </span>
                </div>
              )}
              
              {job.status === 'completed' && job.checkoutTime && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">
                    Checked out at: {job.checkoutTime}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        >
          {isDetailsOpen ? "Show Less" : "Show More"}
        </Button>
        
        <div className="flex items-center gap-2">
          {job.status === 'scheduled' && (
            <Button size="sm" variant="secondary" onClick={handleCheckInClick}>
              <PlayCircle className="h-4 w-4 mr-1" /> Check In
            </Button>
          )}
          
          {job.status === 'in-progress' && (
            <Button size="sm" variant="default" onClick={handleCheckOutClick}>
              <StopCircle className="h-4 w-4 mr-1" /> Check Out
            </Button>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem onClick={handleAddNotesClick}>
                <FileText className="h-4 w-4 mr-2" />
                Add Notes/Photos
              </DropdownMenuItem>
              
              {job.status !== 'completed' && (
                <DropdownMenuItem onClick={() => handleStatusAction('completed')}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Completed
                </DropdownMenuItem>
              )}
              
              {job.status !== 'in-progress' && job.status !== 'completed' && job.status !== 'cancelled' && (
                <DropdownMenuItem onClick={() => handleStatusAction('in-progress')}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Job
                </DropdownMenuItem>
              )}
              
              {job.status !== 'cancelled' && (
                <DropdownMenuItem onClick={() => handleStatusAction('cancelled')}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Cancel Job
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Jobs;
