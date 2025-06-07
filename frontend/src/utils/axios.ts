import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.BASE_URL || "http://localhost:3000", // Usa la variable de entorno o localhost por defecto
  withCredentials: true,
});

export default instance;
