import axios from "axios";
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: "https://techincal-task-server.onrender.com",
  responseType: "json",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
