"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { DataTable } from "@/components/dashboard-ui-component/data-table"
import { EmptyState } from "@/components/dashboard-ui-component/empty-state"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ScriptForm } from "@/components/onboarding/script-form"
import { IntegrationStep } from "@/components/onboarding/integration-step"
import { AudienceStep } from "@/components/onboarding/audience-step"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@clerk/nextjs"
import {
  Users,
  UserPlus,
  User,
  Check,
  Upload,
  Mic,
  FileText,
  LinkIcon,
  Phone,
  Heart,
  Wallet,
  Building2,
  Dumbbell,
  Cloud,
  Link,
  Puzzle,
  Rocket,
  PhoneOutgoing,
  PhoneIncoming,
} from "lucide-react"
import Image from "next/image"
import { RequestService } from "@/services/request"
import { scriptFormKey } from "@/services/storage-service"
import { StorageService } from "@/services/storage-service"

interface Industry {
  name: string
  icon: React.ReactNode
}

interface Agent {
  id: string
  name: string
  status: "active" | "inactive"
  industry: string
  useCase: string
  type: string
}

export default function AgentsView() {
  const { getToken, userId } = useAuth()
  const [agents, setAgents] = useState<Agent[]>([])
  const [isAddAgentOpen, setIsAddAgentOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [newAgent, setNewAgent] = useState({
    name: "",
    phoneNumber: "",
    industry: "",
    useCase: "",
    script: "",
    type: "inbound",
    integration: "",
    voice: "Alexandra",
    language: "English",
    gender: "Female",
    speechSpeed: [1.0],
    backgroundNoise: false,
  })

  const industries: Industry[] = [
    { name: "Health", icon: <Heart className="h-5 w-5" /> },
    { name: "Mortgage", icon: <Wallet className="h-5 w-5" /> },
    { name: "Recruitment", icon: <Users className="h-5 w-5" /> },
    { name: "Real-estate", icon: <Building2 className="h-5 w-5" /> },
    { name: "Fitness", icon: <Dumbbell className="h-5 w-5" /> },
    { name: "Saas", icon: <Cloud className="h-5 w-5" /> },
  ]

  // Add this state variable:
  const [useCases, setUseCases] = useState<{ id: string, title: string, subheadline: string }[]>([])
  const [script, setScript] = useState<any>(null)

  const baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  useEffect(() => {
    if (newAgent.industry) {
      getUseCases()
    }
  }, [newAgent.industry])

  async function getAgents() {
    console.log(userId)
    const token = await getToken();
    console.log(token)
    axios.post(`${baseURL}/agent/list` , {
      user_id: userId ?? ""
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      setAgents(response.data)
    })
  }

  useEffect(() => {
    if (userId) {
      getAgents()
    }
  }, [userId])

  function getUseCases() {
    axios.get(`${baseURL}/usecases/industry/${newAgent.industry.toLowerCase()}`).then((response) => {
      const useCases_keys = Object.keys(response.data['useCases'])
      const usecase_dict = useCases_keys.map((key) => ({ id : key , title: response.data['useCases'][key].title , subheadline: response.data['useCases'][key].subheadline }))
      console.log(usecase_dict)
      setUseCases(usecase_dict)
    })
  }

  async function getUseCaseDetails(id: string) {
    const token = await getToken();
    axios.get(`${baseURL}/scripts/${id}` , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response.data)
      setScript(response.data)
    })
  }

  useEffect(() => {
    if (newAgent.useCase) {
      getUseCaseDetails(newAgent.useCase)
    }
  }, [newAgent.useCase])

  const integrations = [
    {
      name: "Google Calendar",
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
    },
    { name: "Cal.com", icon: "/placeholder.svg?height=40&width=40" },
    {
      name: "Calendly",
      icon: "https://assets.calendly.com/assets/frontend/media/logo-square-cd364a3c33976d32792a.png",
    },
    {
      name: "HubSpot",
      icon: "https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_the-logo.svg",
    },
    {
      name: "Salesforce",
      icon: "https://www.salesforce.com/news/wp-content/uploads/sites/3/2021/05/Salesforce-logo.jpg",
    },
    { name: "Zoho CRM", icon: "/placeholder.svg?height=40&width=40" },
  ]

  const handleAddAgent = async () => {
    // setAgents([
    //   ...agents,
    //   {
    //     id: Math.random().toString(36).substring(2, 9),
    //     name: newAgent.name || "New Agent",
    //     phoneNumber: newAgent.phoneNumber || "+1 (555) 123-4567",
    //     status: "active",
    //     industry: newAgent.industry,
    //     useCase: newAgent.useCase,
    //   },
    // ])
    // setNewAgent({
    //   name: "",
    //   phoneNumber: "",
    //   industry: "",
    //   useCase: "",
    //   script: "",
    //   integration: "",
    //   voice: "Alexandra",
    //   language: "English",
    //   gender: "Female",
    //   speechSpeed: [1.0],
    //   backgroundNoise: false,
    // })
    // setIsAddAgentOpen(false)
    const token = await getToken();
    var request_json : any = {}
    const scriptForm = StorageService.getItem(scriptFormKey);
    if (scriptForm) {
        const scriptFormData = JSON.parse(scriptForm);
        request_json['company_name'] = scriptFormData.fields[0].messages[0].value;
        request_json['assistant_name'] = scriptFormData.fields[1].messages[0].value;
        request_json['form_model'] = JSON.stringify(scriptFormData);
    }

    request_json['bg_noice'] = StorageService.getItem("background_sound") ?? "false";
    request_json['voice_id'] = StorageService.getItem("voice_model") ?? "";
    request_json['speed'] = StorageService.getItem("voice_speed") ?? "1";
    request_json['user_id'] = userId;
    request_json['type'] = newAgent.type;
    axios.post(`${baseURL}/agent/create`, request_json , {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((response) => {
      window.location.reload();
    }).catch((error) => {
      console.log(error)
    })
  }

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const columns = [
    {
      header: "Agent Name",
      accessorKey: "name" as keyof Agent,
      cell: (agent: Agent) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
            <User className="h-4 w-4 text-primary" />
          </div>
          {agent.name}
        </div>
      ),
    },
    {
      header: "Industry",
      accessorKey: "industry" as keyof Agent,
    },
    {
      header: "Use Case",
      accessorKey: "useCase" as keyof Agent,
    },
    {
      header: "Type",
      accessorKey: "type" as keyof Agent,
    },
    {
      header: "Status",
      accessorKey: "status" as keyof Agent,
      cell: (agent: Agent) => (
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
            agent.status === "active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
          }`}
        >
          {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
        </div>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof Agent,
      cell: (agent: Agent) => (
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
      icon={<Users className="h-12 w-12" />}
      title="No Agents Found"
      description="You haven't added any agents yet. Add your first agent to get started with AI calling."
      actionLabel="Add New Agent"
      onAction={() => setIsAddAgentOpen(true)}
    />
  )

  const getStepTitle = () => {
    switch (currentStep) {
      case 0:
        return "Choose Inbound / Outbound"
      case 1:
        return "Choose Industry"
      case 2:
        return "Choose Use Case"
      case 3:
        return "Configure Your AI Agent Script"
      case 4:
        return "Choose Your Integration"
      case 5:
        return "Launch Agent"
      default:
        return "Add New Agent"
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">Select the type of AI agent you want to create</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card
                className={`cursor-pointer transition-all ${
                  newAgent.type === "inbound" ? "border-2 border-primary" : "hover:border-gray-300"
                }`}
                onClick={() => setNewAgent({ ...newAgent, type: "inbound" })}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <PhoneIncoming className="h-8 w-8 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Inbound Agent</h3>
                  <p className="text-gray-500 mb-4">
                    Create an agent that handles incoming calls from customers. Perfect for customer support,
                    appointment scheduling, and information requests.
                  </p>
                  {newAgent.type === "inbound" && (
                    <div className="absolute top-4 right-4">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card
                className={`cursor-pointer transition-all ${
                  newAgent.type === "outbound" ? "border-2 border-primary" : "hover:border-gray-300"
                }`}
                onClick={() => setNewAgent({ ...newAgent, type: "outbound" })}
              >
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <PhoneOutgoing className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Outbound Agent</h3>
                  <p className="text-gray-500 mb-4">
                    Create an agent that makes outgoing calls to leads or customers. Ideal for sales, lead
                    qualification, follow-ups, and appointment reminders.
                  </p>
                  {newAgent.type === "outbound" && (
                    <div className="absolute top-4 right-4">
                      <Check className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={nextStep} disabled={!newAgent.type}>
                Next
              </Button>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">Select the industry your AI agent will operate in</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {industries.map((industry) => (
                <Card
                  key={industry.name}
                  className={`cursor-pointer transition-all ${
                    newAgent.industry === industry.name ? "border-2 border-primary" : "hover:border-gray-300"
                  }`}
                  onClick={() => setNewAgent({ ...newAgent, industry: industry.name })}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {industry.icon}
                      </div>
                      <span>{industry.name}</span>
                    </div>
                    {newAgent.industry === industry.name && <Check className="h-5 w-5 text-primary" />}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={nextStep} disabled={!newAgent.industry}>
                Next
              </Button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">Select how your AI agent will be used</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {newAgent.industry &&
                useCases.map((useCase) => (
                  <Card
                    key={useCase.title}
                    className={`cursor-pointer transition-all ${
                      newAgent.useCase === useCase.id ? "border-2 border-primary" : "hover:border-gray-300"
                    }`}
                    onClick={() => setNewAgent({ ...newAgent, useCase: useCase.id })}
                  >
                    <CardContent className="p-4 flex  items-start justify-between">
                      <div className="flex flex-col items-start gap-2">
                        <h5 className="text-md font-medium mb-2">{useCase.title}</h5>
                        <p className="text-sm text-gray-500">{useCase.subheadline}</p>
                      </div>
                      {newAgent.useCase === useCase.id && <Check className="h-5 w-5 text-primary" />}
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep} disabled={!newAgent.useCase}>
                Next
              </Button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <ScriptForm useCase={newAgent.useCase} dashboard={true} setBack={prevStep} setNext={nextStep}/>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <IntegrationStep useCase={newAgent.useCase} dashboard={true} dashboardNextStep={nextStep} />

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">

            <div className="pt-6">
              <Card className="border-dashed border-2 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Rocket className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-medium">Launch your agent</h3>
                        <p className="text-sm text-gray-500">Your agent is ready to start making calls</p>
                      </div>
                    </div>
                    <Button onClick={(handleAddAgent)}>Save Agent</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
            </div>
          </div>
        ) 

      default:
        return null
    }
  }

  const renderStepIndicator = () => {
    const steps = [
      { number: 0, title: "Inbound / Outbound", icon: <Phone className="h-5 w-5" /> },
      { number: 1, title: "Industry", icon: <Building2 className="h-5 w-5" /> },
      { number: 2, title: "Use Case", icon: <Puzzle className="h-5 w-5" /> },
      { number: 3, title: "Script", icon: <FileText className="h-5 w-5" /> },
      { number: 4, title: "Integration", icon: <Link className="h-5 w-5" /> },
      { number: 5, title: "Launch Agent", icon: <Rocket className="h-5 w-5" /> },
    ]

    return (
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                currentStep >= step.number ? "bg-primary text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              {step.icon}
            </div>
            <span
              className={`text-xs mt-2 ${currentStep >= step.number ? "text-primary font-medium" : "text-gray-400"}`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Agents</h1>
        <Button onClick={() => setIsAddAgentOpen(true)}>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New Agent
        </Button>
      </div>

      <DataTable
        data={agents}
        columns={columns}
        onAddNew={() => setIsAddAgentOpen(true)}
        addNewLabel="Add New Agent"
        emptyState={emptyState}
      />

      <Dialog
        open={isAddAgentOpen}
        onOpenChange={(open) => {
          setIsAddAgentOpen(open)
          if (!open) setCurrentStep(0)
        }}
      >
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getStepTitle()}</DialogTitle>
          </DialogHeader>
          {renderStepIndicator()}
          {renderStepContent()}
        </DialogContent>
      </Dialog>
    </div>
  )
}
