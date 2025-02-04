const API_BASE_URL = 'http://192.168.9.4:3000/api';

interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthResponse {
  token: string;
  user: UserData;
  message: string;
}

export const loginService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      return await response.json();
    } catch (error: any) {
      if (error.message === 'Failed to fetch') {
        throw new Error('No internet connection');
      }
      throw error;
    }
  },
};
