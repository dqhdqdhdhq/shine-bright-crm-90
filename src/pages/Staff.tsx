
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  Edit,
  Mail,
  Phone,
  Plus,
  Search,
  User,
} from "lucide-react";
import { StaffMember, mockStaff, getJobsByStaffId } from "@/data/mockData";
import { formatPhoneNumber, getInitials } from "@/lib/utils";

const Staff = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  const filteredStaff = mockStaff.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.phone.includes(searchTerm)
  );

  const handleStaffClick = (staff: StaffMember) => {
    setSelectedStaff(staff);
  };

  const closeDialog = () => {
    setSelectedStaff(null);
  };

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Staff</h1>
          <p className="text-muted-foreground">
            Manage your cleaning staff members and teams.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Staff Member</span>
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search staff members..."
          className="pl-8 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStaff.map((staff) => (
          <Card
            key={staff.id}
            className="cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleStaffClick(staff)}
          >
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">
                    {getInitials(staff.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="mt-4 font-medium text-lg">{staff.name}</h3>
                <Badge
                  className="mt-2"
                  variant={
                    staff.role === "admin"
                      ? "default"
                      : staff.role === "supervisor"
                      ? "secondary"
                      : "outline"
                  }
                >
                  {staff.role === "admin"
                    ? "Administrator"
                    : staff.role === "supervisor"
                    ? "Supervisor"
                    : "Cleaner"}
                </Badge>
                <div className="mt-4 space-y-2 w-full">
                  <div className="flex items-center justify-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="truncate">{staff.email}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{formatPhoneNumber(staff.phone)}</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1 justify-center">
                  {staff.skills.slice(0, 2).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {staff.skills.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{staff.skills.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredStaff.length === 0 && (
          <Card className="col-span-full p-12">
            <div className="text-center">
              <h3 className="font-medium text-lg mb-2">No Staff Found</h3>
              <p className="text-muted-foreground mb-4">
                No staff members match your search criteria.
              </p>
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            </div>
          </Card>
        )}
      </div>

      <StaffDetailsDialog
        staff={selectedStaff}
        open={!!selectedStaff}
        onClose={closeDialog}
      />
    </div>
  );
};

interface StaffDetailsDialogProps {
  staff: StaffMember | null;
  open: boolean;
  onClose: () => void;
}

const StaffDetailsDialog: React.FC<StaffDetailsDialogProps> = ({
  staff,
  open,
  onClose,
}) => {
  if (!staff) return null;
  
  const staffJobs = getJobsByStaffId(staff.id);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Staff Details</DialogTitle>
          <DialogDescription>View and manage staff information</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="flex flex-col items-center">
            <Avatar className="h-32 w-32">
              <AvatarFallback className="text-3xl">
                {getInitials(staff.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 font-semibold text-xl">{staff.name}</h2>
            <Badge
              className="mt-1"
              variant={
                staff.role === "admin"
                  ? "default"
                  : staff.role === "supervisor"
                  ? "secondary"
                  : "outline"
              }
            >
              {staff.role === "admin"
                ? "Administrator"
                : staff.role === "supervisor"
                ? "Supervisor"
                : "Cleaner"}
            </Badge>
          </div>

          <div className="flex-1">
            <Tabs defaultValue="details">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="schedule">Availability</TabsTrigger>
                <TabsTrigger value="jobs">Assigned Jobs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-4 space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`mailto:${staff.email}`} className="text-primary">
                          {staff.email}
                        </a>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <a href={`tel:${staff.phone}`} className="text-primary">
                          {formatPhoneNumber(staff.phone)}
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Hire Date</p>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{staff.hireDate}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Skills & Certifications</p>
                    <div className="flex flex-wrap gap-2">
                      {staff.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Weekly Availability</h3>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-2 text-left font-medium">Day</th>
                          <th className="px-4 py-2 text-left font-medium">Hours</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(staff.availability).map(([day, hours]) => (
                          <tr key={day} className="border-t">
                            <td className="px-4 py-3 capitalize">{day}</td>
                            <td className="px-4 py-3">
                              {hours.start && hours.end
                                ? `${hours.start} - ${hours.end}`
                                : "Not Available"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="jobs" className="mt-4">
                <div className="space-y-4">
                  {staffJobs.length === 0 ? (
                    <p className="text-center py-6 text-muted-foreground">
                      No jobs assigned to this staff member.
                    </p>
                  ) : (
                    <div className="border rounded-md overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium">Client</th>
                            <th className="px-4 py-2 text-left font-medium">Service</th>
                            <th className="px-4 py-2 text-left font-medium">Date</th>
                            <th className="px-4 py-2 text-left font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {staffJobs.map((job) => (
                            <tr key={job.id} className="border-t">
                              <td className="px-4 py-3">{job.clientName}</td>
                              <td className="px-4 py-3">{job.serviceName}</td>
                              <td className="px-4 py-3">
                                {job.date}, {job.startTime} - {job.endTime}
                              </td>
                              <td className="px-4 py-3">
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
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Staff
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Staff;
