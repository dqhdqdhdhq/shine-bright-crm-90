
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Calendar, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StaffMember, StaffRole } from "@/data/mockData";
import { getInitials } from "@/lib/utils";

const staffFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  role: z.enum(["admin", "supervisor", "cleaner"]),
  avatar: z.string().optional(),
  status: z.enum(["active", "on-leave", "terminated"]),
  hireDate: z.string(),
  emergencyContact: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
  }),
  address: z.string().optional(),
  payRate: z.string().optional(),
  notes: z.string().optional(),
});

type StaffFormValues = z.infer<typeof staffFormSchema>;

const defaultValues: Partial<StaffFormValues> = {
  role: "cleaner",
  status: "active",
  hireDate: new Date().toISOString().split('T')[0],
  emergencyContact: {
    name: "",
    phone: "",
  },
};

const SAMPLE_AVATARS = [
  "/photo-1649972904349-6e44c42644a7",
  "/photo-1581091226825-a6a2a5aee158",
  "/photo-1581092795360-fd1ca04f0952",
  "/photo-1535268647677-300dbf3d78d1",
];

interface StaffFormProps {
  staff?: StaffMember;
  onSubmit: (data: StaffFormValues) => void;
  onCancel: () => void;
}

const StaffForm: React.FC<StaffFormProps> = ({
  staff,
  onSubmit,
  onCancel,
}) => {
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: staff ? {
      ...staff,
      emergencyContact: staff.emergencyContact || { name: "", phone: "" },
    } : defaultValues,
  });

  const [skills, setSkills] = React.useState<string[]>(staff?.skills || []);
  const [newSkill, setNewSkill] = React.useState("");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleFormSubmit = (data: StaffFormValues) => {
    // Add skills to the form data
    const formData = {
      ...data,
      skills,
      // Add default availability if it's a new staff member
      availability: staff?.availability || {
        monday: { start: "09:00", end: "17:00" },
        tuesday: { start: "09:00", end: "17:00" },
        wednesday: { start: "09:00", end: "17:00" },
        thursday: { start: "09:00", end: "17:00" },
        friday: { start: "09:00", end: "17:00" },
        saturday: { start: null, end: null },
        sunday: { start: null, end: null },
      }
    };
    onSubmit(formData);
  };

  const [selectedAvatar, setSelectedAvatar] = React.useState(staff?.avatar || "");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Basic Details</TabsTrigger>
            <TabsTrigger value="skills">Skills & Certifications</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="additional">Additional Info</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 pt-4">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                {selectedAvatar ? (
                  <AvatarImage src={`https://images.unsplash.com/` + selectedAvatar} />
                ) : (
                  <AvatarFallback className="text-xl">
                    {form.watch("name") ? getInitials(form.watch("name")) : "??"}
                  </AvatarFallback>
                )}
              </Avatar>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {SAMPLE_AVATARS.map((avatar, index) => (
                  <Avatar 
                    key={index} 
                    className={`h-12 w-12 cursor-pointer transition-all ${selectedAvatar === avatar ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                    onClick={() => setSelectedAvatar(avatar)}
                  >
                    <AvatarImage src={`https://images.unsplash.com/` + avatar} />
                  </Avatar>
                ))}
                <Avatar 
                  className={`h-12 w-12 cursor-pointer transition-all bg-muted ${!selectedAvatar ? 'ring-2 ring-primary ring-offset-2' : 'opacity-70 hover:opacity-100'}`}
                  onClick={() => setSelectedAvatar("")}
                >
                  <AvatarFallback className="text-xs">None</AvatarFallback>
                </Avatar>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="cleaner">Cleaner</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="on-leave">On Leave</SelectItem>
                        <SelectItem value="terminated">Terminated</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hireDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hire Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="date" className="pl-8" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4 pt-4">
            <div className="space-y-2">
              <FormLabel>Skills & Certifications</FormLabel>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Add a skill or certification" 
                  value={newSkill} 
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleAddSkill}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="secondary"
                    className="px-3 py-1.5 text-sm flex items-center gap-1"
                  >
                    {skill}
                    <X 
                      className="h-3.5 w-3.5 cursor-pointer hover:text-destructive transition-colors" 
                      onClick={() => handleRemoveSkill(skill)}
                    />
                  </Badge>
                ))}
                {skills.length === 0 && (
                  <p className="text-sm text-muted-foreground">No skills added yet</p>
                )}
              </div>
              <FormDescription>
                Add relevant skills, certifications, or specializations
              </FormDescription>
            </div>
          </TabsContent>

          <TabsContent value="availability" className="space-y-4 pt-4">
            <div className="space-y-4">
              <FormLabel>Weekly Availability</FormLabel>
              <FormDescription className="mb-4">
                Set the staff member's regular working hours for each day of the week
              </FormDescription>
              
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Day</th>
                      <th className="px-4 py-2 text-left font-medium">Start Time</th>
                      <th className="px-4 py-2 text-left font-medium">End Time</th>
                      <th className="px-4 py-2 text-left font-medium">Available</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                      const isAvailable = staff?.availability?.[day]?.start && staff?.availability?.[day]?.end;
                      return (
                        <tr key={day} className="border-t">
                          <td className="px-4 py-3 capitalize">{day}</td>
                          <td className="px-4 py-3">
                            <Input 
                              type="time"
                              defaultValue={staff?.availability?.[day]?.start || "09:00"}
                              className="w-full"
                              disabled={!isAvailable && day === 'saturday' || day === 'sunday'}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <Input 
                              type="time"
                              defaultValue={staff?.availability?.[day]?.end || "17:00"}
                              className="w-full"
                              disabled={!isAvailable && day === 'saturday' || day === 'sunday'}
                            />
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id={`available-${day}`} 
                                className="mr-2" 
                                defaultChecked={day !== 'saturday' && day !== 'sunday'}
                              />
                              <label htmlFor={`available-${day}`} className="text-sm">
                                Available
                              </label>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additional" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter staff address" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="payRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pay Rate ($/hour)</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="0.00" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="emergencyContact.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="emergencyContact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="Contact phone" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter any additional notes about this staff member" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {staff ? "Update Staff" : "Create Staff"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StaffForm;
