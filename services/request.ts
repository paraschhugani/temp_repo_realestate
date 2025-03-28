import axios from "axios";

export class RequestService {
    static baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";

    static async postRequest(url: string, data: any, token: string) {
        return axios.post(`${this.baseURL}${url}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    }

    static async getRequest(url: string, token: string) {
        return axios.get(`${this.baseURL}${url}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });
    }
}
