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
import axios from "axios";
import { useAuth } from "@clerk/nextjs"
import {
  scriptFormKey,
  StorageService,
} from "@/services/storage-service";

interface LaunchAgentProps {
    useCase: string;
}

export default function LaunchAgent({ useCase }: LaunchAgentProps) {
    console.log(useCase);
    const {getToken ,  userId } = useAuth();
    const handleAddAgent = async () => {
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
        request_json['type'] = StorageService.getItem(`agentType-${useCase}`) ?? "";
        axios.post("http://localhost:5000/agent/create", request_json , {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }).then((response) => {
          StorageService.setItem(`first_onboarding_agent_phone_number`, 'true');
          StorageService.setItem(`first_onboarding_agent_campaign`, 'true');
          window.location.href = StorageService.getItem(`agentType-${useCase}`) === "inbound" ? "/dashboard" : "/dashboard/outbound";
        }).catch((error) => {
          console.log(error)
        })
      }
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
    </div>
  ) 
}