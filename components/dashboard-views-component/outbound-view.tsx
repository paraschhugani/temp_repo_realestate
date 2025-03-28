"use client"

import { useState , useEffect} from "react"
import { DataTable } from "@/components/dashboard-ui-component/data-table"
import { EmptyState } from "@/components/dashboard-ui-component/empty-state"
import { Button } from "@/components/dashboard-ui-component/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/dashboard-ui-component/dialog"
import { Input } from "@/components/dashboard-ui-component/input"
import { Label } from "@/components/dashboard-ui-component/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-ui-component/select"
import { Calendar } from "@/components/dashboard-ui-component/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/dashboard-ui-component/popover"
import { PhoneOutgoing, Plus, CalendarIcon, Clock, AlertCircle, FormInput, Users } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/dashboard-ui-component/separator"
import axios from "axios"
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useAuth } from "@clerk/nextjs"
interface OutboundCampaign {
  id: string
  name: string
  agent: string
  phoneNumber: string
  audience: string
  startTime: Date | null
  status: "active" | "paused" | "completed" | "scheduled"
  analytics: {
    calls: number
    answered: number
    conversion: string
  }
  score: number
  typeform?: {
    url: string
    integration: "after_call" | "during_call" | "none"
  }
}

interface AudienceList {
  id: string
  name: string
  description: string
  contactCount: number
  createdAt: string
}

interface Agent {
  id: string
  name: string
  status: "active" | "inactive"
  industry: string
  useCase: string
  type: string
}

