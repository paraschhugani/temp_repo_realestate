import axios from "axios";
import { StorageService } from "./storage-service";
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


    async checkIntegrationConnection(userUID : string, token : string, appName : string) {
        const form = new FormData();
        form.append("user_id", userUID);
        form.append("app_name", appName);
        const response = await axios.post(`${this.baseURL}/integration/check-connection`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },    
        });
        if(response.status === 200){
            StorageService.setItem("app_name", appName);
            return response.data;
        } else {
            throw new Error("Failed to check integration connection");
        }
    }


    async initializeTypeform( user_id : string, domain : string, token : string) {
        const form = new FormData();
        form.append("user_id", user_id);
        form.append("domain", domain);
        const response = await axios.post(`${this.baseURL}/typeform/integration/initialize`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
        if(response.status === 200){
            return response.data;
        } else {
            throw new Error("Failed to initialize typeform integration");
        }
    }

    async checkTypeformConnection(user_id : string, token : string, code : string) {
        const form = new FormData();
        form.append("user_id", user_id);
        form.append("code", code);
        const response = await axios.post(`${this.baseURL}/typeform/integration/callback`, form, {
            headers: {
                Authorization: `Bearer ${token}`,   
                "Content-Type": "application/json"
            },
        });
        if(response.status === 200){   
            if(response.data.code === "ErrTokenInvalid"){
                return false;
            } else {
                return true;
            }
        } else {
            throw new Error("Failed to check typeform connection");
        }
    }
}
