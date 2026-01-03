import { ERPLayout } from '@/components/layout/ERPLayout';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, Bell, Shield, Clock, Users, Globe } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <ERPLayout>
      <PageHeader 
        title="Settings"
        description="Manage your account and system preferences"
      />

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          {isAdmin && <TabsTrigger value="organization">Organization</TabsTrigger>}
          {isAdmin && <TabsTrigger value="security">Security</TabsTrigger>}
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Display Preferences
                </CardTitle>
                <CardDescription>Customize your display settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Date Format</Label>
                    <p className="text-sm text-muted-foreground">Choose your preferred date format</p>
                  </div>
                  <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>YYYY-MM-DD</option>
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Time Zone</Label>
                    <p className="text-sm text-muted-foreground">Set your local time zone</p>
                  </div>
                  <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>UTC-05:00 (Eastern Time)</option>
                    <option>UTC-08:00 (Pacific Time)</option>
                    <option>UTC+00:00 (GMT)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Language</Label>
                    <p className="text-sm text-muted-foreground">Select your language</p>
                  </div>
                  <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Leave Request Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about leave request status</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Payroll Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive payslip and salary updates</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Attendance Reminders</Label>
                  <p className="text-sm text-muted-foreground">Daily check-in/check-out reminders</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Settings - Admin Only */}
        {isAdmin && (
          <TabsContent value="organization">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Organization Details
                  </CardTitle>
                  <CardDescription>Update your organization information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Organization Name</Label>
                      <Input defaultValue="Dayflow Inc." />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Input defaultValue="Technology" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Input defaultValue="123 Business Ave, New York, NY 10001" />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Work Hours Configuration
                  </CardTitle>
                  <CardDescription>Set default work hours for the organization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Work Start Time</Label>
                      <Input type="time" defaultValue="09:00" />
                    </div>
                    <div className="space-y-2">
                      <Label>Work End Time</Label>
                      <Input type="time" defaultValue="18:00" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Weekend Days</Label>
                      <p className="text-sm text-muted-foreground">Saturday and Sunday as weekends</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Leave Policy
                  </CardTitle>
                  <CardDescription>Configure default leave allocations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Annual Leave (days)</Label>
                      <Input type="number" defaultValue="20" />
                    </div>
                    <div className="space-y-2">
                      <Label>Sick Leave (days)</Label>
                      <Input type="number" defaultValue="10" />
                    </div>
                    <div className="space-y-2">
                      <Label>Personal Leave (days)</Label>
                      <Input type="number" defaultValue="5" />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        )}

        {/* Security Settings - Admin Only */}
        {isAdmin && (
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require 2FA for all users</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Password Expiry</Label>
                    <p className="text-sm text-muted-foreground">Force password change every 90 days</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Session Timeout</Label>
                    <p className="text-sm text-muted-foreground">Auto logout after inactivity</p>
                  </div>
                  <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>Never</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>IP Restriction</Label>
                    <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </ERPLayout>
  );
}
