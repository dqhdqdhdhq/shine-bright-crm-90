
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CalendarDays,
  Check,
  ChevronDown,
  ListFilter,
  Save,
  User,
  Briefcase,
  FileText,
  MapPin,
  Bell
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { FilterState, SavedView } from "@/types/JobsFilterState";
import { mockStaff, mockServices } from "@/data/mockData";

interface JobsAdvancedFiltersProps {
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
  savedViews: SavedView[];
  onSaveView: (view: SavedView) => void;
  onSelectView: (viewId: string) => void;
}

const JobsAdvancedFilters: React.FC<JobsAdvancedFiltersProps> = ({
  filters,
  onApplyFilters,
  savedViews,
  onSaveView,
  onSelectView,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);
  const [newViewName, setNewViewName] = useState("");
  
  const handleFilterChange = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const handleDateChange = (field: "start" | "end", date: Date | null) => {
    setTempFilters((prev) => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: date,
      },
    }));
  };
  
  const handleStaffToggle = (staffId: string) => {
    setTempFilters((prev) => {
      const newStaffIds = prev.staffIds.includes(staffId)
        ? prev.staffIds.filter(id => id !== staffId)
        : [...prev.staffIds, staffId];
      
      return {
        ...prev,
        staffIds: newStaffIds,
      };
    });
  };
  
  const handleServiceToggle = (serviceId: string) => {
    setTempFilters((prev) => {
      const newServiceIds = prev.serviceIds.includes(serviceId)
        ? prev.serviceIds.filter(id => id !== serviceId)
        : [...prev.serviceIds, serviceId];
      
      return {
        ...prev,
        serviceIds: newServiceIds,
      };
    });
  };
  
  const handleApplyFilters = () => {
    onApplyFilters(tempFilters);
  };
  
  const handleResetFilters = () => {
    const resetFilters: FilterState = {
      status: 'all',
      dateRange: { start: null, end: null },
      staffIds: [],
      serviceIds: [],
      clientName: '',
      zipCode: '',
      hasNotes: false,
      needsFollowUp: false,
      unassigned: false,
    };
    
    setTempFilters(resetFilters);
    onApplyFilters(resetFilters);
  };
  
  const handleSaveView = () => {
    if (!newViewName.trim()) return;
    
    const newView: SavedView = {
      id: `view-${Date.now()}`,
      name: newViewName,
      filters: tempFilters,
    };
    
    onSaveView(newView);
    setIsSaveDialogOpen(false);
    setNewViewName("");
  };
  
  return (
    <div className="bg-background shadow-sm border rounded-md p-4 mb-6 animate-fade-in">
      <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range Filter */}
          <div>
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                >
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {tempFilters.dateRange.start && tempFilters.dateRange.end
                    ? `${format(tempFilters.dateRange.start, "MMM d")} - ${format(tempFilters.dateRange.end, "MMM d")}`
                    : "Date Range"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label>Start Date</Label>
                      <Calendar
                        mode="single"
                        selected={tempFilters.dateRange.start || undefined}
                        onSelect={(date) => handleDateChange("start", date)}
                        className="pointer-events-auto"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>End Date</Label>
                      <Calendar
                        mode="single"
                        selected={tempFilters.dateRange.end || undefined}
                        onSelect={(date) => handleDateChange("end", date)}
                        className="pointer-events-auto"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button
                      size="sm"
                      onClick={() => {
                        setIsDatePickerOpen(false);
                      }}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Staff Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <User className="mr-2 h-4 w-4" />
                <span className="truncate">
                  {tempFilters.staffIds.length
                    ? `${tempFilters.staffIds.length} Staff Selected`
                    : "Staff Members"}
                </span>
                <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Assigned Staff</h4>
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {mockStaff.map((staff) => (
                    <div key={staff.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`staff-${staff.id}`}
                        checked={tempFilters.staffIds.includes(staff.id)}
                        onCheckedChange={() => handleStaffToggle(staff.id)}
                      />
                      <Label htmlFor={`staff-${staff.id}`} className="cursor-pointer">
                        {staff.name}
                      </Label>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <Checkbox 
                    id="unassigned"
                    checked={tempFilters.unassigned}
                    onCheckedChange={(checked) => 
                      handleFilterChange("unassigned", checked === true)
                    }
                  />
                  <Label htmlFor="unassigned" className="cursor-pointer">
                    Show unassigned jobs
                  </Label>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Service Type Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                <span className="truncate">
                  {tempFilters.serviceIds.length
                    ? `${tempFilters.serviceIds.length} Services Selected`
                    : "Service Types"}
                </span>
                <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
              <div className="space-y-4">
                <h4 className="font-medium leading-none">Service Types</h4>
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {mockServices.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service.id}`}
                        checked={tempFilters.serviceIds.includes(service.id)}
                        onCheckedChange={() => handleServiceToggle(service.id)}
                      />
                      <Label htmlFor={`service-${service.id}`} className="cursor-pointer">
                        {service.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {/* Client Name Search */}
          <div className="relative">
            <Input
              placeholder="Search client name..."
              value={tempFilters.clientName}
              onChange={(e) => handleFilterChange("clientName", e.target.value)}
              className="w-full pr-8"
            />
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleResetFilters} size="sm">
            Reset
          </Button>
          <Button onClick={handleApplyFilters} variant="secondary" size="sm">
            Apply Filters
          </Button>
        </div>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {/* Additional filter checkboxes */}
        <div className="flex items-center">
          <Checkbox
            id="has-notes"
            checked={tempFilters.hasNotes}
            onCheckedChange={(checked) => 
              handleFilterChange("hasNotes", checked === true)
            }
          />
          <Label htmlFor="has-notes" className="ml-2 cursor-pointer">
            Has Notes
          </Label>
        </div>
        
        <div className="flex items-center ml-4">
          <Checkbox
            id="needs-follow-up"
            checked={tempFilters.needsFollowUp}
            onCheckedChange={(checked) => 
              handleFilterChange("needsFollowUp", checked === true)
            }
          />
          <Label htmlFor="needs-follow-up" className="ml-2 cursor-pointer">
            Needs Follow-up
          </Label>
        </div>
        
        <div className="ml-4">
          <Input
            placeholder="Zip/Postal Code"
            value={tempFilters.zipCode}
            onChange={(e) => handleFilterChange("zipCode", e.target.value)}
            className="w-36 h-8"
          />
        </div>
        
        {/* Saved Views */}
        <div className="ml-auto flex items-center space-x-2">
          {savedViews.length > 0 && (
            <Select onValueChange={onSelectView}>
              <SelectTrigger className="w-[180px] h-8">
                <SelectValue placeholder="Saved Views" />
              </SelectTrigger>
              <SelectContent>
                {savedViews.map((view) => (
                  <SelectItem key={view.id} value={view.id}>
                    {view.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSaveDialogOpen(true)}
          >
            <Save className="h-4 w-4 mr-1" /> Save View
          </Button>
        </div>
      </div>
      
      {/* Save View Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save View</DialogTitle>
            <DialogDescription>
              Save this filter configuration for quick access in the future.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="view-name">View Name</Label>
              <Input
                id="view-name"
                placeholder="My Custom View"
                value={newViewName}
                onChange={(e) => setNewViewName(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveView}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobsAdvancedFilters;
