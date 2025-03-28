import { Card, CardContent } from "@/components/ui/card"
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
import { useState } from "react";
import { Button } from "@/components/ui/button"

interface AgentTypeProps {
  setAgentType: (type: string) => void;
}

export default function AgentType({setAgentType}: AgentTypeProps) {
  const [newAgent, setNewAgent] = useState({ type: "inbound" });

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
        <Button onClick={() => setAgentType(newAgent.type)} disabled={!newAgent.type}>
          Next
        </Button>
      </div>
    </div>
  )
}