import { jwtDecode } from "jwt-decode";

// Interface cho Access Token
interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return isTokenValid(token);
};
