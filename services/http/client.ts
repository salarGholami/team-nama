// services/http/client.ts
import axios from "axios";

export const httpClient = axios.create({
  baseURL: "/api",
});