export default function OutboundView() {
  const { getToken, userId } = useAuth()
  const [campaigns, setCampaigns] = useState<OutboundCampaign[]>([
    // {
    //   id: "oc1",
    //   name: "New Product Launch",
    //   agent: "Sales Bot",
    //   phoneNumber: "+1 (555) 123-4567",
    //   audience: "High-Value Leads",
    //   startTime: new Date(2025, 3, 15, 9, 0),
    //   status: "active",
    //   analytics: {
    //     calls: 120,
    //     answered: 85,
    //     conversion: "15%",
    //   },
    //   score: 78,
    // },
  ])

  const [isAddCampaignOpen, setIsAddCampaignOpen] = useState(false)
  const [newCampaign, setNewCampaign] = useState<Partial<OutboundCampaign>>({
    name: "",
    agent: "",
    phoneNumber: "",
    audience: "",
    startTime: null,
    typeform: {
      url: "",
      integration: "none",
    },
  })
  const [dateTimeError, setDateTimeError] = useState("")

  const [agents, setAgents] = useState<Agent[]>([])
  // Sample data for dropdowns
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([])

  const [audienceLists, setAudienceLists] = useState<AudienceList[]>([])


  const validateDateTime = (date: Date | null): boolean => {
    if (!date) return false

    const now = new Date()
    if (date < now) {
      setDateTimeError("Start time cannot be in the past")
      return false
    }

    setDateTimeError("")
    return true
  }

  const handleAddCampaign = async () => {
    const token = await getToken();
    if (
      newCampaign.name &&
      newCampaign.agent &&
      newCampaign.phoneNumber &&
      newCampaign.audience &&
      newCampaign.startTime
    ) {
      if (!validateDateTime(newCampaign.startTime)) {
        return
      }

      const now = new Date()
      const isScheduled = newCampaign.startTime > now

      axios.post(`http://localhost:5000/campaign/outbound/create` , {
        user_id: userId,
        campaign: newCampaign.name,
        agent: newCampaign.agent,
        phoneNumber: newCampaign.phoneNumber,
        audience: newCampaign.audience,
        startTime: newCampaign.startTime,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data)
        window.location.reload()
      }).catch((err) => {
        console.log(err)
      })
      setDateTimeError("")
      // setIsAddCampaignOpen(false)
    }
  }

  const columns = [
    {
      header: "Campaign",
      accessorKey: "name" as keyof OutboundCampaign,
    },
    {
      header: "Agent",
      accessorKey: "agent" as keyof OutboundCampaign,
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber" as keyof OutboundCampaign,
    },
    {
      header: "Audience",
      accessorKey: "audience" as keyof OutboundCampaign,
    },
    {
      header: "Start Time",
      accessorKey: "startTime" as keyof OutboundCampaign,
      cell: (campaign: OutboundCampaign) => (
        <div>{campaign.startTime ? format(campaign.startTime, "MMM d, yyyy h:mm a") : "Not scheduled"}</div>
      ),
    },
    // {
    //   header: "Analytics/Presence",
    //   accessorKey: "analytics" as keyof OutboundCampaign,
    //   cell: (campaign: OutboundCampaign) => (
    //     <div className="space-y-1">
    //       <div className="text-sm">Calls: {campaign.analytics.calls}</div>
    //       <div className="text-sm">Answered: {campaign.analytics.answered}</div>
    //       <div className="text-sm">Conversion: {campaign.analytics.conversion}</div>
    //     </div>
    //   ),
    // },
    // {
    //   header: "Score/Level",
    //   accessorKey: "score" as keyof OutboundCampaign,
    //   cell: (campaign: OutboundCampaign) => (
    //     <div className="flex items-center">
    //       <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
    //         <span className="text-primary font-medium">{campaign.score}</span>
    //       </div>
    //       <span>Level {Math.floor(campaign.score / 10) + 1}</span>
    //     </div>
    //   ),
    // },
    {
      header: "Status",
      accessorKey: "status" as keyof OutboundCampaign,
      cell: (campaign: OutboundCampaign) => {
        const statusColors = {
          active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
          paused: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
          completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
          scheduled: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
        }

        return (
          <div className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${statusColors[campaign.status]}`}>
            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
          </div>
        )
      },
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof OutboundCampaign,
      cell: (campaign: OutboundCampaign) => (
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      ),
    },
  ]

  const emptyState = (
    <EmptyState
      icon={<PhoneOutgoing className="h-12 w-12" />}
      title="No Outbound Campaigns"
      description="You haven't created any outbound campaigns yet. Create a campaign to start making AI calls."
      actionLabel="Create New Campaign"
      onAction={() => setIsAddCampaignOpen(true)}
    />
  )

  const handleDateSelect = (date: Date | null) => {
    if (date) {
      const currentTime = newCampaign.startTime || new Date()
      date.setHours(currentTime.getHours())
      date.setMinutes(currentTime.getMinutes())

      validateDateTime(date)
      setNewCampaign({ ...newCampaign, startTime: date })
    }
  }

  const handleTimeSelect = (hours: number, minutes: number) => {
    const date = newCampaign.startTime || new Date()
    date.setHours(hours)
    date.setMinutes(minutes)

    validateDateTime(date)
    setNewCampaign({ ...newCampaign, startTime: new Date(date) })
  }

  async function getAgents() {
    const token = await getToken();
    axios.post(`http://localhost:5000/agent/list` , {
      user_id: userId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data)
      setAgents(response.data)
    })
  }

  function formatPhoneNumber(number: string) {
    const phoneNumber = parsePhoneNumberFromString("+" + number);
    return phoneNumber ? phoneNumber.formatInternational() : number;
  }

  async function getPhoneNumbers() {
    const token = await getToken();
    axios.post(`http://localhost:5000/phoneNumber/owned` , {
      user_id: userId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data)
      const phoneNumbers = response.data.map((phoneNumber: any) => formatPhoneNumber(phoneNumber.number))
      setPhoneNumbers(phoneNumbers)
    })
  }

  async function getAudienceLists() {
    const token = await getToken();
    axios.get(`http://localhost:5000/audience/list?user_id=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
        .then((res) => {
            console.log(res.data.audience_list)
            setAudienceLists(res.data.audience_list)
        })
        .catch((err) => {
        console.log(err)
        })
  }

  async function getOutboundCampaigns() {
    const token = await getToken();
    axios.get(`http://localhost:5000/campaign/outbound/list?user_id=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
        .then((res) => {
            console.log(res.data)
            setCampaigns(res.data)
        })
        .catch((err) => {
        console.log(err)
        })
  }

  useEffect(() => {
    if (userId) {
      getAgents()
      getPhoneNumbers()
      getAudienceLists()
      getOutboundCampaigns()
    }
  }, [userId])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Outbound Campaigns</h1>
        <Button onClick={() => setIsAddCampaignOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Campaign
        </Button>
      </div>

      <DataTable
        data={campaigns}
        columns={columns}
        onAddNew={() => setIsAddCampaignOpen(true)}
        addNewLabel="Create New Campaign"
        emptyState={emptyState}
      />

      <Dialog open={isAddCampaignOpen} onOpenChange={setIsAddCampaignOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Create New Outbound Campaign</DialogTitle>
          </DialogHeader>

          {/* Common settings section */}
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Campaign Name</Label>
                <Input
                  id="name"
                  placeholder="Enter campaign name"
                  value={newCampaign.name || ""}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="agent">Assigned Agent</Label>
                <Select
                  value={newCampaign.agent || ""}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, agent: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map((agent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Select
                  value={newCampaign.phoneNumber || ""}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, phoneNumber: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select phone number" />
                  </SelectTrigger>
                  <SelectContent>
                    {phoneNumbers.map((number) => (
                      <SelectItem key={number} value={number}>
                        {number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Start Time</Label>
                <div className="flex space-x-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newCampaign.startTime && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newCampaign.startTime ? format(newCampaign.startTime, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newCampaign.startTime || undefined}
                        onSelect={handleDateSelect}
                        required
                        disabled={(date) => {
                          const today = new Date()
                          today.setHours(0, 0, 0, 0)
                          return date < today
                        }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[120px] justify-start text-left font-normal",
                          !newCampaign.startTime && "text-muted-foreground",
                        )}
                      >
                        <Clock className="mr-2 h-4 w-4" />
                        {newCampaign.startTime ? format(newCampaign.startTime, "h:mm a") : <span>Time</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4">
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="hours">Hour</Label>
                            <Select
                              value={newCampaign.startTime ? String(newCampaign.startTime.getHours()) : "9"}
                              onValueChange={(value) => {
                                handleTimeSelect(Number.parseInt(value), newCampaign.startTime?.getMinutes() || 0)
                              }}
                            >
                              <SelectTrigger id="hours">
                                <SelectValue placeholder="Hour" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 24 }, (_, i) => (
                                  <SelectItem key={i} value={String(i)}>
                                    {i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="minutes">Minute</Label>
                            <Select
                              value={newCampaign.startTime ? String(newCampaign.startTime.getMinutes()) : "0"}
                              onValueChange={(value) => {
                                handleTimeSelect(newCampaign.startTime?.getHours() || 9, Number.parseInt(value))
                              }}
                            >
                              <SelectTrigger id="minutes">
                                <SelectValue placeholder="Minute" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                                  <SelectItem key={minute} value={String(minute)}>
                                    {minute < 10 ? `0${minute}` : minute}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                {dateTimeError && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {dateTimeError}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Horizontal divider */}
          <Separator className="my-4" />

          {/* Split section for Audience and Typeform */}
          <div className="flex gap-6">
            {/* Left side - Audience */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-lg font-medium">Target Audience</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Select Audience List</Label>
                <Select
                  value={newCampaign.audience || ""}
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, audience: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience list" />
                  </SelectTrigger>
                  <SelectContent>
                    {audienceLists.length > 0 ? (
                      audienceLists.map((list) => (
                        <SelectItem key={list.id} value={list.id}>
                          {list.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem key="no-lists" value="No audience lists found Please create one or use a integration" disabled>No audience lists found Please create Audience/Contact List or use a integration</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 p-4 bg-muted/50 rounded-md">
                <h4 className="font-medium mb-2">Audience Details</h4>
                {newCampaign.audience ? (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total contacts:</span>
                      <span className="text-sm font-medium">
                        { audienceLists.find((list) => list.id === newCampaign.audience)?.contactCount }
                      </span>
                    </div>
                    {/* <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Estimated duration:</span>
                      <span className="text-sm font-medium">
                        {newCampaign.audience === "High-Value Leads"
                          ? "~3 hours"
                          : newCampaign.audience === "Recent Signups"
                            ? "~5 hours"
                            : newCampaign.audience === "Inactive Customers"
                              ? "~2 hours"
                              : newCampaign.audience === "Expiring Subscriptions"
                                ? "~1.5 hours"
                                : "~1 hour"}
                      </span>
                    </div> */}
                    
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Select an audience list to see details</p>
                )}
              </div>
            </div>

            {/* Vertical divider */}
            <Separator orientation="vertical" className="h-auto" />

            {/* Right side - Typeform integration */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center mb-2">
                <FormInput className="h-5 w-5 mr-2 text-primary" />
                <h3 className="text-lg font-medium">Typeform Integration</h3>
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="typeformUrl">Typeform URL</Label>
                <Input
                  id="typeformUrl"
                  placeholder="https://yourform.typeform.com/to/abc123"
                  value={newCampaign.typeform?.url || ""}
                  onChange={(e) =>
                    setNewCampaign({
                      ...newCampaign,
                      typeform: {
                        ...newCampaign.typeform,
                        url: e.target.value,
                      },
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Enter the URL of your Typeform survey or data collection form
                </p>
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="typeformIntegration">When to use Typeform</Label>
                <Select
                  value={newCampaign.typeform?.integration || "none"}
                  onValueChange={(value: "after_call" | "during_call" | "none") =>
                    setNewCampaign({
                      ...newCampaign,
                      typeform: {
                        ...newCampaign.typeform,
                        integration: value,
                      },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select when to use Typeform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="during_call">During call (agent will guide through form)</SelectItem>
                    <SelectItem value="after_call">After call (send form via SMS)</SelectItem>
                    <SelectItem value="none">Don't use Typeform</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 p-4 bg-muted/50 rounded-md">
                <h4 className="font-medium mb-2">How it works</h4>
                {newCampaign.typeform?.integration === "during_call" ? (
                  <div className="space-y-2">
                    <p className="text-sm">
                      The AI agent will guide the caller through the Typeform questions during the call, collecting
                      responses in real-time.
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Questions are read aloud by the AI</li>
                      <li>Responses are recorded and submitted to Typeform</li>
                      <li>Conditional logic in your form is fully supported</li>
                    </ul>
                  </div>
                ) : newCampaign.typeform?.integration === "after_call" ? (
                  <div className="space-y-2">
                    <p className="text-sm">
                      After the call concludes, the system will automatically send an SMS with a link to your Typeform.
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>SMS includes a personalized message</li>
                      <li>Link is pre-filled with caller information</li>
                      <li>You'll receive notifications when forms are completed</li>
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm">
                    No Typeform integration will be used for this campaign. You can add one later by editing the
                    campaign.
                  </p>
                )}
              </div> */}
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setIsAddCampaignOpen(false)
                setNewCampaign({
                  name: "",
                  agent: "",
                  phoneNumber: "",
                  audience: "",
                  startTime: null,
                  typeform: {
                    url: "",
                    integration: "none",
                  },
                })
                setDateTimeError("")
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddCampaign}
              disabled={
                !newCampaign.name ||
                !newCampaign.agent ||
                !newCampaign.phoneNumber ||
                !newCampaign.audience ||
                !newCampaign.startTime ||
                !!dateTimeError
              }
            >
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

