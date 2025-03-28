"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/dashboard-ui-component/card"
import { Button } from "@/components/dashboard-ui-component/button"
import { Input } from "@/components/dashboard-ui-component/input"
import { Label } from "@/components/dashboard-ui-component/label"
import { Switch } from "@/components/dashboard-ui-component/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/dashboard-ui-component/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-ui-component/select"
import { CreditCard, Download, Plus, User } from "lucide-react"

export default function SettingsView() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [callSummaryReports, setCallSummaryReports] = useState(true)
  const [failedCallAlerts, setFailedCallAlerts] = useState(true)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button>Save Changes</Button>
      </div>

      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <Button variant="outline" size="sm">
                  Change Avatar
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="Your Company" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                    <SelectItem value="est">Eastern Time (GMT-5)</SelectItem>
                    <SelectItem value="pst">Pacific Time (GMT-8)</SelectItem>
                    <SelectItem value="cet">Central European Time (GMT+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive email notifications for important events
                  </p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Call Summary Reports</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive daily summary reports of all calls</p>
                </div>
                <Switch checked={callSummaryReports} onCheckedChange={setCallSummaryReports} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Failed Call Alerts</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when calls fail to connect</p>
                </div>
                <Switch checked={failedCallAlerts} onCheckedChange={setFailedCallAlerts} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription and billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Pro Plan</h3>
                  <span className="bg-primary text-white px-2 py-1 rounded text-xs">Current Plan</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">$99/month, billed monthly</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">Unlimited AI agents</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">1,000 minutes of calling per month</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 rounded-full bg-primary mr-2"></div>
                    <span className="text-sm">Advanced analytics and reporting</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Change Plan
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    Cancel Subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/2025</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    Remove
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="billingName">Billing Name</Label>
                <Input id="billingName" placeholder="Your Company, Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingEmail">Billing Email</Label>
                <Input id="billingEmail" type="email" placeholder="billing@yourcompany.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="billingAddress">Billing Address</Label>
                <Input id="billingAddress" placeholder="123 Business St" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingCity">City</Label>
                  <Input id="billingCity" placeholder="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingState">State/Province</Label>
                  <Input id="billingState" placeholder="CA" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingZip">ZIP/Postal Code</Label>
                  <Input id="billingZip" placeholder="94103" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingCountry">Country</Label>
                  <Select defaultValue="us">
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID (Optional)</Label>
                <Input id="taxId" placeholder="Tax ID or VAT number" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Invoice #INV-2025-003</p>
                      <p className="text-sm text-gray-500">March 1, 2025</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-600 font-medium">$99.00</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Invoice #INV-2025-002</p>
                      <p className="text-sm text-gray-500">February 1, 2025</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-600 font-medium">$99.00</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="border-b pb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Invoice #INV-2025-001</p>
                      <p className="text-sm text-gray-500">January 1, 2025</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-600 font-medium">$99.00</span>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

