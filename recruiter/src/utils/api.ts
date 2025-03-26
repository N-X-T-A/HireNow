import { getAccessToken, isTokenValid } from "./auth";

const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = getAccessToken();

  if (!isTokenValid(token)) {
    localStorage.removeItem("accessToken");
    window.location.href = "/signin";
    return Promise.reject("Token expired, redirecting to Sign In...");
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(url, { ...options, headers });

  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    window.location.href = "/signin";
    return Promise.reject("Unauthorized, redirecting to Sign In...");
  }

  return response.json();
};

export default apiFetch;
