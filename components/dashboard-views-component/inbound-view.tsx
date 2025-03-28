"use client"

import { useEffect, useState } from "react"
import { DataTable } from "@/components/dashboard-ui-component/data-table"
import { EmptyState } from "@/components/dashboard-ui-component/empty-state"
import { Button } from "@/components/dashboard-ui-component/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/dashboard-ui-component/dialog"
import { Label } from "@/components/dashboard-ui-component/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/dashboard-ui-component/select"
import { Plus, Phone, PartyPopper } from "lucide-react"
import axios from "axios"
import { useAuth } from "@clerk/nextjs"
import confetti from "canvas-confetti"
interface PhoneNumberAssignment {
  id: string
  phoneNumber: string
  unformattedPhoneNumber: string
  agent: string
  campaign: string
  status: "active" | "inactive"
}
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Input } from "../dashboard-ui-component/input"
import { StorageService } from "@/services/storage-service"
interface Agent {
  id: string
  name: string
  status: "active" | "inactive"
  industry: string
  useCase: string
  type: string
}

function formatPhoneNumber(number: string) {
  const phoneNumber = parsePhoneNumberFromString("+" + number);
  return phoneNumber ? phoneNumber.formatInternational() : number;
}

export default function InboundView() {
  const { getToken, userId } = useAuth()
  // Dummy phone numbers that are already bought
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumberAssignment[]>([])

  const [isAssignNumberOpen, setIsAssignNumberOpen] = useState(false)
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState<PhoneNumberAssignment | null>(null)
  const [newAssignment, setNewAssignment] = useState({ phoneNumber: "", agent: "", campaign: "" })
  const [agents, setAgents] = useState<Agent[]>([])
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false)
  const [first_onboarding_agent_phone_number, setFirstOnboardingAgentPhoneNumber] = useState(false)
  const [first_onboarding_agent_campaign, setFirstOnboardingAgentCampaign] = useState(false)
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
      setNewAssignment({ ...newAssignment, agent:  response.data.at(-1).id})
    })
  }

  async function getInboundCampaigns() {
    const token = await getToken();
    const inboundCampaigns = await axios.get(`http://localhost:5000/campaign/inbound/list?user_id=${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    )
    console.log(inboundCampaigns.data)
    const inboundCampaignsdata = inboundCampaigns.data.map((campaign: any) => ({
      id: campaign._id,
      phoneNumber: formatPhoneNumber(campaign.phoneNumber),
      unformattedPhoneNumber: campaign.phoneNumber,
      agent: campaign.agent,
      campaign: campaign.campaign,
      status: campaign.status,
    }))
    setPhoneNumbers(inboundCampaignsdata)
    const temp_first_onboarding_agent_phone_number = StorageService.getItem(`first_onboarding_agent_phone_number`) === 'true' || StorageService.getItem(`first_onboarding_agent_phone_number`) === true ? true : false;
    const temp_first_onboarding_agent_campaign = StorageService.getItem(`first_onboarding_agent_campaign`) === 'true' || StorageService.getItem(`first_onboarding_agent_campaign`) === true ? true : false;
    setFirstOnboardingAgentPhoneNumber(temp_first_onboarding_agent_phone_number)
    setFirstOnboardingAgentCampaign(temp_first_onboarding_agent_campaign)
  }

  useEffect(() => {
    if (userId) {
      getAgents()
      getInboundCampaigns()
    }
  }, [userId])

  useEffect(() => {
    if (!first_onboarding_agent_phone_number && first_onboarding_agent_campaign) {
      openAssignDialog()
    }
  }, [first_onboarding_agent_phone_number, first_onboarding_agent_campaign])

  const handleAssignNumber = async () => {
    // /campaign/inbound/create
    const token = await getToken();
    axios.post("http://localhost:5000/campaign/inbound/create", {
      user_id: userId,
      phoneNumber: newAssignment.phoneNumber,
      agent: newAssignment.agent,
      campaign: newAssignment.campaign,
    }, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
    .then(() => {
      // reload the page
      // window.location.reload()

      if (!first_onboarding_agent_phone_number && first_onboarding_agent_campaign) {
        triggerConfetti()
        setIsSuccessDialogOpen(true)
        StorageService.setItem(`first_onboarding_agent_campaign`, 'false')
      }
    })
  }

  const triggerConfetti = () => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const openAssignDialog = (phoneNumber?: PhoneNumberAssignment) => {
    if (phoneNumber) {
      setSelectedPhoneNumber(phoneNumber)
      setNewAssignment({
        phoneNumber: phoneNumber.phoneNumber,
        agent: phoneNumber.agent,
        campaign: phoneNumber.campaign,
      })
    } else {
      setSelectedPhoneNumber(null)
      console.log(first_onboarding_agent_phone_number , "hello")
      console.log(first_onboarding_agent_campaign , "hello")
      if (!first_onboarding_agent_phone_number && first_onboarding_agent_campaign) {
        console.log(phoneNumbers.at(-1)?.unformattedPhoneNumber , "hello")
        console.log(agents.at(-1)?.id , "hello")
        setNewAssignment({ phoneNumber: phoneNumbers.at(-1)?.unformattedPhoneNumber || "", agent: agents.at(-1)?.id || "", campaign: "" })
      }else{
        setNewAssignment({ phoneNumber: "", agent: "", campaign: "" })
      }
    }
    setIsAssignNumberOpen(true)
  }

  // Phone number assignment table columns
  const phoneNumberColumns = [
    {
      header: "Phone Number",
      accessorKey: "phoneNumber" as keyof PhoneNumberAssignment,
    },
    {
      header: "Assigned Agent",
      accessorKey: "agent" as keyof PhoneNumberAssignment,
      cell: (assignment: PhoneNumberAssignment) => (
        <div>
          {assignment.status === "active" ? assignment.agent : <span className="text-gray-400">Not assigned</span>}
        </div>
      ),
    },
    {
      header: "Campaign",
      accessorKey: "campaign" as keyof PhoneNumberAssignment,
      cell: (assignment: PhoneNumberAssignment) => (
        <div>
          {assignment.status === "active" ? assignment.campaign : <span className="text-gray-400">Not assigned</span>}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status" as keyof PhoneNumberAssignment,
      cell: (assignment: PhoneNumberAssignment) => (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
            assignment.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          {assignment.status === "active" ? "Active" : "Inactive"}
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof PhoneNumberAssignment,
      cell: (assignment: PhoneNumberAssignment) => (
        <div className="flex space-x-2">
          {assignment.status === "active" ? (
            <>
              <Button variant="outline" size="sm" onClick={() => openAssignDialog(assignment)}>
                Reassign
              </Button>
              <Button variant="destructive" size="sm">
                Deactivate
              </Button>
            </>
          ) : (
            <Button variant="default" size="sm" onClick={() => openAssignDialog(assignment)}>
              Assign
            </Button>
          )}
        </div>
      ),
    },
  ]

  const emptyPhoneNumberState = (
    <EmptyState
      icon={<Phone className="h-12 w-12" />}
      title="No Phone Numbers Assigned"
      description="You haven't assigned any phone numbers to campaigns yet. Assign a number to start receiving calls."
      actionLabel="Assign Phone Number"
      onAction={() => openAssignDialog()}
    />
  )


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inbound Campaign</h1>
        <Button onClick={() => openAssignDialog()}>
          <Plus className="h-4 w-4 mr-2" />
          Assign Phone Number
        </Button>
      </div>

      <DataTable data={phoneNumbers} columns={phoneNumberColumns} emptyState={emptyPhoneNumberState} />

      {/* Assign Phone Number Dialog */}
      <Dialog open={isAssignNumberOpen} onOpenChange={setIsAssignNumberOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedPhoneNumber ? "Assign Phone Number to Campaign" : "Assign New Phone Number"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              {selectedPhoneNumber ? (
                <div className="p-2 border rounded-md bg-gray-50">{selectedPhoneNumber.phoneNumber}</div>
              ) : (
                <Select
                  value={newAssignment.phoneNumber}
                  onValueChange={(value) => {
                    setNewAssignment({ ...newAssignment, phoneNumber: value })
                    setSelectedPhoneNumber(phoneNumbers.find((pn) => pn.unformattedPhoneNumber === value) || null)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select phone number" />
                  </SelectTrigger>
                  <SelectContent>
                    {phoneNumbers.map((phoneNumber) => (
                      phoneNumber.status === "inactive" && (
                        <SelectItem key={phoneNumber.unformattedPhoneNumber} value={phoneNumber.unformattedPhoneNumber}>
                          {formatPhoneNumber(phoneNumber.phoneNumber)}
                        </SelectItem>
                      )
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="campaign">Campaign</Label>
              <Input
                id="campaign"
                value={newAssignment.campaign}
                placeholder="Enter campaign name"
                onChange={(e) => setNewAssignment({ ...newAssignment, campaign: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent">Agent</Label>
              <Select
                value={newAssignment.agent}
                onValueChange={(value) => {
                  setNewAssignment({ ...newAssignment, agent: value })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select agent" />
                </SelectTrigger>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignNumberOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignNumber} disabled={!newAssignment.phoneNumber || !newAssignment.agent || !newAssignment.campaign}>
              {selectedPhoneNumber && selectedPhoneNumber.status === "inactive" ? "Assign" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      <Dialog
        open={isSuccessDialogOpen}
        onOpenChange={(open) => {
          setIsSuccessDialogOpen(open)
          if (open) {
            triggerConfetti()
          }
        }}
      >
        <DialogContent className="max-w-md">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <PartyPopper className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">🎉 First Campaign Launched! 🎉</h2>
            <p className="text-gray-600 mb-6">
              Congratulations! Your first inbound campaign is now active and ready to receive calls. Your AI agent is
              now ready to handle customer interactions.
            </p>
            <div className="bg-blue-50 text-blue-700 p-4 rounded-md w-full mb-6">
              <p className="text-sm">
                <strong>What's next?</strong> Monitor your call logs to see incoming calls and track your campaign's
                performance.
              </p>
            </div>
            <Button onClick={() => {
              setIsSuccessDialogOpen(false)
              window.location.href = "/dashboard/call-logs"
            }}>Continue</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

