import axios from "axios";

import { API_URL, API_KEY } from "./constants";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  params: {
    key: API_KEY,
  },
});

export default api;
