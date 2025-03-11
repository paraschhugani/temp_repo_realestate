import axios from "axios";
import { StorageService, scriptFormKey } from "@/services/storage-service";
export class OnboardingService {
    baseURL: string;
    constructor(baseUrl: string){
        this.baseURL = baseUrl;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }


    async getScript(useCaseID: string, token: string) {
       try{
        const scriptForm = StorageService.getItem(scriptFormKey)
        if (scriptForm) {
            return JSON.parse(scriptForm)
        }
        // else get it from the server
        const response = await axios.get(`${this.baseURL}/scripts/${useCaseID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data ;
       } catch (error: any) {
        console.error('Error in getScript:', error);
        throw error;
       }
    }
}

