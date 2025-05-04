
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone } from "lucide-react";
import { StaffMember } from "@/data/mockData";
import { formatPhoneNumber, getInitials } from "@/lib/utils";

interface StaffListViewProps {
  staffMembers: StaffMember[];
  onStaffClick: (staff: StaffMember) => void;
}

const StaffListView: React.FC<StaffListViewProps> = ({ 
  staffMembers,
  onStaffClick 
}) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Skills</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffMembers.map((staff) => (
            <TableRow 
              key={staff.id} 
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => onStaffClick(staff)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {getInitials(staff.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{staff.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
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
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center text-sm">
                    <Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span className="text-xs">{staff.email}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                    <span className="text-xs">{formatPhoneNumber(staff.phone)}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
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
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                  <span>{staff.hireDate}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStaffClick(staff);
                  }}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StaffListView;
