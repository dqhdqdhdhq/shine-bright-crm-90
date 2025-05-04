
import React, { Dispatch, SetStateAction } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Filter, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StaffMember, StaffRole, mockStaff } from "@/data/mockData";

// Get unique skills across all staff
const getAllSkills = () => {
  const skillsSet = new Set<string>();
  mockStaff.forEach((staff) => {
    staff.skills.forEach((skill) => skillsSet.add(skill));
  });
  return Array.from(skillsSet).sort();
};

export type StaffFilters = {
  roles: StaffRole[];
  skills: string[];
  status: string[];
  search: string;
};

type StaffFiltersProps = {
  filters: StaffFilters;
  setFilters: Dispatch<SetStateAction<StaffFilters>>;
  resetFilters: () => void;
};

const StaffFilters = ({ filters, setFilters, resetFilters }: StaffFiltersProps) => {
  const allSkills = getAllSkills();
  
  const activeFilterCount = 
    filters.roles.length + 
    filters.skills.length + 
    filters.status.length;

  const handleRoleChange = (role: StaffRole) => {
    setFilters(prev => {
      if (prev.roles.includes(role)) {
        return { ...prev, roles: prev.roles.filter(r => r !== role) };
      } else {
        return { ...prev, roles: [...prev.roles, role] };
      }
    });
  };

  const handleSkillChange = (skill: string) => {
    setFilters(prev => {
      if (prev.skills.includes(skill)) {
        return { ...prev, skills: prev.skills.filter(s => s !== skill) };
      } else {
        return { ...prev, skills: [...prev.skills, skill] };
      }
    });
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => {
      if (prev.status.includes(status)) {
        return { ...prev, status: prev.status.filter(s => s !== status) };
      } else {
        return { ...prev, status: [...prev.status, status] };
      }
    });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1 px-1 rounded-full">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="start">
          <div className="p-4 pb-2">
            <div className="flex items-center justify-between">
              <h4 className="font-medium leading-none">Filter Staff</h4>
              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  onClick={resetFilters}
                  className="h-auto p-0 text-xs text-muted-foreground"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
          <Separator />
          <ScrollArea className="h-[320px]">
            <div className="p-4 pt-2 space-y-4">
              {/* Role filter */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Role</h5>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="role-admin" 
                      checked={filters.roles.includes("admin")}
                      onCheckedChange={() => handleRoleChange("admin")}
                    />
                    <label
                      htmlFor="role-admin"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Administrator
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="role-supervisor" 
                      checked={filters.roles.includes("supervisor")}
                      onCheckedChange={() => handleRoleChange("supervisor")}
                    />
                    <label
                      htmlFor="role-supervisor"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Supervisor
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="role-cleaner" 
                      checked={filters.roles.includes("cleaner")}
                      onCheckedChange={() => handleRoleChange("cleaner")}
                    />
                    <label
                      htmlFor="role-cleaner"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Cleaner
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Status filter */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Status</h5>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-active" 
                      checked={filters.status.includes("active")}
                      onCheckedChange={() => handleStatusChange("active")}
                    />
                    <label
                      htmlFor="status-active"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Active
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-on-leave" 
                      checked={filters.status.includes("on-leave")}
                      onCheckedChange={() => handleStatusChange("on-leave")}
                    />
                    <label
                      htmlFor="status-on-leave"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      On Leave
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="status-terminated" 
                      checked={filters.status.includes("terminated")}
                      onCheckedChange={() => handleStatusChange("terminated")}
                    />
                    <label
                      htmlFor="status-terminated"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Terminated
                    </label>
                  </div>
                </div>
              </div>

              {/* Skills filter */}
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Skills</h5>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                  {allSkills.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`skill-${skill}`}
                        checked={filters.skills.includes(skill)}
                        onCheckedChange={() => handleSkillChange(skill)}
                      />
                      <label
                        htmlFor={`skill-${skill}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      
      {activeFilterCount > 0 && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9" 
          onClick={resetFilters}
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Clear filters
        </Button>
      )}

      {/* Active filter chips */}
      <div className="flex flex-wrap gap-2">
        {filters.roles.map((role) => (
          <Badge key={`role-${role}`} variant="secondary" className="gap-1">
            {role === "admin" ? "Administrator" : role === "supervisor" ? "Supervisor" : "Cleaner"}
            <X 
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleRoleChange(role)}
            />
          </Badge>
        ))}

        {filters.status.map((status) => (
          <Badge key={`status-${status}`} variant="secondary" className="gap-1">
            {status === "active" ? "Active" : status === "on-leave" ? "On Leave" : "Terminated"}
            <X 
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleStatusChange(status)}
            />
          </Badge>
        ))}

        {filters.skills.map((skill) => (
          <Badge key={`skill-${skill}`} variant="secondary" className="gap-1">
            {skill}
            <X 
              className="h-3 w-3 cursor-pointer"
              onClick={() => handleSkillChange(skill)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default StaffFilters;
