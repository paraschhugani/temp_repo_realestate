import axios from "axios";

export class OnboardingService {
    baseURL: string;
   

    constructor(baseUrl: string){
        this.baseURL = baseUrl;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
    }


    async getScript(useCaseID: string, token: string) {
       try{
        const response = await axios.get(`${this.baseURL}/scripts/${useCaseID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        console.log(response.data)
        return response.data ;
       } catch (error: any) {
        console.error('Error in getScript:', error);
        throw error;
       }
    }
}

