import { setAuthUsername } from '../utils/auth';
// ...existing imports...

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch('http://saveai.tech/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Save username immediately after successful login
      setAuthUsername(email); // or data.username if API returns it
      return data;
    }
    throw new Error(data.message);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
