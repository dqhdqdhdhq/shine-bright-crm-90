
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Mail, Phone } from "lucide-react";
import { StaffMember } from "@/data/mockData";
import { formatPhoneNumber, getInitials } from "@/lib/utils";

interface StaffCardViewProps {
  staffMembers: StaffMember[];
  onStaffClick: (staff: StaffMember) => void;
}

const StaffCardView: React.FC<StaffCardViewProps> = ({ 
  staffMembers,
  onStaffClick
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {staffMembers.map((staff) => (
        <Card
          key={staff.id}
          className="cursor-pointer hover:shadow-md transition-all"
          onClick={() => onStaffClick(staff)}
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
                <div className="flex items-center justify-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{staff.hireDate}</span>
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
    </div>
  );
};

export default StaffCardView;
