
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CalendarDays,
  DollarSign,
  Tag,
  MapPin,
  Users,
  CircleDot,
} from "lucide-react";
import { format } from "date-fns";
import { ClientStatus } from "@/pages/Clients";

interface ClientFiltersProps {
  filters: {
    tags: string[];
    status: string;
    dateRange: { start: Date | null; end: Date | null };
    nextJobRange: { start: Date | null; end: Date | null };
    balanceStatus: string;
    zipCodes: string[];
    staff: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      tags: string[];
      status: string;
      dateRange: { start: Date | null; end: Date | null };
      nextJobRange: { start: Date | null; end: Date | null };
      balanceStatus: string;
      zipCodes: string[];
      staff: string[];
    }>
  >;
}

// Mock data for dropdowns
const mockTags = ["VIP", "Regular", "New Client", "Premium", "Monthly", "Weekly", "Bi-Weekly"];
const mockZipCodes = ["12345", "23456", "34567", "45678", "56789"];
const mockStaff = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis"];
const mockStatuses: ClientStatus[] = ["lead", "prospect", "active", "on-hold", "inactive", "lost"];

export const ClientFilters: React.FC<ClientFiltersProps> = ({
  filters,
  setFilters,
}) => {
  // Helper function to format date or show placeholder
  const formatDateOrPlaceholder = (date: Date | null, placeholder: string) => {
    return date ? format(date, "PPP") : placeholder;
  };

  // Helper function to update a specific filter
  const updateFilter = (
    key: keyof typeof filters,
    value: any
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Toggle a tag selection
  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    updateFilter("tags", newTags);
  };

  // Toggle a zip code selection
  const toggleZipCode = (zipCode: string) => {
    const newZipCodes = filters.zipCodes.includes(zipCode)
      ? filters.zipCodes.filter((z) => z !== zipCode)
      : [...filters.zipCodes, zipCode];
    updateFilter("zipCodes", newZipCodes);
  };

  // Toggle a staff member selection
  const toggleStaffMember = (staff: string) => {
    const newStaff = filters.staff.includes(staff)
      ? filters.staff.filter((s) => s !== staff)
      : [...filters.staff, staff];
    updateFilter("staff", newStaff);
  };

  return (
    <div className="space-y-6">
      {/* Client Status */}
      <div className="space-y-2">
        <div className="flex items-center">
          <CircleDot className="mr-2 h-4 w-4" />
          <Label>Client Status</Label>
        </div>
        <Select
          value={filters.status}
          onValueChange={(value) => updateFilter("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {mockStatuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <div className="flex items-center">
          <Tag className="mr-2 h-4 w-4" />
          <Label>Client Tags</Label>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {mockTags.map((tag) => (
            <div key={tag} className="flex items-center space-x-2">
              <Checkbox
                id={`tag-${tag}`}
                checked={filters.tags.includes(tag)}
                onCheckedChange={() => toggleTag(tag)}
              />
              <label
                htmlFor={`tag-${tag}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {tag}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Last Service Date Range */}
      <div className="space-y-2">
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4" />
          <Label>Last Service Date Range</Label>
        </div>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {formatDateOrPlaceholder(
                  filters.dateRange.start,
                  "Select start date"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateRange.start || undefined}
                onSelect={(date) =>
                  updateFilter("dateRange", {
                    ...filters.dateRange,
                    start: date,
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {formatDateOrPlaceholder(
                  filters.dateRange.end,
                  "Select end date"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.dateRange.end || undefined}
                onSelect={(date) =>
                  updateFilter("dateRange", {
                    ...filters.dateRange,
                    end: date,
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Next Job Date Range */}
      <div className="space-y-2">
        <div className="flex items-center">
          <CalendarDays className="mr-2 h-4 w-4" />
          <Label>Next Job Date Range</Label>
        </div>
        <div className="flex space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {formatDateOrPlaceholder(
                  filters.nextJobRange.start,
                  "Select start date"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.nextJobRange.start || undefined}
                onSelect={(date) =>
                  updateFilter("nextJobRange", {
                    ...filters.nextJobRange,
                    start: date,
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                {formatDateOrPlaceholder(
                  filters.nextJobRange.end,
                  "Select end date"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={filters.nextJobRange.end || undefined}
                onSelect={(date) =>
                  updateFilter("nextJobRange", {
                    ...filters.nextJobRange,
                    end: date,
                  })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Account Balance Status */}
      <div className="space-y-2">
        <div className="flex items-center">
          <DollarSign className="mr-2 h-4 w-4" />
          <Label>Account Balance Status</Label>
        </div>
        <Select
          value={filters.balanceStatus}
          onValueChange={(value) => updateFilter("balanceStatus", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select balance status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Service Area/Zip Codes */}
      <div className="space-y-2">
        <div className="flex items-center">
          <MapPin className="mr-2 h-4 w-4" />
          <Label>Service Area/Zip Codes</Label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {mockZipCodes.map((zipCode) => (
            <div key={zipCode} className="flex items-center space-x-2">
              <Checkbox
                id={`zip-${zipCode}`}
                checked={filters.zipCodes.includes(zipCode)}
                onCheckedChange={() => toggleZipCode(zipCode)}
              />
              <label
                htmlFor={`zip-${zipCode}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {zipCode}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Assigned Staff */}
      <div className="space-y-2">
        <div className="flex items-center">
          <Users className="mr-2 h-4 w-4" />
          <Label>Assigned Staff</Label>
        </div>
        <div className="space-y-2">
          {mockStaff.map((staff) => (
            <div key={staff} className="flex items-center space-x-2">
              <Checkbox
                id={`staff-${staff.replace(/\s+/g, "")}`}
                checked={filters.staff.includes(staff)}
                onCheckedChange={() => toggleStaffMember(staff)}
              />
              <label
                htmlFor={`staff-${staff.replace(/\s+/g, "")}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {staff}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
