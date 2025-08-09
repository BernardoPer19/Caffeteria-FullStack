import axios from "axios";

const instance = axios.create({
  baseURL: "https://caffeteria-fullstack-production.up.railway.app",
  withCredentials: true,
});

export default instance;
