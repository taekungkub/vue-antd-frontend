import axios from "axios";
import { useUserStore } from "../stores/user";
import AuthServices from "./AuthServices";

const baseUrl = "http://localhost:8000";

const Api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let refresh = false;

Api.interceptors.request.use(
  async (config: any) => {
    const user = useUserStore();
    if (user.isAuthenticated) {
      config.headers["Authorization"] = `Bearer ${user.token}`;

      if (user.isExpired(user.token) && !refresh) {
        refresh = true;
        try {
          console.log("refresh new token");
          const res = await AuthServices.refreshToken(user.refresh_token);
          const { access_token } = res.data;
          config.headers["Authorization"] = `Bearer ${access_token}`;
          user.updateToken(access_token, user.refresh_token);
        } catch (error) {
          user.logout();
        }
      } else if (user.isExpired(user.refresh_token)) {
        console.log("refresh token expired");
        user.logout();
      }

      if (config.isUploadFile) {
        config.headers["Content-Type"] = "multipart/form-data";
      }
      refresh = false;
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
    return Promise.reject(error);
  }
);

export default Api;
