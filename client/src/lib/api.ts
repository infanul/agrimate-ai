
const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://agrimate-ai.onrender.com/api";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  location?: string;
  // If you also use 'name' elsewhere, you can leave it in as optional:
  name?: string; 
}

// Add the missing getStoredUser function
export const getStoredUser = (): User | null => {
  // Check if we are running in the browser to prevent Next.js SSR crashes
  if (typeof window === 'undefined') {
    return null; 
  }
  
  try {
    const userStr = localStorage.getItem('user'); // Adjust this string if you saved it under a different key
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    console.error("Failed to parse stored user", error);
    return null;
  }
};// Function to handle logging out by clearing stored credentials
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token'); // Adjust 'token' if your auth token uses a different key
    localStorage.removeItem('user');  // Clears the user data we set up earlier
  }
};
