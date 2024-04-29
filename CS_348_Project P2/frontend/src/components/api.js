import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000", // Assuming your backend is running on port 5000
});

export default instance;
