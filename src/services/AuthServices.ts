import { UserTy } from "../types/UserTy.js";
import Api from "./Api.js";

export default {
  profile() {
    return Api.get(`/auth/profile`);
  },
  login(email: string, password: string) {
    return Api.post(`/auth/login`, {
      user_email: email,
      user_password: password,
    });
  },
  register(email: string, password: string, cfPassword: string) {
    return Api.post(`/auth/register`, {
      user_email: email,
      user_password: password,
      user_confirm_password: cfPassword,
    });
  },
  verify(token: string) {
    return Api.get(`/auth/activation/${token}`);
  },
  resendVerify(email: string) {
    return Api.post(`/auth/resend/verify`, {
      user_email: email,
    });
  },
  changePassword(password: string, cfPassword: string) {
    return Api.post(`/auth/changepassword`, {
      user_password: password,
      user_confirm_password: cfPassword,
    });
  },
  changeProfile(userData: UserTy) {
    return Api.put(`/auth/changeprofile`, {
      ...userData,
    });
  },
  getAllUser() {
    return Api.get("/auth/users");
  },
  forgotpassword(email: string) {
    return Api.post("/auth/password/reset", {
      user_email: email,
    });
  },
  profileLog() {
    return Api.get("/auth/profile/log");
  },
  refreshToken(refresh_token: string) {
    return Api.post("/auth/refresh-token", {
      refresh_token: refresh_token,
    });
  },
};
