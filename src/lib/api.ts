import axios from "axios";

// Point this to your backend
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default api;
