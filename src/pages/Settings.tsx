
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure your CRM preferences and settings.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="company">Company Profile</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your account preferences and personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="font-medium">Profile Picture</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Upload new image
                    </Button>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Your name" defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Your email" defaultValue="admin@shinecrm.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Your phone number" defaultValue="(555) 987-6543" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrator</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="cleaner">Cleaner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-end gap-4">
                  <Input type="password" id="password" value="********" readOnly className="flex-1" />
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
              
              <Button onClick={handleSave}>Save Changes</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
              <CardDescription>
                Configure application preferences and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Automatic Check-In Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to staff before scheduled jobs
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Language</Label>
                  <p className="text-sm text-muted-foreground">
                    Set your preferred language for the application
                  </p>
                </div>
                <Select defaultValue="english">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Time Zone</Label>
                  <p className="text-sm text-muted-foreground">
                    Set the time zone for scheduling and reporting
                  </p>
                </div>
                <Select defaultValue="pacific">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pacific">Pacific Time (PT)</SelectItem>
                    <SelectItem value="mountain">Mountain Time (MT)</SelectItem>
                    <SelectItem value="central">Central Time (CT)</SelectItem>
                    <SelectItem value="eastern">Eastern Time (ET)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSave}>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="company" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>
                Manage your business details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-white">SC</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Company Logo</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Upload new logo
                    </Button>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input id="companyName" placeholder="Your company name" defaultValue="Shine Clean" />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">Business Phone</Label>
                  <Input id="businessPhone" placeholder="Business phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">Business Email</Label>
                  <Input id="businessEmail" type="email" placeholder="Business email" defaultValue="contact@shinecrm.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Street address" defaultValue="123 Cleaning Ave." />
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="City" defaultValue="Cleanville" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="State" defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" placeholder="Zip code" defaultValue="90210" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" placeholder="https://" defaultValue="https://shinecrm.com" />
              </div>
              
              <Button onClick={handleSave}>Save Company Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage users and staff accounts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Name</th>
                      <th className="px-4 py-2 text-left font-medium">Email</th>
                      <th className="px-4 py-2 text-left font-medium">Role</th>
                      <th className="px-4 py-2 text-left font-medium">Status</th>
                      <th className="px-4 py-2 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-2">Admin User</td>
                      <td className="px-4 py-2">admin@shinecrm.com</td>
                      <td className="px-4 py-2">Administrator</td>
                      <td className="px-4 py-2">
                        <Badge variant="default">Active</Badge>
                      </td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">Maria Garcia</td>
                      <td className="px-4 py-2">maria@shinecrm.com</td>
                      <td className="px-4 py-2">Supervisor</td>
                      <td className="px-4 py-2">
                        <Badge variant="default">Active</Badge>
                      </td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="px-4 py-2">James Wilson</td>
                      <td className="px-4 py-2">james@shinecrm.com</td>
                      <td className="px-4 py-2">Cleaner</td>
                      <td className="px-4 py-2">
                        <Badge variant="default">Active</Badge>
                      </td>
                      <td className="px-4 py-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <Button className="gap-2">
                <span>Add New User</span>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newJob">New job assignments</Label>
                    <Switch id="newJob" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="jobUpdates">Job status updates</Label>
                    <Switch id="jobUpdates" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="clientFeedback">Client feedback received</Label>
                    <Switch id="clientFeedback" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dailySummary">Daily schedule summary</Label>
                    <Switch id="dailySummary" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="inventory">Inventory alerts</Label>
                    <Switch id="inventory" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Mobile Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushNewJob">New job assignments</Label>
                    <Switch id="pushNewJob" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushCheckIn">Check-in reminders</Label>
                    <Switch id="pushCheckIn" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushScheduleChanges">Schedule changes</Label>
                    <Switch id="pushScheduleChanges" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pushCancellations">Job cancellations</Label>
                    <Switch id="pushCancellations" defaultChecked />
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSave}>Save Notification Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integrations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrations</CardTitle>
              <CardDescription>
                Connect with third-party services and applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-semibold">$</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Payment Integration</h3>
                      <p className="text-sm text-muted-foreground">
                        Connect payment processors (Stripe, Square)
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">C</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Calendar Sync</h3>
                      <p className="text-sm text-muted-foreground">
                        Sync with Google Calendar or Outlook
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-md bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 font-semibold">Q</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">QuickBooks</h3>
                      <p className="text-sm text-muted-foreground">
                        Sync invoices and payments with QuickBooks
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-semibold">S</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">SMS Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Set up SMS notifications for clients and staff
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
              
              <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Configure API access for custom integrations:
                </p>
                <Button>Generate API Key</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
