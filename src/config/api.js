import axios from "axios";
// export const baseURL = "https://backend.freegram.crow.uz";
export const baseURL = "http://localhost:8000";
const api = axios.create({ baseURL: baseURL + "/api", withCredentials: true });
export default api; 