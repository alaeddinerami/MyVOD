const API_BASE_URL = 'http://192.168.9.4:3000/api';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: UserData;
  message: string;
}

interface ApiError {
  message: string;
  statusCode: number;
}

export const authService = {
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      console.log("Sending registration request:", { name, email });

      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      console.log("Response status:", response.status);

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        const errorMessage = data?.message || 'Registration failed';
        console.error("API Error:", errorMessage);
        throw new Error(errorMessage);
      }

      console.log("Registration successful:", data);
      return data;
      
    } catch (error: any) {
      console.error("Network/Processing Error:", error.message);

      if (error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Check your network.');
      }
      throw error;
    }
  },
};
