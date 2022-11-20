import axios from "axios";
import { parseCookies } from 'nookies';

export function getAPIClient(ctx?: any) {
  const { '@@ngcash-app.token': dataFromCookiesStringify } = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  });

  if (dataFromCookiesStringify) {
    const dataTokenParsed = JSON.parse(dataFromCookiesStringify)
    const token = dataTokenParsed.token

    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`
    }
  }

  return api
}