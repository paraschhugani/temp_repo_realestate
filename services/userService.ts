import axios from 'axios';

export const userService = {
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  async checkSignInStatus(token: string) {
    try {
    
      const response = await axios.get(`${this.baseUrl}/user/is-signed-in`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error checking sign-in status:', error);
      throw error;
    }
  }
}; 