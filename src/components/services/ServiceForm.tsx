
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Service, ServiceCategory, ClientType } from "@/data/mockData";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Trash } from "lucide-react";

// Define the form schema
const serviceSchema = z.object({
  name: z.string().min(2, { message: "Service name is required" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Category is required" }),
  clientType: z.enum(["residential", "commercial", "both"]),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  priceType: z.enum(["flat", "hourly", "sqft"]),
  defaultDuration: z.coerce.number().int().positive({ message: "Duration must be a positive number" }),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, { message: "Must be a valid hex color" }),
  isActive: z.boolean().default(true),
  tasks: z.array(z.string()).min(1, { message: "At least one task is required" }),
  requiredSupplies: z.array(z.string()),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  service?: Service | null;
  onSave: (service: ServiceFormValues) => void;
  onCancel: () => void;
  availableCategories: ServiceCategory[];
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  service,
  onSave,
  onCancel,
  availableCategories,
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  
  // Set default values based on whether we're editing or creating
  const defaultValues: Partial<ServiceFormValues> = service
    ? {
        ...service,
        tasks: [...service.tasks],
        requiredSupplies: [...service.requiredSupplies],
      }
    : {
        name: "",
        description: "",
        category: availableCategories[0] || "standard",
        clientType: "both",
        price: 0,
        priceType: "flat",
        defaultDuration: 60,
        color: "#3b82f6", // Default to blue
        isActive: true,
        tasks: [""],
        requiredSupplies: [""],
      };

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues,
  });

  const onSubmit = (data: ServiceFormValues) => {
    // Filter out empty tasks and supplies
    const validTasks = data.tasks.filter(task => task.trim() !== "");
    const validSupplies = data.requiredSupplies.filter(supply => supply.trim() !== "");

    onSave({
      ...data,
      tasks: validTasks,
      requiredSupplies: validSupplies,
    });
  };

  // Array field handlers
  const addArrayItem = (fieldName: "tasks" | "requiredSupplies") => {
    const currentItems = form.getValues()[fieldName];
    form.setValue(fieldName, [...currentItems, ""]);
  };

  const removeArrayItem = (fieldName: "tasks" | "requiredSupplies", index: number) => {
    const currentItems = form.getValues()[fieldName];
    if (currentItems.length > 1) {
      const newItems = [...currentItems];
      newItems.splice(index, 1);
      form.setValue(fieldName, newItems);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter service name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the service in detail" 
                        className="min-h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.charAt(0).toUpperCase() + category.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="clientType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Type</FormLabel>
                    <FormControl>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange as (value: string) => void}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select client type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="both">Both</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pricing Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Pricing</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="priceType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price Type</FormLabel>
                      <FormControl>
                        <Select 
                          value={field.value} 
                          onValueChange={field.onChange as (value: string) => void}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select price type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="flat">Flat Rate</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="sqft">Per Sq Ft</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="defaultDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min="15" step="15" {...field} />
                    </FormControl>
                    <FormDescription>
                      Estimated time to complete this service in minutes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Appearance */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Appearance</h3>
              
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Color</FormLabel>
                    <div className="flex space-x-2">
                      <div 
                        className="w-8 h-8 rounded border" 
                        style={{ backgroundColor: field.value }}
                      />
                      <FormControl>
                        <Input type="color" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Active Status
                      </FormLabel>
                      <FormDescription>
                        Inactive services won't appear as options for new jobs
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Right column */}
          <div className="space-y-6">
            {/* Tasks Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Service Tasks</h3>
              <FormDescription>
                List individual tasks included in this service
              </FormDescription>

              {form.getValues().tasks.map((_, index) => (
                <FormField
                  key={`tasks.${index}`}
                  control={form.control}
                  name={`tasks.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder="Task description" {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("tasks", index)}
                          disabled={form.getValues().tasks.length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => addArrayItem("tasks")}
              >
                <Plus className="h-4 w-4" />
                Add Task
              </Button>
            </div>

            {/* Required Supplies Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Required Supplies</h3>
              <FormDescription>
                List supplies needed for this service
              </FormDescription>

              {form.getValues().requiredSupplies.map((_, index) => (
                <FormField
                  key={`requiredSupplies.${index}`}
                  control={form.control}
                  name={`requiredSupplies.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Input placeholder="Supply item" {...field} />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeArrayItem("requiredSupplies", index)}
                          disabled={form.getValues().requiredSupplies.length <= 1}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => addArrayItem("requiredSupplies")}
              >
                <Plus className="h-4 w-4" />
                Add Supply
              </Button>
            </div>
          </div>
        </div>
        
        {/* Form Actions */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          {service && (
            <Button 
              type="button" 
              variant="destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Delete Service
            </Button>
          )}
          <div className="flex-grow" />
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {service ? "Update Service" : "Create Service"}
          </Button>
        </div>
      </form>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this service?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              service and may affect any jobs that use it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground"
            >
              Delete Service
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
};

export default ServiceForm;
