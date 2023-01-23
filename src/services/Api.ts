import axios from "axios";
import { useUserStore } from "../stores/user";

const baseUrl = "http://localhost:8000";

const Api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.request.use(
  (config: any) => {
    const user = useUserStore();

    if (user.isAuthenticated) {
      config.headers["Authorization"] = `Bearer ${user.token}`;
      user.checkTokenExpired();

      if (config.isUploadFile) {
        config.headers["Content-Type"] = "multipart/form-data";
      }

      return config;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    const { statusCode } = response.data;
    const successCode = "200";
    if (successCode.includes(statusCode)) {
      return response.data;
    } else {
      return Promise.reject(response.data.error.description);
    }
  },
  (error) => {
    console.log("err" + error);

    return Promise.reject(error);
  }
);

export default Api;
