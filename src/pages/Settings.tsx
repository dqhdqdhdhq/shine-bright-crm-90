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
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const Settings = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const handleSave = () => {
    toast({
      title: t("settings.saved"),
      description: t("settings.saved.description"),
    });
  };

  return (
    <div className="space-y-6 py-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("nav.settings")}</h1>
        <p className="text-muted-foreground">
          {t("settings.description")}
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">{t("settings.tabs.general")}</TabsTrigger>
          <TabsTrigger value="company">{t("settings.tabs.company")}</TabsTrigger>
          <TabsTrigger value="users">{t("settings.tabs.users")}</TabsTrigger>
          <TabsTrigger value="notifications">{t("settings.tabs.notifications")}</TabsTrigger>
          <TabsTrigger value="integrations">{t("settings.tabs.integrations")}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.account.title")}</CardTitle>
              <CardDescription>
                {t("settings.account.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <h3 className="font-medium">{t("settings.account.profilePicture")}</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      {t("settings.account.uploadImage")}
                    </Button>
                    <Button variant="ghost" size="sm">
                      {t("actions.delete")}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t("settings.account.fullName")}</Label>
                  <Input id="fullName" placeholder={t("settings.account.fullNamePlaceholder")} defaultValue="Admin User" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t("settings.account.email")}</Label>
                  <Input id="email" type="email" placeholder={t("settings.account.emailPlaceholder")} defaultValue="admin@shinecrm.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("settings.account.phone")}</Label>
                  <Input id="phone" placeholder={t("settings.account.phonePlaceholder")} defaultValue="(555) 987-6543" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">{t("settings.account.role")}</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger id="role">
                      <SelectValue placeholder={t("settings.account.selectRole")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">{t("settings.roles.admin")}</SelectItem>
                      <SelectItem value="supervisor">{t("settings.roles.supervisor")}</SelectItem>
                      <SelectItem value="cleaner">{t("settings.roles.cleaner")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">{t("settings.account.password")}</Label>
                <div className="flex items-end gap-4">
                  <Input type="password" id="password" value="********" readOnly className="flex-1" />
                  <Button variant="outline">{t("settings.account.changePassword")}</Button>
                </div>
              </div>
              
              <Button onClick={handleSave}>{t("actions.save")}</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.app.title")}</CardTitle>
              <CardDescription>
                {t("settings.app.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.app.darkMode")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.app.darkModeDescription")}
                  </p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.app.reminders")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.app.remindersDescription")}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("app.language")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.app.languageDescription")}
                  </p>
                </div>
                <Select defaultValue="english">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("settings.app.selectLanguage")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="swedish">Swedish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{t("settings.app.timezone")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("settings.app.timezoneDescription")}
                  </p>
                </div>
                <Select defaultValue="pacific">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={t("settings.app.selectTimezone")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pacific">{t("settings.app.timezones.pacific")}</SelectItem>
                    <SelectItem value="mountain">{t("settings.app.timezones.mountain")}</SelectItem>
                    <SelectItem value="central">{t("settings.app.timezones.central")}</SelectItem>
                    <SelectItem value="eastern">{t("settings.app.timezones.eastern")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={handleSave}>{t("actions.save")}</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="company" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings.company.title")}</CardTitle>
              <CardDescription>
                {t("settings.company.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-md bg-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-white">SC</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">{t("settings.company.logo")}</h3>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      {t("settings.company.uploadLogo")}
                    </Button>
                    <Button variant="ghost" size="sm">
                      {t("actions.delete")}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">{t("settings.company.name")}</Label>
                <Input id="companyName" placeholder={t("settings.company.namePlaceholder")} defaultValue="Shine Clean" />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="businessPhone">{t("settings.company.phone")}</Label>
                  <Input id="businessPhone" placeholder={t("settings.company.phonePlaceholder")} defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessEmail">{t("settings.company.email")}</Label>
                  <Input id="businessEmail" type="email" placeholder={t("settings.company.emailPlaceholder")} defaultValue="contact@shinecrm.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">{t("settings.company.address")}</Label>
                <Input id="address" placeholder={t("settings.company.addressPlaceholder")} defaultValue="123 Cleaning Ave." />
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="city">{t("settings.company.city")}</Label>
                  <Input id="city" placeholder={t("settings.company.cityPlaceholder")} defaultValue="Cleanville" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">{t("settings.company.state")}</Label>
                  <Input id="state" placeholder={t("settings.company.statePlaceholder")} defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">{t("settings.company.zipCode")}</Label>
                  <Input id="zipCode" placeholder={t("settings.company.zipCodePlaceholder")} defaultValue="90210" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website">{t("settings.company.website")}</Label>
                <Input id="website" placeholder="https://" defaultValue="https://shinecrm.com" />
              </div>
              
              <Button onClick={handleSave}>{t("actions.save")}</Button>
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
              
              <Button onClick={handleSave}>{t("actions.save")}</Button>
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
