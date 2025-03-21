import { toastService } from "./toast-service";
import axios from "axios";
import { scriptFormKey, StorageService } from "./storage-service";
import { OnboardingService } from "./onboarding-service";

export class CampaignService {
  baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  async testCampaign(campaignData: {
    backgroundSound : boolean;
    phone_number : string;
    userID : string;
    voiceModel : string;
    voiceSpeed : number;
    token : string;
  },) {
    try {
      
        const formData = new FormData();
        formData.append('user_id', campaignData.userID);
        formData.append('phone_number', campaignData.phone_number);
        formData.append('bg_noice', campaignData.backgroundSound ? "true" : "false");
        formData.append('voice_id', campaignData.voiceModel);
        formData.append('speed', campaignData.voiceSpeed.toString());
        formData.append('from_demo',"false")
  
        const scriptForm = StorageService.getItem(scriptFormKey);
        if (scriptForm) {
            const scriptFormData = JSON.parse(scriptForm);
            formData.append('company_name', scriptFormData.fields[0].messages[0].value);
            formData.append('app_name', "googlecalender");
            formData.append('assistant_name',scriptFormData.fields[1].messages[0].value);
            formData.append('form_model',JSON.stringify(scriptFormData));
        }
      
        // for (const pair of formData.entries()) {
        //   console.log(pair);
        // }
        const response = await axios.post(`${this.baseURL}/campaign/test`, formData, {
          headers: {
            "Authorization" : `Bearer ${campaignData.token}`,
           'Content-Type': 'application/json',
          }
        });
        toastService.success("Test call initiated successfully!");
   
        return response.data;
    
     
    } catch (error: any) {
      console.error("Error testing campaign:", error);
      
      if (error.response?.status === 401) {
        toastService.error("Unauthorized. Please sign in again.");
      } else if (error.response?.status === 400) {
        toastService.error(error.response.data.message || "Invalid request data");
      } else {
        toastService.error("Failed to initiate test call. Please try again.");
      }
      
      throw error;
    }
  }

  async launchAgent(campaignData: {

    campaign_name : string;
    campaign_description: string;
    campaign_status : string; 
    userID : string;
    token : string;
  },) {
    try {
      const formData = new FormData();
      const audience_id = StorageService.getItem("audience_id");
      formData.append('audience_id', audience_id ?? "");
      formData.append('campaign_name', campaignData.campaign_name);
      formData.append('campaign_description', campaignData.campaign_description);
      formData.append('campaign_status', campaignData.campaign_status);
      formData.append('plivo_phone_number', "918035736949");
      formData.append('user_id', campaignData.userID);
      formData.append('app_name', "googlecalender");
      const scriptForm = StorageService.getItem(scriptFormKey);
      if (scriptForm) {
          const scriptFormData = JSON.parse(scriptForm);
          formData.append('company_name', scriptFormData.fields[0].messages[0].value);
          formData.append('assistant_name',scriptFormData.fields[1].messages[0].value);
          formData.append('form_model',JSON.stringify(scriptFormData));
      }
      formData.append('bg_noice', StorageService.getItem("background_sound") ?? "false");
      formData.append('voice_id', StorageService.getItem("voice_model") ?? "");
      formData.append('speed', StorageService.getItem("voice_speed") ?? "1");
      formData.append('campaign_start_date', new Date().toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+):(\d+)/, '$3-$1-$2 $4:$5:$6'));
      formData.append('campaign_end_date', new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/(\d+)\/(\d+)\/(\d+),\s(\d+):(\d+):(\d+)/, '$3-$1-$2 $4:$5:$6'));
      
      const response = await axios.post(`${this.baseURL}/campaign/create`, formData, {
        headers: {
          "Authorization" : `Bearer ${campaignData.token}`,
         'Content-Type': 'application/json',
        }
      });
      toastService.success("Campaign launched successfully!");
      return response.data;


    }catch (error: any) {
      console.error("Error launching agent:", error);
      throw error;
    }
  }


  async launchDemoCampaign(campaignData: {
    backgroundSound : boolean;
    phone_number : string;
    userID : string;
    voiceModel : string;
    voiceSpeed : number;
    token : string;
    useCase: string;
    assistant_name : string;
  },) {
    try {
      
        const formData = new FormData();
        formData.append('user_id', campaignData.userID);
        formData.append('phone_number', campaignData.phone_number);
        formData.append('bg_noice', campaignData.backgroundSound ? "true" : "false");
        formData.append('voice_id', campaignData.voiceModel);
        formData.append('speed', campaignData.voiceSpeed.toString());
        formData.append('assistant_name',campaignData.assistant_name);
        formData.append('company_name', "SuperU");
        formData.append('app_name', "googlecalender");
        formData.append("from_demo","true");

        const onboardingService = new OnboardingService(
          process.env.NEXT_PUBLIC_BACKEND_URL || ""
        );
        const scriptResponse = await onboardingService.getScript(
          campaignData.useCase,
          campaignData.token ?? ""
        );
      
        if (scriptResponse) {   
            formData.append('form_model',JSON.stringify(scriptResponse));
        }
      
        // for (const pair of formData.entries()) {
        //   console.log(pair);
        // }
        const response = await axios.post(`${this.baseURL}/campaign/test`, formData, {
          headers: {
            "Authorization" : `Bearer ${campaignData.token}`,
           'Content-Type': 'application/json',
          }
        });
        toastService.success("Test call initiated successfully!");
   
        return response.data;
    
     
    } catch (error: any) {
      console.error("Error testing campaign:", error);
      
      if (error.response?.status === 401) {
        toastService.error("Unauthorized. Please sign in again.");
      } else if (error.response?.status === 400) {
        toastService.error(error.response.data.message || "Invalid request data");
      } else {
        toastService.error("Failed to initiate test call. Please try again.");
      }
      
      throw error;
    }
  }
} 

