import axios from "axios";

export const API_URL = "http://0.0.0.0:5000/api/";

export function buildUrl(...parts: string[]): string {
  return API_URL + parts.join("/");
}

async function get<T>(...url: string[]): Promise<T | Error> {
  try {
    const response = await axios.get(buildUrl(...url));
    return response.data as T;
  } catch (error) {
    return error as Error;
  }
}

async function post<T, X>(data: X, ...url: string[]): Promise<T | Error> {
  try {
    const response = await axios.post(buildUrl(...url), data);
    return response.data as T;
  } catch (error) {
    return error as Error;
  }
}

export function getLoginRedirectUrl(): string {
  return buildUrl("login/oauth/discord");
}
