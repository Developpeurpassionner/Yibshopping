import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ doit utiliser la variable
});

export default api;
