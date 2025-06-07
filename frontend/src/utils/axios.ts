import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-cafeteria-hopg.onrender.com",
  withCredentials: true,
});

export default instance;
  