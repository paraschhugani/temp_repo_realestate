import axios from "axios";

interface Audience {
  audience_name: string;
  audience_description: string;
  csv_file: string;
}

export class AudienceService {
  baseURL: string = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  async createAudience(audience: { 
    audience_name: string, 
    audience_description: string, 
    csv_file: File 
  }, token: string, user_id: string) {
    try {
      const formData = new FormData();
      formData.append('csv_file', audience.csv_file);

      const response = await axios.post(
        `${this.baseURL}/audience/create?user_id=${user_id}&audience_name=${encodeURIComponent(audience.audience_name)}&audience_description=${encodeURIComponent(audience.audience_description)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        throw new Error("Unauthorized");
      } else if (error.response.status === 400) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error("Something went wrong");
      }
    }   
  }

  async getAudiences(token: string) {
    try {
      const response = await axios.get(`${this.baseURL}/audience/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error("Something went wrong");
    }
  }
}
