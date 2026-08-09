
const rawApiUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://agrimate-ai.onrender.com/api";

export const API_URL = rawApiUrl.replace(/\/+$/, "");
