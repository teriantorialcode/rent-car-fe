import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7127/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
