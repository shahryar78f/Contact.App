import axios from "axios";

const baseURL = "https://contact-api-eight.vercel.app";

const api = axios.create({ baseURL, timeout: 60000 });

export default api;
