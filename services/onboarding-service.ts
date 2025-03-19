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
        if (scriptForm ) {
            const temp = JSON.parse(JSON.parse(scriptForm))
         
            if(temp.id === useCaseID) {
                console.log("scriptForm found in local storage")
                return temp;
            }else{
                return null;
            }
        }
        // else get it from the server
        const response = await axios.get(`${this.baseURL}/scripts/${useCaseID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        if(response.status === 200) {
            return response.data ;
        }else if(response.status === 404) {
            throw new Error("Script not found");
        }
        return null;
       } catch (error: any) {
        console.error('Error in getScript:', error);
        throw error;
       }
    }
}

