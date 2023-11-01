import axios from "axios";
const BASE_URL: string = import.meta.env.VITE_REACT_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
