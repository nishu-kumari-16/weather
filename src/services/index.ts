import axios from "axios";

const service = axios.create({
  baseURL: "https://weatherapi-com.p.rapidapi.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

service.interceptors.request.use((config) => {
  if (!config.headers.requestType) {
    config.headers["X-RapidAPI-Key"] =
      "24397b3c22msh5c8800231cb5539p122b57jsn9a41b7b5cbeb";
    config.headers["X-RapidAPI-Host"] = "weatherapi-com.p.rapidapi.com";
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(err);
  }
);

export default service;
