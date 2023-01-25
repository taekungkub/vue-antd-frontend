import { defineStore } from "pinia";
import jwt_decode from "jwt-decode";
import { UserTy } from "../types/UserTy";
import AuthServices from "../services/AuthServices";
import { LogTy } from "../types/LogTy";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    token: "",
    role: "",
    info: {} as UserTy,
    logList: [] as Array<LogTy>,
  }),

  actions: {
    login(email: string, password: string) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await AuthServices.login(email, password);
          if (res.data) {
            const { token } = res.data;
            const decoded: UserTy = jwt_decode(token);

            this.$patch({
              token: token,
              role: decoded.role_title,
            });

            window.localStorage.setItem(
              "auth_data",
              JSON.stringify({
                token: token,
              })
            );
            resolve(res.data);
          }
        } catch (error) {
          reject(error);
        }
      });
    },

    tryAutoLogin() {
      return new Promise((resolve, reject) => {
        const authData = localStorage.getItem("auth_data");
        if (!authData) return;
        const { token } = JSON.parse(authData);

        if (token) {
          const decoded: UserTy = jwt_decode(token);
          this.$patch({
            token: token,
            role: decoded.role_title,
          });
          resolve(token);
        }
      });
    },
    logout() {
      window.localStorage.removeItem("auth_data");
      this.$patch({
        token: "",
        role: "",
        info: {},
      });
    },
    updateProfile(userData: any) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await AuthServices.changeProfile(userData);
          if (res.data) {
            resolve("done");
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    async getUserInfo() {
      const res = await AuthServices.profile();
      if (res.data) {
        const userData = res.data;
        this.$patch({
          info: {
            ...userData,
          },
        });
        return Promise.resolve(res.data);
      }
    },
    changePassword(password: string, cfPassword: string) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await AuthServices.changePassword(password, cfPassword);
          if (res.data) {
            resolve(res.data);
          }
        } catch (error) {
          reject(error);
        }
      });
    },
    checkTokenExpired() {
      if (this.token) {
        let { exp }: any = jwt_decode(this.token);
        if (Date.now() >= exp * 1000) {
          console.log("token is expired");
          this.logout();
          return false;
        }
      }
    },
    async getLogUser() {
      try {
        const res = await AuthServices.profileLog();
        this.logList = res.data;
      } catch (error) {}
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
});
