import { toastService } from "./toast-service";
import axios from "axios";
import { scriptFormKey, StorageService } from "./storage-service";

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
        formData.append('bg_noice', campaignData.backgroundSound.toString());
        formData.append('voice_id', campaignData.voiceModel);
        formData.append('speed', campaignData.voiceSpeed.toString());
        // formData.append('company_name', campaignData.companyName);
        // formData.append('app_name', 'googlecalender');
        // formData.append('assistant_name',"Nandish");
        
        const scriptForm = StorageService.getItem(scriptFormKey);
        if (scriptForm) {
            const scriptFormData = JSON.parse(JSON.parse(scriptForm));
            formData.append('company_name', scriptFormData.script.fields[0].value);
            formData.append('app_name', "googlecalender");
            formData.append('assistant_name',scriptFormData.script.fields[1].value);
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
        console.log(response.data);
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


