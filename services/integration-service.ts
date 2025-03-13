import axios from "axios";
import { m } from "framer-motion";

export class IntegrationService {
    baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";

    async initializeIntegration(userUID : string, token : string, appName : string, domain : string) {

        const form = new FormData();
        form.append("user_id", userUID);
        form.append("app_name", appName);
        form.append("domain", domain);

       try{
        const  response  = await axios.post(`${this.baseURL}/integration/connect`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        });
       if(response.status === 200){
        return response.data;
       } else {
        throw new Error("Failed to initialize integration");
       }
       } catch (error) {
        console.error("Error initializing integration:", error);
        throw error;
       }
    }


    async checkIntegrationConnection(userUID : string, token : string, integrationId : string) {
        const form = new FormData();
        form.append("user_id", userUID);
        form.append("integration_id", integrationId);
        const response = await axios.post(`${this.baseURL}/integration/check-connection`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
         
        });
        if(response.status === 200){
            return response.data;
        } else {
            throw new Error("Failed to check integration connection");
        }
    }
}
